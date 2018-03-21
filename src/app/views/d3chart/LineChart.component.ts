import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf'

@Component({
    selector: 'lineChart',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})
export class LineChartcomponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private id:any;
  // @Input() public colors: Array<any>;
  @Output() private chartClickEvent = new EventEmitter();
  @Output() private chartHoverEvent = new EventEmitter();
  private margin: any = { top: 25, bottom: 20, left: 5, right: 5};
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
     if (this.data) {
     this.setup();
     //this.buildSVG();
     //this.buildPie();
    }
  }

  ngOnChanges() {
    //console.log(this.data);
    if (this.data) {
      this.setup();
      //this.buildSVG();
      //this.buildPie();
     }
  }
    public setup() {
      
      let chartComponent = this;
      let chartID = this.id;
      this.htmlElement = this.chartContainer.nativeElement;
      this.host = d3.select(this.htmlElement);
        // Setup svg using Bostock's margin convention
        var margin = {top: 20, right: 5, bottom: 18, left: 5};
        var width = this.htmlElement.offsetWidth - margin.left - margin.right;
        var relatedHeight = 250;
        
      //   if(width > 250)
      //   relatedHeight = 450;
      //  else  if(width < 250)
      //  relatedHeight = 210; 
      
       var  height = relatedHeight/3 - margin.top - margin.bottom;
            //height = width/1.65 - margin.top - margin.bottom;
      this.host.html("");
      var svg = this.host.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        /* Data in strings like it would be if imported from a csv */
        var label = d3.select(".label");
        var data =this.data;
        
        var x = d3.scale.ordinal()
            .domain([0, data.length])
            .rangePoints([0, width]);
        var	y = d3.scale.linear().range([height, 0]);
        
        // Define the axes
        //var	xAxis = d3.svg.axis().scale(x)
        //	.orient("bottom").ticks(5);
        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(data.length)
                     .tickFormat(function(d) {
                       return d.charAt(0);
                     });
        var	yAxis = d3.svg.axis().scale(y)
          .orient("left").ticks(5);
        
        // Define the line
        var	valueline = d3.svg.line()
          .x(function(d) { return x(d.date); })
          .y(function(d) { return y(d.close); })
          .interpolate("linear");
            
        // Get the data
        
          data.forEach(function(d) {
            d.date = d.date;
            d.close = +d.close;
          });
        
          // Scale the range of the data
          x.domain(data.map(function(d) { return d.date; }));
          //x.domain(d3.extent(data, function(d) { return d.date; }));
          y.domain([0, d3.max(data, function(d) { return d.close; })]);
        
          // Add the valueline path.
          svg.append("path")		// Add the valueline path.
            .attr("class", "line")
            .attr("d", valueline(data));
            
            // Add the valueline path.
              svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 3)
                .attr("cx", function(d) {
                    return x(d.date)
                    })
                .attr("cy", function(d) {
                    return y(d.close)
                    });
            svg.append('g')
            .classed('labels-group', true)
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .style("text-anchor", "middle")
            //.classed('label', true)
            .attr({
              'x': function(d, i) {
              return x(d.date);
              },
              'y': function(d, i) {
              return y(d.close);
              }
            })
            .text(function(d, i) {
              return d.close;
            })
            .attr("dx", function(d, i) {
                            return (i * 0) + 0
                        })
                        .attr("dy",  function(d, i) {
                            return (i * 0) - 13
                        });
        
            /*.on("mouseover", function(d,i) {  
               label.style("transform", "translate("+ x(d.date) +"px," + (y(d.close)) +"px)")
               label.text(d.close)});*/
                       /* .attr("dx", function(d, i) {
                            return (i * 70) + 42
                        })
                        .attr("dy", svg_h / 2 + 5)
                        .text(function(d) {
                            return d;
                        })*/
        
          // Add the X Axis
          svg.append("g")			// Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
          // Add the Y Axis
          //svg.append("g")			// Add the Y Axis
          //	.attr("class", "y axis")
        //.call(yAxis);
        
        
}
}