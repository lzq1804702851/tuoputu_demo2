/** 设备状态 */
export type DeviceStatus = 'online' | 'offline'

/** 链路状态 */
export type LinkStatus = 'normal' | 'error'

/** 设备节点 */
export interface Device {
  id: string
  name: string
  type: string
  status: DeviceStatus
}

/** 子站点（如通信站、路由站点） */
export interface SubGroup {
  id: string
  name: string
  devices: Device[]
}

/** 分组（岛屿、船只、路由站等） */
export interface Group {
  id: string
  name: string
  type: string
  subs?: SubGroup[]
  devices?: Device[]
}

/** 链路（设备ID → 设备ID） */
export interface TopoLink {
  source: string
  target: string
  type: string
  status?: LinkStatus
}

/** 拓扑数据 */
export interface TopologyData {
  groups: Group[]
  links: TopoLink[]
}

/** 设备类型配置 */
export interface DeviceTypeConfig {
  icon: string
  name: string
}

/** 链路类型配置 */
export interface LinkTypeConfig {
  color: string
  width: number
  dash: string
  name: string
}

/** 分组类型配置 */
export interface GroupTypeConfig {
  color: string
  name: string
}

/** 图例样式 */
export interface LegendStyle {
  background?: string
  borderColor?: string
  borderRadius?: number
  fontSize?: number
  textColor?: string
  titleColor?: string
}

/** 图例分组标题 */
export interface LegendSectionTitles {
  devices?: string
  links?: string
  status?: string
}

/** 图例配置 */
export interface LegendConfig {
  show?: boolean
  position?: 'left-bottom' | 'right-bottom' | 'left-top' | 'right-top'
  deviceTypes?: string[]
  linkTypes?: string[]
  showStatus?: boolean
  style?: LegendStyle
  sectionTitles?: LegendSectionTitles
}

/** 组件 Props */
export interface TopologyGraphProps {
  data: TopologyData
  deviceTypes?: Record<string, DeviceTypeConfig>
  linkTypes?: Record<string, LinkTypeConfig>
  groupTypes?: Record<string, GroupTypeConfig>
  legend?: LegendConfig
  showToolbar?: boolean
}

/* ========== 内部计算类型 ========== */

export interface ComputedDevice extends Device {
  /** SVG 坐标 */
  x: number
  y: number
  /** 绘制半径 */
  r: number
  /** 所属 subId（如果有） */
  subId?: string
  /** 所属 groupId */
  groupId: string
  /** 图标（已解析） */
  icon: string
}

export interface ComputedSub {
  id: string
  name: string
  x: number
  y: number
  r: number
  devices: ComputedDevice[]
  groupId: string
}

export interface ComputedGroup {
  id: string
  name: string
  type: string
  color: string
  x: number
  y: number
  r: number
  subs: ComputedSub[]
  devices: ComputedDevice[]
}

export interface ComputedLink {
  source: string
  target: string
  type: string
  status: LinkStatus
  /** internal / sub / external */
  level: 'internal' | 'sub' | 'external'
}

/** 渲染所需的完整状态 */
export interface RenderState {
  groups: ComputedGroup[]
  links: ComputedLink[]
  deviceMap: Map<string, ComputedDevice>
  faultMode: boolean
  faultRelated: Set<string>
  /** 最终合并后的配置 */
  deviceTypes: Record<string, DeviceTypeConfig>
  linkTypes: Record<string, LinkTypeConfig>
  groupTypes: Record<string, GroupTypeConfig>
  legend: LegendConfig
}
