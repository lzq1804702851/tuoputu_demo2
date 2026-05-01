<template>
  <TopologyGraph
    :data="mockData"
    :legend="legendConfig"
    :show-toolbar="true"
  />
</template>

<script setup lang="ts">
import { TopologyGraph } from 'topology-graph-vue'
import { mockData } from './mock-data'

const legendConfig = {
  show: true,
  position: 'left-bottom' as const,
  deviceTypes: ['terminal', 'comm-device', 'router', 'gps'],
  linkTypes: ['internal', 'fiber', 'wired', 'wireless'],
  showStatus: true,
}
</script>

<style>
html, body, #app { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }
</style>
