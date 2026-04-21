<template>
  <div ref="container" class="tg-wrap">
    <svg ref="svgEl" class="tg-svg"></svg>

    <!-- 工具栏 -->
    <div v-if="showToolbar" class="tg-toolbar">
      <span class="tg-toolbar-title">拓扑图</span>
      <span class="tg-toolbar-hint">拖拽节点 · 滚轮缩放 · 空白平移</span>
      <span class="tg-toolbar-info">{{ stats }}</span>
      <input class="tg-search-input" v-model="searchQuery"
             placeholder="搜索区域/站点/船名"
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
      <template v-if="filteredDeviceTypes.length">
        <h4>{{ mergedLegend.sectionTitles?.devices ?? '设备类型' }}</h4>
        <div v-for="key in filteredDeviceTypes" :key="key" class="tg-legend-row">
          <span class="tg-legend-icon">{{ finalDeviceTypes[key]?.icon }}</span>
          <span>{{ finalDeviceTypes[key]?.name ?? key }}</span>
        </div>
        <div class="tg-legend-sep"></div>
      </template>
      <template v-if="filteredLinkTypes.length">
        <h4>{{ mergedLegend.sectionTitles?.links ?? '链路类型' }}</h4>
        <div v-for="key in filteredLinkTypes" :key="key" class="tg-legend-row">
          <svg width="32" height="6"><line x1="0" y1="3" x2="32" y2="3" :stroke="finalLinkTypes[key]?.color" :stroke-width="finalLinkTypes[key]?.width" :stroke-dasharray="finalLinkTypes[key]?.dash" /></svg>
          <span>{{ finalLinkTypes[key]?.name ?? key }}</span>
        </div>
        <div class="tg-legend-sep"></div>
      </template>
      <template v-if="mergedLegend.showStatus !== false">
        <h4>{{ mergedLegend.sectionTitles?.status ?? '设备状态' }}</h4>
        <div class="tg-legend-row">
          <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="transparent" stroke="#22c55e" stroke-width="1" /></svg>
          <span>在线</span>
        </div>
        <div class="tg-legend-row">
          <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#ef444425" stroke="#ef4444" stroke-width="1.5"><animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" /></circle></svg>
          <span style="color:#fca5a5">离线</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import type { TopologyGraphProps, ComputedGroup, ComputedDevice, RenderState } from './types'
import { defaultDeviceTypes, defaultLinkTypes, defaultGroupTypes } from './defaults'
import { runForceLayout } from './force'
import { render } from './render'

const props = withDefaults(defineProps<TopologyGraphProps>(), {
  showToolbar: true,
  legend: () => ({}),
})

const emit = defineEmits<{
  (e: 'node-click', device: ComputedDevice): void
}>()

const svgEl = ref<SVGSVGElement>()
const container = ref<HTMLDivElement>()

const filterMode = ref<'offline' | 'online' | 'search' | null>(null)
const searchQuery = ref('')

function onSearch() {
  if (!searchQuery.value.trim()) {
    filterMode.value = null
  } else {
    filterMode.value = 'search'
  }
  doRender()
}

watch(searchQuery, (v) => {
  if (!v && filterMode.value === 'search') {
    filterMode.value = null
    doRender()
  }
})

function toggleFilter(mode: 'offline' | 'online') {
  searchQuery.value = ''
  filterMode.value = filterMode.value === mode ? null : mode
  doRender()
}

/* ========== 合并配置 ========== */
const finalDeviceTypes = computed(() => ({ ...defaultDeviceTypes, ...props.deviceTypes }))
const finalLinkTypes = computed(() => ({ ...defaultLinkTypes, ...props.linkTypes }))
const finalGroupTypes = computed(() => ({ ...defaultGroupTypes, ...props.groupTypes }))
const mergedLegend = computed(() => props.legend ?? {})

const groupColors = computed(() => {
  const m: Record<string, string> = {}
  for (const [k, v] of Object.entries(finalGroupTypes.value)) m[k] = v.color
  return m
})
const deviceIcons = computed(() => {
  const m: Record<string, string> = {}
  for (const [k, v] of Object.entries(finalDeviceTypes.value)) m[k] = v.icon
  return m
})

/* ========== 图例过滤 ========== */
const filteredDeviceTypes = computed(() => {
  const all = Object.keys(finalDeviceTypes.value)
  return mergedLegend.value.deviceTypes ?? all
})
const filteredLinkTypes = computed(() => {
  const all = Object.keys(finalLinkTypes.value)
  return mergedLegend.value.linkTypes ?? all
})

