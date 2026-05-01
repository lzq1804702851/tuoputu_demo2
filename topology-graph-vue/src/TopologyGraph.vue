<template>
  <div ref="container" class="tg-wrap">
    <svg ref="svgEl" class="tg-svg"></svg>

    <!-- 工具栏 -->
    <div v-if="showToolbar" class="tg-toolbar">
      <span class="tg-toolbar-title">拓扑图</span>
      <span class="tg-toolbar-hint">拖拽节点 · 滚轮缩放 · 空白平移</span>
      <span class="tg-toolbar-info">{{ stats }}</span>
      <input class="tg-search-input" v-model="searchQuery"
             placeholder="搜索节点名称"
             @keydown.enter="onSearch" />
      <button class="tg-fault-btn" :class="{ active: filterMode === 'offline' }" @click="toggleFilter('offline')">
        {{ filterMode === 'offline' ? '退出筛选' : '独显离线设备' }}
      </button>
      <button class="tg-online-btn" :class="{ active: filterMode === 'online' }" @click="toggleFilter('online')">
        {{ filterMode === 'online' ? '退出筛选' : '独显在线设备' }}
      </button>
    </div>

    <!-- 悬浮信息窗 -->
    <div v-if="tooltip.visible" class="tg-tooltip" :style="tooltip.style">
      <h5 :style="{ color: tooltip.color }">{{ tooltip.title }}</h5>
      <div v-for="item in tooltip.items" :key="item.label" class="tg-tooltip-row">
        <span class="tg-tooltip-label">{{ item.label }}</span>
        <span class="tg-tooltip-value">{{ item.value }}</span>
      </div>
    </div>

    <!-- 图例 -->
    <div v-if="mergedLegend.show" class="tg-legend" :style="legendPosStyle">
      <template v-if="filteredNodeTypes.length">
        <h4>{{ mergedLegend.sectionTitles?.nodes ?? '节点类型' }}</h4>
        <div v-for="key in filteredNodeTypes" :key="key" class="tg-legend-row">
          <span class="tg-legend-icon">{{ finalNodeTypes[key]?.icon }}</span>
          <span>{{ finalNodeTypes[key]?.name ?? key }}</span>
        </div>
        <div class="tg-legend-sep"></div>
      </template>
      <template v-if="filteredRelationTypes.length">
        <h4>{{ mergedLegend.sectionTitles?.relations ?? '关系类型' }}</h4>
        <div v-for="key in filteredRelationTypes" :key="key" class="tg-legend-row">
          <svg width="32" height="6"><line x1="0" y1="3" x2="32" y2="3" :stroke="finalRelationTypes[key]?.color" :stroke-width="finalRelationTypes[key]?.width" :stroke-dasharray="finalRelationTypes[key]?.dash" /></svg>
          <span>{{ finalRelationTypes[key]?.name ?? key }}</span>
        </div>
        <div class="tg-legend-sep"></div>
      </template>
      <template v-if="mergedLegend.showStatus !== false">
        <h4>{{ mergedLegend.sectionTitles?.status ?? '节点状态' }}</h4>
        <div class="tg-legend-row">
          <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="transparent" stroke="#22c55e" stroke-width="1" /></svg>
          <span>在线 (online)</span>
        </div>
        <div class="tg-legend-row">
          <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#ef444425" stroke="#ef4444" stroke-width="1.5" /></svg>
          <span style="color:#fca5a5">离线 (offline)</span>
        </div>
        <div class="tg-legend-row">
          <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="transparent" stroke="#f59e0b" stroke-width="1" /></svg>
          <span style="color:#fbbf24">告警 (warning)</span>
        </div>
        <div class="tg-legend-sep"></div>
        <h4>连线状态</h4>
        <div class="tg-legend-row">
          <svg width="32" height="6"><line x1="0" y1="3" x2="32" y2="3" stroke="#22c55e" stroke-width="1.5" /></svg>
          <span>已连接</span>
        </div>
        <div class="tg-legend-row">
          <svg width="32" height="6"><line x1="0" y1="3" x2="32" y2="3" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 5" /></svg>
          <span style="color:#fca5a5">已断开 ✕</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import type { TopologyGraphProps, ComputedNode, RenderState, ProjectionConfig } from './types'
