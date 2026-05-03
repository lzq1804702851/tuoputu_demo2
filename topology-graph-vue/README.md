# topology-graph-vue

基于 **Vue 3 + D3.js** 的通用网络拓扑图可视化组件。

节点和关系均为**扁平化数据**（Flat Data），通过 `uuid` / `from_id` / `to_id` 互相引用，无需嵌套。支持地理投影底图、力导向自动布局、包含关系（大圈套小圈）、拖拽、缩放平移、搜索高亮、状态筛选、悬浮信息窗。

## 核心特性

- **扁平化数据模型** — 节点和关系都是平级数组，通过 ID 引用关联
- **地理投影底图** — 内置 SVG 中国地图，节点按真实经纬度定位
- **包含关系嵌套** — `contain` 类型关系自动渲染为大圈套小圈
- **力导向布局** — D3-force 力模拟，防重叠 + 地理锚定
- **搜索高亮** — 按名称搜索节点并高亮关联设备
- **状态筛选** — 按在线/离线/告警状态筛选
- **交互操作** — 节点拖拽、画布缩放平移、悬浮 Tooltip
- **完全可配置** — 节点类型、关系类型、力布局参数、图例均可自定义

## 安装

```bash
npm install topology-graph-vue
```

## 快速开始

```vue
<template>
  <TopologyGraph
    :data="topoData"
    :node-types="nodeTypes"
    :relation-types="relationTypes"
    :legend="{ show: true }"
    :show-toolbar="true"
  />
</template>

<script setup>
import { TopologyGraph } from 'topology-graph-vue'

// 扁平化数据：所有节点平级，所有关系平级
const topoData = {
  nodes: [
    { uuid: 'n1', name: '杭州通信站', type_id: 'station', status: 'online', lng: 120.15, lat: 30.28 },
    { uuid: 'n2', name: '杭州路由器', type_id: 'router',  status: 'online', lng: 120.17, lat: 30.30 },
    { uuid: 'n3', name: '杭州通信机', type_id: 'comm',    status: 'online', lng: 120.13, lat: 30.26 },
    { uuid: 'n4', name: '杭州终端',   type_id: 'terminal',status: 'online', lng: 120.14, lat: 30.25 },
    { uuid: 'n5', name: '货船1号',    type_id: 'ship',    status: 'online', lng: 123.50, lat: 28.50 },
  ],
  relations: [
    // 包含关系：n1 包含 n2、n3、n4（渲染为大圈套小圈）
    { uuid: 'r1', name: '', type_id: 'contain', status: 'active', from_id: 'n1', to_id: 'n2' },
    { uuid: 'r2', name: '', type_id: 'contain', status: 'active', from_id: 'n1', to_id: 'n3' },
    { uuid: 'r3', name: '', type_id: 'contain', status: 'active', from_id: 'n1', to_id: 'n4' },
    // 通信关系
    { uuid: 'r4', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'n4', to_id: 'n3' },
    { uuid: 'r5', name: '光纤', type_id: 'fiber', status: 'connected', from_id: 'n3', to_id: 'n2' },
    { uuid: 'r6', name: '无线通信', type_id: 'wireless', status: 'connected', from_id: 'n5', to_id: 'n3' },
  ],
}

const nodeTypes = {
  station:  { icon: '🏠', name: '通信站', color: '#eab308', radius: 20 },
  router:   { icon: '🔀', name: '路由器', color: '#38bdf8', radius: 16 },
  comm:     { icon: '📡', name: '通信机', color: '#22d3ee', radius: 16 },
  terminal: { icon: '💻', name: '终端',   color: '#a78bfa', radius: 14 },
  ship:     { icon: '🚢', name: '货船',   color: '#06b6d4', radius: 18 },
}

const relationTypes = {
  contain:  { color: '#334155', width: 1,   dash: '', name: '包含关系', isContain: true },
  wired:    { color: '#38bdf8', width: 1.5, dash: '', name: '有线连接' },
  fiber:    { color: '#22d3ee', width: 1.5, dash: '', name: '光纤' },
  wireless: { color: '#fbbf24', width: 1,   dash: '', name: '无线连接' },
}
</script>

<style>
html, body, #app { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }
</style>
```

---

## 数据格式

### 核心原则

**扁平化设计**：所有节点放在 `nodes` 数组，所有关系放在 `relations` 数组。通过 `uuid`、`from_id`、`to_id` 互相引用，无需嵌套。

### TopologyData

```ts
interface TopologyData {
  nodes: TopoNode[]         // 所有节点（平级数组）
  relations: TopoRelation[] // 所有关系（平级数组）
}
```

### TopoNode（节点）

```ts
interface TopoNode {
  uuid: string                // 唯一标识
  name: string                // 显示名称
  type_id: string             // 节点类型，如 'router'、'ship'、'station'
  status: string              // 状态：'online' | 'offline' | 'warning'
  lng: number                 // 经度
  lat: number                 // 纬度
  extra?: Record<string, any> // 扩展属性（如 ip、speed、cargo 等）
}
```

### TopoRelation（关系）

```ts
interface TopoRelation {
  uuid: string                // 唯一标识
  name: string                // 关系名称（可为空字符串）
  type_id: string             // 关系类型，如 'contain'、'fiber'、'wireless'
  status: string              // 状态：'active' | 'connected' | 'disconnected'
  from_id: string             // 起始节点 uuid
  to_id: string               // 目标节点 uuid
  extra?: Record<string, any> // 扩展属性
}
```

### 包含关系说明

