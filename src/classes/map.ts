import * as d3 from 'd3';

export class DemoMap {
    _height: number;
    _width: number;
    _mapPadding: number = 10;
    _canvasPadding: number = 100;
    _container: d3.Selection<SVGElement>;
    _svgElement: d3.Selection<SVGElement>;
    _zoomWrapper: d3.Selection<SVGElement>;
    _mapGroup: d3.Selection<SVGElement>;
    _overlay: d3.Selection<SVGElement>;
    _pointData: any[];
    _zoomer: any;

    constructor(container: d3.Selection<SVGElement>) {
        this._container = container;
        let containerElement = <HTMLElement>container.node();
        this._height = containerElement.getBoundingClientRect().height;
        this._width = containerElement.getBoundingClientRect().width;
        this._zoomer = d3.behavior.zoom();
    }

    public load(pointData: any[]): void {
        this._pointData = pointData;
        //TODO: implement point data loading;

        this._draw();
    }

    private _draw(): void {
        let self = this;
        if(!self._height || !self._width) return;

        self._svgElement = self._container.append('svg')
            .call(onMainSvg);

        self._zoomWrapper = self._svgElement.append("g")
            .call(self._zoomer.on('zoom', zoom));

        self._mapGroup = self._zoomWrapper.append("g")
            .call(onZoomGroup);

        self._overlay = self._mapGroup.append("rect")
            .call(onOverlay);

        self._initMapScale(0);

        // setup main svg
        function onMainSvg(): void {
            this.attr('id', 'mainSvg')
                .attr('width', self._width)
                .attr('height', self._height)
                .style('display', '-webkit-box');
        }

        // transform group (zoom and pan)
        function onZoomGroup(): void {
            this.attr('transform', 'translate(0,0)scale(1)')
                .attr('id', 'transformGroup');
        }

        // rect that maintains transform (zoom and pan)
        function onOverlay(): void {
            this.attr({
                class: 'overlay',
                id: 'overlayRect'
            }).style('fill', 'white');
        }


        // event handler for zoom and pan
        function zoom(): void {
            let evt = <d3.ZoomEvent>d3.event;
            self._mapGroup.attr("transform", "translate(" + evt.translate + ")scale(" + evt.scale + ")");

            //TODO: update props
        }
    }

    private _initMapScale(scaleDuration?: number) {
        let self = this;
        let containerElement = <HTMLElement>this._container.node();
        let mapBounds = containerElement.getBoundingClientRect();
        self._mapGroup.attr({
            'width': mapBounds.width + self._mapPadding,
            'height': mapBounds.height + self._mapPadding
        });

        self._overlay.attr({
            'width': mapBounds.width + self._mapPadding + self._canvasPadding,
            'height': mapBounds.height + self._mapPadding + self._canvasPadding,
            'x': 0 - self._canvasPadding * .5,
            'y': 0 - self._canvasPadding * .5
        });
    }
}