import { defaultNodeTypes, defaultRelationTypes } from './defaults'
import { runForceLayout } from './force'
import { render } from './render'
import { getWorldFeatures, projectFeatures, type ProjectedFeature } from './map-data'
import { createProjection } from './projection'

const props = withDefaults(defineProps<TopologyGraphProps>(), {
  showToolbar: true,
  legend: () => ({}),
  mapCenterLng: 110,
  mapCenterLat: 18,
  mapZoom: 1,
})

const emit = defineEmits<{
  (e: 'node-click', node: ComputedNode): void
}>()

const svgEl = ref<SVGSVGElement>()
const container = ref<HTMLDivElement>()

const filterMode = ref<'offline' | 'online' | 'search' | null>(null)
const searchQuery = ref('')

function onSearch() {
  if (!searchQuery.value.trim()) { filterMode.value = null }
  else { filterMode.value = 'search' }
  doRender()
}

watch(searchQuery, (v) => {
  if (!v && filterMode.value === 'search') { filterMode.value = null; doRender() }
})

function toggleFilter(mode: 'offline' | 'online') {
  searchQuery.value = ''
  filterMode.value = filterMode.value === mode ? null : mode
  doRender()
}

/* ========== 合并配置 ========== */
const finalNodeTypes = computed(() => ({ ...defaultNodeTypes, ...props.nodeTypes }))
const finalRelationTypes = computed(() => ({ ...defaultRelationTypes, ...props.relationTypes }))
const mergedLegend = computed(() => props.legend ?? {})

/* ========== 图例过滤 ========== */
const filteredNodeTypes = computed(() => {
  const all = Object.keys(finalNodeTypes.value)
  return mergedLegend.value.nodeTypes ?? all
})
const filteredRelationTypes = computed(() => {
  const all = Object.keys(finalRelationTypes.value)
  return mergedLegend.value.relationTypes ?? all
})

/* ========== 布局状态 ========== */
  let layoutNodes: ComputedNode[] = []
  let layoutRelations: RenderState['relations'] = []
  let layoutContainmentTree: RenderState['containmentTree'] = []
  let nodeMap = new Map<string, ComputedNode>()
  let projectedFeatures: ProjectedFeature[] = []

  /** 子节点 → 父节点 UUID 映射（用于拖拽约束） */
  let parentMap = new Map<string, string>() // childUuid -> parentUuid

  /** 父节点 → 子节点 UUID 列表（用于拖拽容器时移动所有子节点） */
  let childrenMap = new Map<string, string[]>() // parentUuid -> [childUuid, ...]

  /** 递归收集所有后代节点 UUID */
  function getAllDescendants(uuid: string): string[] {
    const result: string[] = []
    const kids = childrenMap.get(uuid)
    if (kids) {
      for (const kid of kids) {
        result.push(kid)
        result.push(...getAllDescendants(kid))
      }
    }
    return result
  }

/* ========== viewBox ========== */
const vb = { x: 0, y: 0, w: 1200, h: 800 }

