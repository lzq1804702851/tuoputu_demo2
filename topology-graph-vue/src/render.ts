/* ================================================================
 *  SVG 渲染引擎
 *  Layer 0: 地图底图
 *  Layer 1: 包含圈（外→内递归）
 *  Layer 2: 通信连线（贝塞尔曲线）
 *  Layer 3: 节点图标 + 属性标签
 * ================================================================ */

import type {
  RenderState, ComputedNode, ComputedRelation, ContainmentNode,
  RelationTypeConfig, LegendConfig, NodeLabelKeys, TopoNode, NodeTypeConfig,
} from './types'
import { southChinaSeaFeatures, projectFeatures, type MapFeature } from './map-data'
import { statusColors } from './defaults'

const NS = 'http://www.w3.org/2000/svg'

function el(tag: string, attrs: Record<string, string | number | undefined> = {}, parent: Element | null = null): SVGGElement | SVGElement {
  const e = document.createElementNS(NS, tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== undefined) e.setAttribute(k, String(v))
  }
  if (parent) parent.appendChild(e)
  return e
}

function txt(content: string, attrs: Record<string, string | number | undefined>, parent: Element): SVGTextElement {
  const t = el('text', attrs, parent) as SVGTextElement
  t.textContent = content
  return t
}

/* ========== 地图底图渲染 ========== */
function renderMap(layer: Element, projectedFeatures: MapFeature[]) {
  for (const f of projectedFeatures) {
    const attrs: Record<string, string | number | undefined> = {
      d: f.path,
    }
    if (f.style.fill) attrs.fill = f.style.fill
    else attrs.fill = 'none'
    if (f.style.stroke) attrs.stroke = f.style.stroke
    if (f.style.strokeWidth) attrs['stroke-width'] = f.style.strokeWidth
    if (f.style.opacity !== undefined) attrs.opacity = f.style.opacity

    el('path', attrs, layer)
  }
}

/* ========== 包含圈渲染（递归） ========== */
function renderContainmentCircles(
  layer: Element, labelLayer: Element,
  tree: ContainmentNode[], dim: boolean,
  nodeMap: Map<string, ComputedNode>,
  nodeTypes: Record<string, NodeTypeConfig>,
) {
  for (const cn of tree) {
    const opacity = dim ? 0.05 : Math.max(0.15, 0.5 - cn.depth * 0.1)
    const status = cn.node.status
    const statusColor = statusColors[status] || '#38bdf8'
    const isOffline = status === 'offline' || status === 'error'
    const isWarning = status === 'warning'


    // 画包含圈（实线，颜色反映状态）
    el('circle', {
      cx: cn.x, cy: cn.y, r: cn.r,
      fill: isOffline ? '#ef444410' : isWarning ? '#f59e0b08' : 'transparent',
      stroke: isOffline ? '#ef4444' : isWarning ? '#f59e0b' : statusColor,
      'stroke-width': Math.max(0.8, 2 - cn.depth * 0.3),
      opacity,
      'data-cid': cn.node.uuid,
      cursor: 'grab',
    }, layer)

    // 标签（大圆正上方，名称前加类型图标）
    const fontSize = Math.max(7, 11 - cn.depth * 1.5)
    const typeIcon = nodeTypes[cn.node.type_id]?.icon || ''
    const displayName = typeIcon + ' ' + cn.node.name
    txt(displayName, {
      x: cn.x,
      y: cn.y - cn.r - 4,
      'text-anchor': 'middle',
      fill: isOffline ? '#fca5a5' : isWarning ? '#fbbf24' : '#38bdf8',
      'font-size': fontSize,
      'font-weight': 'bold',
      opacity: dim ? 0.05 : 0.7,
      'data-cid': cn.node.uuid,
      cursor: 'grab',
    }, labelLayer)

    // 递归渲染子包含圈
    if (cn.children.length > 0) {
      renderContainmentCircles(layer, labelLayer, cn.children, dim, nodeMap, nodeTypes)
    }
  }
}

