# topology-graph-vue

基于 Vue 3 + d3-force 的网络拓扑图组件，支持力导向自动布局、设备拖拽、缩放平移、状态筛选、搜索高亮、悬浮信息窗。

## 安装

```bash
npm install topology-graph-vue
```

## 快速开始

```vue
<template>
  <TopologyGraph :data="topoData" :show-toolbar="true" :legend="{ show: true }" />
</template>

<script setup>
import { TopologyGraph } from 'topology-graph-vue'
import 'topology-graph-vue/dist/style.css'

const topoData = {
  groups: [
    {
      id: 'island-1',
      name: '大洲岛通信网',
      type: 'island',
      subs: [
        {
          id: 'station-1',
          name: '1号通信站',
          devices: [
            { id: 'dev-1', name: '终端', type: 'terminal', status: 'online' },
            { id: 'dev-2', name: '通信机', type: 'comm-device', status: 'online' },
          ],
        },
      ],
      devices: [],
    },
  ],
  links: [
    { source: 'dev-1', target: 'dev-2', type: 'internal' },
  ],
}
</script>

<style>
html, body, #app { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }
</style>
```

---

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `TopologyData` | **必填** | 拓扑数据（分组 + 链路） |
| `showToolbar` | `boolean` | `true` | 是否显示顶部工具栏 |
| `legend` | `LegendConfig` | `{}` | 图例配置 |
| `deviceTypes` | `Record<string, DeviceTypeConfig>` | 内置 8 种 | 自定义设备类型（与内置合并） |
| `linkTypes` | `Record<string, LinkTypeConfig>` | 内置 8 种 | 自定义链路类型（与内置合并） |
| `groupTypes` | `Record<string, GroupTypeConfig>` | 内置 8 种 | 自定义分组类型（与内置合并） |

---

## 数据格式

### TopologyData

整个拓扑图的数据入口，由 `groups`（分组数组）和 `links`（链路数组）组成。

```ts
interface TopologyData {
  groups: Group[]
  links: TopoLink[]
}
```

### Group（分组）

代表拓扑图中的一个区域，如岛屿、船只、路由站等。支持两种内部结构：

- **有子站**（`subs`）：适合岛屿等有多个通信站的场景，设备挂在子站下
- **无子站**（`devices`）：适合船只等设备直接挂在分组下的场景

```ts
interface Group {
  id: string          // 唯一标识
  name: string        // 显示名称
  type: string        // 分组类型，如 'island'、'ship'、'route-station'
  subs?: SubGroup[]   // 子站列表（与 devices 二选一）
  devices?: Device[]  // 直接设备列表（与 subs 二选一）
}
```

**示例 — 有子站的岛屿：**

```ts
{
  id: 'hainan',
  name: '海南岛有线通信网',
  type: 'island',
  subs: [
    {
      id: 'hn-sta1',
      name: '1号通信站',
      devices: [
        { id: 'hn1-term', name: '终端', type: 'terminal', status: 'online' },
        { id: 'hn1-comm', name: '通信机', type: 'comm-device', status: 'offline' },
      ],
    },
    {
      id: 'hn-sta-rt',
      name: '核心路由站',
      devices: [
        { id: 'hn-route', name: '路由器', type: 'router', status: 'online' },
      ],
    },
  ],
  devices: [],
}
```

**示例 — 无子站的船只：**

```ts
{
  id: 'ship-1',
  name: '1号船',
  type: 'ship',
  devices: [
    { id: 's1-term', name: '终端', type: 'terminal', status: 'online' },
    { id: 's1-comm', name: '通信机', type: 'comm-device', status: 'online' },
    { id: 's1-gps', name: 'GPS', type: 'gps', status: 'online' },
  ],
}
```

### SubGroup（子站）

分组内部的二级区域，如通信站、路由站点。

```ts
interface SubGroup {
  id: string        // 唯一标识
  name: string      // 显示名称
  devices: Device[] // 子站下的设备列表
}
```

### Device（设备）

拓扑图中最小的节点单元。

```ts
interface Device {
  id: string               // 唯一标识
  name: string             // 显示名称
  type: string             // 设备类型，如 'terminal'、'router'
  status: 'online' | 'offline'  // 设备状态
}
```

### TopoLink（链路）

连接两个设备的线段，`source` 和 `target` 均为设备的 `id`。

```ts
interface TopoLink {
  source: string                   // 源设备 ID
  target: string                   // 目标设备 ID
  type: string                     // 链路类型，如 'fiber'、'wireless'
  status?: 'normal' | 'error'      // 链路状态（可选）
}
```

