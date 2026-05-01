/* ================================================================
 *  全球地图数据 - 基于 Natural Earth 1:50m TopoJSON
 *  使用 world-atlas 包 + topojson-client + d3-geo 渲染
 *  多层渲染：陆地填充 → 海岸线 → 国界线 → 经纬网格
 * ================================================================ */

import worldTopo from 'world-atlas/countries-50m.json'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import { geoPath, geoGraticule10 } from 'd3-geo'
import type { GeoPermissibleObjects } from 'd3-geo'

/** 投影后的地图要素（SVG 路径） */
export interface ProjectedFeature {
  /** 地理名称 */
  name: string
  /** SVG 路径 */
  path: string
  /** 要素层级 */
  layer: 'ocean' | 'land' | 'coastline' | 'borders' | 'graticule'
  /** 样式 */
  style: {
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
    strokeDasharray?: string
  }
}

/** 投影前的 GeoJSON 要素 */
interface WorldFeature {
  name: string
  geometry: GeoPermissibleObjects
  layer: ProjectedFeature['layer']
  style: ProjectedFeature['style']
}

// 从 TopoJSON 转换为 GeoJSON
const topology = worldTopo as unknown as Topology
const countriesGeo = feature(topology, topology.objects.countries)

// 构建地图要素数组（按渲染顺序）
let cachedFeatures: WorldFeature[] | null = null

export function getWorldFeatures(): WorldFeature[] {
  if (cachedFeatures) return cachedFeatures

  cachedFeatures = []

  // 经纬网格（最底层）
  const graticule = geoGraticule10()
  cachedFeatures.push({
    name: 'Graticule',
    geometry: graticule as unknown as GeoPermissibleObjects,
    layer: 'graticule',
    style: {
      fill: 'none',
      stroke: '#1a2a4a',
      strokeWidth: 0.3,
      opacity: 0.5,
    },
  })

  // 国家边界（填充 + 边框）
  if (countriesGeo && 'features' in countriesGeo) {
    for (const f of countriesGeo.features) {
      // 陆地填充
      cachedFeatures.push({
        name: (f.properties as any)?.name || `Country ${(f as any).id || ''}`,
        geometry: f as unknown as GeoPermissibleObjects,
        layer: 'land',
        style: {
          fill: '#162744',
          stroke: '#1e5a8f',
          strokeWidth: 0.6,
          opacity: 0.9,
        },
      })
    }

    // 国界线（单独一层，更粗更亮）
    for (const f of countriesGeo.features) {
      cachedFeatures.push({
        name: `Border ${(f as any).id || ''}`,
        geometry: f as unknown as GeoPermissibleObjects,
        layer: 'borders',
        style: {
          fill: 'none',
          stroke: '#2563a8',
          strokeWidth: 0.3,
          opacity: 0.4,
          strokeDasharray: undefined,
        },
      })
    }

    // 海岸线高亮（最顶层描边）
    for (const f of countriesGeo.features) {
      cachedFeatures.push({
        name: `Coast ${(f as any).id || ''}`,
        geometry: f as unknown as GeoPermissibleObjects,
        layer: 'coastline',
        style: {
          fill: 'none',
          stroke: '#3b82c4',
          strokeWidth: 0.8,
          opacity: 0.7,
        },
      })
    }
  }

  return cachedFeatures
}

/**
 * 使用 D3 geoPath 将 GeoJSON 要素转换为 SVG 路径
 * @param features 地图要素数组
 * @param project 投影函数 (lng, lat) => {x, y}
 */
export function projectFeatures(
  features: WorldFeature[],
  project: (lng: number, lat: number) => { x: number; y: number },
): ProjectedFeature[] {
  // 创建 D3 兼容的投影函数
  const d3Projection = {
    stream: (output: any) => ({
      point(x: number, y: number) {
        const p = project(x, y)
        output.point(p.x, p.y)
      },
      lineStart() { output.lineStart() },
      lineEnd() { output.lineEnd() },
      polygonStart() { output.polygonStart() },
      polygonEnd() { output.polygonEnd() },
      sphere() { output.sphere() },
    }),
  }

  const pathGen = geoPath().projection(d3Projection as any)

  const result: ProjectedFeature[] = []

  for (const f of features) {
    const d = pathGen(f.geometry as GeoPermissibleObjects)
    if (d) {
      result.push({
        path: d,
        style: f.style,
        name: f.name,
        layer: f.layer,
      })
    }
  }

  return result
}