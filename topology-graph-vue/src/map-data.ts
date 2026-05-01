/* ================================================================
 *  南海区域地图 SVG 路径数据
 *  覆盖范围：约 95°E-125°E, 0°N-30°N
 *  包含：中国南部海岸线、海南岛、台湾、越南、菲律宾轮廓
 *  坐标系：经纬度直接作为 SVG 路径坐标（后续通过投影转换）
 * ================================================================ */

export interface MapFeature {
  /** 地理名称 */
  name: string
  /** SVG 路径（经纬度坐标） */
  path: string
  /** 类型 */
  type: 'coastline' | 'border' | 'island'
  /** 样式 */
  style: {
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
  }
}

/**
 * 南海区域地图要素
 * 路径坐标为 [经度,纬度] 格式，使用 M/L/Z SVG 命令
 * 数据为简化版轮廓线，保持地理形状可识别
 */
export const southChinaSeaFeatures: MapFeature[] = [
  // ==================== 中国南部海岸线 ====================
  {
    name: '中国南部海岸线',
    type: 'coastline',
    path: 'M95,22 L97,21.5 L99,21.2 L100.5,21.4 L102,21.5 L103,20.8 L104.5,20.2 L105.5,19.7 L106,18.5 L106.5,18.2 L107,17.5 L107.5,16.8 L108,16.2 L108.2,15.8 L108.5,15 L108.8,14.5 L109,13.8 L109.2,13.2 L109.3,12.8 L109.5,12.2 L109.8,11.5 L110,11 L110.2,10.5 L110.5,10 L111,9.5 L111.5,8.8 L112,8.2 L112.5,7.8 L113,7.5 L113.5,7.2 L114,7 L114.5,6.8 L115,6.5 L115.5,6.2 L116,5.8 L116.5,5.5 L117,5.2 L117.5,5 L118,4.8 L118.5,4.5 L119,4.3 L119.5,4.2 L120,4 L120.5,3.8 L121,3.5 L121.5,3.2 L122,2.8 L122.5,2.5 L123,2.2 L124,1.8 L125,1.5',
    style: { fill: 'none', stroke: '#1e5a8f', strokeWidth: 1.2, opacity: 0.7 },
  },

  // ==================== 海南岛 ====================
  {
    name: '海南岛',
    type: 'island',
    path: 'M108.6,19.2 L109,19.6 L109.4,19.8 L109.8,19.7 L110.2,19.5 L110.5,19.2 L110.8,18.8 L111,18.4 L111.2,18 L111.1,17.6 L110.8,17.2 L110.5,16.8 L110.2,16.5 L109.8,16.3 L109.4,16.2 L109,16.3 L108.7,16.6 L108.5,17 L108.4,17.5 L108.3,18 L108.4,18.5 L108.5,18.8 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 1.0, opacity: 0.9 },
  },

  // ==================== 台湾 ====================
  {
    name: '台湾',
    type: 'island',
    path: 'M120,25.2 L120.2,25 L120.5,24.5 L120.8,24 L121,23.5 L121.2,23 L121.3,22.5 L121.2,22 L121,21.5 L120.8,21.2 L120.5,21 L120.2,21.2 L120,21.5 L119.8,22 L119.7,22.5 L119.8,23 L119.8,23.5 L119.9,24 L120,24.5 L120,25 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 1.0, opacity: 0.9 },
  },

  // ==================== 越南海岸线 ====================
  {
    name: '越南海岸线',
    type: 'coastline',
    path: 'M104,23 L105,22 L106,21 L106.5,20.5 L107,19.5 L107.5,18.5 L108,17.5 L108.5,16.5 L109,15.5 L109.5,14.5 L110,13.5 L110.5,12.5 L111,11.5 L111.5,10.5 L112,10 L112.5,9.5 L113,9 L113.5,8.5 L114,8 L114.5,7.5 L115,7 L115.5,6.5 L116,6 L116.5,5.5 L117,5 L117.5,4.5 L118,4 L118.5,3.5 L119,3 L119.5,2.5 L120,2',
    style: { fill: 'none', stroke: '#1e5a8f', strokeWidth: 1.2, opacity: 0.7 },
  },

  // ==================== 越南-中国陆地边界 ====================
  {
    name: '中越陆地边界',
    type: 'border',
    path: 'M104,23 L104.5,22.8 L105,22.5 L105.5,22.8 L106,22.5 L106.5,22.3 L107,22 L107.5,22.2 L108,22.3 L108.5,22 L109,21.8 L109.5,21.5 L110,21.5',
    style: { fill: 'none', stroke: '#2a4a6f', strokeWidth: 0.8, opacity: 0.5 },
  },

  // ==================== 菲律宾（吕宋岛简化） ====================
  {
    name: '吕宋岛',
    type: 'island',
    path: 'M119.5,18.5 L120,18.8 L120.5,18.5 L121,18 L121.3,17.5 L121.5,17 L121.8,16.5 L122,16 L122.2,15.5 L122.3,15 L122.2,14.5 L122,14 L121.5,13.5 L121,13.2 L120.5,13 L120,13.2 L119.5,13.5 L119.2,14 L119,14.5 L118.8,15 L118.7,15.5 L118.8,16 L119,16.5 L119.2,17 L119.3,17.5 L119.4,18 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 1.0, opacity: 0.9 },
  },

  // ==================== 菲律宾（米沙鄢群岛简化） ====================
  {
    name: '米沙鄢群岛',
    type: 'island',
    path: 'M121,12.5 L121.5,12.8 L122,12.5 L122.5,12 L123,11.5 L123.5,11 L124,10.5 L124.2,10 L124,9.5 L123.5,9.2 L123,9.5 L122.5,10 L122,10.5 L121.5,11 L121,11.5 L120.8,12 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 1.0, opacity: 0.9 },
  },

  // ==================== 菲律宾（棉兰老岛简化） ====================
  {
    name: '棉兰老岛',
    type: 'island',
    path: 'M122,9 L122.5,9.2 L123,9 L123.5,8.5 L124,8 L124.5,7.5 L125,7 L125.3,6.5 L125.2,6 L124.8,5.5 L124.3,5.2 L123.8,5 L123.3,5.2 L122.8,5.5 L122.3,6 L122,6.5 L121.8,7 L121.7,7.5 L121.5,8 L121.5,8.5 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 1.0, opacity: 0.9 },
  },

  // ==================== 西沙群岛 ====================
  {
    name: '西沙群岛',
    type: 'island',
    path: 'M111.5,16.8 L111.8,16.9 L112,16.7 L112.2,16.5 L112,16.3 L111.7,16.2 L111.5,16.4 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 0.8, opacity: 0.8 },
  },

  // ==================== 南沙群岛（简化） ====================
  {
    name: '南沙群岛',
    type: 'island',
    path: 'M113,10 L113.5,10.2 L114,10 L114.5,9.5 L114.3,9 L113.8,8.8 L113.3,9 L113,9.5 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 0.8, opacity: 0.8 },
  },

  // ==================== 九段线（简化） ====================
  {
    name: '九段线',
    type: 'border',
    path: 'M109,22 L108,20 L107,18 L107,16 L108,14 L109,12 L110,10 L112,8 L114,6 L116,5 L118,4.5 L120,4.5 L122,5 L124,6 L126,7 L128,8 L130,9 L131,10 L132,11 L132,13 L131,15 L130,17 L129,19 L128,21 L127,22',
    style: { fill: 'none', stroke: '#3b5998', strokeWidth: 1.0, opacity: 0.6 },
  },

  // ==================== 雷州半岛 ====================
  {
    name: '雷州半岛',
    type: 'island',
    path: 'M109.5,21.2 L109.8,21 L110.2,20.8 L110.4,20.5 L110.3,20.2 L110,20 L109.7,20.1 L109.5,20.3 L109.3,20.6 L109.3,20.9 Z',
    style: { fill: '#1a2744', stroke: '#2d7dba', strokeWidth: 0.8, opacity: 0.9 },
  },

  // ==================== 巴士海峡区域线 ====================
  {
    name: '巴士海峡',
    type: 'coastline',
    path: 'M120,21 L120.5,20.8 L121,20.5 L121.3,20 L121.2,19.5 L120.8,19 L120.5,18.8 L120,18.5',
    style: { fill: 'none', stroke: '#1e5a8f', strokeWidth: 0.8, opacity: 0.5 },
  },
]

