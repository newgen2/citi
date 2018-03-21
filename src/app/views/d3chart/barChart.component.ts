import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf'

@Component({
    selector: 'BarChart',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private id:any;
  // @Input() public colors: Array<any>;
  @Output() private chartClickEvent = new EventEmitter();
  @Output() private chartHoverEvent = new EventEmitter();
  private margin: any = { top: 25, bottom: 20, left: 40, right: 20};
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
      //debugger;
      let chartComponent = this;
      let chartID = this.id;
      this.htmlElement = this.chartContainer.nativeElement;
      this.host = d3.select(this.htmlElement);
        // Setup svg using Bostock's margin convention
       // var margin = {top: 10, right: 30, bottom: 18, left: 20};
        //var width = this.htmlElement.offsetWidth - margin.left - margin.right;
        var margin = {top: 10, right: 5, bottom: 18, left: 5};
        var width = this.htmlElement.offsetWidth - margin.left - margin.right;
        var relatedHeight = 250;
        //debugger;
      //   if(width > 250)
      //   relatedHeight = 450;
      //  else  if(width < 250)
      //  relatedHeight = 210; 
      
       var  height = relatedHeight/2 - margin.top - margin.bottom;
            //height = width/1.65 - margin.top - margin.bottom;
      this.host.html("");
      // var svgContainer = this.host.append("svg")
      //  .attr("width", width+margin.left)
      //  .attr("height",height+margin.top + margin.bottom)
      //  .append("g").attr("class", "container")
      //  .attr("transform", "translate("+ margin.left +","+ margin.top +")");
      var svgContainer = this.host.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g").attr("class", "container")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        /* Data in strings like it would be if imported from a csv */
        var data = this.data;
            
          var margin = {top:30, right:10, bottom:40, left:10};
   
   //var width = 250,
    //  height = 100;
   var barWidth = width / data.length;
   
   var xScale = d3.scale.ordinal().domain([]).rangeRoundBands([0, width,0.1])
   
   var yScale = d3.scale.linear()
         .range([height, 0]);
   
   
   var xAxis = d3.svg.axis()
       .scale(xScale)
       .orient("bottom")
       .ticks(data.length)
                .tickFormat(function(d) {
                  return d.charAt(0);
                });
         
         
   var yAxis = d3.svg.axis()
       .scale(yScale)
       .orient("left");
   
   
   
   xScale.domain(data.map(function(d) { return d.month; }));
   yScale.domain([0, d3.max(data, function(d) { return d.volume; })]);
   
   
   //xAxis. To put on the top, swap "(height)" with "-5" in the translate() statement. Then you'll have to change the margins above and the x,y attributes in the svgContainer.select('.x.axis') statement inside resize() below.
   var xAxis_g = svgContainer.append("g")
       .attr("class", "x axis")
       .attr("transform", "translate(0," + (height) + ")")
       .call(xAxis)
       .selectAll("text");
         
   // Uncomment this block if you want the y axis
   /*var yAxis_g = svgContainer.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 6).attr("dy", ".71em")
       //.style("text-anchor", "end").text("Number of Applicatons"); 
   */
   
   //debugger;
     svgContainer.selectAll(".bar")
         .data(data)
         .enter()
         .append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.month); })
         .attr("width", barWidth - 1).on('click', function (d) { chartComponent.chartClickEvent.emit(d.valueOFMonth)})
         .on("mouseover", function(d) {d3.select(this).style("cursor", "pointer");})
         .attr("y", function(d) { return yScale(d.volume); })
         .style("fill", function(d, i) { return '#8CD3DD'; })
         .attr("height", function(d) { return height - yScale(d.volume); });
     svgContainer.selectAll(".text")  		
       .data(data)
       .enter()
       .append("text")
       .attr("class","label")
       .attr("text-anchor","middle")
       .attr("x", (function(d) { return xScale(d.month) + xScale.rangeBand() / 2.1 ; }  ))
       .attr("y", function(d) { return yScale(d.volume) + 1; })
       .attr("dy", "-0.25em")
       .text(function(d) { return d.volume; });
      }
}