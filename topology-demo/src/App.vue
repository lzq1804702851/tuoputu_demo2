<template>
  <div class="app-wrap">
    <TopologyGraph
      :data="mockData"
      :node-types="nodeTypeConfig"
      :relation-types="relationTypeConfig"
      :legend="legendConfig"
      :show-toolbar="true"
      :map-center-lng="123.0"
      :map-center-lat="28.0"
      :map-zoom="0.3"
      :node-labels="['ip', 'speed']"
      :force-config="forceConfig"
      :node-scale="nodeScale"
    />

    <!-- 力布局参数调节面板 -->
    <div class="force-panel" :class="{ collapsed: panelCollapsed }">
      <div class="panel-header" @click="panelCollapsed = !panelCollapsed">
        <span>⚙️ 力布局参数</span>
        <span class="toggle">{{ panelCollapsed ? '◀' : '▼' }}</span>
      </div>
      <div class="panel-body" v-if="!panelCollapsed">
        <div class="param-group">
          <label>锚定力强度 <span class="val">{{ forceConfig.anchorStrength }}</span></label>
          <input type="range" v-model.number="forceConfig.anchorStrength" min="0" max="1" step="0.05" />
          <span class="hint">越大节点越贴近原始经纬度</span>
        </div>
        <div class="param-group">
          <label>碰撞排斥力 <span class="val">{{ forceConfig.collideStrength }}</span></label>
          <input type="range" v-model.number="forceConfig.collideStrength" min="0" max="2" step="0.1" />
          <span class="hint">越大包含圈之间距离越远</span>
        </div>
        <div class="param-group">
          <label>碰撞额外间距 <span class="val">{{ forceConfig.collidePadding }}</span></label>
          <input type="range" v-model.number="forceConfig.collidePadding" min="0" max="50" step="1" />
          <span class="hint">碰撞半径额外增加的像素</span>
        </div>
        <div class="param-group">
          <label>全局排斥力 <span class="val">{{ forceConfig.chargeStrength }}</span></label>
          <input type="range" v-model.number="forceConfig.chargeStrength" min="0" max="20" step="0.5" />
          <span class="hint">所有节点互相排斥的强度</span>
        </div>
        <div class="param-group">
          <label>连接线力度 <span class="val">{{ forceConfig.linkStrength }}</span></label>
          <input type="range" v-model.number="forceConfig.linkStrength" min="0" max="1" step="0.01" />
          <span class="hint">有连线的节点间吸引力</span>
        </div>
        <div class="param-group">
          <label>连接线距离 <span class="val">{{ forceConfig.linkDistance }}</span></label>
          <input type="range" v-model.number="forceConfig.linkDistance" min="10" max="300" step="5" />
          <span class="hint">有连线的节点间理想距离</span>
        </div>
        <div class="param-group">
          <label>迭代次数 <span class="val">{{ forceConfig.iterations }}</span></label>
          <input type="range" v-model.number="forceConfig.iterations" min="50" max="2000" step="50" />
          <span class="hint">越多越稳定但越慢</span>
        </div>
        <div class="param-group">
          <label>包含圈内边距 <span class="val">{{ forceConfig.containPadding }}</span></label>
          <input type="range" v-model.number="forceConfig.containPadding" min="5" max="60" step="1" />
          <span class="hint">子节点到包含圈边缘距离</span>
        </div>
        <div class="panel-actions">
          <button class="reset-btn" @click="resetDefaults">恢复默认</button>
        </div>
      </div>
    </div>

    <!-- 节点大小缩放（独立控件） -->
    <div class="scale-panel">
      <div class="scale-header">
        <span>🔍 节点大小</span>
        <span class="scale-val">{{ nodeScale }}x</span>
      </div>
      <input type="range" class="scale-slider" v-model.number="nodeScale" min="0.2" max="5" step="0.1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TopologyGraph } from 'topology-graph-vue'
import type { NodeTypeConfig, RelationTypeConfig, ForceConfig } from 'topology-graph-vue'
import { mockData } from './mock-data'

const panelCollapsed = ref(true)
const nodeScale = ref(1)

const defaultForceConfig: ForceConfig = {
  anchorStrength: 0.95,
  collideStrength: 0.3,
  collidePadding: 1,
  chargeStrength: 0.5,
  linkStrength: 0.01,
  linkDistance: 15,
  iterations: 200,
  containPadding: 1.5,
}

const forceConfig = reactive<ForceConfig>({ ...defaultForceConfig })

function resetDefaults() {
  Object.assign(forceConfig, { ...defaultForceConfig })
  nodeScale.value = 1
}

