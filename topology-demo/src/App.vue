<template>
  <TopologyGraph
    :data="mockData"
    :node-types="nodeTypeConfig"
    :relation-types="relationTypeConfig"
    :legend="legendConfig"
    :show-toolbar="true"
    :map-center-lng="110"
    :map-center-lat="15"
    :map-zoom="1"
    :node-labels="['ip', 'speed']"
  />
</template>

<script setup lang="ts">
import { TopologyGraph } from 'topology-graph-vue'
import type { NodeTypeConfig, RelationTypeConfig } from 'topology-graph-vue'
import { mockData } from './mock-data'

const nodeTypeConfig: Record<string, NodeTypeConfig> = {
  'router':   { icon: '🔀', name: '路由器', color: '#38bdf8', radius: 14 },
  'comm':     { icon: '📡', name: '通信机', color: '#22d3ee', radius: 14 },
  'ship':     { icon: '🚢', name: '货船', color: '#06b6d4', radius: 16 },
  'station':  { icon: '🏠', name: '通信站', color: '#eab308', radius: 18 },
  'terminal': { icon: '💻', name: '终端', color: '#a78bfa', radius: 12 },
  'gps':      { icon: '🛰', name: 'GPS', color: '#f97316', radius: 12 },
}

const relationTypeConfig: Record<string, RelationTypeConfig> = {
  'contain':       { color: '#334155', width: 1, dash: '4 2', name: '包含关系', isContain: true },
  'communicate':   { color: '#fbbf24', width: 1.5, dash: '', name: '通信关系', isContain: false },
  'wired':         { color: '#38bdf8', width: 1.5, dash: '', name: '有线连接', isContain: false },
  'fiber':         { color: '#22d3ee', width: 2, dash: '', name: '光纤', isContain: false },
  'wireless':      { color: '#fbbf24', width: 1, dash: '3 3', name: '无线连接', isContain: false },
  'satellite-link':{ color: '#a78bfa', width: 1.5, dash: '8 4', name: '卫星链路', isContain: false },
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
</style>