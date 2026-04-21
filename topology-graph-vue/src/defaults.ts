import type { DeviceTypeConfig, LinkTypeConfig, GroupTypeConfig } from './types'

export const defaultDeviceTypes: Record<string, DeviceTypeConfig> = {
  'terminal':     { icon: '💻', name: '终端' },
  'comm-device':  { icon: '📡', name: '通信机' },
  'router':       { icon: '🔀', name: '路由器' },
  'switch':       { icon: '🔌', name: '交换机' },
  'server':       { icon: '🖥', name: '服务器' },
  'gps':          { icon: '🛰', name: 'GPS' },
  'antenna':      { icon: '📏', name: '天线' },
  'base-station': { icon: '🏠', name: '基站' },
}

export const defaultLinkTypes: Record<string, LinkTypeConfig> = {
  'internal':  { color: '#334155', width: 1,   dash: '4 2',       name: '内部链路' },
  'wired':     { color: '#38bdf8', width: 1.5, dash: '',           name: '有线' },
  'fiber':     { color: '#22d3ee', width: 1.5, dash: '',           name: '光纤' },
  'wireless':  { color: '#fbbf24', width: 1,   dash: '3 3',       name: '超短波' },
  'satellite': { color: '#a78bfa', width: 1.5, dash: '8 4',       name: '卫星通道' },
  '4g':        { color: '#34d399', width: 1,   dash: '2 4 6 4',   name: '4G' },
  '5g':        { color: '#f472b6', width: 1.5, dash: '6 3 2 3',   name: '5G' },
  'microwave': { color: '#67e8f9', width: 1,   dash: '10 2 3 2',  name: '微波' },
}

export const defaultGroupTypes: Record<string, GroupTypeConfig> = {
  'island':        { color: '#38bdf8', name: '岛屿' },
  'route-station': { color: '#22d3ee', name: '路由站' },
  'ship':          { color: '#06b6d4', name: '船只' },
  'aircraft':      { color: '#3b82f6', name: '飞行器' },
  'vehicle':       { color: '#22c55e', name: '车辆' },
  'satellite':     { color: '#a855f7', name: '卫星' },
  'buoy':          { color: '#f97316', name: '浮标' },
  'station':       { color: '#eab308', name: '基站' },
}