/* ========== 连线渲染 ========== */
function drawLink(
  cr: ComputedRelation,
  layer: Element,
  nodeMap: Map<string, ComputedNode>,
  extra: { opacity?: number; dim?: boolean } = {},
) {
  let { fromX, fromY, toX, toY, fromR, toR, config: cfg } = cr

  // 如果端点是容器节点，连线连到大圆（containerR）边缘
  const fromNode = nodeMap.get(cr.relation.from_id)
  const toNode = nodeMap.get(cr.relation.to_id)
  if (fromNode && fromNode.isContainer && fromNode.containerR) {
    fromX = fromNode.x; fromY = fromNode.y; fromR = fromNode.containerR
  }
  if (toNode && toNode.isContainer && toNode.containerR) {
    toX = toNode.x; toY = toNode.y; toR = toNode.containerR
  }

  const dx = toX - fromX, dy = toY - fromY
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const x1 = fromX + dx / len * (fromR + 2)
  const y1 = fromY + dy / len * (fromR + 2)
  const x2 = toX - dx / len * (toR + 2)
  const y2 = toY - dy / len * (toR + 2)
  const op = extra.opacity ?? 1

  // 稍微弯曲以避免重叠
  const curve = 0.04
  const cpx = (x1 + x2) / 2 - dy * curve
  const cpy = (y1 + y2) / 2 + dx * curve

  const attrs: Record<string, string | number | undefined> = {
    d: `M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}`,
    fill: 'none',
    stroke: cfg.color,
    'stroke-width': cfg.width,
    'stroke-dasharray': cfg.dash || undefined,
    opacity: op,
    'data-rid': cr.relation.uuid,
  }

  // 根据关系状态调整样式
  if (cr.relation.status === 'disconnected' || cr.relation.status === 'offline') {
    attrs['stroke-dasharray'] = '3 5'
    attrs.stroke = '#ef4444'
    attrs.opacity = op * 0.5
  }

  el('path', attrs, layer)

  // 断开的连线：在中点显示 × 标记
  if (cr.relation.status === 'disconnected' || cr.relation.status === 'offline') {
    const mx = (x1 + x2) / 2 - dy * curve * 0.5
    const my = (y1 + y2) / 2 + dx * curve * 0.5
    txt('✕', {
      x: mx, y: my + 3,
      'text-anchor': 'middle',
      fill: '#ef4444',
      'font-size': 8,
      'font-weight': 'bold',
      opacity: op * 0.8,
      'data-rid': cr.relation.uuid,
    }, layer)
  }

  // 关系名称标签（在连线中点，避开状态图标）
  if (cr.relation.name && len > 60) {
    const hasStatusIcon = cr.relation.status === 'disconnected' || cr.relation.status === 'offline'
    const mx = (x1 + x2) / 2 - dy * curve * 0.5
    const my = (y1 + y2) / 2 + dx * curve * 0.5
    const labelFill = (cr.relation.status === 'disconnected' || cr.relation.status === 'offline') ? '#ef4444' : cfg.color
    txt(cr.relation.name, {
      x: mx, y: my - (hasStatusIcon ? 10 : 4),
      'text-anchor': 'middle',
      fill: labelFill,
      'font-size': 6,
      opacity: op * 0.6,
      'data-rid': cr.relation.uuid,
    }, layer)
  }
}

