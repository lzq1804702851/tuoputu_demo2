import type { TopologyData } from 'topology-graph-vue'

/* ================================================================
 *  浙江福建广东沿海及近海400km拓扑图 Mock 数据
 *  范围：约 113°~125°E, 21°~31°N
 *  覆盖：浙江（杭州、宁波、舟山、温州、台州）
 *        福建（福州、厦门、泉州、莆田、漳州、宁德）
 *        广东（广州、深圳、汕头、湛江、珠海、惠州）
 *        近海400km范围内（约向东至125°E，南至21°N）
 * ================================================================ */

export const mockData: TopologyData = {
  nodes: [
    /* ======== 通信站（18个）======== */
    // 浙江
    { uuid: 'sta-hangzhou', name: '杭州通信站',   type_id: 'station', status: 'online',  lng: 120.15, lat: 30.28 },
    { uuid: 'sta-ningbo',   name: '宁波通信站',   type_id: 'station', status: 'online',  lng: 121.55, lat: 29.87 },
    { uuid: 'sta-zhoushan', name: '舟山通信站',   type_id: 'station', status: 'online',  lng: 122.10, lat: 30.00 },
    { uuid: 'sta-wenzhou',  name: '温州通信站',   type_id: 'station', status: 'online',  lng: 120.70, lat: 28.00 },
    { uuid: 'sta-taizhou',  name: '台州通信站',   type_id: 'station', status: 'online',  lng: 121.42, lat: 28.66 },
    // 福建
    { uuid: 'sta-ningde',   name: '宁德通信站',   type_id: 'station', status: 'online',  lng: 119.53, lat: 26.66 },
    { uuid: 'sta-fuzhou',   name: '福州核心通信站',type_id: 'station', status: 'online',  lng: 119.30, lat: 26.08 },
    { uuid: 'sta-putian',   name: '莆田通信站',   type_id: 'station', status: 'online',  lng: 119.01, lat: 25.45 },
    { uuid: 'sta-quanzhou', name: '泉州通信站',   type_id: 'station', status: 'online',  lng: 118.68, lat: 24.87 },
    { uuid: 'sta-xiamen',   name: '厦门通信站',   type_id: 'station', status: 'online',  lng: 118.09, lat: 24.48 },
    { uuid: 'sta-zhangzhou',name: '漳州通信站',   type_id: 'station', status: 'online',  lng: 117.65, lat: 24.51 },
    // 广东
    { uuid: 'sta-shantou',  name: '汕头通信站',   type_id: 'station', status: 'online',  lng: 116.68, lat: 23.35 },
    { uuid: 'sta-huizhou',  name: '惠州通信站',   type_id: 'station', status: 'online',  lng: 114.42, lat: 23.11 },
    { uuid: 'sta-shenzhen', name: '深圳通信站',   type_id: 'station', status: 'online',  lng: 114.07, lat: 22.62 },
    { uuid: 'sta-guangzhou',name: '广州核心通信站',type_id: 'station', status: 'online',  lng: 113.26, lat: 23.13 },
    { uuid: 'sta-zhuhai',   name: '珠海通信站',   type_id: 'station', status: 'online',  lng: 113.58, lat: 22.27 },
    { uuid: 'sta-zhanjiang',name: '湛江通信站',   type_id: 'station', status: 'online',  lng: 110.36, lat: 21.27 },
    { uuid: 'sta-zhongshan',name: '中山通信站',   type_id: 'station', status: 'warning', lng: 113.39, lat: 22.52 },

    /* ======== 路由器（18个）======== */
    { uuid: 'rt-hz',  name: '杭州路由器',  type_id: 'router', status: 'online',  lng: 120.17, lat: 30.30 },
    { uuid: 'rt-nb',  name: '宁波路由器',  type_id: 'router', status: 'online',  lng: 121.57, lat: 29.85 },
    { uuid: 'rt-zs',  name: '舟山路由器',  type_id: 'router', status: 'online',  lng: 122.12, lat: 30.02 },
    { uuid: 'rt-wz',  name: '温州路由器',  type_id: 'router', status: 'online',  lng: 120.68, lat: 27.98 },
    { uuid: 'rt-tz',  name: '台州市路由器',type_id: 'router', status: 'online',  lng: 121.44, lat: 28.64 },
    { uuid: 'rt-nd',  name: '宁德路由器',  type_id: 'router', status: 'online',  lng: 119.55, lat: 26.64 },
    { uuid: 'rt-fz',  name: '福州路由器',  type_id: 'router', status: 'online',  lng: 119.32, lat: 26.10 },
    { uuid: 'rt-pt',  name: '莆田路由器',  type_id: 'router', status: 'online',  lng: 119.03, lat: 25.43 },
    { uuid: 'rt-qz',  name: '泉州路由器',  type_id: 'router', status: 'online',  lng: 118.70, lat: 24.85 },
    { uuid: 'rt-xm',  name: '厦门路由器',  type_id: 'router', status: 'online',  lng: 118.10, lat: 24.50 },
    { uuid: 'rt-zz',  name: '漳州路由器',  type_id: 'router', status: 'online',  lng: 117.67, lat: 24.53 },
    { uuid: 'rt-st',  name: '汕头路由器',  type_id: 'router', status: 'online',  lng: 116.70, lat: 23.37 },
    { uuid: 'rt-hz2', name: '惠州路由器',  type_id: 'router', status: 'online',  lng: 114.44, lat: 23.09 },
    { uuid: 'rt-sz',  name: '深圳路由器',  type_id: 'router', status: 'online',  lng: 114.09, lat: 22.60 },
    { uuid: 'rt-gz',  name: '广州路由器',  type_id: 'router', status: 'online',  lng: 113.28, lat: 23.15 },
    { uuid: 'rt-zh',  name: '珠海路由器',  type_id: 'router', status: 'online',  lng: 113.60, lat: 22.25 },
    { uuid: 'rt-zj',  name: '湛江路由器',  type_id: 'router', status: 'online',  lng: 110.38, lat: 21.29 },
    { uuid: 'rt-zs2', name: '中山路由器',  type_id: 'router', status: 'offline', lng: 113.41, lat: 22.54 },

    /* ======== 通信机（20个）======== */
    { uuid: 'cm-hz',  name: '杭州通信机',  type_id: 'comm', status: 'online', lng: 120.13, lat: 30.26 },
    { uuid: 'cm-nb',  name: '宁波通信机',  type_id: 'comm', status: 'online', lng: 121.54, lat: 29.86 },
    { uuid: 'cm-zs',  name: '舟山通信机',  type_id: 'comm', status: 'online', lng: 122.08, lat: 30.01 },
    { uuid: 'cm-wz',  name: '温州通信机',  type_id: 'comm', status: 'online', lng: 120.72, lat: 28.02 },
    { uuid: 'cm-tz',  name: '台州通信机',  type_id: 'comm', status: 'online', lng: 121.40, lat: 28.68 },
    { uuid: 'cm-nd',  name: '宁德通信机',  type_id: 'comm', status: 'online', lng: 119.51, lat: 26.68 },
    { uuid: 'cm-fz',  name: '福州通信机',  type_id: 'comm', status: 'online', lng: 119.28, lat: 26.06 },
    { uuid: 'cm-pt',  name: '莆田通信机',  type_id: 'comm', status: 'online', lng: 118.99, lat: 25.47 },
    { uuid: 'cm-qz',  name: '泉州通信机',  type_id: 'comm', status: 'online', lng: 118.66, lat: 24.89 },
    { uuid: 'cm-xm',  name: '厦门通信机',  type_id: 'comm', status: 'online', lng: 118.07, lat: 24.46 },
    { uuid: 'cm-zz',  name: '漳州通信机',  type_id: 'comm', status: 'online', lng: 117.63, lat: 24.49 },
    { uuid: 'cm-st',  name: '汕头通信机',  type_id: 'comm', status: 'online', lng: 116.66, lat: 23.33 },
    { uuid: 'cm-hz2', name: '惠州通信机',  type_id: 'comm', status: 'online', lng: 114.40, lat: 23.13 },
    { uuid: 'cm-sz',  name: '深圳通信机',  type_id: 'comm', status: 'online', lng: 114.05, lat: 22.64 },
    { uuid: 'cm-gz',  name: '广州通信机',  type_id: 'comm', status: 'online', lng: 113.24, lat: 23.11 },
    { uuid: 'cm-zh',  name: '珠海通信机',  type_id: 'comm', status: 'online', lng: 113.56, lat: 22.29 },
    { uuid: 'cm-zj',  name: '湛江通信机',  type_id: 'comm', status: 'online', lng: 110.34, lat: 21.25 },
    // 海上中继（近海400km以内）
    { uuid: 'cm-sea1', name: '东海中继A',  type_id: 'comm', status: 'online', lng: 123.50, lat: 28.50 },
    { uuid: 'cm-sea2', name: '东海中继B',  type_id: 'comm', status: 'online', lng: 124.50, lat: 25.50 },
    { uuid: 'cm-sea3', name: '南海中继C',  type_id: 'comm', status: 'online', lng: 117.50, lat: 21.50 },

    /* ======== 终端（25个）======== */
    { uuid: 'tm-hz1',  name: '杭州终端A',  type_id: 'terminal', status: 'online', lng: 120.14, lat: 30.25 },
    { uuid: 'tm-nb1',  name: '宁波终端A',  type_id: 'terminal', status: 'online', lng: 121.53, lat: 29.84 },
    { uuid: 'tm-nb-dk',name: '宁波港终端', type_id: 'terminal', status: 'online', lng: 121.85, lat: 29.95 },
    { uuid: 'tm-zs1',  name: '舟山终端A',  type_id: 'terminal', status: 'online', lng: 122.06, lat: 29.98 },
    { uuid: 'tm-zs-dk',name: '舟山港终端', type_id: 'terminal', status: 'online', lng: 122.20, lat: 30.05 },
    { uuid: 'tm-wz1',  name: '温州终端A',  type_id: 'terminal', status: 'online', lng: 120.74, lat: 28.04 },
    { uuid: 'tm-tz1',  name: '台州终端A',  type_id: 'terminal', status: 'online', lng: 121.38, lat: 28.70 },
    { uuid: 'tm-nd1',  name: '宁德终端A',  type_id: 'terminal', status: 'online', lng: 119.50, lat: 26.70 },
    { uuid: 'tm-fz1',  name: '福州终端A',  type_id: 'terminal', status: 'online', lng: 119.26, lat: 26.04 },
    { uuid: 'tm-fz2',  name: '福州终端B',  type_id: 'terminal', status: 'online', lng: 119.34, lat: 26.12 },
    { uuid: 'tm-pt1',  name: '莆田终端A',  type_id: 'terminal', status: 'online', lng: 118.97, lat: 25.49 },
    { uuid: 'tm-qz1',  name: '泉州终端A',  type_id: 'terminal', status: 'online', lng: 118.64, lat: 24.83 },
    { uuid: 'tm-xm1',  name: '厦门终端A',  type_id: 'terminal', status: 'online', lng: 118.05, lat: 24.44 },
    { uuid: 'tm-xm-dk',name: '厦门港终端', type_id: 'terminal', status: 'online', lng: 118.15, lat: 24.55 },
    { uuid: 'tm-zz1',  name: '漳州终端A',  type_id: 'terminal', status: 'online', lng: 117.61, lat: 24.55 },
    { uuid: 'tm-st1',  name: '汕头终端A',  type_id: 'terminal', status: 'online', lng: 116.64, lat: 23.31 },
    { uuid: 'tm-st-dk',name: '汕头港终端', type_id: 'terminal', status: 'online', lng: 116.75, lat: 23.40 },
    { uuid: 'tm-hz2-1',name: '惠州终端A',  type_id: 'terminal', status: 'online', lng: 114.38, lat: 23.15 },
    { uuid: 'tm-sz1',  name: '深圳终端A',  type_id: 'terminal', status: 'online', lng: 114.03, lat: 22.66 },
    { uuid: 'tm-sz-dk',name: '深圳港终端', type_id: 'terminal', status: 'online', lng: 114.12, lat: 22.55 },
    { uuid: 'tm-gz1',  name: '广州终端A',  type_id: 'terminal', status: 'online', lng: 113.22, lat: 23.09 },
    { uuid: 'tm-gz-dk',name: '广州港终端', type_id: 'terminal', status: 'online', lng: 113.35, lat: 23.05 },
    { uuid: 'tm-zh1',  name: '珠海终端A',  type_id: 'terminal', status: 'online', lng: 113.54, lat: 22.31 },
    { uuid: 'tm-zj1',  name: '湛江终端A',  type_id: 'terminal', status: 'online', lng: 110.32, lat: 21.23 },
    { uuid: 'tm-zj-dk',name: '湛江港终端', type_id: 'terminal', status: 'online', lng: 110.42, lat: 21.18 },

    /* ======== GPS（18个）======== */
    { uuid: 'gps-hz',  name: '杭州GPS',  type_id: 'gps', status: 'online', lng: 120.16, lat: 30.29 },
    { uuid: 'gps-nb',  name: '宁波GPS',  type_id: 'gps', status: 'online', lng: 121.56, lat: 29.88 },
    { uuid: 'gps-zs',  name: '舟山GPS',  type_id: 'gps', status: 'online', lng: 122.11, lat: 30.01 },
    { uuid: 'gps-wz',  name: '温州GPS',  type_id: 'gps', status: 'online', lng: 120.71, lat: 28.01 },
    { uuid: 'gps-tz',  name: '台州GPS',  type_id: 'gps', status: 'online', lng: 121.43, lat: 28.65 },
    { uuid: 'gps-nd',  name: '宁德GPS',  type_id: 'gps', status: 'online', lng: 119.54, lat: 26.67 },
    { uuid: 'gps-fz',  name: '福州GPS',  type_id: 'gps', status: 'online', lng: 119.31, lat: 26.09 },
    { uuid: 'gps-pt',  name: '莆田GPS',  type_id: 'gps', status: 'online', lng: 119.02, lat: 25.44 },
    { uuid: 'gps-qz',  name: '泉州GPS',  type_id: 'gps', status: 'online', lng: 118.69, lat: 24.88 },
    { uuid: 'gps-xm',  name: '厦门GPS',  type_id: 'gps', status: 'online', lng: 118.10, lat: 24.49 },
    { uuid: 'gps-zz',  name: '漳州GPS',  type_id: 'gps', status: 'online', lng: 117.66, lat: 24.52 },
    { uuid: 'gps-st',  name: '汕头GPS',  type_id: 'gps', status: 'online', lng: 116.69, lat: 23.36 },
    { uuid: 'gps-sz',  name: '深圳GPS',  type_id: 'gps', status: 'online', lng: 114.08, lat: 22.61 },
    { uuid: 'gps-gz',  name: '广州GPS',  type_id: 'gps', status: 'online', lng: 113.27, lat: 23.14 },
    { uuid: 'gps-zh',  name: '珠海GPS',  type_id: 'gps', status: 'online', lng: 113.59, lat: 22.26 },
    { uuid: 'gps-zj',  name: '湛江GPS',  type_id: 'gps', status: 'online', lng: 110.37, lat: 21.28 },
    { uuid: 'gps-sea1',name: '海上GPS-A',type_id: 'gps', status: 'online', lng: 123.48, lat: 28.48 },
    { uuid: 'gps-sea2',name: '海上GPS-B',type_id: 'gps', status: 'online', lng: 124.48, lat: 25.48 },

    /* ======== 海上货船（25艘，分布在近海400km内）======== */
    ...Array.from({ length: 25 }, (_, i) => ({
      uuid: `ship${i}`,
      name: `浙闽粤货${i + 1}号`,
      type_id: 'ship' as const,
      status: (i === 3 || i === 10 || i === 18 ? 'offline' as const : 'online' as const),
      lng: 117.0 + i * 0.35 + (Math.random() - 0.5) * 0.2,
      lat: 22.0 + Math.random() * 8.0,
      extra: {
        speed: (4 + Math.random() * 16).toFixed(1) + '节',
        cargo: ['煤炭', '铁矿', '集装箱', '原油', '粮食', '钢材', '木材', '化肥',
                '水泥', '汽车', '天然气', '大豆', '棉花', '橡胶', '铜矿', '镍矿',
                '铝土', '锰矿', '焦炭', '水果', '水产', '纸浆', '甲醇', '乙烯', '丙烯'][i],
        tonnage: (5000 + Math.floor(Math.random() * 60000)) + '吨',
      },
    })),

    /* ======== 船上设备（每船3个）======== */
    ...Array.from({ length: 25 }, (_, i) => [
      {
        uuid: `s${i}-comm`,
        name: `浙闽粤货${i + 1}号通信机`,
        type_id: 'comm' as const,
        status: (i === 3 || i === 10 || i === 18 ? 'offline' as const : 'online' as const),
        lng: 117.0 + i * 0.35 + (Math.random() - 0.5) * 0.1,
        lat: 22.0 + Math.random() * 8.0,
        extra: { ip: `10.2.${Math.floor(i/10)}.${i%10+1}` },
      },
      {
        uuid: `s${i}-term`,
        name: `浙闽粤货${i + 1}号终端`,
        type_id: 'terminal' as const,
        status: 'online' as const,
        lng: 117.0 + i * 0.35 + (Math.random() - 0.5) * 0.1,
        lat: 22.0 + Math.random() * 8.0,
        extra: {},
      },
      {
        uuid: `s${i}-gps`,
        name: `浙闽粤货${i + 1}号GPS`,
        type_id: 'gps' as const,
        status: (i === 20 ? 'offline' as const : 'online' as const),
        lng: 117.0 + i * 0.35 + (Math.random() - 0.5) * 0.1,
        lat: 22.0 + Math.random() * 8.0,
        extra: { accuracy: '±5m' },
      },
    ]).flat(),
  ],

  relations: [
    /* ======== 包含关系 ======== */
    ...([
      ['sta-hangzhou', 'rt-hz',  'cm-hz',  'tm-hz1',  'gps-hz'],
      ['sta-ningbo',   'rt-nb',  'cm-nb',  'tm-nb1',  'tm-nb-dk', 'gps-nb'],
      ['sta-zhoushan', 'rt-zs',  'cm-zs',  'tm-zs1',  'tm-zs-dk', 'gps-zs'],
      ['sta-wenzhou',  'rt-wz',  'cm-wz',  'tm-wz1',  'gps-wz'],
      ['sta-taizhou',  'rt-tz',  'cm-tz',  'tm-tz1',  'gps-tz'],
      ['sta-ningde',   'rt-nd',  'cm-nd',  'tm-nd1',  'gps-nd'],
      ['sta-fuzhou',   'rt-fz',  'cm-fz',  'tm-fz1',  'tm-fz2', 'gps-fz'],
      ['sta-putian',   'rt-pt',  'cm-pt',  'tm-pt1',  'gps-pt'],
      ['sta-quanzhou', 'rt-qz',  'cm-qz',  'tm-qz1',  'gps-qz'],
      ['sta-xiamen',   'rt-xm',  'cm-xm',  'tm-xm1',  'tm-xm-dk', 'gps-xm'],
      ['sta-zhangzhou','rt-zz',  'cm-zz',  'tm-zz1',  'gps-zz'],
      ['sta-shantou',  'rt-st',  'cm-st',  'tm-st1',  'tm-st-dk', 'gps-st'],
      ['sta-huizhou',  'rt-hz2', 'cm-hz2', 'tm-hz2-1','gps-sz'],
      ['sta-shenzhen', 'rt-sz',  'cm-sz',  'tm-sz1',  'tm-sz-dk', 'gps-gz'],
      ['sta-guangzhou','rt-gz',  'cm-gz',  'tm-gz1',  'tm-gz-dk', 'gps-gz'],
      ['sta-zhuhai',   'rt-zh',  'cm-zh',  'tm-zh1',  'gps-zh'],
      ['sta-zhanjiang','rt-zj',  'cm-zj',  'tm-zj1',  'tm-zj-dk', 'gps-zj'],
      ['sta-zhongshan','rt-zs2', 'cm-sz',  'tm-sz1',  'gps-sz'],
    ] as const).flatMap(([parent, ...children]) =>
      children.map((child) => ({
        uuid: `c-${parent}-${child}`,
        name: '',
        type_id: 'contain' as const,
        status: 'active' as const,
        from_id: parent,
        to_id: child,
      }))
    ),

    // 船包含设备
    ...Array.from({ length: 25 }, (_, i) => [
      { uuid: `c-s${i}-comm`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-comm` },
      { uuid: `c-s${i}-term`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-term` },
      { uuid: `c-s${i}-gps`,  name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-gps` },
    ]).flat(),

    /* ======== 站内通信关系（终端→通信机→路由器）======== */
    ...([
      ['tm-hz1', 'cm-hz'], ['cm-hz', 'rt-hz'],
      ['tm-nb1', 'cm-nb'], ['tm-nb-dk', 'cm-nb'], ['cm-nb', 'rt-nb'],
      ['tm-zs1', 'cm-zs'], ['tm-zs-dk', 'cm-zs'], ['cm-zs', 'rt-zs'],
      ['tm-wz1', 'cm-wz'], ['cm-wz', 'rt-wz'],
      ['tm-tz1', 'cm-tz'], ['cm-tz', 'rt-tz'],
      ['tm-nd1', 'cm-nd'], ['cm-nd', 'rt-nd'],
      ['tm-fz1', 'cm-fz'], ['tm-fz2', 'cm-fz'], ['cm-fz', 'rt-fz'],
      ['tm-pt1', 'cm-pt'], ['cm-pt', 'rt-pt'],
      ['tm-qz1', 'cm-qz'], ['cm-qz', 'rt-qz'],
      ['tm-xm1', 'cm-xm'], ['tm-xm-dk', 'cm-xm'], ['cm-xm', 'rt-xm'],
      ['tm-zz1', 'cm-zz'], ['cm-zz', 'rt-zz'],
      ['tm-st1', 'cm-st'], ['tm-st-dk', 'cm-st'], ['cm-st', 'rt-st'],
      ['tm-hz2-1','cm-hz2'],['cm-hz2','rt-hz2'],
      ['tm-sz1', 'cm-sz'], ['tm-sz-dk', 'cm-sz'], ['cm-sz', 'rt-sz'],
      ['tm-gz1', 'cm-gz'], ['tm-gz-dk', 'cm-gz'], ['cm-gz', 'rt-gz'],
      ['tm-zh1', 'cm-zh'], ['cm-zh', 'rt-zh'],
      ['tm-zj1', 'cm-zj'], ['tm-zj-dk', 'cm-zj'], ['cm-zj', 'rt-zj'],
    ] as [string, string][]).map(([from, to], i) => ({
      uuid: `l-in-${i}`,
      name: from.startsWith('tm') ? '内部通信' : '光纤链路',
      type_id: from.startsWith('tm') ? 'wired' as const : 'fiber' as const,
      status: 'connected' as const,
      from_id: from,
      to_id: to,
    })),

    /* ======== 沿海骨干链路（从北到南）======== */
    { uuid: 'l-bb-1', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-hz',  to_id: 'rt-nb' },
    { uuid: 'l-bb-2', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-nb',  to_id: 'rt-zs' },
    { uuid: 'l-bb-3', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-zs',  to_id: 'rt-tz' },
    { uuid: 'l-bb-4', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-tz',  to_id: 'rt-wz' },
    { uuid: 'l-bb-5', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-wz',  to_id: 'rt-nd' },
    { uuid: 'l-bb-6', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-nd',  to_id: 'rt-fz' },
    { uuid: 'l-bb-7', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-fz',  to_id: 'rt-pt' },
    { uuid: 'l-bb-8', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-pt',  to_id: 'rt-qz' },
    { uuid: 'l-bb-9', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-qz',  to_id: 'rt-xm' },
    { uuid: 'l-bb-10',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-xm',  to_id: 'rt-zz' },
    { uuid: 'l-bb-11',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-zz',  to_id: 'rt-st' },
    { uuid: 'l-bb-12',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-st',  to_id: 'rt-hz2' },
    { uuid: 'l-bb-13',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-hz2', to_id: 'rt-sz' },
    { uuid: 'l-bb-14',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-sz',  to_id: 'rt-gz' },
    { uuid: 'l-bb-15',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-gz',  to_id: 'rt-zh' },
    { uuid: 'l-bb-16',name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-zh',  to_id: 'rt-zj' },
    // 中山支线
    { uuid: 'l-bb-17',name: '支线',    type_id: 'fiber', status: 'disconnected', from_id: 'rt-zs2', to_id: 'rt-gz' },

    /* ======== 海上中继链路 ======== */
    { uuid: 'l-sea-1', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea1', to_id: 'rt-nb' },
    { uuid: 'l-sea-2', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea2', to_id: 'rt-fz' },
    { uuid: 'l-sea-3', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea3', to_id: 'rt-st' },
    { uuid: 'l-sea-4', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea1', to_id: 'cm-sea2' },
    { uuid: 'l-sea-5', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea2', to_id: 'cm-sea3' },

    /* ======== 船与岸站/中继通信 ======== */
    ...Array.from({ length: 25 }, (_, i) => {
      const isOff = i === 3 || i === 10 || i === 18
      const lng = 117.0 + i * 0.35
      let target = 'cm-nb'
      if (lng < 117.5) target = 'cm-st'
      else if (lng < 118.5) target = 'cm-zz'
      else if (lng < 119.5) target = 'cm-xm'
      else if (lng < 120.5) target = 'cm-fz'
      else if (lng < 121.5) target = 'cm-wz'
      else if (lng < 122.5) target = 'cm-tz'
      else if (lng < 123.5) target = 'cm-nb'
      else if (lng < 124.5) target = 'cm-sea1'
      else target = 'cm-sea2'

      const relay = i % 2 === 0 ? 'cm-sea1' : 'cm-sea2'
      return [
        { uuid: `l-s${i}-sh`, name: '无线通信', type_id: 'wireless' as const, status: isOff ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: target },
        { uuid: `l-s${i}-rl`, name: '卫星中继', type_id: 'satellite-link' as const, status: isOff ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: relay },
        { uuid: `l-s${i}-in`, name: '船内通信', type_id: 'wired' as const, status: 'connected' as const, from_id: `s${i}-term`, to_id: `s${i}-comm` },
      ]
    }).flat(),

    /* ======== 船间通信 ======== */
    ...Array.from({ length: 24 }, (_, i) => ({
      uuid: `l-ss-${i}`,
      name: '船间通信',
      type_id: 'wireless' as const,
      status: (i === 3 || i === 10 || i === 18 ? 'disconnected' as const : 'connected' as const),
      from_id: `ship${i}`,
      to_id: `ship${i + 1}`,
    })),
  ].flat(),
}