/* ================================================================
 *  默认配置
 * ================================================================ */

import type { NodeTypeConfig, RelationTypeConfig } from './types'

export const defaultNodeTypes: Record<string, NodeTypeConfig> = {
  'router':       { icon: '🔀', name: '路由器', color: '#38bdf8', radius: 16 },
  'comm':         { icon: '📡', name: '通信机', color: '#22d3ee', radius: 16 },
  'ship':         { icon: '🚢', name: '货船', color: '#06b6d4', radius: 18 },
  'station':      { icon: '🏠', name: '通信站', color: '#eab308', radius: 20 },
  'terminal':     { icon: '💻', name: '终端', color: '#a78bfa', radius: 14 },
  'gps':          { icon: '🛰', name: 'GPS', color: '#f97316', radius: 14 },
  'satellite':    { icon: '🛰', name: '卫星', color: '#a855f7', radius: 16 },
  'buoy':         { icon: '🔵', name: '浮标', color: '#3b82f6', radius: 14 },
  'vehicle':      { icon: '🚗', name: '车辆', color: '#22c55e', radius: 16 },
  'aircraft':     { icon: '✈️', name: '飞行器', color: '#f43f5e', radius: 16 },
  'antenna':      { icon: '📡', name: '天线', color: '#14b8a6', radius: 14 },
  'server':       { icon: '🖥', name: '服务器', color: '#8b5cf6', radius: 16 },
  'switch':       { icon: '🔌', name: '交换机', color: '#64748b', radius: 15 },
  'base-station': { icon: 'tower', name: '基站', color: '#f59e0b', radius: 18 },
}

export const defaultRelationTypes: Record<string, RelationTypeConfig> = {
  'contain': {
    color: '#334155',
    width: 1,
    dash: '',
    name: '包含关系',
    isContain: true,
  },
  'communicate': {
    color: '#fbbf24',
    width: 1.5,
    dash: '',
    name: '通信关系',
    isContain: false,
  },
  'wired': {
    color: '#38bdf8',
    width: 1.5,
    dash: '',
    name: '有线连接',
    isContain: false,
  },
  'fiber': {
    color: '#22d3ee',
    width: 1.5,
    dash: '',
    name: '光纤',
    isContain: false,
  },
  'wireless': {
    color: '#fbbf24',
    width: 1,
    dash: '',
    name: '无线连接',
    isContain: false,
  },
  'satellite-link': {
    color: '#a78bfa',
    width: 1.5,
    dash: '',
    name: '卫星链路',
    isContain: false,
  },
  '4g': {
    color: '#34d399',
    width: 1,
    dash: '',
    name: '4G',
    isContain: false,
  },
  '5g': {
    color: '#f472b6',
    width: 1.5,
    dash: '',
    name: '5G',
    isContain: false,
  },
  'microwave': {
    color: '#67e8f9',
    width: 1,
    dash: '',
    name: '微波',
    isContain: false,
  },
}

/** 默认状态颜色映射 */
export const statusColors: Record<string, string> = {
  'online': '#22c55e',
  'offline': '#ef4444',
  'connected': '#22c55e',
  'disconnected': '#ef4444',
  'warning': '#f59e0b',
  'error': '#ef4444',
  'normal': '#22c55e',
  'active': '#38bdf8',
  'inactive': '#64748b',
}