---

## 完整数据示例

以下是一个包含岛屿、路由站、船只的完整拓扑数据：

```ts
const topoData = {
  groups: [
    // 岛屿（有子站结构）
    {
      id: 'dazhou', name: '大洲岛有线通信网', type: 'island',
      subs: [
        {
          id: 'dz-sta1', name: '大洲岛1号通信站',
          devices: [
            { id: 'dz-term', name: '终端', type: 'terminal', status: 'online' },
            { id: 'dz-comm', name: '通信机', type: 'comm-device', status: 'online' },
          ],
        },
        {
          id: 'dz-sta-rt', name: '岛上核心路由站点',
          devices: [
            { id: 'dz-route', name: '路由器', type: 'router', status: 'online' },
          ],
        },
      ],
      devices: [],
    },
    // 路由站（无子站，设备直接挂在分组下）
    {
      id: 'sea', name: '海上有线路由站点', type: 'route-station',
      devices: [
        { id: 'sea-route', name: '路由器', type: 'router', status: 'online' },
      ],
    },
    // 船只（无子站，设备直接挂在分组下）
    {
      id: 'ship1', name: '1号船', type: 'ship',
      devices: [
        { id: 's1-term', name: '终端', type: 'terminal', status: 'online' },
        { id: 's1-comm', name: '通信机', type: 'comm-device', status: 'online' },
        { id: 's1-gps', name: 'GPS', type: 'gps', status: 'online' },
      ],
    },
  ],
  links: [
    // 岛内：终端 → 通信机（内部链路）
    { source: 'dz-term', target: 'dz-comm', type: 'internal' },
    // 岛内：通信机 → 路由器（光纤）
    { source: 'dz-comm', target: 'dz-route', type: 'fiber' },
    // 岛际：路由器 → 海上路由站（光纤）
    { source: 'dz-route', target: 'sea-route', type: 'fiber' },
    // 船→岛：通信机 → 岛上通信机（超短波）
    { source: 's1-comm', target: 'dz-comm', type: 'wireless' },
  ],
}
```

---

## 内置类型配置

组件内置了 8 种设备类型、8 种链路类型、8 种分组类型，可直接使用。自定义配置会与内置配置**合并**（同名覆盖）。

### 内置设备类型

| key | 图标 | 名称 |
|-----|------|------|
| `terminal` | 💻 | 终端 |
| `comm-device` | 📡 | 通信机 |
| `router` | 🔀 | 路由器 |
| `switch` | 🔌 | 交换机 |
| `server` | 🖥 | 服务器 |
| `gps` | 🛰 | GPS |
| `antenna` | 📏 | 天线 |
| `base-station` | 🏠 | 基站 |

### 内置链路类型

| key | 颜色 | 宽度 | 线型 | 名称 |
|-----|------|------|------|------|
| `internal` | #334155 | 1 | 虚线 `4 2` | 内部链路 |
| `wired` | #38bdf8 | 1.5 | 实线 | 有线 |
| `fiber` | #22d3ee | 1.5 | 实线 | 光纤 |
| `wireless` | #fbbf24 | 1 | 虚线 `3 3` | 超短波 |
| `satellite` | #a78bfa | 1.5 | 虚线 `8 4` | 卫星通道 |
| `4g` | #34d399 | 1 | 点划线 | 4G |
| `5g` | #f472b6 | 1.5 | 点划线 | 5G |
| `microwave` | #67e8f9 | 1 | 点划线 | 微波 |

### 内置分组类型

| key | 颜色 | 名称 |
|-----|------|------|
| `island` | #38bdf8 | 岛屿 |
| `route-station` | #22d3ee | 路由站 |
| `ship` | #06b6d4 | 船只 |
| `aircraft` | #3b82f6 | 飞行器 |
| `vehicle` | #22c55e | 车辆 |
| `satellite` | #a855f7 | 卫星 |
| `buoy` | #f97316 | 浮标 |
| `station` | #eab308 | 基站 |

---

## 自定义类型

通过 props 传入自定义配置，与内置配置合并（同名 key 会覆盖内置值，新增 key 会追加）。

### 自定义设备类型

```vue
<TopologyGraph
  :data="topoData"
  :device-types="{
    sensor: { icon: '🌡', name: '传感器' },
    camera: { icon: '📷', name: '摄像头' },
    // 覆盖内置的 terminal 图标
    terminal: { icon: '🖥️', name: '电脑终端' },
  }"
/>
```

