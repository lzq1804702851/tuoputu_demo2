import {
  forceSimulation, forceLink, forceManyBody, forceCenter,
  forceCollide, type SimulationNodeDatum, type SimulationLinkDatum,
} from 'd3-force'
import type { TopologyData, ComputedGroup, ComputedSub, ComputedDevice, ComputedLink } from './types'

/* ========== 分组类型 → 层级映射 ========== */
const typeLayer: Record<string, number> = {
  'island': 0, 'route-station': 0, 'satellite': 0,
  'aircraft': 1, 'buoy': 1,
  'ship': 2, 'vehicle': 2, 'station': 2,
}

interface FNode extends SimulationNodeDatum {
  id: string; groupIdx: number; layer: number; radius: number
}
interface FLink extends SimulationLinkDatum<FNode> { ltype: string }

const DEVICE_R = 13
const MARGIN = 8

/* ========== 自适应半径计算 ========== */

/** 设备圆形排列所需的最小圆半径 */
function circleFitRadius(n: number, itemR: number): number {
  if (n <= 0) return 30
  if (n === 1) return itemR + MARGIN
  // 圆上排列 n 个半径为 itemR 的圆，相邻不重叠
  // 2 * sin(π/n) * R >= 2 * itemR  =>  R >= itemR / sin(π/n)
  return itemR / Math.sin(Math.PI / n) + MARGIN
}

/** 子站的半径（设备圆形排列 + 标签空间） */
function calcSubRadius(deviceCount: number): number {
  return circleFitRadius(deviceCount, DEVICE_R) + 12  // +12 给标签
}

/**
 * 分组的自适应半径
 * - 有 subs：计算所有 sub 半径 → 圆形排列 subs → group 半径 = 排列半径 + 最大 subR + margin
 * - 无 subs：设备直接圆形排列 + margin
 */
function calcGroupRadius(group: TopologyData['groups'][number]): number {
  const subDefs = group.subs ?? []
  const directDevices = group.devices ?? []

  if (subDefs.length > 0) {
    const subRadii = subDefs.map(s => calcSubRadius(s.devices.length))
    if (subRadii.length === 1) {
      return subRadii[0] + MARGIN + 18  // +18 给标签
    }
    // 多个 sub 圆形排列
    const maxSubR = Math.max(...subRadii)
    const arrangeR = circleFitRadius(subRadii.length, maxSubR)
    return arrangeR + maxSubR + MARGIN + 18
  }

  return circleFitRadius(directDevices.length, DEVICE_R) + MARGIN + 18
}

