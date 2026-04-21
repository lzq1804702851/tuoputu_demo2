import type {
  RenderState, ComputedGroup, ComputedDevice, ComputedLink,
  LinkTypeConfig, LegendConfig,
} from './types'

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

/* ========== 画线 ========== */
function drawLink(
  sp: { x: number; y: number; r: number },
  tp: { x: number; y: number; r: number },
  cfg: LinkTypeConfig,
  layer: Element,
  extra: { opacity?: number; curve?: number; dim?: boolean } = {},
) {
  const dx = tp.x - sp.x, dy = tp.y - sp.y
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const x1 = sp.x + dx / len * (sp.r + 2), y1 = sp.y + dy / len * (sp.r + 2)
  const x2 = tp.x - dx / len * (tp.r + 2), y2 = tp.y - dy / len * (tp.r + 2)
  const op = extra.opacity ?? 1
  if (extra.curve) {
    const cpx = (x1 + x2) / 2 - dy * extra.curve, cpy = (y1 + y2) / 2 + dx * extra.curve
    el('path', { d: `M${x1},${y1} Q${cpx},${cpy} ${x2},${y2}`, fill: 'none', stroke: cfg.color, 'stroke-width': cfg.width, 'stroke-dasharray': cfg.dash || undefined, opacity: op }, layer)
  } else {
    el('line', { x1, y1, x2, y2, stroke: cfg.color, 'stroke-width': cfg.width, 'stroke-dasharray': cfg.dash || undefined, opacity: op }, layer)
  }
}

/* ========== 离线关联节点计算 ========== */
function buildFaultRelated(state: RenderState): Set<string> {
  const s = new Set<string>()
  state.deviceMap.forEach((d, id) => { if (d.status === 'offline') s.add(id) })
  state.links.forEach(lk => {
    if (s.has(lk.source) || state.deviceMap.get(lk.source)?.status === 'offline') s.add(lk.target)
    if (s.has(lk.target) || state.deviceMap.get(lk.target)?.status === 'offline') s.add(lk.source)
  })
  return s
}

