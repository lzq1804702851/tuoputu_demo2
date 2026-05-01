import type { TopologyData } from 'topology-graph-vue'

/* ================================================================
 *  福州市区域拓扑图 Mock 数据
 *  范围：119.20°~119.70°E, 25.75°~26.15°N
 *  覆盖福州市区、马尾、长乐、福清、平潭等区域
 * ================================================================ */

// 区域定义
const areas = {
  gulou:    { lng: 119.30, lat: 26.10 }, // 鼓楼
  taijiang: { lng: 119.32, lat: 26.06 }, // 台江
  cangshan: { lng: 119.33, lat: 26.04 }, // 仓山
  'jin-an':   { lng: 119.34, lat: 26.08 }, // 晋安
  mawei:    { lng: 119.46, lat: 26.00 }, // 马尾
  changle:  { lng: 119.50, lat: 25.96 }, // 长乐
  fuqing:   { lng: 119.38, lat: 25.72 }, // 福清
  lianjiang:{ lng: 119.53, lat: 26.08 }, // 连江
  luoyuan:  { lng: 119.55, lat: 26.15 }, // 罗源
  minhou:   { lng: 118.85, lat: 26.15 }, // 闽侯 (off to the west, skip)
  pingtan:  { lng: 119.78, lat: 25.50 }, // 平潭 (off to the east, skip)
  minqing:  { lng: 118.60, lat: 26.22 }, // 闽清 (too far west, skip)
  yongtai:  { lng: 118.95, lat: 25.87 }, // 永泰
}

// 随机偏移
const jitter = (base: number, range: number) => base + (Math.random() - 0.5) * range