/**
 * 将经纬度地图路径转换为 SVG 坐标路径
 * @param features 地图要素数组
 * @param project 投影函数 (lng, lat) => {x, y}
 */
export function projectFeatures(
  features: MapFeature[],
  project: (lng: number, lat: number) => { x: number; y: number },
): MapFeature[] {
  return features.map(f => ({
    ...f,
    path: convertPath(f.path, project),
  }))
}

/** 将 "Mlng,lat Llng,lat ..." 格式路径转换 */
function convertPath(
  path: string,
  project: (lng: number, lat: number) => { x: number; y: number },
): string {
  const commands = path.split(/(?=[MLZ])/)
  return commands
    .map(cmd => {
      const letter = cmd[0]
      if (letter === 'Z') return 'Z'
      const rest = cmd.slice(1).trim()
      if (!rest) return ''
      const tokens = rest.split(/\s+/)
      const pairs: string[] = []
      for (const token of tokens) {
        const parts = token.split(',')
        if (parts.length < 2) continue
        const lng = parseFloat(parts[0])
        const lat = parseFloat(parts[1])
        if (isNaN(lng) || isNaN(lat)) continue
        const p = project(lng, lat)
        pairs.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      }
      if (pairs.length === 0) return ''
      return `${letter}${pairs.join(' ')}`
    })
    .filter(s => s !== '')
    .join(' ')
}