/* ========== 布局计算 ========== */
let layoutGroups: ComputedGroup[] = []
let layoutLinks: RenderState['links'] = []
let deviceMap = new Map<string, ComputedDevice>()
let groupLookup = new Map<string, { group: ComputedGroup; subs: ComputedGroup['subs'] }>()

function computeLayout() {
  if (!container.value) return
  const w = container.value.clientWidth || 1200
  const h = container.value.clientHeight || 800
  // 用更大虚拟画布排布，防止节点溢出
  const vw = w * 1.8, vh = h * 1.8
  const result = runForceLayout(
    props.data, groupColors.value, {}, deviceIcons.value, vw, vh,
  )
  layoutGroups = result.groups
  layoutLinks = result.links

  deviceMap.clear()
  groupLookup.clear()
  layoutGroups.forEach(g => {
    groupLookup.set(g.id, { group: g, subs: g.subs })
    g.subs.forEach(s => s.devices.forEach(d => deviceMap.set(d.id, d)))
    g.devices.forEach(d => deviceMap.set(d.id, d))
  })
  updateStats()

  // 自动适配 viewBox 包含所有节点
  if (layoutGroups.length === 0) return
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  layoutGroups.forEach(g => {
    const pad = g.r + 20
    if (g.x - pad < minX) minX = g.x - pad
    if (g.y - pad < minY) minY = g.y - pad
    if (g.x + pad > maxX) maxX = g.x + pad
    if (g.y + pad > maxY) maxY = g.y + pad
  })
  vb.x = minX
  vb.y = minY
  vb.w = maxX - minX
  vb.h = maxY - minY
}

/* ========== 筛选关联 ========== */
const faultRelated = computed(() => {
  if (!filterMode.value) return new Set<string>()
  const s = new Set<string>()

  if (filterMode.value === 'search') {
    const q = searchQuery.value.trim().toLowerCase()
    const matched = new Set<string>()
    layoutGroups.forEach(g => {
      const gMatch = g.name.toLowerCase().includes(q)
      g.subs.forEach(sub => {
        const subMatch = sub.name.toLowerCase().includes(q)
        if (gMatch || subMatch) {
          sub.devices.forEach(d => { matched.add(d.id); s.add(d.id) })
        }
      })
      if (gMatch) {
        g.devices.forEach(d => { matched.add(d.id); s.add(d.id) })
      }
    })
    // 只扩展一跳：仅用 matched 集合查找，不链式扩散
    layoutLinks.forEach(lk => {
      if (matched.has(lk.source)) s.add(lk.target)
      if (matched.has(lk.target)) s.add(lk.source)
    })
  } else {
    const targetStatus = filterMode.value
    deviceMap.forEach((d, id) => { if (d.status === targetStatus) s.add(id) })
    layoutLinks.forEach(lk => {
      if (s.has(lk.source) || deviceMap.get(lk.source)?.status === targetStatus) s.add(lk.target)
      if (s.has(lk.target) || deviceMap.get(lk.target)?.status === targetStatus) s.add(lk.source)
    })
  }
  return s
})

/* ========== 统计 ========== */
const stats = ref('')
function updateStats() {
  let total = 0, off = 0
  deviceMap.forEach(d => { total++; if (d.status === 'offline') off++ })
  stats.value = `${total}个设备 · ${off}个离线`
}

/* ========== viewBox ========== */
const vb = { x: 0, y: 0, w: 1200, h: 800 }