export const mockData: TopologyData = {
  nodes: [
    /* ======== 通信站（10个） ======== */
    { uuid: 'sta-gulou',    name: '鼓楼核心通信站',   type_id: 'station', status: 'online',  lng: 119.295, lat: 26.095, extra: { address: '鼓楼区五一路', ip: '192.168.0.1', capacity: '1Gbps' } },
    { uuid: 'sta-taijiang', name: '台江通信站',       type_id: 'station', status: 'online',  lng: 119.315, lat: 26.065, extra: { address: '台江区工业路', ip: '192.168.0.2', capacity: '500Mbps' } },
    { uuid: 'sta-cangshan', name: '仓山通信站',       type_id: 'station', status: 'online',  lng: 119.325, lat: 26.035, extra: { address: '仓山区上三路', ip: '192.168.0.3', capacity: '500Mbps' } },
    { uuid: 'sta-jinan',    name: '晋安通信站',       type_id: 'station', status: 'warning', lng: 119.345, lat: 26.085, extra: { address: '晋安区福新路', ip: '192.168.0.4', capacity: '300Mbps', alert: '信号波动' } },
    { uuid: 'sta-mawei',    name: '马尾港通信站',     type_id: 'station', status: 'online',  lng: 119.455, lat: 26.005, extra: { address: '马尾区港口路', ip: '192.168.0.5', capacity: '200Mbps' } },
    { uuid: 'sta-changle',  name: '长乐机场通信站',   type_id: 'station', status: 'online',  lng: 119.525, lat: 25.955, extra: { address: '长乐区机场大道', ip: '192.168.0.6', capacity: '300Mbps' } },
    { uuid: 'sta-fuqing',   name: '福清通信站',       type_id: 'station', status: 'online',  lng: 119.385, lat: 25.725, extra: { address: '福清市清昌大道', ip: '192.168.0.7', capacity: '500Mbps' } },
    { uuid: 'sta-lianjiang',name: '连江通信站',       type_id: 'station', status: 'online',  lng: 119.535, lat: 26.085, extra: { address: '连江县八一七路', ip: '192.168.0.8', capacity: '200Mbps' } },
    { uuid: 'sta-luoyuan',  name: '罗源通信站',       type_id: 'station', status: 'offline', lng: 119.545, lat: 26.145, extra: { address: '罗源县凤山镇', ip: '192.168.0.9', capacity: '100Mbps' } },
    { uuid: 'sta-yongtai',  name: '永泰通信站',       type_id: 'station', status: 'online',  lng: 118.955, lat: 25.875, extra: { address: '永泰县樟城镇', ip: '192.168.0.10', capacity: '100Mbps' } },

    /* ======== 核心路由器（8个） ======== */
    { uuid: 'rt-core1',  name: '核心路由器A',    type_id: 'router', status: 'online',  lng: 119.290, lat: 26.100, extra: { ip: '10.0.0.1', model: 'H3C SR8800', ports: 48 } },
    { uuid: 'rt-core2',  name: '核心路由器B',    type_id: 'router', status: 'online',  lng: 119.320, lat: 26.055, extra: { ip: '10.0.0.2', model: 'Cisco 7600', ports: 96 } },
    { uuid: 'rt-cs',     name: '仓山路由器',     type_id: 'router', status: 'online',  lng: 119.330, lat: 26.030, extra: { ip: '10.0.0.3', model: 'H3C MSR56', ports: 24 } },
    { uuid: 'rt-ja',     name: '晋安路由器',     type_id: 'router', status: 'offline', lng: 119.350, lat: 26.090, extra: { ip: '10.0.0.4', model: 'Huawei NE40E', ports: 48 } },
    { uuid: 'rt-mw',     name: '马尾路由器',     type_id: 'router', status: 'online',  lng: 119.460, lat: 26.010, extra: { ip: '10.0.0.5', model: 'H3C SR6600', ports: 24 } },
    { uuid: 'rt-cl',     name: '长乐路由器',     type_id: 'router', status: 'online',  lng: 119.530, lat: 25.960, extra: { ip: '10.0.0.6', model: 'Cisco 3750', ports: 48 } },
    { uuid: 'rt-fq',     name: '福清路由器',     type_id: 'router', status: 'online',  lng: 119.390, lat: 25.730, extra: { ip: '10.0.0.7', model: 'H3C MSR30', ports: 24 } },
    { uuid: 'rt-lj',     name: '连江路由器',     type_id: 'router', status: 'online',  lng: 119.540, lat: 26.090, extra: { ip: '10.0.0.8', model: 'Huawei AR6280', ports: 24 } },

    /* ======== 通信机（16个） ======== */
    { uuid: 'cm-gl',   name: '鼓楼通信机1',    type_id: 'comm', status: 'online',  lng: 119.285, lat: 26.102, extra: { ip: '10.0.1.1', frequency: '5GHz' } },
    { uuid: 'cm-gl2',  name: '鼓楼通信机2',    type_id: 'comm', status: 'online',  lng: 119.300, lat: 26.088, extra: { ip: '10.0.1.11', frequency: '2.4GHz' } },
    { uuid: 'cm-tj',   name: '台江通信机',     type_id: 'comm', status: 'online',  lng: 119.310, lat: 26.068, extra: { ip: '10.0.1.2', frequency: '2.4GHz' } },
    { uuid: 'cm-cs',   name: '仓山通信机',     type_id: 'comm', status: 'online',  lng: 119.320, lat: 26.040, extra: { ip: '10.0.1.3', frequency: '5GHz' } },
    { uuid: 'cm-cs2',  name: '仓山通信机2',    type_id: 'comm', status: 'warning', lng: 119.335, lat: 26.025, extra: { ip: '10.0.1.12', frequency: '卫星', alert: '信号弱' } },
     uuid: 'cm-ja',   name: '晋安通信机',     type_id: 'comm', status: 'online',  lng: 119.350, lat: 26.082, extra: { ip: '10.0.1.4', frequency: '5GHz' } },
    { uuid: 'cm-mw',   name: '马尾通信机',     type_id: 'comm', status: 'online',  lng: 119.458, lat: 25.998, extra: { ip: '10.0.1.5', frequency: 'VHF' } },
    { uuid: 'cm-mw2',  name: '马尾通信机2',    type_id: 'comm', status: 'online',  lng: 119.468, lat: 26.012, extra: { ip: '10.0.1.13', frequency: '5GHz' } },
    { uuid: 'cm-cl',   name: '长乐通信机',     type_id: 'comm', status: 'online',  lng: 119.528, lat: 25.958, extra: { ip: '10.0.1.6', frequency: '卫星' } },
    { uuid: 'cm-fq',   name: '福清通信机',     type_id: 'comm', status: 'online',  lng: 119.388, lat: 25.728, extra: { ip: '10.0.1.7', frequency: '5GHz' } },
    { uuid: 'cm-fq2',  name: '福清通信机2',    type_id: 'comm', status: 'online',  lng: 119.395, lat: 25.720, extra: { ip: '10.0.1.14', frequency: '2.4GHz' } },
    { uuid: 'cm-lj',   name: '连江通信机',     type_id: 'comm', status: 'online',  lng: 119.538, lat: 26.088, extra: { ip: '10.0.1.8', frequency: 'VHF' } },
    { uuid: 'cm-ly',   name: '罗源通信机',     type_id: 'comm', status: 'offline', lng: 119.548, lat: 26.148, extra: { ip: '10.0.1.9', frequency: '5GHz' } },
    { uuid: 'cm-yt',   name: '永泰通信机',     type_id: 'comm', status: 'online',  lng: 118.952, lat: 25.872, extra: { ip: '10.0.1.10', frequency: '5GHz' } },
    { uuid: 'cm-sea1', name: '海上中继通信机A', type_id: 'comm', status: 'online',  lng: 119.42, lat: 25.88,  extra: { ip: '10.0.1.15', frequency: '卫星' } },
    { uuid: 'cm-sea2', name: '海上中继通信机B', type_id: 'comm', status: 'online',  lng: 119.58, lat: 25.92,  extra: { ip: '10.0.1.16', frequency: '卫星' } },

    /* ======== 终端（20个） ======== */
    { uuid: 'tm-gl1',  name: '鼓楼终端A',   type_id: 'terminal', status: 'online',  lng: 119.292, lat: 26.098 },
    { uuid: 'tm-gl2',  name: '鼓楼终端B',   type_id: 'terminal', status: 'online',  lng: 119.288, lat: 26.092 },
    { uuid: 'tm-tj1',  name: '台江终端A',   type_id: 'terminal', status: 'offline', lng: 119.318, lat: 26.062 },
    { uuid: 'tm-cs1',  name: '仓山终端A',   type_id: 'terminal', status: 'online',  lng: 119.322, lat: 26.038 },
    { uuid: 'tm-cs2',  name: '仓山终端B',   type_id: 'terminal', status: 'online',  lng: 119.328, lat: 26.045 },
    { uuid: 'tm-ja1',  name: '晋安终端A',   type_id: 'terminal', status: 'online',  lng: 119.348, lat: 26.088 },
    { uuid: 'tm-ja2',  name: '晋安终端B',   type_id: 'terminal', status: 'online',  lng: 119.352, lat: 26.080 },
    { uuid: 'tm-mw1',  name: '马尾终端A',   type_id: 'terminal', status: 'online',  lng: 119.452, lat: 26.002 },
    { uuid: 'tm-mw2',  name: '马尾终端B',   type_id: 'terminal', status: 'online',  lng: 119.462, lat: 26.008 },
    { uuid: 'tm-cl1',  name: '长乐终端A',   type_id: 'terminal', status: 'online',  lng: 119.522, lat: 25.952 },
    { uuid: 'tm-cl2',  name: '长乐终端B',   type_id: 'terminal', status: 'offline', lng: 119.535, lat: 25.965 },
    { uuid: 'tm-fq1',  name: '福清终端A',   type_id: 'terminal', status: 'online',  lng: 119.382, lat: 25.722 },
    { uuid: 'tm-fq2',  name: '福清终端B',   type_id: 'terminal', status: 'online',  lng: 119.392, lat: 25.730 },
    { uuid: 'tm-lj1',  name: '连江终端A',   type_id: 'terminal', status: 'online',  lng: 119.532, lat: 26.082 },
    { uuid: 'tm-ly1',  name: '罗源终端A',   type_id: 'terminal', status: 'offline', lng: 119.542, lat: 26.142 },
    { uuid: 'tm-yt1',  name: '永泰终端A',   type_id: 'terminal', status: 'online',  lng: 118.958, lat: 25.878 },
    { uuid: 'tm-mw3',  name: '马尾码头终端', type_id: 'terminal', status: 'online',  lng: 119.470, lat: 26.015 },
    { uuid: 'tm-fq3',  name: '福清港口终端', type_id: 'terminal', status: 'online',  lng: 119.400, lat: 25.715 },
    { uuid: 'tm-lj2',  name: '连江码头终端', type_id: 'terminal', status: 'online',  lng: 119.548, lat: 26.095 },
    { uuid: 'tm-cl3',  name: '长乐港口终端', type_id: 'terminal', status: 'online',  lng: 119.540, lat: 25.948 },

    /* ======== GPS（12个） ======== */
    { uuid: 'gps-gl',  name: '鼓楼站GPS',   type_id: 'gps', status: 'online',  lng: 119.298, lat: 26.092, extra: { accuracy: '±2m' } },
    { uuid: 'gps-mw',  name: '马尾站GPS',   type_id: 'gps', status: 'online',  lng: 119.463, lat: 26.007, extra: { accuracy: '±3m' } },
    { uuid: 'gps-cl',  name: '长乐站GPS',   type_id: 'gps', status: 'online',  lng: 119.518, lat: 25.962, extra: { accuracy: '±2m' } },
    { uuid: 'gps-fq',  name: '福清站GPS',   type_id: 'gps', status: 'online',  lng: 119.392, lat: 25.735, extra: { accuracy: '±3m' } },
    { uuid: 'gps-lj',  name: '连江站GPS',   type_id: 'gps', status: 'online',  lng: 119.535, lat: 26.092, extra: { accuracy: '±2m' } },
    { uuid: 'gps-ly',  name: '罗源站GPS',   type_id: 'gps', status: 'offline', lng: 119.550, lat: 26.150, extra: { accuracy: '±5m' } },
    { uuid: 'gps-cs',  name: '仓山站GPS',   type_id: 'gps', status: 'online',  lng: 119.318, lat: 26.042, extra: { accuracy: '±2m' } },
    { uuid: 'gps-ja',  name: '晋安站GPS',   type_id: 'gps', status: 'online',  lng: 119.348, lat: 26.086, extra: { accuracy: '±3m' } },
    { uuid: 'gps-yt',  name: '永泰站GPS',   type_id: 'gps', status: 'online',  lng: 118.950, lat: 25.880, extra: { accuracy: '±5m' } },
    { uuid: 'gps-sea1',name: '海上中继GPS-A',type_id: 'gps', status: 'online',  lng: 119.415, lat: 25.885, extra: { accuracy: '±10m' } },
    { uuid: 'gps-sea2',name: '海上中继GPS-B',type_id: 'gps', status: 'online',  lng: 119.585, lat: 25.925, extra: { accuracy: '±10m' } },
    { uuid: 'gps-tj',  name: '台江站GPS',   type_id: 'gps', status: 'online',  lng: 119.312, lat: 26.068, extra: { accuracy: '±2m' } },

    /* ======== 海上货船（12艘） ======== */
    ...Array.from({ length: 12 }, (_, i) => ({
      uuid: `ship${i}`,
      name: `闽货${i + 1}号`,
      type_id: 'ship' as const,
      status: (i === 3 || i === 7 ? 'offline' as const : 'online' as const),
      lng: 119.30 + i * 0.035 + (Math.random() - 0.5) * 0.02,
      lat: 25.82 + Math.random() * 0.12,
      extra: {
        speed: (6 + Math.random() * 14).toFixed(1) + '节',
        heading: Math.floor(Math.random() * 360) + '°',
        cargo: ['煤炭', '铁矿', '集装箱', '原油', '粮食', '钢材', '木材', '化肥', '水泥', '汽车', '冷冻品', '天然气'][i],
        tonnage: (8000 + Math.floor(Math.random() * 50000)) + '吨',
      },
    })),

    /* ======== 船上设备（每船3个：通信机+终端+GPS） ======== */
    ...Array.from({ length: 12 }, (_, i) => [
      {
        uuid: `s${i}-comm`,
        name: `闽货${i + 1}号通信机`,
        type_id: 'comm' as const,
        status: (i === 3 || i === 7 ? 'offline' as const : 'online' as const),
        lng: 119.30 + i * 0.035 + (Math.random() - 0.5) * 0.01,
        lat: 25.82 + Math.random() * 0.10,
        extra: { ip: `10.1.${i}.1`, frequency: i % 3 === 0 ? '卫星' : i % 3 === 1 ? 'VHF' : 'HF' },
      },
      {
        uuid: `s${i}-term`,
        name: `闽货${i + 1}号终端`,
        type_id: 'terminal' as const,
        status: (i === 0 ? 'offline' as const : 'online' as const),
        lng: 119.30 + i * 0.035 + (Math.random() - 0.5) * 0.01,
        lat: 25.82 + Math.random() * 0.10,
        extra: {},
      },
      {
        uuid: `s${i}-gps`,
        name: `闽货${i + 1}号GPS`,
        type_id: 'gps' as const,
        status: (i === 11 ? 'offline' as const : 'online' as const),
        lng: 119.30 + i * 0.035 + (Math.random() - 0.5) * 0.01,
        lat: 25.82 + Math.random() * 0.10,
        extra: { accuracy: '±5m' },
      },
    ]).flat(),
  ],

  relations: [
    /* ======== 包含关系 ======== */
    // 鼓楼站
    { uuid: 'c-gl-rt1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-gulou',    to_id: 'rt-core1' },
    { uuid: 'c-gl-cm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-gulou',    to_id: 'cm-gl' },
    { uuid: 'c-gl-cm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-gulou',    to_id: 'cm-gl2' },
    { uuid: 'c-gl-tm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-gulou',    to_id: 'tm-gl1' },
    { uuid: 'c-gl-tm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-gulou',    to_id: 'tm-gl2' },
    { uuid: 'c-gl-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-gulou',    to_id: 'gps-gl' },

    // 台江站
    { uuid: 'c-tj-rt2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-taijiang', to_id: 'rt-core2' },
    { uuid: 'c-tj-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-taijiang', to_id: 'cm-tj' },
    { uuid: 'c-tj-tm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-taijiang', to_id: 'tm-tj1' },
    { uuid: 'c-tj-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-taijiang', to_id: 'gps-tj' },

    // 仓山站
    { uuid: 'c-cs-rt',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-cangshan', to_id: 'rt-cs' },
    { uuid: 'c-cs-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-cangshan', to_id: 'cm-cs' },
    { uuid: 'c-cs-cm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-cangshan', to_id: 'cm-cs2' },
    { uuid: 'c-cs-tm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-cangshan', to_id: 'tm-cs1' },
    { uuid: 'c-cs-tm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-cangshan', to_id: 'tm-cs2' },
    { uuid: 'c-cs-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-cangshan', to_id: 'gps-cs' },

    // 晋安站
    { uuid: 'c-ja-rt',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-jinan',    to_id: 'rt-ja' },
    { uuid: 'c-ja-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-jinan',    to_id: 'cm-ja' },
    { uuid: 'c-ja-tm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-jinan',    to_id: 'tm-ja1' },
    { uuid: 'c-ja-tm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-jinan',    to_id: 'tm-ja2' },
    { uuid: 'c-ja-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-jinan',    to_id: 'gps-ja' },

    // 马尾站
    { uuid: 'c-mw-rt',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-mawei',    to_id: 'rt-mw' },
    { uuid: 'c-mw-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-mawei',    to_id: 'cm-mw' },
    { uuid: 'c-mw-cm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-mawei',    to_id: 'cm-mw2' },
    { uuid: 'c-mw-tm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-mawei',    to_id: 'tm-mw1' },
    { uuid: 'c-mw-tm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-mawei',    to_id: 'tm-mw2' },
    { uuid: 'c-mw-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-mawei',    to_id: 'gps-mw' },

    // 长乐站
    { uuid: 'c-cl-rt',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-changle',  to_id: 'rt-cl' },
    { uuid: 'c-cl-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-changle',  to_id: 'cm-cl' },
    { uuid: 'c-cl-tm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-changle',  to_id: 'tm-cl1' },
    { uuid: 'c-cl-tm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-changle',  to_id: 'tm-cl2' },
    { uuid: 'c-cl-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-changle',  to_id: 'gps-cl' },

    // 福清站
    { uuid: 'c-fq-rt',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-fuqing',   to_id: 'rt-fq' },
    { uuid: 'c-fq-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-fuqing',   to_id: 'cm-fq' },
    { uuid: 'c-fq-cm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-fuqing',   to_id: 'cm-fq2' },
    { uuid: 'c-fq-tm1',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-fuqing',   to_id: 'tm-fq1' },
    { uuid: 'c-fq-tm2',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-fuqing',   to_id: 'tm-fq2' },
    { uuid: 'c-fq-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-fuqing',   to_id: 'gps-fq' },

    // 连江站
    { uuid: 'c-lj-rt',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-lianjiang',to_id: 'rt-lj' },
    { uuid: 'c-lj-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-lianjiang',to_id: 'cm-lj' },
    { uuid: 'c-lj-tm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-lianjiang',to_id: 'tm-lj1' },
    { uuid: 'c-lj-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-lianjiang',to_id: 'gps-lj' },

    // 罗源站
    { uuid: 'c-ly-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-luoyuan',  to_id: 'cm-ly' },
    { uuid: 'c-ly-tm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-luoyuan',  to_id: 'tm-ly1' },
    { uuid: 'c-ly-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-luoyuan',  to_id: 'gps-ly' },

    // 永泰站
    { uuid: 'c-yt-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-yongtai',  to_id: 'cm-yt' },
    { uuid: 'c-yt-tm',   name: '', type_id: 'contain', status: 'active', from_id: 'sta-yongtai',  to_id: 'tm-yt1' },
    { uuid: 'c-yt-gps',  name: '', type_id: 'contain', status: 'active', from_id: 'sta-yongtai',  to_id: 'gps-yt' },

    // 海上中继站A（独立节点作为虚拟站，包含自己的设备）
    { uuid: 'c-s1-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'cm-sea1', to_id: 'gps-sea1' },
    { uuid: 'c-s2-cm',   name: '', type_id: 'contain', status: 'active', from_id: 'cm-sea2', to_id: 'gps-sea2' },

    // 船包含设备
    ...Array.from({ length: 12 }, (_, i) => [
      { uuid: `c-s${i}-comm`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-comm` },
      { uuid: `c-s${i}-term`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-term` },
      { uuid: `c-s${i}-gps`,  name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-gps` },
    ]).flat(),

    /* ======== 通信关系 ======== */
    // 鼓楼站内部
    { uuid: 'l-gl-t1c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-gl1', to_id: 'cm-gl' },
    { uuid: 'l-gl-t2c2',name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-gl2', to_id: 'cm-gl2' },
    { uuid: 'l-gl-c1r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-gl',  to_id: 'rt-core1' },
    { uuid: 'l-gl-c2r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-gl2', to_id: 'rt-core1' },

    // 台江站内部
    { uuid: 'l-tj-tc',  name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-tj1', to_id: 'cm-tj' },
    { uuid: 'l-tj-cr',  name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-tj',  to_id: 'rt-core2' },

    // 仓山站内部
    { uuid: 'l-cs-t1c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-cs1', to_id: 'cm-cs' },
    { uuid: 'l-cs-t2c2',name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-cs2', to_id: 'cm-cs2' },
    { uuid: 'l-cs-c1r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-cs',  to_id: 'rt-cs' },
    { uuid: 'l-cs-c2r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-cs2', to_id: 'rt-cs' },

    // 晋安站内部
    { uuid: 'l-ja-t1c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-ja1', to_id: 'cm-ja' },
    { uuid: 'l-ja-t2c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-ja2', to_id: 'cm-ja' },
    { uuid: 'l-ja-cr',  name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-ja',  to_id: 'rt-ja' },

    // 马尾站内部
    { uuid: 'l-mw-t1c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-mw1', to_id: 'cm-mw' },
    { uuid: 'l-mw-t2c2',name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-mw2', to_id: 'cm-mw2' },
    { uuid: 'l-mw-c1r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-mw',  to_id: 'rt-mw' },
    { uuid: 'l-mw-c2r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-mw2', to_id: 'rt-mw' },

    // 长乐站内部
    { uuid: 'l-cl-t1c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-cl1', to_id: 'cm-cl' },
    { uuid: 'l-cl-t2c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-cl2', to_id: 'cm-cl' },
    { uuid: 'l-cl-cr',  name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-cl',  to_id: 'rt-cl' },

    // 福清站内部
    { uuid: 'l-fq-t1c', name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-fq1', to_id: 'cm-fq' },
    { uuid: 'l-fq-t2c2',name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-fq2', to_id: 'cm-fq2' },
    { uuid: 'l-fq-c1r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-fq',  to_id: 'rt-fq' },
    { uuid: 'l-fq-c2r', name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-fq2', to_id: 'rt-fq' },

    // 连江站内部
    { uuid: 'l-lj-tc',  name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-lj1', to_id: 'cm-lj' },
    { uuid: 'l-lj-cr',  name: '光纤链路', type_id: 'fiber', status: 'connected', from_id: 'cm-lj',  to_id: 'rt-lj' },

    // 罗源站内部
    { uuid: 'l-ly-tc',  name: '内部通信', type_id: 'wired', status: 'disconnected', from_id: 'tm-ly1', to_id: 'cm-ly' },

    // 永泰站内部
    { uuid: 'l-yt-tc',  name: '内部通信', type_id: 'wired', status: 'connected', from_id: 'tm-yt1', to_id: 'cm-yt' },

    // 站间骨干链路（环形拓扑）
    { uuid: 'l-bb-1', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-core1', to_id: 'rt-core2', extra: { bandwidth: '10Gbps' } },
    { uuid: 'l-bb-2', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-core2', to_id: 'rt-cs',    extra: { bandwidth: '10Gbps' } },
    { uuid: 'l-bb-3', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-cs',    to_id: 'rt-ja',    extra: { bandwidth: '10Gbps' } },
    { uuid: 'l-bb-4', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-ja',    to_id: 'rt-core1', extra: { bandwidth: '10Gbps' } },
    { uuid: 'l-bb-5', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-core1', to_id: 'rt-mw',    extra: { bandwidth: '1Gbps' } },
    { uuid: 'l-bb-6', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-mw',    to_id: 'rt-cl',    extra: { bandwidth: '1Gbps' } },
    { uuid: 'l-bb-7', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-core2', to_id: 'rt-fq',    extra: { bandwidth: '1Gbps' } },
    { uuid: 'l-bb-8', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-ja',    to_id: 'rt-lj',    extra: { bandwidth: '1Gbps' } },
    { uuid: 'l-bb-9', name: '骨干光缆', type_id: 'fiber', status: 'connected', from_id: 'rt-cl',    to_id: 'rt-lj',    extra: { bandwidth: '1Gbps' } },

    // 海上中继链路
    { uuid: 'l-sea-1', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea1', to_id: 'rt-core1', extra: { delay: '15ms' } },
    { uuid: 'l-sea-2', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea2', to_id: 'rt-cl',    extra: { delay: '20ms' } },
    { uuid: 'l-sea-3', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea1', to_id: 'cm-sea2', extra: { protocol: '微波' } },

    // 船与岸站通信
    ...Array.from({ length: 12 }, (_, i) => {
      const isOff = i === 3 || i === 7
      const targetStation = i < 4 ? 'cm-gl' : i < 8 ? 'cm-mw' : 'cm-cl'
      const relay = i % 2 === 0 ? 'cm-sea1' : 'cm-sea2'
      return [
        { uuid: `l-s${i}-sh`, name: '无线通信', type_id: 'wireless' as const, status: isOff ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: targetStation, extra: { protocol: 'VHF', distance: Math.floor(5 + Math.random() * 40) + 'km' } },
        { uuid: `l-s${i}-rl`, name: '卫星中继', type_id: 'satellite-link' as const, status: isOff ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: relay },
        { uuid: `l-s${i}-in`, name: '船内通信', type_id: 'wired' as const, status: 'connected' as const, from_id: `s${i}-term`, to_id: `s${i}-comm` },
      ]
    }).flat(),

    // 船间通信
    { uuid: 'l-ss-01', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship0',  to_id: 'ship1', extra: { protocol: 'AIS' } },
    { uuid: 'l-ss-12', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship1',  to_id: 'ship2', extra: { protocol: 'AIS' } },
    { uuid: 'l-ss-34', name: '船间通信', type_id: 'wireless', status: 'disconnected', from_id: 'ship3',  to_id: 'ship4', extra: { protocol: 'AIS', reason: '超出范围' } },
    { uuid: 'l-ss-56', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship5',  to_id: 'ship6', extra: { protocol: 'AIS' } },
    { uuid: 'l-ss-78', name: '船间通信', type_id: 'wireless', status: 'disconnected', from_id: 'ship7',  to_id: 'ship8', extra: { protocol: 'AIS', reason: '超出范围' } },
    { uuid: 'l-ss-9a', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship9',  to_id: 'ship10', extra: { protocol: 'AIS' } },
    { uuid: 'l-ss-ab', name: '船间通信', type_id: 'wireless', status: 'connected', from_id: 'ship10', to_id: 'ship11', extra: { protocol: 'AIS' } },

    // 独立节点的通信连接
    { uuid: 'l-mw-dk', name: '码头通信', type_id: 'wired', status: 'connected', from_id: 'tm-mw3',  to_id: 'cm-mw2' },
    { uuid: 'l-fq-dk', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-fq3',  to_id: 'cm-fq2' },
    { uuid: 'l-lj-dk', name: '码头通信', type_id: 'wired', status: 'connected', from_id: 'tm-lj2',  to_id: 'cm-lj' },
    { uuid: 'l-cl-dk', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-cl3',  to_id: 'cm-cl' },
  ].flat(),
}