/* ========== 主渲染 ========== */
export function render(svg: SVGSVGElement, state: RenderState, vb: { x: number; y: number; w: number; h: number }) {
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`)

  const defs = el('defs', {}, svg) as unknown as SVGDefsElement
  const pat = el('pattern', { id: 'tg-grid', width: 40, height: 40, patternUnits: 'userSpaceOnUse' }, defs)
  el('path', { d: 'M 40 0 L 0 0 0 40', fill: 'none', stroke: '#1e293b', 'stroke-width': 0.5 }, pat)

  el('rect', { width: 20000, height: 20000, x: -10000, y: -10000, fill: '#0f172a' }, svg)
  el('rect', { width: 20000, height: 20000, x: -10000, y: -10000, fill: 'url(#tg-grid)' }, svg)

  const linkLayer = el('g', {}, svg)
  const circleLayer = el('g', {}, svg)
  const nodeLayer = el('g', {}, svg)
  const labelLayer = el('g', {}, svg)

  const { groups, links, faultMode, faultRelated, linkTypes: ltCfg, faultRelated: fr } = state
  const related = faultMode ? fr : new Set<string>()

  function hasOff(s: string, t: string) {
    return state.deviceMap.get(s)?.status === 'offline' || state.deviceMap.get(t)?.status === 'offline'
  }
  function gOff(g: ComputedGroup) {
    return g.subs.some(s => s.devices.some(d => d.status === 'offline')) || g.devices.some(d => d.status === 'offline')
  }

  // 1) 连线
  links.forEach((lk, i) => {
    const sp = state.deviceMap.get(lk.source), tp = state.deviceMap.get(lk.target)
    if (!sp || !tp) return
    const cfg = ltCfg[lk.type] || ltCfg['internal'] || { color: '#475569', width: 1, dash: '4 2' }
    const dim = faultMode && !hasOff(lk.source, lk.target)
    const isExternal = lk.level === 'external'
    drawLink(sp, tp, cfg, linkLayer, {
      opacity: dim ? 0.06 : (isExternal ? 0.5 : 1),
      curve: isExternal ? 0.06 + (i % 5) * 0.02 : undefined,
    })
  })

  // 2) 分组圆
  groups.forEach(g => {
    const dim = faultMode && !gOff(g)
    el('circle', { cx: g.x, cy: g.y, r: g.r, fill: 'transparent', stroke: g.color, 'stroke-width': 1.5, 'stroke-dasharray': '6 3', opacity: dim ? 0.05 : 0.5, 'data-gid': g.id, cursor: 'grab' }, circleLayer)
    txt(g.name, { x: g.x, y: g.y - g.r + 14, 'text-anchor': 'middle', fill: g.color, 'font-size': g.r > 80 ? 10 : 9, 'font-weight': 'bold', opacity: dim ? 0.05 : 0.8, 'data-gid': g.id, cursor: 'grab' }, labelLayer)
  })

  // 3) 子站圆
  groups.forEach(g => g.subs.forEach(sub => {
    const dim = faultMode && !sub.devices.some(d => d.status === 'offline')
    el('circle', { cx: sub.x, cy: sub.y, r: sub.r, fill: 'transparent', stroke: g.color, 'stroke-width': 1, 'stroke-dasharray': '4 2', opacity: dim ? 0.04 : 0.35, 'data-sid': sub.id, cursor: 'grab' }, circleLayer)
    txt(sub.name, { x: sub.x, y: sub.y - sub.r + 12, 'text-anchor': 'middle', fill: g.color, 'font-size': 8, opacity: dim ? 0.04 : 0.6, 'data-sid': sub.id, cursor: 'grab' }, labelLayer)
  }))

  // 4) 设备节点
  const allDevs: ComputedDevice[] = []
  groups.forEach(g => {
    g.subs.forEach(s => s.devices.forEach(d => allDevs.push(d)))
    g.devices.forEach(d => allDevs.push(d))
  })

  allDevs.forEach(d => {
    const off = d.status === 'offline'
    const rel = related.has(d.id)
    const dim = faultMode && !rel
    const op = dim ? 0.06 : 1
    if (off) {
      const gc = el('circle', { cx: d.x, cy: d.y, r: d.r + 4, fill: '#ef444415', stroke: '#ef4444', 'stroke-width': 1.5 }, nodeLayer)
      el('animate', { attributeName: 'opacity', values: '0.3;0.9;0.3', dur: '1.2s', repeatCount: 'indefinite' }, gc)
      el('animate', { attributeName: 'r', values: `${d.r + 2};${d.r + 10};${d.r + 2}`, dur: '1.2s', repeatCount: 'indefinite' }, gc)
      el('circle', { cx: d.x, cy: d.y, r: d.r, fill: '#ef444425', stroke: '#ef4444', 'stroke-width': 1.5, 'data-nid': d.id, cursor: 'grab' }, nodeLayer)
    } else {
      el('circle', { cx: d.x, cy: d.y, r: d.r, fill: 'transparent', stroke: '#22c55e', 'stroke-width': 1, opacity: op, 'data-nid': d.id, cursor: 'grab' }, nodeLayer)
    }
    txt(d.icon, { x: d.x, y: d.y - 2, 'text-anchor': 'middle', 'font-size': d.r > 14 ? 11 : 9, opacity: op, 'data-nid': d.id, cursor: 'grab' }, nodeLayer)
    txt(d.name, { x: d.x, y: d.y + (d.r > 14 ? 11 : 9), 'text-anchor': 'middle', fill: off ? '#fca5a5' : '#64748b', 'font-size': d.r > 14 ? 7 : 6, opacity: op, 'data-nid': d.id, cursor: 'grab' }, nodeLayer)
  })
}