/* ========== 布局计算 ========== */
function computeLayout() {
  if (!container.value) return
  const w = container.value.clientWidth || 1200
  const h = (container.value.clientHeight || 800) - (props.showToolbar ? 48 : 0)

  const projConfig: ProjectionConfig = {
    centerLng: props.mapCenterLng ?? 110,
    centerLat: props.mapCenterLat ?? 18,
    zoom: props.mapZoom ?? 1,
    width: w * 1.5,
    height: h * 1.5,
  }

  const project = createProjection(props.data.nodes, projConfig)

  // 投影全球地图数据
  projectedFeatures = projectFeatures(
    getWorldFeatures(),
    project,
  )

  // 力布局计算
  const result = runForceLayout(
    props.data,
    finalNodeTypes.value,
    finalRelationTypes.value,
    projConfig,
  )

  layoutNodes = result.nodes
  layoutRelations = result.relations
  layoutContainmentTree = result.containmentTree

  nodeMap.clear()
  layoutNodes.forEach(cn => nodeMap.set(cn.node.uuid, cn))

  // 构建父子关系映射（从包含树递归提取）
  parentMap.clear()
  childrenMap.clear()
  function buildParentChildMap(tree: RenderState['containmentTree'], parentId?: string) {
    for (const cn of tree) {
      if (parentId) {
        parentMap.set(cn.node.uuid, parentId)
        const kids = childrenMap.get(parentId) || []
        kids.push(cn.node.uuid)
        childrenMap.set(parentId, kids)
      }
      if (cn.children.length > 0) {
        buildParentChildMap(cn.children, cn.node.uuid)
      }
    }
  }
  buildParentChildMap(layoutContainmentTree)

  updateStats()

  // 自动适配 viewBox（紧凑包裹所有节点，尽可能放大显示）
  if (layoutNodes.length === 0) return
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  layoutNodes.forEach(cn => {
    // 对于容器节点，使用 containerR；否则使用普通半径 + 标签空间
    const pad = cn.isContainer ? (cn.containerR || cn.r) + 25 : cn.r + 20
    if (cn.x - pad < minX) minX = cn.x - pad
    if (cn.y - pad < minY) minY = cn.y - pad
    if (cn.x + pad > maxX) maxX = cn.x + pad
    if (cn.y + pad > maxY) maxY = cn.y + pad
  })
  // 紧凑 viewBox：仅包裹所有节点 + 少量 padding
  const pad = 40
  vb.x = minX - pad
  vb.y = minY - pad
  vb.w = (maxX - minX) + pad * 2
  vb.h = (maxY - minY) + pad * 2
}

/* ========== 筛选关联 ========== */
const filterRelated = computed(() => {
  if (!filterMode.value) return new Set<string>()
  const s = new Set<string>()

  if (filterMode.value === 'search') {
    const q = searchQuery.value.trim().toLowerCase()
    const matched = new Set<string>()
    layoutNodes.forEach(cn => {
      if (cn.node.name.toLowerCase().includes(q)) matched.add(cn.node.uuid)
    })
    matched.forEach(id => s.add(id))
    layoutRelations.forEach(cr => {
      if (matched.has(cr.relation.from_id)) s.add(cr.relation.to_id)
      if (matched.has(cr.relation.to_id)) s.add(cr.relation.from_id)
    })
  } else {
    const targetStatus = filterMode.value
    layoutNodes.forEach(cn => {
      if (cn.node.status === targetStatus) s.add(cn.node.uuid)
    })
    layoutRelations.forEach(cr => {
      if (s.has(cr.relation.from_id)) s.add(cr.relation.to_id)
      if (s.has(cr.relation.to_id)) s.add(cr.relation.from_id)
    })
  }
  return s
})

/* ========== 统计 ========== */
const stats = ref('')
function updateStats() {
  let total = layoutNodes.length
  let off = layoutNodes.filter(cn => cn.node.status === 'offline').length
  stats.value = `${total}个节点 · ${off}个离线`
}

/* ========== 渲染 ========== */

/** 递归更新包含树中节点的位置（拖拽后同步） */
function updateContainmentTreePos(tree: RenderState['containmentTree']) {
  for (const cn of tree) {
    const node = nodeMap.get(cn.node.uuid)
    if (node) { cn.x = node.x; cn.y = node.y }
    if (cn.children.length > 0) updateContainmentTreePos(cn.children)
  }
}

function doRender() {
  if (!svgEl.value || layoutNodes.length === 0) return

  // 刷新连线坐标（拖拽后节点位置变了，连线要跟着动）
  layoutRelations.forEach(cr => {
    const from = nodeMap.get(cr.relation.from_id)
    const to = nodeMap.get(cr.relation.to_id)
    if (from) { cr.fromX = from.x; cr.fromY = from.y; cr.fromR = from.isContainer ? (from.containerR || from.r) : from.r }
    if (to) { cr.toX = to.x; cr.toY = to.y; cr.toR = to.isContainer ? (to.containerR || to.r) : to.r }
  })

  // 刷新包含圈坐标
  updateContainmentTreePos(layoutContainmentTree)

  const state: RenderState = {
    nodes: layoutNodes,
    relations: layoutRelations,
    containmentTree: layoutContainmentTree,
    nodeMap,
    filterMode: filterMode.value,
    filterRelated: filterRelated.value,
    nodeTypes: finalNodeTypes.value,
    relationTypes: finalRelationTypes.value,
    legend: mergedLegend.value,
  }
  render(svgEl.value, state, vb, projectedFeatures, props.nodeLabels)
}

