import type { TopologyData } from 'topology-graph-vue'

/**
 * 福州市区域拓扑图 Mock 数据
 * 中心坐标：福州市 (119.3°E, 26.08°N)
 * 节点分布在福州市及周边 ±0.5° 范围内
 */
export const mockData: TopologyData = {
  nodes: [
    /* ======== 福州市核心通信网 ======== */
    // 福州市核心通信站（包含多个子设备）
    {
      uuid: 'fz-core', name: '福州市核心通信站', type_id: 'station',
      status: 'online', lng: 119.30, lat: 26.08,
      extra: { address: '福州市鼓楼区', ip: '192.168.0.1', capacity: '1Gbps' },
    },
    // 福州市备用通信站
    {
      uuid: 'fz-backup', name: '福州市备用通信站', type_id: 'station',
      status: 'online', lng: 119.32, lat: 26.06,
      extra: { address: '福州市台江区', ip: '192.168.0.2', capacity: '500Mbps' },
    },
    // 马尾港通信站
    {
      uuid: 'mw-sta', name: '马尾港通信站', type_id: 'station',
      status: 'online', lng: 119.46, lat: 26.00,
      extra: { address: '马尾区', ip: '192.168.0.3', capacity: '200Mbps' },
    },
    // 长乐机场通信站
    {
      uuid: 'cl-sta', name: '长乐机场通信站', type_id: 'station',
      status: 'warning', lng: 119.50, lat: 25.93,
      extra: { address: '长乐区', ip: '192.168.0.4', capacity: '300Mbps', alert: '信号波动' },
    },

    /* ======== 核心路由器 ======== */
    {
      uuid: 'fz-router1', name: '核心路由器A', type_id: 'router',
      status: 'online', lng: 119.29, lat: 26.09,
      extra: { ip: '10.0.0.1', model: 'H3C SR8800', ports: 48 },
    },
    {
      uuid: 'fz-router2', name: '核心路由器B', type_id: 'router',
      status: 'offline', lng: 119.33, lat: 26.05,
      extra: { ip: '10.0.0.2', model: 'Cisco 7600', ports: 96 },
    },

    /* ======== 通信机 ======== */
    {
      uuid: 'fz-comm1', name: '鼓楼通信机', type_id: 'comm',
      status: 'online', lng: 119.28, lat: 26.10,
      extra: { ip: '10.0.1.1', frequency: '5GHz' },
    },
    {
      uuid: 'fz-comm2', name: '台江通信机', type_id: 'comm',
      status: 'online', lng: 119.31, lat: 26.07,
      extra: { ip: '10.0.1.2', frequency: '2.4GHz' },
    },
    {
      uuid: 'fz-comm3', name: '马尾通信机', type_id: 'comm',
      status: 'online', lng: 119.47, lat: 26.01,
      extra: { ip: '10.0.1.3', frequency: '5GHz' },
    },
    {
      uuid: 'fz-comm4', name: '长乐通信机', type_id: 'comm',
      status: 'warning', lng: 119.51, lat: 25.94,
      extra: { ip: '10.0.1.4', frequency: '卫星', alert: '信号弱' },
    },

    /* ======== 终端设备 ======== */
    {
      uuid: 'fz-term1', name: '鼓楼终端A', type_id: 'terminal',
      status: 'online', lng: 119.295, lat: 26.085,
    },
    {
      uuid: 'fz-term2', name: '台江终端B', type_id: 'terminal',
      status: 'offline', lng: 119.315, lat: 26.065,
    },
    {
      uuid: 'fz-term3', name: '马尾终端C', type_id: 'terminal',
      status: 'online', lng: 119.465, lat: 25.995,
    },
    {
      uuid: 'fz-term4', name: '长乐终端D', type_id: 'terminal',
      status: 'online', lng: 119.505, lat: 25.935,
    },

    /* ======== GPS ======== */
    {
      uuid: 'fz-gps1', name: '核心站GPS', type_id: 'gps',
      status: 'online', lng: 119.305, lat: 26.075,
      extra: { accuracy: '±2m' },
    },
    {
      uuid: 'fz-gps2', name: '马尾站GPS', type_id: 'gps',
      status: 'online', lng: 119.455, lat: 26.005,
      extra: { accuracy: '±3m' },
    },

    /* ======== 海上货船 (5艘) ======== */
    ...Array.from({ length: 5 }, (_, i) => ({
      uuid: `ship${i}`,
      name: `闽货${i + 1}号`,
      type_id: 'ship' as const,
      status: i === 2 ? 'offline' as const : 'online' as const,
      lng: 119.35 + i * 0.08 + (Math.random() - 0.5) * 0.02,
      lat: 25.85 + Math.random() * 0.1,
      extra: {
        speed: (8 + Math.random() * 12).toFixed(1) + '节',
        heading: Math.floor(Math.random() * 360) + '°',
        cargo: ['煤炭', '铁矿', '集装箱', '原油', '粮食'][i % 5],
        tonnage: (10000 + Math.floor(Math.random() * 40000)) + '吨',
      },
    })),

    /* ======== 船上设备 ======== */
    ...Array.from({ length: 5 }, (_, i) => [
      {
        uuid: `s${i}-comm`,
        name: `闽货${i + 1}号通信机`,
        type_id: 'comm' as const,
        status: i === 2 ? 'offline' as const : 'online' as const,
        lng: 119.35 + i * 0.08 + (Math.random() - 0.5) * 0.01,
        lat: 25.85 + Math.random() * 0.08,
        extra: { ip: `10.1.${i}.1`, frequency: i % 2 === 0 ? '卫星' : 'VHF' },
      },
      {
        uuid: `s${i}-term`,
        name: `闽货${i + 1}号终端`,
        type_id: 'terminal' as const,
        status: i === 0 ? 'offline' as const : 'online' as const,
        lng: 119.35 + i * 0.08 + (Math.random() - 0.5) * 0.01,
        lat: 25.85 + Math.random() * 0.08,
        extra: {},
      },
      {
        uuid: `s${i}-gps`,
        name: `闽货${i + 1}号GPS`,
        type_id: 'gps' as const,
        status: i === 4 ? 'offline' as const : 'online' as const,
        lng: 119.35 + i * 0.08 + (Math.random() - 0.5) * 0.01,
        lat: 25.85 + Math.random() * 0.08,
        extra: { accuracy: '±5m' },
      },
    ]).flat(),
  ],

  relations: [
    /* ======== 包含关系 ======== */
    // 福州市核心通信站包含子设备
    { uuid: 'c-core-r1', name: '', type_id: 'contain', status: 'active', from_id: 'fz-core', to_id: 'fz-router1' },
    { uuid: 'c-core-c1', name: '', type_id: 'contain', status: 'active', from_id: 'fz-core', to_id: 'fz-comm1' },
    { uuid: 'c-core-t1', name: '', type_id: 'contain', status: 'active', from_id: 'fz-core', to_id: 'fz-term1' },
    { uuid: 'c-core-g1', name: '', type_id: 'contain', status: 'active', from_id: 'fz-core', to_id: 'fz-gps1' },

    // 福州市备用通信站包含子设备
    { uuid: 'c-back-r2', name: '', type_id: 'contain', status: 'active', from_id: 'fz-backup', to_id: 'fz-router2' },
    { uuid: 'c-back-c2', name: '', type_id: 'contain', status: 'active', from_id: 'fz-backup', to_id: 'fz-comm2' },
    { uuid: 'c-back-t2', name: '', type_id: 'contain', status: 'active', from_id: 'fz-backup', to_id: 'fz-term2' },

    // 马尾港通信站包含子设备
    { uuid: 'c-mw-c3', name: '', type_id: 'contain', status: 'active', from_id: 'mw-sta', to_id: 'fz-comm3' },
    { uuid: 'c-mw-t3', name: '', type_id: 'contain', status: 'active', from_id: 'mw-sta', to_id: 'fz-term3' },
    { uuid: 'c-mw-g2', name: '', type_id: 'contain', status: 'active', from_id: 'mw-sta', to_id: 'fz-gps2' },

    // 长乐机场通信站包含子设备
    { uuid: 'c-cl-c4', name: '', type_id: 'contain', status: 'active', from_id: 'cl-sta', to_id: 'fz-comm4' },
    { uuid: 'c-cl-t4', name: '', type_id: 'contain', status: 'active', from_id: 'cl-sta', to_id: 'fz-term4' },

    // 船包含设备
    ...Array.from({ length: 5 }, (_, i) => [
      { uuid: `c-s${i}-comm`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-comm` },
      { uuid: `c-s${i}-term`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-term` },
      { uuid: `c-s${i}-gps`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-gps` },
    ]).flat(),

    /* ======== 通信关系 ======== */
    // 核心站内部通信
    { uuid: 'l-core-t1c1', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'fz-term1', to_id: 'fz-comm1' },
    { uuid: 'l-core-c1r1', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'fz-comm1', to_id: 'fz-router1' },

    // 备用站内部通信
    { uuid: 'l-back-t2c2', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'fz-term2', to_id: 'fz-comm2' },
    { uuid: 'l-back-c2r2', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'fz-comm2', to_id: 'fz-router2' },

    // 马尾站内部通信
    { uuid: 'l-mw-t3c3', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'fz-term3', to_id: 'fz-comm3' },

    // 长乐站内部通信
    { uuid: 'l-cl-t4c4', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'fz-term4', to_id: 'fz-comm4' },

    // 站间骨干链路
    { uuid: 'l-core-back', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'fz-router1', to_id: 'fz-router2', extra: { bandwidth: '10Gbps' } },
    { uuid: 'l-core-mw', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'fz-router1', to_id: 'fz-comm3', extra: { bandwidth: '1Gbps' } },
    { uuid: 'l-core-cl', name: '无线中继', type_id: 'satellite-link', status: 'connected', from_id: 'fz-router1', to_id: 'fz-comm4', extra: { delay: '15ms' } },

    // 船与岸站通信
    ...Array.from({ length: 5 }, (_, i) => [
      { uuid: `l-s${i}-core`, name: '无线通信', type_id: 'wireless', status: i === 2 ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: 'fz-comm1', extra: { protocol: 'VHF', distance: Math.floor(10 + Math.random() * 30) + 'km' } },
      { uuid: `l-s${i}-mw`, name: '无线通信', type_id: 'wireless', status: i === 2 ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: 'fz-comm3' },
      { uuid: `l-s${i}-internal`, name: '船内通信', type_id: 'wired', status: 'connected' as const, from_id: `s${i}-term`, to_id: `s${i}-comm` },
    ]).flat(),

    // 船间通信
    { uuid: 'l-ss-01', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship0', to_id: 'ship1', extra: { protocol: 'AIS' } },
    { uuid: 'l-ss-23', name: '船间通信', type_id: 'wireless', status: 'disconnected', from_id: 'ship2', to_id: 'ship3', extra: { protocol: 'AIS', reason: '超出范围' } },
    { uuid: 'l-ss-34', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship3', to_id: 'ship4', extra: { protocol: 'AIS' } },
  ].flat(),
}