/* ================================================================
 *  Mercator 投影 - 经纬度 → SVG 坐标
 *  默认以海南岛为中心 (110°E, 18°N)
 * ================================================================ */

import type { ProjectionConfig } from './types'

const DEG = Math.PI / 180
const RAD = 180 / Math.PI

/** 经纬度转 Mercator 像素坐标 */
export function lngLatToMercator(lng: number, lat: number): { x: number; y: number } {
  const x = lng / 360 + 0.5
  const sinLat = Math.sin(Math.max(-0.9, Math.min(0.9, lat * DEG)))
  const y = 0.5 - 0.25 * Math.log((1 + sinLat) / (1 - sinLat)) / Math.PI
  return { x, y }
}

/**
 * 创建投影函数
 * 根据数据范围和画布尺寸，自动计算投影参数
 */
export function createProjection(
  nodes: { lng: number; lat: number }[],
  config: ProjectionConfig,
): (lng: number, lat: number) => { x: number; y: number } {
  const { centerLng, centerLat, zoom, width, height } = config

  // 计算数据范围
  let minLng = Infinity, maxLng = -Infinity
  let minLat = Infinity, maxLat = -Infinity
  for (const n of nodes) {
    if (n.lng < minLng) minLng = n.lng
    if (n.lng > maxLng) maxLng = n.lng
    if (n.lat < minLat) minLat = n.lat
    if (n.lat > maxLat) maxLat = n.lat
  }

  // 如果没有数据，使用默认范围
  if (!isFinite(minLng)) { minLng = centerLng - 5; maxLng = centerLng + 5 }
  if (!isFinite(minLat)) { minLat = centerLat - 5; maxLat = centerLat + 5 }

  // 加一点 padding
  const padLng = Math.max((maxLng - minLng) * 0.2, 1)
  const padLat = Math.max((maxLat - minLat) * 0.2, 1)
  minLng -= padLng; maxLng += padLng
  minLat -= padLat; maxLat += padLat

  // 以数据中心为投影参考
  const projCenterLng = (minLng + maxLng) / 2
  const projCenterLat = (minLat + maxLat) / 2

  // 计算 Mercator 坐标范围
  const topLeft = lngLatToMercator(minLng, maxLat)
  const bottomRight = lngLatToMercator(maxLng, minLat)

  const rangeX = bottomRight.x - topLeft.x
  const rangeY = bottomRight.y - topLeft.y

  // 计算缩放以适配画布
  const scaleX = width / (rangeX || 1)
  const scaleY = height / (rangeY || 1)
  const scale = Math.min(scaleX, scaleY) * zoom

  // 中心点 Mercator 坐标
  const center = lngLatToMercator(projCenterLng, projCenterLat)

  return (lng: number, lat: number) => {
    const p = lngLatToMercator(lng, lat)
    return {
      x: (p.x - center.x) * scale + width / 2,
      y: (p.y - center.y) * scale + height / 2,
    }
  }
}

/**
 * 从 Mercator 坐标反算经纬度（用于交互时获取地理位置）
 */
export function mercatorToLngLat(x: number, y: number): { lng: number; lat: number } {
  const lng = (x - 0.5) * 360
  const n = Math.PI - 4 * Math.PI * (y - 0.5) // actually 0.5 - y, but we invert
  const lat = RAD * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
  return { lng, lat }
}