const nodeTypeConfig: Record<string, NodeTypeConfig> = {
  'router':   { icon: '🔀', name: '路由器', color: '#38bdf8', radius: 0.3 },
  'comm':     { icon: '📡', name: '通信机', color: '#22d3ee', radius: 0.3 },
  'ship':     { icon: '🚢', name: '货船', color: '#06b6d4', radius: 0.4 },
  'station':  { icon: '🏠', name: '通信站', color: '#eab308', radius: 0.5 },
  'terminal': { icon: '💻', name: '终端', color: '#a78bfa', radius: 0.3 },
  'gps':      { icon: '🛰', name: 'GPS', color: '#f97316', radius: 0.3 },
}

const relationTypeConfig: Record<string, RelationTypeConfig> = {
  'contain':       { color: '#334155', width: 0.1, dash: '1 0.5', name: '包含关系', isContain: true },
  'communicate':   { color: '#fbbf24', width: 0.1, dash: '', name: '通信关系', isContain: false },
  'wired':         { color: '#38bdf8', width: 0.1, dash: '', name: '有线连接', isContain: false },
  'fiber':         { color: '#22d3ee', width: 0.15, dash: '', name: '光纤', isContain: false },
  'wireless':      { color: '#fbbf24', width: 0.1, dash: '1 0.5', name: '无线连接', isContain: false },
  'satellite-link':{ color: '#a78bfa', width: 0.1, dash: '2 1', name: '卫星链路', isContain: false },
}

const legendConfig = {
  show: true,
  position: 'left-bottom' as const,
  nodeTypes: ['router', 'comm', 'ship', 'station', 'terminal', 'gps'],
  relationTypes: ['contain', 'wired', 'fiber', 'wireless', 'satellite-link'],
  showStatus: true,
  sectionTitles: {
    nodes: '节点类型',
    relations: '关系类型',
    status: '状态',
  },
}
</script>

<style>
html, body, #app { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }
.app-wrap { width: 100%; height: 100%; position: relative; }

/* 力布局参数面板 */
.force-panel {
  position: absolute;
  top: 56px;
  right: 16px;
  width: 280px;
  background: #0f172aee;
  border: 1px solid #1e3a5f;
  border-radius: 10px;
  z-index: 20;
  font-family: "Microsoft YaHei", sans-serif;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  overflow: hidden;
}
.force-panel.collapsed { width: auto; }
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  color: #38bdf8;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid #1e3a5f;
}
.panel-header:hover { background: #16213e; }
.toggle { font-size: 10px; color: #64748b; }
.panel-body {
  padding: 10px 14px 14px;
  max-height: 60vh;
  overflow-y: auto;
}
.param-group {
  margin-bottom: 12px;
}
.param-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
  font-size: 12px;
  margin-bottom: 4px;
}
.param-group .val {
  color: #38bdf8;
  font-weight: 600;
  font-family: monospace;
  font-size: 13px;
  min-width: 40px;
  text-align: right;
}
.param-group input[type="range"] {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #1e3a5f;
  border-radius: 2px;
  outline: none;
}
.param-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #38bdf8;
  cursor: pointer;
  border: 2px solid #0f172a;
  box-shadow: 0 0 4px rgba(56,189,248,0.5);
}
.param-group input[type="range"]::-webkit-slider-thumb:hover {
  background: #7dd3fc;
}
.param-group .hint {
  display: block;
  color: #475569;
  font-size: 10px;
  margin-top: 2px;
}
.panel-sep {
  border-top: 1px solid #1e3a5f;
  margin: 12px 0;
}
.panel-actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}
.reset-btn {
  flex: 1;
  padding: 6px 0;
  background: #1e3a5f;
  border: 1px solid #38bdf8;
  color: #38bdf8;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-family: "Microsoft YaHei", sans-serif;
  transition: all 0.2s;
}
.reset-btn:hover {
  background: #38bdf8;
  color: #0f172a;
}

/* 节点大小缩放（独立浮窗） */
.scale-panel {
  position: absolute;
  top: 56px;
  right: 200px;
  width: 180px;
  background: #0f172aee;
  border: 1px solid #1e3a5f;
  border-radius: 10px;
  padding: 10px 14px 12px;
  z-index: 20;
  font-family: "Microsoft YaHei", sans-serif;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.scale-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #38bdf8;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}
.scale-val {
  color: #38bdf8;
  font-weight: 600;
  font-family: monospace;
  font-size: 13px;
}
.scale-slider {
  width: 100%;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: #1e3a5f;
  border-radius: 2px;
  outline: none;
}
.scale-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #38bdf8;
  cursor: pointer;
  border: 2px solid #0f172a;
  box-shadow: 0 0 4px rgba(56,189,248,0.5);
}
.scale-slider::-webkit-slider-thumb:hover {
  background: #7dd3fc;
}
</style>