/* ========== 悬浮信息窗 ========== */
const tooltip = reactive({
  visible: false,
  title: '',
  color: '#38bdf8',
  items: [] as { label: string; value: string }[],
  style: {} as Record<string, string>,
})

function onTooltipShow(e: MouseEvent) {
  const t = e.target as Element
  const nid = t.getAttribute('data-nid')
  const rid = t.getAttribute('data-rid')
  const cid = t.getAttribute('data-cid')

  let title = '', color = '#38bdf8', items: { label: string; value: string }[] = []

  if (nid && nodeMap.has(nid)) {
    const cn = nodeMap.get(nid)!
    const node = cn.node

    // 如果用户提供了自定义 formatter
    if (props.tooltipFormatter) {
      const result = props.tooltipFormatter({ type: 'node', data: node, computed: cn })
      if (result) {
        title = result.title
        color = result.color ?? '#38bdf8'
        items = result.items
      }
    } else {
      // 默认展示
      title = node.name
      color = cn.color
      items = [
        { label: '类型', value: finalNodeTypes.value[node.type_id]?.name ?? node.type_id },
        { label: '状态', value: node.status },
        { label: '经度', value: node.lng.toFixed(4) },
        { label: '纬度', value: node.lat.toFixed(4) },
      ]
      // 展示所有 extra 属性
      if (node.extra) {
        for (const [k, v] of Object.entries(node.extra)) {
          items.push({ label: k, value: String(v) })
        }
      }
    }
  } else if (rid) {
    // 关系 tooltip
    const cr = layoutRelations.find(r => r.relation.uuid === rid)
    if (cr) {
      const rel = cr.relation
      if (props.tooltipFormatter) {
        const result = props.tooltipFormatter({ type: 'relation', data: rel })
        if (result) {
          title = result.title
          color = result.color ?? '#38bdf8'
          items = result.items
        }
      } else {
        title = rel.name || '关系'
        color = cr.config.color
        items = [
          { label: '类型', value: cr.config.name },
          { label: '状态', value: rel.status },
          { label: '源', value: rel.from_id },
          { label: '目标', value: rel.to_id },
        ]
        if (rel.extra) {
          for (const [k, v] of Object.entries(rel.extra)) {
            items.push({ label: k, value: String(v) })
          }
        }
      }
    }
  } else if (cid) {
    // 包含圈 tooltip
    const cn = nodeMap.get(cid)
    if (cn) {
      title = cn.node.name
      color = cn.color
      items = [
        { label: '类型', value: finalNodeTypes.value[cn.node.type_id]?.name ?? cn.node.type_id },
        { label: '状态', value: cn.node.status },
      ]
      if (cn.node.extra) {
        for (const [k, v] of Object.entries(cn.node.extra)) {
          items.push({ label: k, value: String(v) })
        }
      }
    }
  } else {
    return
  }

  tooltip.title = title
  tooltip.color = color
  tooltip.items = items

  if (!container.value) return
  const cr = container.value.getBoundingClientRect()
  let left = e.clientX - cr.left + 14
  let top = e.clientY - cr.top + 14
  if (left + 200 > cr.width) left = e.clientX - cr.left - 210
  if (top + 160 > cr.height) top = e.clientY - cr.top - 160
  tooltip.style = { left: `${left}px`, top: `${top}px` }
  tooltip.visible = true
}

function onTooltipHide() { tooltip.visible = false }

/* ========== 交互 ========== */
let drag: any = null

function screenToSvg(sx: number, sy: number) {
  if (!svgEl.value) return { x: 0, y: 0 }
  const rect = svgEl.value.getBoundingClientRect()
  return { x: (sx - rect.left) * vb.w / rect.width + vb.x, y: (sy - rect.top) * vb.h / rect.height + vb.y }
}

