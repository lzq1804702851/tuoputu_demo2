import type { TopologyData } from 'topology-graph-vue'

export const mockData: TopologyData = {
  groups: [
    // 大洲岛
    {
      id: 'dazhou', name: '大洲岛有线通信网', type: 'island',
      subs: [
        {
          id: 'dz-sta1', name: '大洲岛1号通信站',
          devices: [
            { id: 'dz-term', name: '终端', type: 'terminal', status: 'online' },
            { id: 'dz-comm', name: '通信机', type: 'comm-device', status: 'online' },
          ],
        },
        {
          id: 'dz-sta-rt', name: '岛上核心路由站点',
          devices: [
            { id: 'dz-route', name: '路由器', type: 'router', status: 'online' },
          ],
        },
      ],
      devices: [],
    },
    // 海上路由站
    {
      id: 'sea', name: '海上有线路由站点', type: 'route-station',
      devices: [
        { id: 'sea-route', name: '路由器', type: 'router', status: 'online' },
      ],
    },
    // 海南岛
    {
      id: 'hainan', name: '海南岛有线通信网', type: 'island',
      subs: [
        {
          id: 'hn-sta1', name: '海南岛1号通信站',
          devices: [
            { id: 'hn1-term', name: '终端', type: 'terminal', status: 'online' },
            { id: 'hn1-comm', name: '通信机', type: 'comm-device', status: 'offline' },
          ],
        },
        {
          id: 'hn-sta2', name: '海南岛2号通信站',
          devices: [
            { id: 'hn2-term', name: '终端', type: 'terminal', status: 'online' },
            { id: 'hn2-comm', name: '通信机', type: 'comm-device', status: 'online' },
          ],
        },
        {
          id: 'hn-sta-rt', name: '岛上核心路由站点',
          devices: [
            { id: 'hn-route', name: '路由器', type: 'router', status: 'offline' },
          ],
        },
      ],
      devices: [],
    },
  ],
  links: [
    // 岛内连线
    { source: 'dz-term', target: 'dz-comm', type: 'internal' },
    { source: 'dz-comm', target: 'dz-route', type: 'fiber' },
    { source: 'hn1-term', target: 'hn1-comm', type: 'internal' },
    { source: 'hn2-term', target: 'hn2-comm', type: 'internal' },
    { source: 'hn1-comm', target: 'hn-route', type: 'fiber' },
    { source: 'hn2-comm', target: 'hn-route', type: 'fiber' },
    // 有线路由
    { source: 'dz-route', target: 'sea-route', type: 'fiber' },
    { source: 'hn-route', target: 'sea-route', type: 'fiber' },
  ],
}

// 动态添加10艘船
for (let i = 0; i < 10; i++) {
  const commStatus = i === 2 || i === 7 ? 'offline' : 'online'
  const termStatus = i === 0 ? 'offline' : 'online'
  const gpsStatus = i === 4 ? 'offline' : 'online'

  mockData.groups.push({
    id: `ship${i}`, name: `${i + 1}号船`, type: 'ship',
    devices: [
      { id: `s${i}-term`, name: '终端', type: 'terminal', status: termStatus },
      { id: `s${i}-comm`, name: '通信机', type: 'comm-device', status: commStatus },
      { id: `s${i}-gps`, name: 'GPS', type: 'gps', status: gpsStatus },
    ],
  })
  mockData.links.push(
    { source: `s${i}-term`, target: `s${i}-comm`, type: 'internal' },
    { source: `s${i}-comm`, target: 'dz-comm', type: 'wireless' },
    { source: `s${i}-comm`, target: 'hn1-comm', type: 'wireless' },
    { source: `s${i}-comm`, target: 'hn2-comm', type: 'wireless' },
  )
}