/* ========== 节点渲染 ========== */
function renderNode(
  cn: ComputedNode,
  nodeLayer: Element,
  labelLayer: Element,
  dim: boolean,
  nodeLabels?: NodeLabelKeys,
) {
  const { x, y, r, icon, color, node } = cn
  const op = dim ? 0.06 : 1
  const isOffline = node.status === 'offline' || node.status === 'error'
  const statusColor = statusColors[node.status] || '#64748b'


  // 主圆
  el('circle', {
    cx: x, cy: y, r,
    fill: isOffline ? '#ef444425' : 'transparent',
    stroke: isOffline ? '#ef4444' : statusColor,
    'stroke-width': isOffline ? 1.5 : 1,
    opacity: op,
    'data-nid': node.uuid,
    cursor: 'grab',
  }, nodeLayer)

  // 图标
  txt(icon, {
    x, y: y - 1,
    'text-anchor': 'middle',
    'font-size': r > 14 ? 11 : 9,
    opacity: op,
    'data-nid': node.uuid,
    cursor: 'grab',
  }, nodeLayer)

  // 节点名称（圆圈正上方）
  txt(node.name, {
    x, y: y - r - 4,
    'text-anchor': 'middle',
    fill: isOffline ? '#fca5a5' : '#94a3b8',
    'font-size': 7,
    opacity: op,
    'data-nid': node.uuid,
    cursor: 'grab',
  }, labelLayer)

  // 额外属性标签
  if (nodeLabels && node.extra) {
    const labels = typeof nodeLabels === 'function'
      ? nodeLabels(node)
      : nodeLabels
        .filter(k => node.extra![k] !== undefined)
        .map(k => ({ key: k, value: String(node.extra![k]) }))

    labels.forEach((item, idx) => {
      txt(`${item.key}: ${item.value}`, {
        x, y: y + r + 18 + idx * 8,
        'text-anchor': 'middle',
        fill: '#64748b',
        'font-size': 6,
        opacity: op * 0.7,
        'data-nid': node.uuid,
        cursor: 'grab',
      }, labelLayer)
    })
  }
}

/* ========== 主渲染入口 ========== */
export function render(
  svg: SVGSVGElement,
  state: RenderState,
  vb: { x: number; y: number; w: number; h: number },
  projectedMapFeatures: MapFeature[],
  nodeLabels?: NodeLabelKeys,
) {
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`)

  // Defs
  const defs = el('defs', {}, svg) as unknown as SVGDefsElement
  const pat = el('pattern', { id: 'tg-grid', width: 40, height: 40, patternUnits: 'userSpaceOnUse' }, defs)
  el('path', { d: 'M 40 0 L 0 0 0 40', fill: 'none', stroke: '#1e293b', 'stroke-width': 0.5 }, pat)

  // 背景
  el('rect', { width: 20000, height: 20000, x: -10000, y: -10000, fill: '#0f172a' }, svg)

  // Layer 0: 地图底图
  const mapLayer = el('g', { class: 'tg-map' }, svg)
  renderMap(mapLayer, projectedMapFeatures)

  // 网格（微弱）
  el('rect', { width: 20000, height: 20000, x: -10000, y: -10000, fill: 'url(#tg-grid)', opacity: 0.3 }, svg)

  const { nodes, relations, containmentTree, filterMode, filterRelated } = state
  const related = filterMode ? filterRelated : new Set<string>()

  function isNodeDim(cn: ComputedNode): boolean {
    if (!filterMode) return false
    return !related.has(cn.node.uuid)
  }

  // Layer 1: 包含圈
  const circleLayer = el('g', { class: 'tg-circles' }, svg)
  const circleLabelLayer = el('g', { class: 'tg-circle-labels' }, svg)
  const anyDim = !!filterMode
  renderContainmentCircles(circleLayer, circleLabelLayer, containmentTree, anyDim, state.nodeMap, state.nodeTypes)

  // Layer 2: 通信连线
  const linkLayer = el('g', { class: 'tg-links' }, svg)
  relations.forEach(cr => {
    const dim = filterMode && !related.has(cr.relation.from_id) && !related.has(cr.relation.to_id)
    drawLink(cr, linkLayer, state.nodeMap, { opacity: dim ? 0.06 : 0.6 })
  })

  // Layer 3: 节点（容器节点跳过小圆渲染，只画图标和标签）
  const nodeLayer = el('g', { class: 'tg-nodes' }, svg)
  const nodeLabelLayer = el('g', { class: 'tg-node-labels' }, svg)
  nodes.forEach(cn => {
    if (cn.isContainer) {
      // 容器节点：不画图标和名称（由包含圈标签层渲染名称，无图标）
      // 只有叶子节点才在圆心显示类型图标
    } else {
      renderNode(cn, nodeLayer, nodeLabelLayer, isNodeDim(cn), nodeLabels)
    }
  })
}