function onDown(e: MouseEvent) {
  const t = e.target as Element
  const nid = t.getAttribute('data-nid')
  const cid = t.getAttribute('data-cid')

  // 叶子节点：通过 data-nid 拖动（点圆圈/图标）
  if (nid && nodeMap.has(nid)) {
    const cn = nodeMap.get(nid)!
    drag = { type: 'node', id: nid, sx: cn.x, sy: cn.y, mx: e.clientX, my: e.clientY }
    e.preventDefault()
  }
  // 容器节点：通过 data-cid 拖动（点名称标签）
  else if (cid && nodeMap.has(cid)) {
    const cn = nodeMap.get(cid)!
    drag = { type: 'node', id: cid, sx: cn.x, sy: cn.y, mx: e.clientX, my: e.clientY }
    e.preventDefault()
  }
  else {
    drag = { type: 'pan', mx: e.clientX, my: e.clientY }
  }
  ;(svgEl.value as SVGElement).style.cursor = 'grabbing'
}

function onMove(e: MouseEvent) {
  if (!drag) return
  e.preventDefault()
  if (drag.type === 'pan') {
    if (!svgEl.value) return
    const rect = svgEl.value.getBoundingClientRect(), s = vb.w / rect.width
    vb.x -= (e.clientX - drag.mx) * s; vb.y -= (e.clientY - drag.my) * s
    drag.mx = e.clientX; drag.my = e.clientY
    svgEl.value.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`)
    return
  }
  const cur = screenToSvg(e.clientX, e.clientY)
  const start = screenToSvg(drag.mx, drag.my)
  const ddx = cur.x - start.x, ddy = cur.y - start.y

  if (drag.type === 'node') {
    const cn = nodeMap.get(drag.id)!
    let newX = drag.sx + ddx
    let newY = drag.sy + ddy

    // 如果拖动的是容器节点，移动所有后代节点（使用增量，不是总量）
    if (cn.isContainer) {
      const lastX = drag.lastX ?? drag.sx
      const lastY = drag.lastY ?? drag.sy
      const frameDx = newX - lastX
      const frameDy = newY - lastY
      const descendants = getAllDescendants(drag.id)
      for (const did of descendants) {
        const child = nodeMap.get(did)
        if (child) {
          child.x += frameDx
          child.y += frameDy
        }
      }
      cn.x = newX
      cn.y = newY
      drag.lastX = newX
      drag.lastY = newY
    } else {
      // 非容器节点：约束在父节点的包含圈内
      const parentId = parentMap.get(drag.id)
      if (parentId) {
        const parent = nodeMap.get(parentId)
        if (parent && parent.containerR) {
          // 计算子节点到父节点中心的距离，约束不超过 containerR - childR
          const maxDist = parent.containerR - cn.r - 2
          const dx = newX - parent.x
          const dy = newY - parent.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > maxDist && maxDist > 0) {
            newX = parent.x + dx / dist * maxDist
            newY = parent.y + dy / dist * maxDist
          }
        }
      }
      cn.x = newX
      cn.y = newY
    }

    doRender()
  }
}

function onUp() {
  drag = null
  if (svgEl.value) svgEl.value.style.cursor = ''
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  if (!svgEl.value) return
  const rect = svgEl.value.getBoundingClientRect()
  const mx = (e.clientX - rect.left) / rect.width, my = (e.clientY - rect.top) / rect.height
  const f = e.deltaY > 0 ? 1.1 : 0.9
  const nw = vb.w * f, nh = vb.h * f
  vb.x += (vb.w - nw) * mx; vb.y += (vb.h - nh) * my
  vb.w = nw; vb.h = nh
  svgEl.value.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`)
}

/* ========== 图例位置 ========== */
const legendPosStyle = computed(() => {
  const pos = mergedLegend.value.position ?? 'left-bottom'
  const style: Record<string, string> = {}
  if (pos.includes('left')) style.left = '16px'; else style.right = '16px'
  if (pos.includes('top')) style.top = '60px'; else style.bottom = '16px'
  const s = mergedLegend.value.style ?? {}
  if (s.background) style.background = s.background
  if (s.borderColor) style.borderColor = s.borderColor
  if (s.borderRadius) style.borderRadius = s.borderRadius + 'px'
  return style
})