/* ========== 主入口 ========== */
export function runForceLayout(
  data: TopologyData,
  groupColors: Record<string, string>,
  _groupTypes: Record<string, string>,
  deviceIcons: Record<string, string>,
  width: number,
  height: number,
): { groups: ComputedGroup[]; links: ComputedLink[] } {

  /* 1. 索引 */
  const devGroupMap = new Map<string, string>()
  const devSubMap = new Map<string, string>()
  data.groups.forEach(g => {
    g.devices?.forEach(d => devGroupMap.set(d.id, g.id))
    g.subs?.forEach(sub => sub.devices.forEach(d => {
      devGroupMap.set(d.id, g.id)
      devSubMap.set(d.id, sub.id)
    }))
  })

  /* 2. 计算每个 group 的自适应半径 */
  const groupRadii = data.groups.map(g => calcGroupRadius(g))

  /* 3. 力导向排 group 位置 */
  const fNodes: FNode[] = data.groups.map((g, i) => ({
    id: g.id, groupIdx: i,
    layer: typeLayer[g.type] ?? 2,
    radius: groupRadii[i],
  }) as FNode)

  const seen = new Set<string>()
  const fLinks: FLink[] = []
  data.links.forEach(lk => {
    const sg = devGroupMap.get(lk.source), tg = devGroupMap.get(lk.target)
    if (!sg || !tg || sg === tg) return
    const key = sg < tg ? `${sg}|${tg}` : `${tg}|${sg}`
    if (seen.has(key)) return
    seen.add(key)
    fLinks.push({ source: sg, target: tg, ltype: lk.type })
  })

  // 初始分层网格
  const layerCount = new Set(fNodes.map(n => n.layer)).size
  const layerH = height / (layerCount + 1)
  const byLayer: Record<number, FNode[]> = {}
  fNodes.forEach(n => { (byLayer[n.layer] ??= []).push(n) })
  Object.entries(byLayer).forEach(([li, nodes]) => {
    const y = layerH * (Number(li) + 1)
    const totalR = nodes.reduce((s, n) => s + n.radius * 2, 0)
    const spacing = Math.max(80, (width - 80 - totalR) / Math.max(nodes.length, 1))
    let x = (width - (totalR + spacing * (nodes.length - 1))) / 2
    nodes.forEach(n => {
      n.x = x + n.radius
      n.y = y + (Math.random() - 0.5) * 20
      x += n.radius * 2 + spacing
    })
  })

  const sim = forceSimulation<FNode>(fNodes)
    .force('link', forceLink<FNode, FLink>(fLinks).id(d => d.id).distance(350).strength(0.25))
    .force('charge', forceManyBody<FNode>().strength(d => -d.radius * 20))
    .force('center', forceCenter(width / 2, height / 2))
    .force('collide', forceCollide<FNode>().radius(d => d.radius + 20).strength(0.8))
    .stop()
  for (let i = 0; i < 400; i++) sim.tick()
  fNodes.forEach(n => { if (n.x == null) n.x = width / 2; if (n.y == null) n.y = height / 2 })

  /* 4. 生成 Computed 结构 */
  const groups: ComputedGroup[] = data.groups.map((g, gi) => {
    const fn = fNodes[gi]
    const color = groupColors[g.type] || '#38bdf8'
    const subDefs = g.subs ?? []

    // --- 子站布局 ---
    const subs: ComputedSub[] = []
    if (subDefs.length > 0) {
      const subRadii = subDefs.map(s => calcSubRadius(s.devices.length))
      const maxSubR = Math.max(...subRadii)

      // 子站排列半径
      let arrangeR: number
      if (subDefs.length === 1) {
        arrangeR = 0
      } else {
        arrangeR = circleFitRadius(subDefs.length, maxSubR)
      }

      subDefs.forEach((subDef, si) => {
        const sr = subRadii[si]
        const angle = -Math.PI / 2 + (2 * Math.PI / subDefs.length) * si
        const sx = fn.x! + arrangeR * Math.cos(angle)
        const sy = fn.y! + arrangeR * Math.sin(angle)

        // 子站内设备圆形排列
        const devDist = circleFitRadius(subDef.devices.length, DEVICE_R)
        const devices: ComputedDevice[] = subDef.devices.map((d, di) => {
          const da = -Math.PI / 2 + (2 * Math.PI / Math.max(subDef.devices.length, 1)) * di
          return {
            ...d, groupId: g.id, subId: subDef.id,
            icon: deviceIcons[d.type] || '📦',
            r: DEVICE_R,
            x: sx + devDist * Math.cos(da),
            y: sy + devDist * Math.sin(da),
          }
        })
        subs.push({ id: subDef.id, name: subDef.name, x: sx, y: sy, r: sr, devices, groupId: g.id })
      })
    }

    // --- 直接设备布局 ---
    const directDevices: ComputedDevice[] = (g.devices ?? []).map((d, di) => {
      const dn = (g.devices ?? []).length
      const dist = circleFitRadius(dn, DEVICE_R)
      const angle = -Math.PI / 2 + (2 * Math.PI / Math.max(dn, 1)) * di
      return {
        ...d, groupId: g.id,
        icon: deviceIcons[d.type] || '📦',
        r: DEVICE_R,
        x: fn.x! + dist * Math.cos(angle),
        y: fn.y! + dist * Math.sin(angle),
      }
    })

    return {
      id: g.id, name: g.name, type: g.type, color,
      x: fn.x!, y: fn.y!, r: groupRadii[gi],
      subs, devices: directDevices,
    }
  })

  /* 5. 连线分类 */
  const links: ComputedLink[] = data.links.map(lk => {
    const sg = devGroupMap.get(lk.source), tg = devGroupMap.get(lk.target)
    const ss = devSubMap.get(lk.source), ts = devSubMap.get(lk.target)
    let level: ComputedLink['level'] = 'external'
    if (sg === tg) level = (ss && ts && ss === ts) ? 'internal' : 'sub'
    return { source: lk.source, target: lk.target, type: lk.type, status: lk.status ?? 'normal', level }
  })

  return { groups, links }
}
