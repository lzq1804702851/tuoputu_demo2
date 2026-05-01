/* ================================================================
 *  地理锚定力布局 + 包含树构建
 *  - 以经纬度投影为锚点
 *  - 力学防碰撞
 *  - 支持最多5层包含嵌套
 * ================================================================ */

import {
  forceSimulation, forceLink, forceManyBody,
  forceCollide, forceX, forceY,
  type SimulationNodeDatum, type SimulationLinkDatum,
} from 'd3-force'
import type {
  TopologyData, TopoNode, TopoRelation,
  ComputedNode, ComputedRelation, ContainmentNode,
  NodeTypeConfig, RelationTypeConfig, ProjectionConfig,
} from './types'
import { createProjection } from './projection'

const MAX_DEPTH = 5
const NODE_MARGIN = 6
const CONTAIN_PADDING = 20

/* ========== 包含树构建 ========== */

interface TreeNode {
  uuid: string
  node: TopoNode
  children: TreeNode[]
  depth: number
}

/**
 * 从扁平的节点+关系数据构建包含树
 * @returns 树根节点数组（可能有多个根）
 */
export function buildContainmentTree(
  nodes: TopoNode[],
  relations: TopoRelation[],
  relationTypes: Record<string, RelationTypeConfig>,
): TreeNode[] {
  const nodeMap = new Map<string, TopoNode>()
  nodes.forEach(n => nodeMap.set(n.uuid, n))

  // 找出所有包含关系：from_id 包含 to_id（from 是父，to 是子）
  const parentOf = new Map<string, string>()  // childUuid -> parentUuid
  const childrenOf = new Map<string, string[]>() // parentUuid -> childUuid[]

  for (const rel of relations) {
    const cfg = relationTypes[rel.type_id]
    if (!cfg?.isContain) continue
    const parentUuid = rel.from_id
    const childUuid = rel.to_id
    if (!nodeMap.has(parentUuid) || !nodeMap.has(childUuid)) continue
    if (parentOf.has(childUuid)) continue // 一个节点只能有一个父节点（防止多父冲突）

    parentOf.set(childUuid, parentUuid)
    if (!childrenOf.has(parentUuid)) childrenOf.set(parentUuid, [])
    childrenOf.get(parentUuid)!.push(childUuid)
  }

  // 找到根节点（没有父节点的节点）
  const roots: TreeNode[] = []
  const visited = new Set<string>()

  function buildNode(uuid: string, depth: number): TreeNode | null {
    if (visited.has(uuid) || depth > MAX_DEPTH) return null
    visited.add(uuid)
    const node = nodeMap.get(uuid)!
    const childUuids = childrenOf.get(uuid) || []
    const children: TreeNode[] = []
    for (const cu of childUuids) {
      const child = buildNode(cu, depth + 1)
      if (child) children.push(child)
    }
    return { uuid, node, children, depth }
  }

  // 先构建有子节点的根
  for (const [parentUuid] of childrenOf) {
    if (!parentOf.has(parentUuid) && !visited.has(parentUuid)) {
      const tree = buildNode(parentUuid, 0)
      if (tree) roots.push(tree)
    }
  }

  // 没有参与任何包含关系的独立节点也作为根
  for (const n of nodes) {
    if (!visited.has(n.uuid) && !parentOf.has(n.uuid) && !childrenOf.has(n.uuid)) {
      roots.push({ uuid: n.uuid, node: n, children: [], depth: 0 })
    }
  }

  return roots
}

/* ========== 自适应半径计算 ========== */

/** n 个半径为 r 的圆在圆上排列所需的最小外接圆半径 */
function circleFitRadius(n: number, itemR: number): number {
  if (n <= 0) return 30
  if (n === 1) return itemR + NODE_MARGIN
  return itemR / Math.sin(Math.PI / n) + NODE_MARGIN
}

/** 计算树节点的包含圈半径（递归，从叶向根） */
function calcTreeRadius(tree: TreeNode, nodeConfigs: Record<string, NodeTypeConfig>): number {
  const cfg = nodeConfigs[tree.node.type_id]
  const ownR = cfg?.radius ?? 14

  if (tree.children.length === 0) {
    return ownR + NODE_MARGIN
  }

  // 先递归计算子节点半径
  const childRadii = tree.children.map(c => calcTreeRadius(c, nodeConfigs))

  // 子节点的圆形排列半径
  const maxChildR = Math.max(...childRadii)
  const arrangeR = tree.children.length === 1
    ? 0
    : circleFitRadius(tree.children.length, maxChildR)

  // 父圈半径 = 排列半径 + 最大子圈 + padding
  return arrangeR + maxChildR + CONTAIN_PADDING
}