/* ========== 生命周期 ========== */
onMounted(async () => {
  await nextTick()
  if (container.value && svgEl.value) {
    vb.w = container.value.clientWidth || 1200
    vb.h = (container.value.clientHeight || 800) - (props.showToolbar ? 48 : 0)
    svgEl.value.addEventListener('mousedown', onDown)
    svgEl.value.addEventListener('wheel', onWheel, { passive: false })
    svgEl.value.addEventListener('mouseover', onTooltipShow)
    svgEl.value.addEventListener('mouseout', onTooltipHide)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    computeLayout()
    doRender()
  }
})

watch(() => props.data, () => { computeLayout(); doRender() }, { deep: true })
</script>

<style>
.tg-wrap { position: relative; width: 100%; height: 100%; background: #0f172a; font-family: "Microsoft YaHei", sans-serif; overflow: hidden; }
.tg-svg { display: block; width: 100%; height: 100%; }
.tg-toolbar {
  position: absolute; top: 0; left: 0; right: 0; height: 48px;
  background: #16213e; display: flex; align-items: center;
  padding: 0 20px; gap: 16px; border-bottom: 1px solid #1e3a5f; z-index: 10;
}
.tg-toolbar-title { color: #38bdf8; font-size: 16px; font-weight: 600; }
.tg-toolbar-hint { color: #64748b; font-size: 13px; }
.tg-toolbar-info { margin-left: auto; color: #475569; font-size: 12px; }
.tg-fault-btn {
  background: #991b1b33; border: 1px solid #ef4444; color: #fca5a5;
  padding: 4px 14px; border-radius: 6px; cursor: pointer; font-size: 13px;
  font-family: "Microsoft YaHei", sans-serif; transition: all 0.2s;
}
.tg-fault-btn:hover { background: #991b1b66; }
.tg-fault-btn.active { background: #ef4444; color: #fff; border-color: #ef4444; }
.tg-online-btn {
  background: #14532d33; border: 1px solid #22c55e; color: #86efac;
  padding: 4px 14px; border-radius: 6px; cursor: pointer; font-size: 13px;
  font-family: "Microsoft YaHei", sans-serif; transition: all 0.2s;
}
.tg-online-btn:hover { background: #14532d66; }
.tg-online-btn.active { background: #22c55e; color: #fff; border-color: #22c55e; }
.tg-legend {
  position: absolute; z-index: 10; padding: 12px 14px;
  background: #0f172aee; border: 1px solid #1e3a5f; border-radius: 8px;
  font-size: 12px; color: #cbd5e1; pointer-events: none; user-select: none;
}
.tg-legend h4 { color: #94a3b8; font-size: 11px; margin-bottom: 6px; }
.tg-legend-row { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
.tg-legend-row svg { flex-shrink: 0; }
.tg-legend-sep { border-top: 1px solid #1e293b; margin: 8px 0; }
.tg-legend-icon { font-size: 14px; width: 20px; text-align: center; }
.tg-search-input {
  background: #0f172a; border: 1px solid #1e3a5f; color: #cbd5e1;
  padding: 4px 12px; border-radius: 6px; font-size: 13px; width: 160px;
  font-family: "Microsoft YaHei", sans-serif; outline: none; transition: border-color 0.2s;
}
.tg-search-input::placeholder { color: #475569; }
.tg-search-input:focus { border-color: #38bdf8; }
.tg-tooltip {
  position: absolute; z-index: 20; padding: 10px 14px; min-width: 140px;
  background: #0f172af0; border: 1px solid #1e3a5f; border-radius: 8px;
  pointer-events: none; user-select: none; backdrop-filter: blur(6px);
}
.tg-tooltip h5 { font-size: 13px; margin: 0 0 8px 0; font-weight: 600; }
.tg-tooltip-row { display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8; margin: 3px 0; }
.tg-tooltip-label { color: #64748b; }
.tg-tooltip-value { color: #e2e8f0; font-weight: 500; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>