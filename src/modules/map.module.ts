import {DemoMap} from '../classes/map';
import * as d3 from 'd3';

export module testMap {
    let map: DemoMap;

    export function start(containerId: string, pointData: any[]) {
        let container = d3.select('#' + containerId);
        if(container.empty()) throw('Please specify a valid containing element when calling the map function.');
        this.map = new DemoMap(container);
        this.map.load(pointData);
        return this.map;
    }
}