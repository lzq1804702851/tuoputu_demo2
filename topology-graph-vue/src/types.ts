/* ================================================================
 *  通用拓扑图组件 - 类型定义
 * ================================================================ */

/* ---------- 基础数据模型（用户传入） ---------- */

/** 通用节点 */
export interface TopoNode {
  uuid: string
  name: string
  type_id: string
  status: string
  lng: number
  lat: number
  /** 扩展属性，如 { ip: '...', speed: '...' } */
  extra?: Record<string, any>
}

/** 通用关系 */
export interface TopoRelation {
  uuid: string
  name: string
  type_id: string
  status: string
  from_id: string
  to_id: string
  /** 扩展属性 */
  extra?: Record<string, any>
}

/** 拓扑数据 */
export interface TopologyData {
  nodes: TopoNode[]
  relations: TopoRelation[]
}

/* ---------- 配置类型 ---------- */

/** 节点类型配置 */
export interface NodeTypeConfig {
  icon: string
  name: string
  color?: string
  /** 节点绘制半径 */
  radius?: number
}

/** 关系类型配置 */
export interface RelationTypeConfig {
  color: string
  width: number
  dash: string
  name: string
  /** 是否为包含关系（画大圈套小圈） */
  isContain?: boolean
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
  nodes?: string
  relations?: string
  status?: string
}

/** 图例配置 */
export interface LegendConfig {
  show?: boolean
  position?: 'left-bottom' | 'right-bottom' | 'left-top' | 'right-top'
  nodeTypes?: string[]
  relationTypes?: string[]
  showStatus?: boolean
  style?: LegendStyle
  sectionTitles?: LegendSectionTitles
}

/** Tooltip 格式化回调 */
export type TooltipFormatter = (
  item: { type: 'node' | 'relation'; data: TopoNode | TopoRelation; computed?: ComputedNode },
) => { title: string; color?: string; items: { label: string; value: string }[] } | null

/** 节点上要显示的属性标签键名列表 */
export type NodeLabelKeys = string[] | ((node: TopoNode) => { key: string; value: string }[])

/** 力布局可调参数 */
export interface ForceConfig {
  /** 地理锚定力强度 (0~1)，越大节点越贴近原始经纬度位置，默认 0.3 */
  anchorStrength?: number
  /** 碰撞排斥力强度 (0~2)，越大包含圈之间距离越远，默认 1.0 */
  collideStrength?: number
  /** 碰撞排斥额外间距 (0~50)，碰撞半径 = max(containerR, radius) + 此值，默认 10 */
  collidePadding?: number
  /** 全局排斥力倍数 (0~20)，越大所有节点互相排斥越强，默认 5 */
  chargeStrength?: number
  /** 连接线力度 (0~1)，默认 0.05 */
  linkStrength?: number
  /** 连接线理想距离 (10~300)，默认 80 */
  linkDistance?: number
  /** 力模拟迭代次数 (50~2000)，越多结果越稳定但越慢，默认 500 */
  iterations?: number
  /** 包含圈内边距 (5~60)，子节点到包含圈边缘的最小距离，默认 20 */
  containPadding?: number
}

/** 组件 Props */
export interface TopologyGraphProps {
  data: TopologyData
  nodeTypes?: Record<string, NodeTypeConfig>
  relationTypes?: Record<string, RelationTypeConfig>
  legend?: LegendConfig
  showToolbar?: boolean
  /** 地图中心经度，默认 110（海南岛附近） */
  mapCenterLng?: number
  /** 地图中心纬度，默认 18 */
  mapCenterLat?: number
  /** 地图缩放级别，默认 1 */
  mapZoom?: number
  /** 节点上显示的属性标签 */
  nodeLabels?: NodeLabelKeys
  /** 自定义 tooltip 格式化 */
  tooltipFormatter?: TooltipFormatter
  /** 力布局参数配置 */
  forceConfig?: ForceConfig
  /** 节点大小缩放倍数 (0.1~5)，默认 1 */
  nodeScale?: number
}

/* ---------- 内部计算类型 ---------- */

/** 包含树层级 */
export interface ContainmentNode {
  node: TopoNode
  children: ContainmentNode[]
  /** 计算后的 SVG 坐标 */
  x: number
  y: number
  /** 包含圈半径 */
  r: number
  /** 层级深度（0 = 最外层） */
  depth: number
}

/** 计算后的节点 */
export interface ComputedNode {
  node: TopoNode
  /** SVG 坐标（经投影 + 力偏移后） */
  x: number
  y: number
  /** 绘制半径 */
  r: number
  /** 图标 */
  icon: string
  /** 颜色 */
  color: string
  /** 所属包含树祖先路径 (uuid[]) */
  containmentPath: string[]
  /** 是否为包含关系的父节点（有大圈） */
  isContainer: boolean
  /** 包含圈半径（仅 isContainer 时有效） */
  containerR: number
}

/** 计算后的关系 */
export interface ComputedRelation {
  relation: TopoRelation
  fromX: number
  fromY: number
  toX: number
  toY: number
  fromR: number
  toR: number
  /** 是否为包含关系 */
  isContain: boolean
  /** 配置 */
  config: RelationTypeConfig
}

/** 渲染状态 */
export interface RenderState {
  nodes: ComputedNode[]
  relations: ComputedRelation[]
  containmentTree: ContainmentNode[]
  nodeMap: Map<string, ComputedNode>
  filterMode: string | null
  filterRelated: Set<string>
  nodeTypes: Record<string, NodeTypeConfig>
  relationTypes: Record<string, RelationTypeConfig>
  legend: LegendConfig
}

/** 投影配置 */
export interface ProjectionConfig {
  centerLng: number
  centerLat: number
  zoom: number
  width: number
  height: number
}