/* ========== 渲染 ========== */
function doRender() {
  if (!svgEl.value || layoutGroups.length === 0) return
  render(svgEl.value, {
    groups: layoutGroups,
    links: layoutLinks,
    deviceMap,
    faultMode: !!filterMode.value,
    faultRelated: faultRelated.value,
    deviceTypes: finalDeviceTypes.value,
    linkTypes: finalLinkTypes.value,
    groupTypes: finalGroupTypes.value,
    legend: mergedLegend.value,
  }, vb)
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
  const gid = t.getAttribute('data-gid')
  const sid = t.getAttribute('data-sid')

  let title = '', color = '#38bdf8', items: { label: string; value: string }[] = []

  if (gid && groupLookup.has(gid)) {
    const { group: g } = groupLookup.get(gid)!
    title = g.name
    color = g.color
    const allDevs = [...g.subs.flatMap(s => s.devices), ...g.devices]
    const online = allDevs.filter(d => d.status !== 'offline').length
    const offline = allDevs.length - online
    const groupTypeNames: Record<string, string> = { island: '岛屿', ship: '船舶', 'route-station': '路由站', aircraft: '飞行器', buoy: '浮标', satellite: '卫星', vehicle: '车辆', station: '站点' }
    items = [
      { label: '类型', value: groupTypeNames[g.type] ?? g.type },
    ]
    if (g.subs.length > 0) items.push({ label: '子站', value: `${g.subs.length} 个` })
    items.push(
      { label: '设备', value: `${allDevs.length} 个` },
      { label: '在线', value: `${online} 个` },
      { label: '离线', value: `${offline} 个` },
    )
  } else if (sid) {
    for (const g of layoutGroups) {
      const sub = g.subs.find(s => s.id === sid)
      if (sub) {
        title = sub.name
        color = g.color
        const online = sub.devices.filter(d => d.status !== 'offline').length
        const offline = sub.devices.length - online
        items = [
          { label: '所属', value: g.name },
          { label: '设备', value: `${sub.devices.length} 个` },
          { label: '在线', value: `${online} 个` },
          { label: '离线', value: `${offline} 个` },
        ]
        break
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
  if (left + 180 > cr.width) left = e.clientX - cr.left - 190
  if (top + 140 > cr.height) top = e.clientY - cr.top - 140
  tooltip.style = { left: `${left}px`, top: `${top}px` }
  tooltip.visible = true
}

function onTooltipHide() {
  tooltip.visible = false
}

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
  const sid = t.getAttribute('data-sid')
  const gid = t.getAttribute('data-gid')

  if (nid && deviceMap.has(nid)) {
    const d = deviceMap.get(nid)!
    drag = { type: 'node', id: nid, sx: d.x, sy: d.y, mx: e.clientX, my: e.clientY }
    e.preventDefault()
  } else if (sid) {
    let sub: any = null, group: ComputedGroup | null = null
    for (const g of layoutGroups) {
      const found = g.subs.find(s => s.id === sid)
      if (found) { sub = found; group = g; break }
    }
    if (sub && group) {
      const ns = sub.devices.map((d: ComputedDevice) => ({ id: d.id, x: d.x, y: d.y }))
      drag = { type: 'sub', sub, group, sx: sub.x, sy: sub.y, ns, mx: e.clientX, my: e.clientY }
      e.preventDefault()
    }
  } else if (gid && groupLookup.has(gid)) {
    const { group, subs } = groupLookup.get(gid)!
    const allNodes: { id: string; x: number; y: number }[] = []
    subs.forEach(s => s.devices.forEach(d => allNodes.push({ id: d.id, x: d.x, y: d.y })))
    group.devices.forEach(d => allNodes.push({ id: d.id, x: d.x, y: d.y }))
    const allSubs = subs.map(s => ({ sub: s, sx: s.x, sy: s.y }))
    drag = { type: 'group', group, allSubs, allNodes, sx: group.x, sy: group.y, mx: e.clientX, my: e.clientY }
    e.preventDefault()
  } else {
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
    const d = deviceMap.get(drag.id)!
    let nx = drag.sx + ddx, ny = drag.sy + ddy
    // 约束：在所属 sub 或 group 内
    const grp = layoutGroups.find(g => g.id === d.groupId)!
    const sub = grp.subs.find(s => s.id === d.subId)
    const cRef = sub ?? grp
    const maxD = cRef.r - d.r - 2
    const dx = nx - cRef.x, dy = ny - cRef.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > maxD && dist > 0) { nx = cRef.x + dx / dist * maxD; ny = cRef.y + dy / dist * maxD }
    d.x = nx; d.y = ny
    doRender()
  } else if (drag.type === 'sub') {
    const { sub, group } = drag
    let nx = drag.sx + ddx, ny = drag.sy + ddy
    const maxD = group.r - sub.r - 2
    const dx = nx - group.x, dy = ny - group.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > maxD && dist > 0) { nx = group.x + dx / dist * maxD; ny = group.y + dy / dist * maxD }
    const adx = nx - drag.sx, ady = ny - drag.sy
    sub.x = nx; sub.y = ny
    drag.ns.forEach((n: any) => { const d = deviceMap.get(n.id)!; d.x = n.x + adx; d.y = n.y + ady })
    doRender()
  } else if (drag.type === 'group') {
    const { group, allSubs, allNodes } = drag
    group.x = drag.sx + ddx; group.y = drag.sy + ddy
    allSubs.forEach((s: any) => { s.sub.x = s.sx + ddx; s.sub.y = s.sy + ddy })
    allNodes.forEach((n: any) => { const d = deviceMap.get(n.id)!; d.x = n.x + ddx; d.y = n.y + ddy })
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

/* ========== 图例位置样式 ========== */
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
.tg-tooltip-value { color: #e2e8f0; font-weight: 500; }
</style>
