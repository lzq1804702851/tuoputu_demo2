import type { TopologyData } from 'topology-graph-vue'

/**
 * 南海区域拓扑图 Mock 数据
 * 坐标范围：经度 108-122°E，纬度 3-22°N
 * 包含：海南岛通信网、大洲岛通信网、海上路由站、货船队、西沙/南沙通信站
 */
export const mockData: TopologyData = {
  nodes: [
    /* ======== 海南岛通信网 ======== */
    // 海南岛（作为包含父节点）
    {
      uuid: 'hainan-net', name: '海南岛有线通信网', type_id: 'station',
      status: 'online', lng: 109.8, lat: 19.2,
      extra: { area: '海南岛', level: '区域中心' },
    },
    // 海南岛1号通信站
    {
      uuid: 'hn-sta1', name: '海南岛1号通信站', type_id: 'station',
      status: 'online', lng: 109.6, lat: 19.5,
      extra: { address: '海口市', ip: '192.168.1.1', capacity: '100Mbps' },
    },
    // 海南岛2号通信站
    {
      uuid: 'hn-sta2', name: '海南岛2号通信站', type_id: 'station',
      status: 'online', lng: 110.0, lat: 18.8,
      extra: { address: '三亚市', ip: '192.168.1.2', capacity: '80Mbps' },
    },
    // 海南岛核心路由器
    {
      uuid: 'hn-router', name: '海南岛核心路由器', type_id: 'router',
      status: 'offline', lng: 109.8, lat: 19.0,
      extra: { ip: '10.0.0.1', model: 'H3C SR8800', ports: 48 },
    },
    // 海南岛通信机1
    {
      uuid: 'hn-comm1', name: '海口通信机', type_id: 'comm',
      status: 'online', lng: 109.55, lat: 19.6,
      extra: { ip: '10.0.1.1', frequency: '2.4GHz' },
    },
    // 海南岛通信机2
    {
      uuid: 'hn-comm2', name: '三亚通信机', type_id: 'comm',
      status: 'online', lng: 110.05, lat: 18.75,
      extra: { ip: '10.0.1.2', frequency: '5GHz' },
    },
    // 海南岛终端
    {
      uuid: 'hn-term1', name: '海口终端A', type_id: 'terminal',
      status: 'online', lng: 109.5, lat: 19.7,
    },
    {
      uuid: 'hn-term2', name: '三亚终端B', type_id: 'terminal',
      status: 'offline', lng: 110.1, lat: 18.7,
    },

    /* ======== 大洲岛通信网 ======== */
    {
      uuid: 'dazhou-net', name: '大洲岛通信网', type_id: 'station',
      status: 'online', lng: 111.0, lat: 18.5,
      extra: { area: '大洲岛', level: '岛屿站' },
    },
    {
      uuid: 'dz-comm', name: '大洲岛通信机', type_id: 'comm',
      status: 'online', lng: 110.95, lat: 18.55,
      extra: { ip: '10.0.2.1', frequency: '2.4GHz' },
    },
    {
      uuid: 'dz-router', name: '大洲岛路由器', type_id: 'router',
      status: 'online', lng: 111.05, lat: 18.45,
      extra: { ip: '10.0.2.2', model: 'Cisco 3900' },
    },
    {
      uuid: 'dz-term', name: '大洲岛终端', type_id: 'terminal',
      status: 'online', lng: 110.9, lat: 18.6,
    },

    /* ======== 海上路由站 ======== */
    {
      uuid: 'sea-relay', name: '海上有线路由站', type_id: 'station',
      status: 'online', lng: 112.5, lat: 16.0,
      extra: { type: '海上中继', depth: '海底光缆' },
    },
    {
      uuid: 'sea-router', name: '海上核心路由器', type_id: 'router',
      status: 'online', lng: 112.5, lat: 15.8,
      extra: { ip: '10.0.100.1', model: 'Huawei NE40E', redundancy: '双机热备' },
    },

    /* ======== 西沙通信站 ======== */
    {
      uuid: 'xisha-sta', name: '西沙通信站', type_id: 'station',
      status: 'online', lng: 112.3, lat: 16.8,
      extra: { area: '西沙永兴岛', ip: '10.0.3.1' },
    },
    {
      uuid: 'xisha-comm', name: '西沙通信机', type_id: 'comm',
      status: 'online', lng: 112.25, lat: 16.85,
      extra: { ip: '10.0.3.2', frequency: '卫星通信' },
    },

    /* ======== 南沙通信站 ======== */
    {
      uuid: 'nansha-sta', name: '南沙通信站', type_id: 'station',
      status: 'online', lng: 114.2, lat: 10.0,
      extra: { area: '南沙渚碧礁', ip: '10.0.4.1' },
    },
    {
      uuid: 'nansha-comm', name: '南沙通信机', type_id: 'comm',
      status: 'warning', lng: 114.25, lat: 9.95,
      extra: { ip: '10.0.4.2', frequency: '卫星通信', alert: '信号弱' },
    },

    /* ======== 货船队 (10艘) ======== */
    ...Array.from({ length: 10 }, (_, i) => ({
      uuid: `ship${i}`,
      name: `${i + 1}号货船`,
      type_id: 'ship' as const,
      status: (i === 2 || i === 7) ? 'offline' as const : 'online' as const,
      lng: 109 + Math.random() * 8,
      lat: 8 + Math.random() * 10,
      extra: {
        speed: (8 + Math.random() * 12).toFixed(1) + '节',
        heading: Math.floor(Math.random() * 360) + '°',
        cargo: ['煤炭', '铁矿', '集装箱', '原油', '粮食'][i % 5],
        tonnage: (10000 + Math.floor(Math.random() * 40000)) + '吨',
      },
    })),

    /* ======== 船上设备（每艘船的通信机和终端）======== */
    ...Array.from({ length: 10 }, (_, i) => [
      {
        uuid: `s${i}-comm`,
        name: `${i + 1}号船通信机`,
        type_id: 'comm' as const,
        status: (i === 2 || i === 7) ? 'offline' as const : 'online' as const,
        lng: 109 + Math.random() * 8,
        lat: 8 + Math.random() * 10,
        extra: { ip: `10.1.${i}.1`, frequency: i % 3 === 0 ? '卫星' : 'VHF' },
      },
      {
        uuid: `s${i}-term`,
        name: `${i + 1}号船终端`,
        type_id: 'terminal' as const,
        status: i === 0 ? 'offline' as const : 'online' as const,
        lng: 109 + Math.random() * 8,
        lat: 8 + Math.random() * 10,
        extra: {},
      },
      {
        uuid: `s${i}-gps`,
        name: `${i + 1}号船GPS`,
        type_id: 'gps' as const,
        status: i === 4 ? 'offline' as const : 'online' as const,
        lng: 109 + Math.random() * 8,
        lat: 8 + Math.random() * 10,
        extra: { accuracy: '±2m' },
      },
    ]).flat(),
  ],

  relations: [
    /* ======== 包含关系 ======== */
    // 海南岛包含其子节点
    { uuid: 'c-hn-sta1', name: '', type_id: 'contain', status: 'active', from_id: 'hainan-net', to_id: 'hn-sta1' },
    { uuid: 'c-hn-sta2', name: '', type_id: 'contain', status: 'active', from_id: 'hainan-net', to_id: 'hn-sta2' },
    { uuid: 'c-hn-router', name: '', type_id: 'contain', status: 'active', from_id: 'hainan-net', to_id: 'hn-router' },
    { uuid: 'c-hn-comm1', name: '', type_id: 'contain', status: 'active', from_id: 'hn-sta1', to_id: 'hn-comm1' },
    { uuid: 'c-hn-term1', name: '', type_id: 'contain', status: 'active', from_id: 'hn-sta1', to_id: 'hn-term1' },
    { uuid: 'c-hn-comm2', name: '', type_id: 'contain', status: 'active', from_id: 'hn-sta2', to_id: 'hn-comm2' },
    { uuid: 'c-hn-term2', name: '', type_id: 'contain', status: 'active', from_id: 'hn-sta2', to_id: 'hn-term2' },
    // 大洲岛包含
    { uuid: 'c-dz-comm', name: '', type_id: 'contain', status: 'active', from_id: 'dazhou-net', to_id: 'dz-comm' },
    { uuid: 'c-dz-router', name: '', type_id: 'contain', status: 'active', from_id: 'dazhou-net', to_id: 'dz-router' },
    { uuid: 'c-dz-term', name: '', type_id: 'contain', status: 'active', from_id: 'dazhou-net', to_id: 'dz-term' },
    // 海上路由站包含
    { uuid: 'c-sea-router', name: '', type_id: 'contain', status: 'active', from_id: 'sea-relay', to_id: 'sea-router' },
    // 西沙站包含
    { uuid: 'c-xisha-comm', name: '', type_id: 'contain', status: 'active', from_id: 'xisha-sta', to_id: 'xisha-comm' },
    // 南沙站包含
    { uuid: 'c-nansha-comm', name: '', type_id: 'contain', status: 'active', from_id: 'nansha-sta', to_id: 'nansha-comm' },
    // 船包含设备
    ...Array.from({ length: 10 }, (_, i) => [
      { uuid: `c-s${i}-comm`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-comm` },
      { uuid: `c-s${i}-term`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-term` },
      { uuid: `c-s${i}-gps`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-gps` },
    ]).flat(),

    /* ======== 通信关系 ======== */
    // 岛内通信
    { uuid: 'l-hn-t1c1', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'hn-term1', to_id: 'hn-comm1' },
    { uuid: 'l-hn-t2c2', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'hn-term2', to_id: 'hn-comm2' },
    { uuid: 'l-hn-c1r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'hn-comm1', to_id: 'hn-router' },
    { uuid: 'l-hn-c2r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'hn-comm2', to_id: 'hn-router' },
    { uuid: 'l-dz-tc', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'dz-term', to_id: 'dz-comm' },
    { uuid: 'l-dz-cr', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'dz-comm', to_id: 'dz-router' },

    // 岛际/海上路由
    { uuid: 'l-hn-sea', name: '海底光缆', type_id: 'fiber', status: 'connected', from_id: 'hn-router', to_id: 'sea-router', extra: { bandwidth: '10Gbps', length: '280km' } },
    { uuid: 'l-dz-sea', name: '海底光缆', type_id: 'fiber', status: 'connected', from_id: 'dz-router', to_id: 'sea-router', extra: { bandwidth: '10Gbps', length: '150km' } },
    { uuid: 'l-xisha-sea', name: '海底光缆', type_id: 'fiber', status: 'connected', from_id: 'xisha-comm', to_id: 'sea-router' },
    { uuid: 'l-nansha-sea', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'nansha-comm', to_id: 'sea-router', extra: { satellite: '中星6B', delay: '250ms' } },

    // 船与岸站通信（无线）
    ...Array.from({ length: 10 }, (_, i) => {
      const links = [
        { uuid: `l-s${i}-dz`, name: '无线通信', type_id: 'wireless' as const, status: (i === 2 || i === 7) ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: 'dz-comm', extra: { protocol: 'VHF', distance: Math.floor(50 + Math.random() * 200) + 'km' } },
        { uuid: `l-s${i}-hn1`, name: '无线通信', type_id: 'wireless' as const, status: (i === 2 || i === 7) ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: 'hn-comm1' },
        { uuid: `l-s${i}-hn2`, name: '无线通信', type_id: 'wireless' as const, status: (i === 2 || i === 7) ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: 'hn-comm2' },
      ]
      // 船内通信
      links.push({ uuid: `l-s${i}-internal`, name: '船内通信', type_id: 'wired' as const, status: 'connected' as const, from_id: `s${i}-term`, to_id: `s${i}-comm` })
      return links
    }).flat(),

    // 船与船之间的通信（部分）
    { uuid: 'l-ss-01', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship0', to_id: 'ship1', extra: { protocol: 'AIS' } },
    { uuid: 'l-ss-34', name: '船间通信', type_id: 'wireless', status: 'disconnected', from_id: 'ship3', to_id: 'ship4', extra: { protocol: 'AIS', reason: '超出范围' } },
    { uuid: 'l-ss-56', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship5', to_id: 'ship6', extra: { protocol: 'AIS' } },
  ].flat(),
}