当关系的 `type_id` 对应的 `RelationTypeConfig` 中 `isContain: true` 时，该关系渲染为**大圈套小圈**：
- `from_id` 指向的节点 = 父节点（外圈）
- `to_id` 指向的节点 = 子节点（被包含在圈内）
- 支持多层嵌套：A 包含 B，B 包含 C，渲染为三层圈

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `TopologyData` | **必填** | 扁平化拓扑数据 |
| `nodeTypes` | `Record<string, NodeTypeConfig>` | 内置 14 种 | 节点类型配置 |
| `relationTypes` | `Record<string, RelationTypeConfig>` | 内置 9 种 | 关系类型配置 |
| `legend` | `LegendConfig` | `{}` | 图例配置 |
| `showToolbar` | `boolean` | `true` | 是否显示工具栏 |
| `mapCenterLng` | `number` | `110` | 地图中心经度 |
| `mapCenterLat` | `number` | `18` | 地图中心纬度 |
| `mapZoom` | `number` | `1` | 地图投影缩放倍数 |
| `nodeLabels` | `string[] \| Function` | `[]` | 节点上显示的 extra 属性键名 |
| `tooltipFormatter` | `TooltipFormatter` | — | 自定义 Tooltip |
| `forceConfig` | `ForceConfig` | 见下方 | 力布局参数 |

---

## 类型配置

### NodeTypeConfig

```ts
interface NodeTypeConfig {
  icon: string     // emoji 图标
  name: string     // 显示名称（图例用）
  color?: string   // 颜色（十六进制）
  radius?: number  // 节点半径（像素），默认 16
}
```

### RelationTypeConfig

```ts
interface RelationTypeConfig {
  color: string      // 线条颜色
  width: number      // 线条宽度
  dash: string       // SVG stroke-dasharray，空字符串 = 实线
  name: string       // 显示名称
  isContain?: boolean // true = 包含关系（渲染为大圈套小圈）
}
```

---

## 内置默认类型

### 内置节点类型（14 种）

| type_id | 图标 | 名称 | 默认半径 |
|---------|------|------|----------|
| `router` | 🔀 | 路由器 | 16 |
| `comm` | 📡 | 通信机 | 16 |
| `ship` | 🚢 | 货船 | 18 |
| `station` | 🏠 | 通信站 | 20 |
| `terminal` | 💻 | 终端 | 14 |
| `gps` | 🛰 | GPS | 14 |
| `satellite` | 🛰 | 卫星 | 16 |
| `buoy` | 🔵 | 浮标 | 14 |
| `vehicle` | 🚗 | 车辆 | 16 |
| `aircraft` | ✈️ | 飞行器 | 16 |
| `antenna` | 📡 | 天线 | 14 |
| `server` | 🖥 | 服务器 | 16 |
| `switch` | 🔌 | 交换机 | 15 |
| `base-station` | 📡 | 基站 | 18 |

### 内置关系类型（9 种）

| type_id | 颜色 | 宽度 | 名称 | isContain |
|---------|------|------|------|-----------|
| `contain` | #334155 | 1 | 包含关系 | ✅ |
| `communicate` | #fbbf24 | 1.5 | 通信关系 | |
| `wired` | #38bdf8 | 1.5 | 有线连接 | |
| `fiber` | #22d3ee | 1.5 | 光纤 | |
| `wireless` | #fbbf24 | 1 | 无线连接 | |
| `satellite-link` | #a78bfa | 1.5 | 卫星链路 | |
| `4g` | #34d399 | 1 | 4G | |
| `5g` | #f472b6 | 1.5 | 5G | |
| `microwave` | #67e8f9 | 1 | 微波 | |

---

## 力布局参数 ForceConfig

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `anchorStrength` | number | 0.3 | 地理锚定力 (0~1)，越大越贴近经纬度 |
| `collideStrength` | number | 1.0 | 碰撞排斥力 (0~2) |
| `collidePadding` | number | 10 | 碰撞额外间距 (0~50) |
| `chargeStrength` | number | 5 | 全局排斥力 (0~20) |
| `linkStrength` | number | 0.05 | 连接线力度 (0~1) |
| `linkDistance` | number | 80 | 连接线理想距离 (10~300) |
| `iterations` | number | 500 | 迭代次数 (50~2000) |
| `containPadding` | number | 20 | 包含圈内边距 (5~60) |

---

## 图例配置 LegendConfig

```ts
interface LegendConfig {
  show?: boolean
  position?: 'left-bottom' | 'right-bottom' | 'left-top' | 'right-top'
  nodeTypes?: string[]          // 要显示的节点类型
  relationTypes?: string[]      // 要显示的关系类型
  showStatus?: boolean
  sectionTitles?: { nodes?: string; relations?: string; status?: string }
  style?: LegendStyle
}
```

---

## 交互功能

| 功能 | 操作 |
|------|------|
| 拖拽节点 | 鼠标按住节点拖动，约束在包含圈内 |
| 缩放画布 | 鼠标滚轮 |
| 平移画布 | 空白处按住拖拽 |
| 搜索高亮 | 工具栏搜索框输入名称回车 |
| 状态筛选 | 工具栏按钮筛选在线/离线 |
| 悬浮信息 | 鼠标悬停节点显示 Tooltip |

---

## 项目结构

```
topology-graph-vue/src/
├── index.ts              # 导出组件和类型
├── TopologyGraph.vue     # 主组件
├── types.ts              # 类型定义
├── projection.ts         # 等距圆柱投影
├── map-data.ts           # SVG 中国地图底图
├── force.ts              # D3 力导向布局
├── render.ts             # 渲染逻辑
└── defaults.ts           # 默认配置（14 种节点 + 9 种关系）

topology-demo/src/
├── App.vue               # 示例页面
└── mock-data.ts          # 模拟数据
```

## License

MIT