```ts
interface DeviceTypeConfig {
  icon: string   // 显示的 emoji 图标
  name: string   // 类型显示名称（用于图例）
}
```

### 自定义链路类型

```vue
<TopologyGraph
  :data="topoData"
  :link-types="{
    optical: { color: '#ff6b6b', width: 2, dash: '', name: '光缆' },
    // 覆盖内置 wireless 的颜色
    wireless: { color: '#00ff00', width: 1, dash: '5 5', name: '无线电' },
  }"
/>
```

```ts
interface LinkTypeConfig {
  color: string   // 线条颜色（十六进制）
  width: number   // 线条宽度
  dash: string    // SVG stroke-dasharray，空字符串为实线
  name: string    // 类型显示名称（用于图例）
}
```

### 自定义分组类型

```vue
<TopologyGraph
  :data="topoData"
  :group-types="{
    base: { color: '#ff0000', name: '军事基地' },
    // 覆盖内置 ship 的颜色
    ship: { color: '#00ffff', name: '舰船' },
  }"
/>
```

```ts
interface GroupTypeConfig {
  color: string   // 分组圆圈颜色
  name: string    // 类型显示名称
}
```

---

## 图例配置

```vue
<TopologyGraph
  :data="topoData"
  :legend="{
    show: true,
    position: 'left-bottom',
    deviceTypes: ['terminal', 'comm-device', 'router'],
    linkTypes: ['internal', 'fiber', 'wireless'],
    showStatus: true,
    sectionTitles: {
      devices: '设备类型',
      links: '链路类型',
      status: '设备状态',
    },
    style: {
      background: '#0f172aee',
      borderColor: '#1e3a5f',
      borderRadius: 8,
    },
  }"
/>
```

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `show` | `boolean` | `false` | 是否显示图例 |
| `position` | `'left-bottom' \| 'right-bottom' \| 'left-top' \| 'right-top'` | `'left-bottom'` | 图例位置 |
| `deviceTypes` | `string[]` | 全部 | 图例中显示哪些设备类型 |
| `linkTypes` | `string[]` | 全部 | 图例中显示哪些链路类型 |
| `showStatus` | `boolean` | `true` | 是否显示在线/离线状态说明 |
| `sectionTitles` | `LegendSectionTitles` | 中文默认值 | 各分区的标题文字 |
| `style` | `LegendStyle` | — | 图例面板样式自定义 |

---

## 交互功能

### 拖拽

- **设备节点**：可拖拽，自动约束在所属子站/分组圆内
- **子站圆圈**：可整体拖拽，自动约束在所属分组圆内
- **分组圆圈**：可整体拖拽，带动所有子站和设备

### 缩放与平移

- **滚轮缩放**：鼠标滚轮上下滚动缩放画布
- **空白平移**：鼠标在空白处按住拖拽平移画布

### 搜索高亮

在工具栏的搜索框中输入区域/站点/船名，按回车：
- 匹配名称的分组/子站及其所有设备高亮显示
- 与这些设备直接相连的外部设备也会高亮
- 其余元素变暗
- 清空搜索框自动退出高亮

### 状态筛选

工具栏提供两个筛选按钮：

- **独显离线设备**：只高亮离线设备及其直接相连的设备
- **独显在线设备**：只高亮在线设备及其直接相连的设备

两个按钮互斥，搜索与筛选也互斥。

### 悬浮信息窗

鼠标悬停在分组圆圈或子站圆圈上时，自动弹出浮窗显示：
- 名称
- 类型
- 设备总数 / 在线数 / 离线数
- 子站数量（分组特有）

---

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `node-click` | `device: ComputedDevice` | 点击设备节点时触发 |

```vue
<TopologyGraph :data="topoData" @node-click="onNodeClick" />
```

---

## 数据层级关系

```
TopologyData
├── groups[] ──────────── 顶级分组（岛屿/船/路由站）
│   ├── subs[] ────────── 子站（通信站/路由站点），可选
│   │   └── devices[] ─── 子站下的设备
│   └── devices[] ─────── 直接挂在分组下的设备（无子站时使用）
└── links[] ───────────── 链路（source/target 均为设备 ID）
```

链路自动分类：
- `internal`：同一子站内的设备连线
- `sub`：同一分组内、不同子站间的设备连线
- `external`：不同分组间的设备连线（自动弯曲显示）

---

## 离线设备显示

- 在线设备：绿色描边圆圈
- 离线设备：红色填充 + 脉冲呼吸动画效果
