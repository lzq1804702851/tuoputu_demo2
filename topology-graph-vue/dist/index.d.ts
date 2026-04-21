import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';

export declare interface ComputedDevice extends Device {
    /** SVG 坐标 */
    x: number;
    y: number;
    /** 绘制半径 */
    r: number;
    /** 所属 subId（如果有） */
    subId?: string;
    /** 所属 groupId */
    groupId: string;
    /** 图标（已解析） */
    icon: string;
}

export declare interface ComputedGroup {
    id: string;
    name: string;
    type: string;
    color: string;
    x: number;
    y: number;
    r: number;
    subs: ComputedSub[];
    devices: ComputedDevice[];
}

export declare interface ComputedLink {
    source: string;
    target: string;
    type: string;
    status: LinkStatus;
    /** internal / sub / external */
    level: 'internal' | 'sub' | 'external';
}

export declare interface ComputedSub {
    id: string;
    name: string;
    x: number;
    y: number;
    r: number;
    devices: ComputedDevice[];
    groupId: string;
}

export declare const defaultDeviceTypes: Record<string, DeviceTypeConfig>;

export declare const defaultGroupTypes: Record<string, GroupTypeConfig>;

export declare const defaultLinkTypes: Record<string, LinkTypeConfig>;

/** 设备节点 */
export declare interface Device {
    id: string;
    name: string;
    type: string;
    status: DeviceStatus;
}

/** 设备状态 */
export declare type DeviceStatus = 'online' | 'offline';

/** 设备类型配置 */
export declare interface DeviceTypeConfig {
    icon: string;
    name: string;
}

/** 分组（岛屿、船只、路由站等） */
export declare interface Group {
    id: string;
    name: string;
    type: string;
    subs?: SubGroup[];
    devices?: Device[];
}

/** 分组类型配置 */
export declare interface GroupTypeConfig {
    color: string;
    name: string;
}

/** 图例配置 */
export declare interface LegendConfig {
    show?: boolean;
    position?: 'left-bottom' | 'right-bottom' | 'left-top' | 'right-top';
    deviceTypes?: string[];
    linkTypes?: string[];
    showStatus?: boolean;
    style?: LegendStyle;
    sectionTitles?: LegendSectionTitles;
}

/** 图例分组标题 */
export declare interface LegendSectionTitles {
    devices?: string;
    links?: string;
    status?: string;
}

/** 图例样式 */
export declare interface LegendStyle {
    background?: string;
    borderColor?: string;
    borderRadius?: number;
    fontSize?: number;
    textColor?: string;
    titleColor?: string;
}

/** 链路状态 */
export declare type LinkStatus = 'normal' | 'error';

/** 链路类型配置 */
export declare interface LinkTypeConfig {
    color: string;
    width: number;
    dash: string;
    name: string;
}

/** 渲染所需的完整状态 */
export declare interface RenderState {
    groups: ComputedGroup[];
    links: ComputedLink[];
    deviceMap: Map<string, ComputedDevice>;
    faultMode: boolean;
    faultRelated: Set<string>;
    /** 最终合并后的配置 */
    deviceTypes: Record<string, DeviceTypeConfig>;
    linkTypes: Record<string, LinkTypeConfig>;
    groupTypes: Record<string, GroupTypeConfig>;
    legend: LegendConfig;
}

/** 子站点（如通信站、路由站点） */
export declare interface SubGroup {
    id: string;
    name: string;
    devices: Device[];
}

/** 链路（设备ID → 设备ID） */
export declare interface TopoLink {
    source: string;
    target: string;
    type: string;
    status?: LinkStatus;
}

/** 拓扑数据 */
export declare interface TopologyData {
    groups: Group[];
    links: TopoLink[];
}

export declare const TopologyGraph: DefineComponent<TopologyGraphProps, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
"node-click": (device: ComputedDevice) => any;
}, string, PublicProps, Readonly<TopologyGraphProps> & Readonly<{
"onNode-click"?: ((device: ComputedDevice) => any) | undefined;
}>, {
legend: LegendConfig;
showToolbar: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, false, {
container: HTMLDivElement;
svgEl: SVGSVGElement;
}, HTMLDivElement>;

/** 组件 Props */
export declare interface TopologyGraphProps {
    data: TopologyData;
    deviceTypes?: Record<string, DeviceTypeConfig>;
    linkTypes?: Record<string, LinkTypeConfig>;
    groupTypes?: Record<string, GroupTypeConfig>;
    legend?: LegendConfig;
    showToolbar?: boolean;
}

export { }
