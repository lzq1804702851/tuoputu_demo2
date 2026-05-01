import type { TopologyData } from 'topology-graph-vue'

/* ================================================================
 *  东海区域拓扑图 Mock 数据
 *  范围：117°~131°E, 22°~36°N
 *  覆盖上海、宁波、舟山、福州、厦门、台北、冲绳、济州、釜山等
 * ================================================================ */

export const mockData: TopologyData = {
  nodes: [
    /* ======== 通信站（20个）======== */
    // 中国沿海
    { uuid: 'sta-shanghai',  name: '上海中心通信站', type_id: 'station', status: 'online',  lng: 121.47, lat: 31.23 },
    { uuid: 'sta-ningbo',    name: '宁波通信站',    type_id: 'station', status: 'online',  lng: 121.55, lat: 29.87 },
    { uuid: 'sta-zhoushan',  name: '舟山通信站',    type_id: 'station', status: 'online',  lng: 122.10, lat: 30.00 },
    { uuid: 'sta-wenzhou',   name: '温州通信站',    type_id: 'station', status: 'online',  lng: 120.70, lat: 28.00 },
    { uuid: 'sta-fuzhou',    name: '福州核心通信站', type_id: 'station', status: 'online',  lng: 119.30, lat: 26.08 },
    { uuid: 'sta-xiamen',    name: '厦门通信站',    type_id: 'station', status: 'online',  lng: 118.09, lat: 24.48 },
    { uuid: 'sta-quanzhou',  name: '泉州通信站',    type_id: 'station', status: 'online',  lng: 118.68, lat: 24.87 },
    { uuid: 'sta-sanya',     name: '三沙通信站',    type_id: 'station', status: 'online',  lng: 119.70, lat: 25.42 },
    { uuid: 'sta-lianyun',   name: '连云港通信站',  type_id: 'station', status: 'online',  lng: 119.22, lat: 34.60 },
    { uuid: 'sta-qingdao',   name: '青岛通信站',    type_id: 'station', status: 'online',  lng: 120.38, lat: 36.07 },
    // 台湾
    { uuid: 'sta-taipei',    name: '台北通信站',    type_id: 'station', status: 'online',  lng: 121.56, lat: 25.03 },
    { uuid: 'sta-kaohsiung', name: '高雄通信站',    type_id: 'station', status: 'online',  lng: 120.31, lat: 22.62 },
    { uuid: 'sta-hualien',   name: '花莲通信站',    type_id: 'station', status: 'online',  lng: 121.60, lat: 23.98 },
    // 日本
    { uuid: 'sta-naha',      name: '那霸通信站',    type_id: 'station', status: 'online',  lng: 127.68, lat: 26.33 },
    { uuid: 'sta-nagasaki',  name: '长崎通信站',    type_id: 'station', status: 'online',  lng: 129.87, lat: 32.75 },
    { uuid: 'sta-kagoshima', name: '鹿儿岛通信站',  type_id: 'station', status: 'online',  lng: 130.56, lat: 31.60 },
    { uuid: 'sta-fukuoka',   name: '福冈通信站',    type_id: 'station', status: 'online',  lng: 130.40, lat: 33.59 },
    // 韩国
    { uuid: 'sta-jeju',      name: '济州通信站',    type_id: 'station', status: 'online',  lng: 126.53, lat: 33.50 },
    { uuid: 'sta-busan',     name: '釜山通信站',    type_id: 'station', status: 'online',  lng: 129.08, lat: 35.18 },
    { uuid: 'sta-incheon',   name: '仁川通信站',    type_id: 'station', status: 'warning', lng: 126.65, lat: 37.45 },

    /* ======== 路由器（20个）======== */
    { uuid: 'rt-sh1', name: '上海核心路由器', type_id: 'router', status: 'online',  lng: 121.47, lat: 31.25 },
    { uuid: 'rt-nb',  name: '宁波路由器',    type_id: 'router', status: 'online',  lng: 121.56, lat: 29.85 },
    { uuid: 'rt-zs',  name: '舟山路由器',    type_id: 'router', status: 'online',  lng: 122.12, lat: 30.02 },
    { uuid: 'rt-wz',  name: '温州路由器',    type_id: 'router', status: 'online',  lng: 120.68, lat: 27.98 },
    { uuid: 'rt-fz',  name: '福州路由器',    type_id: 'router', status: 'online',  lng: 119.32, lat: 26.10 },
    { uuid: 'rt-xm',  name: '厦门路由器',    type_id: 'router', status: 'online',  lng: 118.10, lat: 24.50 },
    { uuid: 'rt-qz',  name: '泉州路由器',    type_id: 'router', status: 'online',  lng: 118.70, lat: 24.85 },
    { uuid: 'rt-tp',  name: '台北路由器',    type_id: 'router', status: 'online',  lng: 121.58, lat: 25.05 },
    { uuid: 'rt-ks',  name: '高雄路由器',    type_id: 'router', status: 'online',  lng: 120.33, lat: 22.60 },
    { uuid: 'rt-naha',name: '那霸路由器',    type_id: 'router', status: 'online',  lng: 127.70, lat: 26.35 },
    { uuid: 'rt-ngs', name: '长崎路由器',    type_id: 'router', status: 'online',  lng: 129.85, lat: 32.77 },
    { uuid: 'rt-kgs', name: '鹿儿岛路由器',  type_id: 'router', status: 'online',  lng: 130.58, lat: 31.62 },
    { uuid: 'rt-jeju',name: '济州路由器',    type_id: 'router', status: 'online',  lng: 126.55, lat: 33.52 },
    { uuid: 'rt-busan',name:'釜山路由器',    type_id: 'router', status: 'online',  lng: 129.10, lat: 35.20 },
    { uuid: 'rt-lyg', name: '连云路由器',    type_id: 'router', status: 'online',  lng: 119.24, lat: 34.62 },
    { uuid: 'rt-qd',  name: '青岛路由器',    type_id: 'router', status: 'online',  lng: 120.40, lat: 36.05 },
    { uuid: 'rt-hl',  name: '花莲路由器',    type_id: 'router', status: 'online',  lng: 121.62, lat: 24.00 },
    { uuid: 'rt-fk',  name: '福冈路由器',    type_id: 'router', status: 'online',  lng: 130.42, lat: 33.57 },
    { uuid: 'rt-ss',  name: '三沙路由器',    type_id: 'router', status: 'online',  lng: 119.72, lat: 25.40 },
    { uuid: 'rt-ic',  name: '仁川路由器',    type_id: 'router', status: 'offline',lng: 126.67, lat: 37.47 },

    /* ======== 通信机（25个）======== */
    { uuid: 'cm-sh1',  name: '上海通信机1', type_id: 'comm', status: 'online', lng: 121.45, lat: 31.22 },
    { uuid: 'cm-sh2',  name: '上海通信机2', type_id: 'comm', status: 'online', lng: 121.50, lat: 31.28 },
    { uuid: 'cm-nb',   name: '宁波通信机',  type_id: 'comm', status: 'online', lng: 121.54, lat: 29.86 },
    { uuid: 'cm-zs',   name: '舟山通信机',  type_id: 'comm', status: 'online', lng: 122.08, lat: 30.01 },
    { uuid: 'cm-wz',   name: '温州通信机',  type_id: 'comm', status: 'online', lng: 120.72, lat: 28.02 },
    { uuid: 'cm-fz',   name: '福州通信机',  type_id: 'comm', status: 'online', lng: 119.28, lat: 26.06 },
    { uuid: 'cm-xm',   name: '厦门通信机',  type_id: 'comm', status: 'online', lng: 118.07, lat: 24.46 },
    { uuid: 'cm-tp',   name: '台北通信机',  type_id: 'comm', status: 'online', lng: 121.54, lat: 25.01 },
    { uuid: 'cm-ks',   name: '高雄通信机',  type_id: 'comm', status: 'online', lng: 120.29, lat: 22.60 },
    { uuid: 'cm-naha', name: '那霸通信机',  type_id: 'comm', status: 'online', lng: 127.66, lat: 26.31 },
    { uuid: 'cm-ngs',  name: '长崎通信机',  type_id: 'comm', status: 'online', lng: 129.85, lat: 32.73 },
    { uuid: 'cm-kgs',  name: '鹿儿岛通信机',type_id: 'comm', status: 'online', lng: 130.54, lat: 31.58 },
    { uuid: 'cm-jeju', name: '济州通信机',  type_id: 'comm', status: 'online', lng: 126.51, lat: 33.48 },
    { uuid: 'cm-busan',name: '釜山通信机',  type_id: 'comm', status: 'online', lng: 129.06, lat: 35.16 },
    { uuid: 'cm-qz',   name: '泉州通信机',  type_id: 'comm', status: 'online', lng: 118.66, lat: 24.85 },
    { uuid: 'cm-lyg',  name: '连云通信机',  type_id: 'comm', status: 'online', lng: 119.20, lat: 34.58 },
    { uuid: 'cm-qd',   name: '青岛通信机',  type_id: 'comm', status: 'online', lng: 120.36, lat: 36.05 },
    { uuid: 'cm-hl',   name: '花莲通信机',  type_id: 'comm', status: 'online', lng: 121.58, lat: 23.96 },
    { uuid: 'cm-fk',   name: '福冈通信机',  type_id: 'comm', status: 'online', lng: 130.38, lat: 33.57 },
    { uuid: 'cm-sea1', name: '海上中继A',   type_id: 'comm', status: 'online', lng: 124.00, lat: 28.00 },
    { uuid: 'cm-sea2', name: '海上中继B',   type_id: 'comm', status: 'online', lng: 128.00, lat: 30.00 },
    { uuid: 'cm-sea3', name: '海上中继C',   type_id: 'comm', status: 'online', lng: 126.00, lat: 33.00 },
    { uuid: 'cm-sea4', name: '海上中继D',   type_id: 'comm', status: 'online', lng: 122.00, lat: 34.00 },
    { uuid: 'cm-ss',   name: '三沙通信机',  type_id: 'comm', status: 'online', lng: 119.68, lat: 25.38 },
    { uuid: 'cm-ic',   name: '仁川通信机',  type_id: 'comm', status: 'warning',lng: 126.63, lat: 37.43 },

    /* ======== 终端（30个）======== */
    { uuid: 'tm-sh1',  name: '上海终端A', type_id: 'terminal', status: 'online',  lng: 121.44, lat: 31.20 },
    { uuid: 'tm-sh2',  name: '上海终端B', type_id: 'terminal', status: 'online',  lng: 121.49, lat: 31.26 },
    { uuid: 'tm-sh3',  name: '上海终端C', type_id: 'terminal', status: 'online',  lng: 121.52, lat: 31.30 },
    { uuid: 'tm-nb1',  name: '宁波终端A', type_id: 'terminal', status: 'online',  lng: 121.53, lat: 29.84 },
    { uuid: 'tm-zs1',  name: '舟山终端A', type_id: 'terminal', status: 'online',  lng: 122.06, lat: 29.98 },
    { uuid: 'tm-wz1',  name: '温州终端A', type_id: 'terminal', status: 'online',  lng: 120.74, lat: 28.04 },
    { uuid: 'tm-fz1',  name: '福州终端A', type_id: 'terminal', status: 'online',  lng: 119.26, lat: 26.04 },
    { uuid: 'tm-fz2',  name: '福州终端B', type_id: 'terminal', status: 'online',  lng: 119.34, lat: 26.12 },
    { uuid: 'tm-xm1',  name: '厦门终端A', type_id: 'terminal', status: 'online',  lng: 118.05, lat: 24.44 },
    { uuid: 'tm-tp1',  name: '台北终端A', type_id: 'terminal', status: 'online',  lng: 121.52, lat: 24.99 },
    { uuid: 'tm-tp2',  name: '台北终端B', type_id: 'terminal', status: 'offline', lng: 121.60, lat: 25.08 },
    { uuid: 'tm-ks1',  name: '高雄终端A', type_id: 'terminal', status: 'online',  lng: 120.27, lat: 22.58 },
    { uuid: 'tm-naha1',name: '那霸终端A', type_id: 'terminal', status: 'online',  lng: 127.64, lat: 26.29 },
    { uuid: 'tm-ngs1', name: '长崎终端A', type_id: 'terminal', status: 'online',  lng: 129.83, lat: 32.71 },
    { uuid: 'tm-kgs1', name: '鹿儿岛终端',type_id: 'terminal', status: 'online',  lng: 130.52, lat: 31.56 },
    { uuid: 'tm-jeju1',name: '济州终端A', type_id: 'terminal', status: 'online',  lng: 126.49, lat: 33.46 },
    { uuid: 'tm-busan1',name:'釜山终端A', type_id: 'terminal', status: 'online',  lng: 129.04, lat: 35.14 },
    { uuid: 'tm-qz1',  name: '泉州终端A', type_id: 'terminal', status: 'online',  lng: 118.64, lat: 24.83 },
    { uuid: 'tm-lyg1', name: '连云终端A', type_id: 'terminal', status: 'online',  lng: 119.18, lat: 34.56 },
    { uuid: 'tm-qd1',  name: '青岛终端A', type_id: 'terminal', status: 'online',  lng: 120.34, lat: 36.03 },
    { uuid: 'tm-hl1',  name: '花莲终端A', type_id: 'terminal', status: 'online',  lng: 121.56, lat: 23.94 },
    { uuid: 'tm-fk1',  name: '福冈终端A', type_id: 'terminal', status: 'online',  lng: 130.36, lat: 33.55 },
    { uuid: 'tm-ss1',  name: '三沙终端A', type_id: 'terminal', status: 'online',  lng: 119.66, lat: 25.36 },
    { uuid: 'tm-ic1',  name: '仁川终端A', type_id: 'terminal', status: 'offline', lng: 126.61, lat: 37.41 },
    { uuid: 'tm-sh-dk',name: '上海港终端', type_id: 'terminal', status: 'online',  lng: 121.68, lat: 31.35 },
    { uuid: 'tm-nb-dk',name: '宁波港终端', type_id: 'terminal', status: 'online',  lng: 121.85, lat: 29.95 },
    { uuid: 'tm-zs-dk',name: '舟山港终端', type_id: 'terminal', status: 'online',  lng: 122.20, lat: 30.05 },
    { uuid: 'tm-xm-dk',name: '厦门港终端', type_id: 'terminal', status: 'online',  lng: 118.15, lat: 24.55 },
    { uuid: 'tm-busan-dk',name:'釜山港终端',type_id:'terminal', status: 'online', lng: 129.04, lat: 35.10 },
    { uuid: 'tm-qd-dk',name: '青岛港终端', type_id: 'terminal', status: 'online',  lng: 120.30, lat: 36.10 },

    /* ======== GPS（20个）======== */
    { uuid: 'gps-sh',  name: '上海GPS',  type_id: 'gps', status: 'online', lng: 121.48, lat: 31.24 },
    { uuid: 'gps-nb',  name: '宁波GPS',  type_id: 'gps', status: 'online', lng: 121.56, lat: 29.88 },
    { uuid: 'gps-zs',  name: '舟山GPS',  type_id: 'gps', status: 'online', lng: 122.11, lat: 30.01 },
    { uuid: 'gps-wz',  name: '温州GPS',  type_id: 'gps', status: 'online', lng: 120.71, lat: 28.01 },
    { uuid: 'gps-fz',  name: '福州GPS',  type_id: 'gps', status: 'online', lng: 119.31, lat: 26.09 },
    { uuid: 'gps-xm',  name: '厦门GPS',  type_id: 'gps', status: 'online', lng: 118.10, lat: 24.49 },
    { uuid: 'gps-tp',  name: '台北GPS',  type_id: 'gps', status: 'online', lng: 121.57, lat: 25.04 },
    { uuid: 'gps-ks',  name: '高雄GPS',  type_id: 'gps', status: 'online', lng: 120.32, lat: 22.63 },
    { uuid: 'gps-naha',name: '那霸GPS',  type_id: 'gps', status: 'online', lng: 127.69, lat: 26.34 },
    { uuid: 'gps-ngs', name: '长崎GPS',  type_id: 'gps', status: 'online', lng: 129.88, lat: 32.76 },
    { uuid: 'gps-kgs', name: '鹿儿岛GPS',type_id: 'gps', status: 'online', lng: 130.57, lat: 31.61 },
    { uuid: 'gps-jeju',name: '济州GPS',  type_id: 'gps', status: 'online', lng: 126.54, lat: 33.51 },
    { uuid: 'gps-busan',name:'釜山GPS',  type_id: 'gps', status: 'online', lng: 129.09, lat: 35.19 },
    { uuid: 'gps-qz',  name: '泉州GPS',  type_id: 'gps', status: 'online', lng: 118.69, lat: 24.88 },
    { uuid: 'gps-lyg', name: '连云GPS',  type_id: 'gps', status: 'online', lng: 119.23, lat: 34.61 },
    { uuid: 'gps-qd',  name: '青岛GPS',  type_id: 'gps', status: 'online', lng: 120.39, lat: 36.08 },
    { uuid: 'gps-hl',  name: '花莲GPS',  type_id: 'gps', status: 'online', lng: 121.61, lat: 23.99 },
    { uuid: 'gps-sea1',name: '海上GPS-A', type_id: 'gps', status: 'online', lng: 123.98, lat: 27.98 },
    { uuid: 'gps-sea2',name: '海上GPS-B', type_id: 'gps', status: 'online', lng: 127.98, lat: 29.98 },
    { uuid: 'gps-sea3',name: '海上GPS-C', type_id: 'gps', status: 'online', lng: 125.98, lat: 32.98 },

    /* ======== 海上货船（35艘）======== */
    ...Array.from({ length: 35 }, (_, i) => ({
      uuid: `ship${i}`,
      name: `东海货${i + 1}号`,
      type_id: 'ship' as const,
      status: (i === 5 || i === 12 || i === 23 ? 'offline' as const : 'online' as const),
      lng: 119.5 + i * 0.32 + (Math.random() - 0.5) * 0.3,
      lat: 23.0 + Math.random() * 13.0,
      extra: {
        speed: (4 + Math.random() * 16).toFixed(1) + '节',
        cargo: ['煤炭', '铁矿', '集装箱', '原油', '粮食', '钢材', '木材', '化肥', '水泥', '汽车',
                '冷冻品', '天然气', '铁矿石', '大豆', '棉花', '橡胶', '铜矿', '镍矿', '铝土', '锰矿',
                '焦炭', '石灰', '玻璃', '陶瓷', '茶叶', '丝绸', '机电', '电子', '水果', '水产',
                '纸浆', '废钢', '甲醇', '乙烯', '丙烯'][i],
        tonnage: (5000 + Math.floor(Math.random() * 60000)) + '吨',
      },
    })),

    /* ======== 船上设备（每船3个）======== */
    ...Array.from({ length: 35 }, (_, i) => [
      {
        uuid: `s${i}-comm`,
        name: `东海货${i + 1}号通信机`,
        type_id: 'comm' as const,
        status: (i === 5 || i === 12 || i === 23 ? 'offline' as const : 'online' as const),
        lng: 119.5 + i * 0.32 + (Math.random() - 0.5) * 0.15,
        lat: 23.0 + Math.random() * 13.0,
        extra: { ip: `10.2.${Math.floor(i/10)}.${i%10+1}` },
      },
      {
        uuid: `s${i}-term`,
        name: `东海货${i + 1}号终端`,
        type_id: 'terminal' as const,
        status: 'online' as const,
        lng: 119.5 + i * 0.32 + (Math.random() - 0.5) * 0.15,
        lat: 23.0 + Math.random() * 13.0,
        extra: {},
      },
      {
        uuid: `s${i}-gps`,
        name: `东海货${i + 1}号GPS`,
        type_id: 'gps' as const,
        status: (i === 30 ? 'offline' as const : 'online' as const),
        lng: 119.5 + i * 0.32 + (Math.random() - 0.5) * 0.15,
        lat: 23.0 + Math.random() * 13.0,
        extra: { accuracy: '±5m' },
      },
    ]).flat(),
  ],

  relations: [
    /* ======== 包含关系 ======== */
    // 每个站包含：路由器 + 通信机 + 终端 + GPS
    ...([
      ['sta-shanghai',  'rt-sh1',  'cm-sh1',  'cm-sh2',  'tm-sh1', 'tm-sh2', 'tm-sh3', 'gps-sh',  'tm-sh-dk'],
      ['sta-ningbo',    'rt-nb',   'cm-nb',   'tm-nb1',  'gps-nb', 'tm-nb-dk'],
      ['sta-zhoushan',  'rt-zs',   'cm-zs',   'tm-zs1',  'gps-zs', 'tm-zs-dk'],
      ['sta-wenzhou',   'rt-wz',   'cm-wz',   'tm-wz1',  'gps-wz'],
      ['sta-fuzhou',    'rt-fz',   'cm-fz',   'tm-fz1',  'tm-fz2', 'gps-fz'],
      ['sta-xiamen',    'rt-xm',   'cm-xm',   'tm-xm1',  'gps-xm', 'tm-xm-dk'],
      ['sta-quanzhou',  'rt-qz',   'cm-qz',   'tm-qz1',  'gps-qz'],
      ['sta-sanya',     'rt-ss',   'cm-ss',   'tm-ss1',  'gps-sh'],
      ['sta-lianyun',   'rt-lyg',  'cm-lyg',  'tm-lyg1', 'gps-lyg'],
      ['sta-qingdao',   'rt-qd',   'cm-qd',   'tm-qd1',  'gps-qd', 'tm-qd-dk'],
      ['sta-taipei',    'rt-tp',   'cm-tp',   'tm-tp1',  'tm-tp2', 'gps-tp'],
      ['sta-kaohsiung', 'rt-ks',   'cm-ks',   'tm-ks1',  'gps-ks'],
      ['sta-hualien',   'rt-hl',   'cm-hl',   'tm-hl1',  'gps-hl'],
      ['sta-naha',      'rt-naha', 'cm-naha', 'tm-naha1','gps-naha'],
      ['sta-nagasaki',  'rt-ngs',  'cm-ngs',  'tm-ngs1', 'gps-ngs'],
      ['sta-kagoshima', 'rt-kgs',  'cm-kgs',  'tm-kgs1', 'gps-kgs'],
      ['sta-fukuoka',   'rt-fk',   'cm-fk',   'tm-fk1',  'gps-busan'],
      ['sta-jeju',      'rt-jeju', 'cm-jeju', 'tm-jeju1','gps-jeju'],
      ['sta-busan',     'rt-busan','cm-busan','tm-busan1','gps-busan','tm-busan-dk'],
      ['sta-incheon',   'rt-ic',   'cm-ic',   'tm-ic1',  'gps-qd'],
    ] as const).flatMap(([parent, ...children]) =>
      children.map((child, i) => ({
        uuid: `c-${parent}-${child}`,
        name: '',
        type_id: 'contain' as const,
        status: 'active' as const,
        from_id: parent,
        to_id: child,
      }))
    ),

    // 船包含设备
    ...Array.from({ length: 35 }, (_, i) => [
      { uuid: `c-s${i}-comm`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-comm` },
      { uuid: `c-s${i}-term`, name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-term` },
      { uuid: `c-s${i}-gps`,  name: '', type_id: 'contain' as const, status: 'active' as const, from_id: `ship${i}`, to_id: `s${i}-gps` },
    ]).flat(),

    /* ======== 站内通信关系（终端→通信机→路由器）======== */
    ...([
      ['tm-sh1', 'cm-sh1'], ['tm-sh2', 'cm-sh2'], ['tm-sh3', 'cm-sh1'], ['cm-sh1', 'rt-sh1'], ['cm-sh2', 'rt-sh1'],
      ['tm-nb1', 'cm-nb'], ['cm-nb', 'rt-nb'],
      ['tm-zs1', 'cm-zs'], ['cm-zs', 'rt-zs'],
      ['tm-wz1', 'cm-wz'], ['cm-wz', 'rt-wz'],
      ['tm-fz1', 'cm-fz'], ['tm-fz2', 'cm-fz'], ['cm-fz', 'rt-fz'],
      ['tm-xm1', 'cm-xm'], ['cm-xm', 'rt-xm'],
      ['tm-qz1', 'cm-qz'], ['cm-qz', 'rt-qz'],
      ['tm-ss1', 'cm-ss'], ['cm-ss', 'rt-ss'],
      ['tm-lyg1','cm-lyg'],['cm-lyg','rt-lyg'],
      ['tm-qd1', 'cm-qd'], ['cm-qd', 'rt-qd'],
      ['tm-tp1', 'cm-tp'], ['tm-tp2', 'cm-tp'], ['cm-tp', 'rt-tp'],
      ['tm-ks1', 'cm-ks'], ['cm-ks', 'rt-ks'],
      ['tm-hl1', 'cm-hl'], ['cm-hl', 'rt-hl'],
      ['tm-naha1','cm-naha'],['cm-naha','rt-naha'],
      ['tm-ngs1','cm-ngs'],['cm-ngs','rt-ngs'],
      ['tm-kgs1','cm-kgs'],['cm-kgs','rt-kgs'],
      ['tm-fk1', 'cm-fk'], ['cm-fk', 'rt-fk'],
      ['tm-jeju1','cm-jeju'],['cm-jeju','rt-jeju'],
      ['tm-busan1','cm-busan'],['cm-busan','rt-busan'],
      ['tm-ic1', 'cm-ic'], ['cm-ic', 'rt-ic'],
    ] as [string, string][]).map(([from, to], i) => ({
      uuid: `l-in-${i}`,
      name: from.startsWith('tm') ? '内部通信' : '光纤链路',
      type_id: from.startsWith('tm') ? 'wired' as const : 'fiber' as const,
      status: (from === 'tm-ic1' || from === 'cm-ic' ? 'disconnected' as const : 'connected' as const),
      from_id: from,
      to_id: to,
    })),

    /* ======== 骨干链路（跨站路由器互联）======== */
    // 中国沿海链路
    { uuid: 'l-bb-1', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-qd',  to_id: 'rt-lyg' },
    { uuid: 'l-bb-2', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-lyg', to_id: 'rt-sh1' },
    { uuid: 'l-bb-3', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-sh1', to_id: 'rt-nb' },
    { uuid: 'l-bb-4', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-nb',  to_id: 'rt-zs' },
    { uuid: 'l-bb-5', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-zs',  to_id: 'rt-wz' },
    { uuid: 'l-bb-6', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-wz',  to_id: 'rt-fz' },
    { uuid: 'l-bb-7', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-fz',  to_id: 'rt-qz' },
    { uuid: 'l-bb-8', name: '沿海骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-qz',  to_id: 'rt-xm' },

    // 台灣岛内
    { uuid: 'l-bb-9', name: '岛内骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-tp', to_id: 'rt-hl' },
    { uuid: 'l-bb-10',name: '岛内骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-tp', to_id: 'rt-ks' },

    // 日本链路
    { uuid: 'l-bb-11',name: '日本骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-ngs', to_id: 'rt-kgs' },
    { uuid: 'l-bb-12',name: '日本骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-kgs', to_id: 'rt-fk' },
    { uuid: 'l-bb-13',name: '日本骨干', type_id: 'fiber', status: 'connected', from_id: 'rt-fk',  to_id: 'rt-busan' },

    // 跨海链路
    { uuid: 'l-bb-14',name: '中日海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-sh1', to_id: 'rt-ngs' },
    { uuid: 'l-bb-15',name: '中韩海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-sh1', to_id: 'rt-jeju' },
    { uuid: 'l-bb-16',name: '韩日海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-jeju',to_id: 'rt-fk' },
    { uuid: 'l-bb-17',name: '闽台海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-fz',  to_id: 'rt-tp' },
    { uuid: 'l-bb-18',name: '厦台海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-xm',  to_id: 'rt-ks' },
    { uuid: 'l-bb-19',name: '台日海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-tp',  to_id: 'rt-naha' },
    { uuid: 'l-bb-20',name: '日冲海缆', type_id: 'fiber', status: 'connected', from_id: 'rt-naha',to_id: 'rt-ngs' },
    { uuid: 'l-bb-21',name: '仁川链路', type_id: 'fiber', status: 'disconnected', from_id: 'rt-ic', to_id: 'rt-jeju' },

    // 海上中继链路
    { uuid: 'l-sea-1', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea1', to_id: 'rt-sh1' },
    { uuid: 'l-sea-2', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea2', to_id: 'rt-naha' },
    { uuid: 'l-sea-3', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea3', to_id: 'rt-jeju' },
    { uuid: 'l-sea-4', name: '卫星中继', type_id: 'satellite-link', status: 'connected', from_id: 'cm-sea4', to_id: 'rt-sh1' },
    { uuid: 'l-sea-5', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea1', to_id: 'cm-sea2' },
    { uuid: 'l-sea-6', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea2', to_id: 'cm-sea3' },
    { uuid: 'l-sea-7', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea3', to_id: 'cm-sea4' },
    { uuid: 'l-sea-8', name: '海上中继', type_id: 'wireless', status: 'connected', from_id: 'cm-sea4', to_id: 'cm-sea1' },

    // 港口终端通信
    { uuid: 'l-dk-sh', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-sh-dk', to_id: 'cm-sh1' },
    { uuid: 'l-dk-nb', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-nb-dk', to_id: 'cm-nb' },
    { uuid: 'l-dk-zs', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-zs-dk', to_id: 'cm-zs' },
    { uuid: 'l-dk-xm', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-xm-dk', to_id: 'cm-xm' },
    { uuid: 'l-dk-bs', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-busan-dk', to_id: 'cm-busan' },
    { uuid: 'l-dk-qd', name: '港口通信', type_id: 'wired', status: 'connected', from_id: 'tm-qd-dk', to_id: 'cm-qd' },

    /* ======== 船与岸站/中继通信 ======== */
    ...Array.from({ length: 35 }, (_, i) => {
      const isOff = i === 5 || i === 12 || i === 23
      // 根据位置分配最近岸站
      const lng = 119.5 + i * 0.32
      let target = 'cm-sh1'
      if (lng < 119.5) target = 'cm-xm'
      else if (lng < 121) target = 'cm-fz'
      else if (lng < 122.5) target = 'cm-sh1'
      else if (lng < 125) target = 'cm-sea1'
      else if (lng < 127) target = 'cm-naha'
      else if (lng < 129) target = 'cm-sea2'
      else if (lng < 130) target = 'cm-ngs'
      else target = 'cm-busan'

      const relay = i % 2 === 0 ? 'cm-sea1' : i % 3 === 0 ? 'cm-sea2' : 'cm-sea3'
      return [
        { uuid: `l-s${i}-sh`, name: '无线通信', type_id: 'wireless' as const, status: isOff ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: target },
        { uuid: `l-s${i}-rl`, name: '卫星中继', type_id: 'satellite-link' as const, status: isOff ? 'disconnected' as const : 'connected' as const, from_id: `s${i}-comm`, to_id: relay },
        { uuid: `l-s${i}-in`, name: '船内通信', type_id: 'wired' as const, status: 'connected' as const, from_id: `s${i}-term`, to_id: `s${i}-comm` },
      ]
    }).flat(),

    /* ======== 船间通信 ======== */
    ...Array.from({ length: 34 }, (_, i) => ({
      uuid: `l-ss-${i}`,
      name: '船间通信',
      type_id: 'wireless' as const,
      status: (i === 5 || i === 12 || i === 23 ? 'disconnected' as const : 'connected' as const),
      from_id: `ship${i}`,
      to_id: `ship${i + 1}`,
    })),
  ].flat(),
}