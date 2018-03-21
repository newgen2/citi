import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'donutChart',
    template: `<div  #chart></div>`,
  encapsulation: ViewEncapsulation.None
})
export class DoughnutChartComponent implements OnInit, OnChanges {
    @ViewChild('chart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    @Input() private id:any;
    @Output() private chartClickEvent = new EventEmitter();
    @Output() private chartHoverEvent = new EventEmitter();
    private margin: any = { top: 20, bottom: 20, left: 40, right: 50};
    private chart: any;
    private width: number;
    private height: number;
    private radius:number;
    private outerRadius:number;
    private innerRadius:number;
    private donutWidth:number;
    private host: d3.Selection;
    private svg: d3.Selection;
    private htmlElement: HTMLElement;
    constructor() { }
  
    ngOnInit() {
        
      //this.createChart();
      if (this.data) {
       //this.updateChart();
       this.setup();
       this.buildSVG();
       //this.buildPie();
      }
    }
  
    ngOnChanges() {
      /*if (this.chart) {
        this.updateChart();
      }*/
      if (this.data) {
        //this.updateChart();
        this.setup();
        this.buildSVG();
        //this.buildPie();
       }
    }
    
    private setup(): void {
        this.htmlElement = this.chartContainer.nativeElement;
        this.host = d3.select(this.htmlElement);
        //this.width = 200;
        this.height = 100;
        this.width = this.htmlElement.offsetWidth;
        //this.height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;
        this.donutWidth = 10;
        this.radius = Math.min(this.width, this.height) / 2;
        
    }

    private buildSVG(): void {
        debugger;
        let chartID = this.id;
        let chartComponent = this;
        this.host.html("");
        var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("display", "none")
        .style("background", "white")
        .style("color", "black")
        .style("opacity", 0.7)
        .style("font-weight", "600")
        .text("a simple tooltip");
        tooltip.style("display", "none");

        this.svg = this.host.append("svg")
            .attr("width", this.width).attr("height", this.height)
            .append("g")
            // .attr("transform", `translate(${this.width / 2},${this.height /2})`);
            .attr("transform", `translate(${this.radius},${this.radius})`);
            var pie=d3.layout.pie()
            .value(function(d){return d.value})
            .sort(null)
            .padAngle(.03);

    var w=this.width,h=this.height;

    var outerRadius=this.radius/1.7;
    var innerRadius= this.radius;

    var arc=d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius);

    var path=this.svg.selectAll('path')
            .data(pie(this.data))
            .enter()
            .append('path')
            .attr({
                d:arc,
                fill:function(d,i){
                    return d.data.color;
                }
            })
            .attr("class", "sector")
            .on('click', function click(d) {
                tooltip.style("display", "none");
                d['chartID'] = chartID;
                chartComponent.chartClickEvent.emit(d);
            })
            .on("mouseover", function(d) {
                chartComponent.chartHoverEvent.emit(d);
                tooltip.text(d.data.name + ' - ' + d.data.value);
                return tooltip.style("display", null);
            })
            .on("mouseout", function() {return tooltip.style("display", "none");})
            .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");});
            
        // Draw legend
        var legendG = this.svg.selectAll(".legend")
        .data(pie(this.data))
        .enter().append("g")
        .attr("transform", function(d,i){
          return "translate(" + (w/3) + "," + (i * 15) + ")";
        })
        .attr("class", "legend");   
      
      legendG.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function(d, i) {
          return d.data.color;
        });
      
      legendG.append("text")
        .text(function(d){
          return d.data.name;
        })
        .style("font-size", 10)
        .attr("y", 10)
        .attr("x", 11);
    }
    
  }