/* ========== 力布局计算 ========== */

interface FNode extends SimulationNodeDatum {
  uuid: string
  /** 地理锚点 x */
  anchorX: number
  /** 地理锚点 y */
  anchorY: number
  /** 节点半径（用于碰撞检测） */
  radius: number
  /** 包含圈半径 */
  containerR: number
  /** 树节点引用 */
  treeNode: TreeNode | null
  /** 原始节点 */
  rawNode: TopoNode
}

interface FLink extends SimulationLinkDatum<FNode> {
  relType: string
}

/**
 * 执行地理锚定力布局
 */
export function runForceLayout(
  data: TopologyData,
  nodeConfigs: Record<string, NodeTypeConfig>,
  relationConfigs: Record<string, RelationTypeConfig>,
  projConfig: ProjectionConfig,
): {
  nodes: ComputedNode[]
  relations: ComputedRelation[]
  containmentTree: ContainmentNode[]
} {
  // 1. 构建包含树
  const tree = buildContainmentTree(data.nodes, data.relations, relationConfigs)

  // 2. 创建投影函数
  const project = createProjection(data.nodes, projConfig)

  // 3. 收集所有参与布局的节点（包含树中的 + 独立节点）
  // 为包含树中的节点计算半径
  const containerRadii = new Map<string, number>()
  function calcAllRadii(nodes: TreeNode[]) {
    for (const tn of nodes) {
      containerRadii.set(tn.uuid, calcTreeRadius(tn, nodeConfigs))
      calcAllRadii(tn.children)
    }
  }
  calcAllRadii(tree)

  // 建立包含关系的映射
  const containmentParentMap = new Map<string, string>() // child -> parent
  const containmentChildrenMap = new Map<string, string[]>() // parent -> children
  for (const rel of data.relations) {
    const cfg = relationConfigs[rel.type_id]
    if (cfg?.isContain) {
      containmentParentMap.set(rel.to_id, rel.from_id)
      if (!containmentChildrenMap.has(rel.from_id)) containmentChildrenMap.set(rel.from_id, [])
      containmentChildrenMap.get(rel.from_id)!.push(rel.to_id)
    }
  }

  // 查找节点所属的包含树祖先路径
  function getAncestorPath(uuid: string): string[] {
    const path: string[] = []
    let cur = uuid
    while (containmentParentMap.has(cur)) {
      const parent = containmentParentMap.get(cur)!
      path.unshift(parent)
      cur = parent
    }
    return path
  }

  // 4. 创建力布局节点
  const fNodes: FNode[] = data.nodes.map(n => {
    const anchor = project(n.lng, n.lat)
    const cfg = nodeConfigs[n.type_id]
    const r = cfg?.radius ?? 14
    const cR = containerRadii.get(n.uuid) || 0
    // 找对应的树节点
    let tn: TreeNode | null = null
    function findTreeNode(nodes: TreeNode[]): boolean {
      for (const t of nodes) {
        if (t.uuid === n.uuid) { tn = t; return true }
        if (findTreeNode(t.children)) return true
      }
      return false
    }
    findTreeNode(tree)

    return {
      uuid: n.uuid,
      anchorX: anchor.x,
      anchorY: anchor.y,
      radius: r,
      containerR: cR,
      treeNode: tn,
      rawNode: n,
      x: anchor.x + (Math.random() - 0.5) * 2,
      y: anchor.y + (Math.random() - 0.5) * 2,
    }
  })

  const fNodeMap = new Map<string, FNode>()
  fNodes.forEach(fn => fNodeMap.set(fn.uuid, fn))

  // 5. 创建力布局连接（非包含关系，即通信关系）
  const seen = new Set<string>()
  const fLinks: FLink[] = []
  for (const rel of data.relations) {
    const cfg = relationConfigs[rel.type_id]
    if (cfg?.isContain) continue // 包含关系不画线
    const sf = fNodeMap.get(rel.from_id)
    const st = fNodeMap.get(rel.to_id)
    if (!sf || !st) continue
    const key = rel.from_id < rel.to_id ? `${rel.from_id}|${rel.to_id}` : `${rel.to_id}|${rel.from_id}`
    if (seen.has(key)) continue
    seen.add(key)
    fLinks.push({ source: sf, target: st, relType: rel.type_id })
  }

  // 6. 运行力导向模拟
  const sim = forceSimulation<FNode>(fNodes)
    // 地理锚定弹簧力
    .force('x', forceX<FNode>().x(d => d.anchorX).strength(0.8))
    .force('y', forceY<FNode>().y(d => d.anchorY).strength(0.8))
    // 碰撞排斥
    .force('collide', forceCollide<FNode>().radius(d => d.radius + 8).strength(0.9))
    // 通信连接力
    .force('link', forceLink<FNode, FLink>(fLinks).id(d => d.uuid).distance(80).strength(0.1))
    // 全局微弱排斥
    .force('charge', forceManyBody<FNode>().strength(d => -d.radius * 8))
    .stop()

  for (let i = 0; i < 300; i++) sim.tick()

  // 确保所有节点都有坐标
  fNodes.forEach(n => {
    if (n.x == null) n.x = n.anchorX
    if (n.y == null) n.y = n.anchorY
  })

  // 7. 递归布局包含树内的子节点位置
  function layoutContainmentChildren(
    parentFn: FNode,
    childUuids: string[],
    parentCenterX: number,
    parentCenterY: number,
    parentR: number,
  ) {
    if (childUuids.length === 0) return

    const childFns = childUuids.map(u => fNodeMap.get(u)).filter(Boolean) as FNode[]
    // 计算子节点的半径
    const childRadii = childFns.map(fn => Math.max(fn.containerR || fn.radius, fn.radius))

    // 子节点在父圈内排列
    const maxChildR = Math.max(...childRadii)
    const arrangeR = childFns.length === 1
      ? 0
      : circleFitRadius(childFns.length, maxChildR)

    // 确保不超过父圈
    const effectiveR = Math.min(arrangeR, parentR - maxChildR - CONTAIN_PADDING / 2)

    childFns.forEach((fn, i) => {
      const angle = -Math.PI / 2 + (2 * Math.PI / childFns.length) * i
      const childR = childRadii[i]
      fn.x = parentCenterX + effectiveR * Math.cos(angle)
      fn.y = parentCenterY + effectiveR * Math.sin(angle)

      // 递归布局更深层
      const deeperChildren = containmentChildrenMap.get(fn.uuid)
      if (deeperChildren) {
        layoutContainmentChildren(fn, deeperChildren, fn.x, fn.y, fn.containerR)
      }
    })
  }

  // 对每个包含树的根节点进行子节点布局
  for (const root of tree) {
    const rootFn = fNodeMap.get(root.uuid)
    if (!rootFn) continue
    const rootChildren = containmentChildrenMap.get(root.uuid)
    if (rootChildren) {
      layoutContainmentChildren(rootFn, rootChildren, rootFn.x!, rootFn.y!, rootFn.containerR)
    }
  }

  // 8. 生成 ComputedNode 数组
  const computedNodes: ComputedNode[] = fNodes.map(fn => {
    const cfg = nodeConfigs[fn.rawNode.type_id]
    const hasChildren = containmentChildrenMap.has(fn.uuid)
    return {
      node: fn.rawNode,
      x: fn.x!,
      y: fn.y!,
      r: fn.radius,
      icon: cfg?.icon ?? '📦',
      color: cfg?.color ?? '#38bdf8',
      containmentPath: getAncestorPath(fn.uuid),
      isContainer: hasChildren,
      containerR: fn.containerR,
    }
  })

  // 9. 生成 ComputedRelation 数组
  const computedRelations: ComputedRelation[] = data.relations
    .filter(rel => {
      const cfg = relationConfigs[rel.type_id]
      return !cfg?.isContain // 不包含的才画线
    })
    .map(rel => {
      const fromFn = fNodeMap.get(rel.from_id)
      const toFn = fNodeMap.get(rel.to_id)
      if (!fromFn || !toFn) return null
      const cfg = relationConfigs[rel.type_id] || {
        color: '#475569', width: 1, dash: '4 2', name: rel.type_id, isContain: false,
      }
      return {
        relation: rel,
        fromX: fromFn.x!,
        fromY: fromFn.y!,
        toX: toFn.x!,
        toY: toFn.y!,
        fromR: fromFn.radius,
        toR: toFn.radius,
        isContain: false,
        config: cfg,
      }
    })
    .filter(Boolean) as ComputedRelation[]

  // 10. 生成 ContainmentNode 数组（用于渲染包含圈）
  function toContainmentNode(tn: TreeNode): ContainmentNode {
    const fn = fNodeMap.get(tn.uuid)!
    return {
      node: tn.node,
      children: tn.children.map(toContainmentNode),
      x: fn?.x ?? fn?.anchorX ?? 0,
      y: fn?.y ?? fn?.anchorY ?? 0,
      r: containerRadii.get(tn.uuid) ?? 30,
      depth: tn.depth,
    }
  }
  const containmentTreeOut = tree.filter(t => t.children.length > 0).map(toContainmentNode)

  return {
    nodes: computedNodes,
    relations: computedRelations,
    containmentTree: containmentTreeOut,
  }
}

