import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf'
declare let $: any;

@Component({
    selector: 'stackedBarChart',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})
export class stackedBarChartcomponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() public stackType: Array<any>;
  @Input() private id:any;
  @Input() private viewType:any;
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
      let chartComponent = this;
      let chartID = this.id;
      let viewType = this.viewType;
      this.htmlElement = this.chartContainer.nativeElement;
      this.host = d3.select(this.htmlElement);
        // Setup svg using Bostock's margin convention
        var margin = {top: 10, right: 30, bottom: 18, left: 20};
        var width = this.htmlElement.offsetWidth - margin.left - margin.right;
        var relatedHeight;
        debugger;
      //   if(width > 250)
      //   relatedHeight = 450;
      //  else  if(width < 250)
      //  relatedHeight = 210; 
      var size:any = { width : window.innerWidth || document.body.clientWidth, height : window.innerHeight || document.body.clientHeight};
        if(viewType == 0)
        relatedHeight = size.height/1.5;
        else
        relatedHeight = size.height/3;
       
       var  height = relatedHeight/2 - margin.top - margin.bottom;
            //height = width/1.65 - margin.top - margin.bottom;
      this.host.html("");
      var svg = this.host.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .style("font", "8px sans-serif")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        /* Data in strings like it would be if imported from a csv */
        var data = this.data;
        var ctStatus = d3.nest()
        .key(function(d){return d.cat})
        .rollup(function(leaves){
          return d3.sum(leaves, function(d) {return d3.sum(d3.values(d))});
        })
        .entries(data);

        //var stackType = ["RQ1", "RQ2", "RQ3", "RQ4", "RQ5"];
        //var colors = ["green", "lightgreen", "yellow", "#FFBF00", "red"];
        var stackType = this.stackType;
        // var colors =  this.colors;
        var parse = d3.time.format("%Y").parse;
        // Transpose the data into layers
        var dataset = d3.layout.stack()(stackType.map(function(f) {
          return data.map(function(d) {
            return {x: d.cat, y: +d[f.name], s:f.name, name:f.name, c:f.color};
          });
        }));// Set x, y and colors
        console.log(dataset);
        var x = d3.scale.ordinal()
          .domain(dataset[0].map(function(d) { return d.x; }))
          .rangeRoundBands([-width/13, width/1.2], 0.4);
        var y = d3.scale.linear()
          .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y + 20; });  })])
          .range([height, 0]);
        // Define and draw axes
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5)
          .tickSize(-width+35, 0, 0)
          .tickFormat( function(d) { return d } );
        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickFormat(function(d) { return d });

        svg.append("g")
          .attr("class", "y axis")
            .call(yAxis);
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
        // Create groups for each series, rects for each segment 
        var groups = svg.selectAll("g.cost")
          .data(dataset)
          .enter().append("g")
          .attr("class", "cost")
          .style("fill", function(d, i) {return d[0].c; });
          var bar = groups.selectAll("g")
          .data(function(d) { return d; })
         .enter().append("g");
        
         
      bar.append("rect")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
      .attr("width", x.rangeBand()).on('click', function (d) { d['chartID'] =  chartID; chartComponent.chartClickEvent.emit(d);})
      .attr("class", "legendpie")
      .on("mouseover", function(d) {chartComponent.chartHoverEvent.emit(d); tooltip.style("display", null); })
      .on("mouseout", function() { tooltip.style("display", "none"); })
      .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - -5;
      var yPosition = d3.mouse(this)[1] - 15;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y);
      });

          //debugger;
          var columns = svg.append("g")
          .selectAll("text").data(ctStatus)
          .enter().append("text")
          .attr("x", function(d){
            return x(d.key) + x.rangeBand()/2
          })
          .attr("y", function (d) {
            return y(d.values);
          })
          .attr("dy", "-.55em")
          .text( function (d){
            // return d3.format("$,s")(d.values);
            return d.values;
          })
          .style({fill: 'black', "text-anchor": "middle"});


         // Draw legend
var legend = svg.append("g")
.attr("font-family", "sans-serif")
.attr("text-anchor", "end")
.selectAll("g")
.data(stackType)
.enter().append("g")
.attr("class", "legend")
.attr("transform", function(d, i) { return "translate(0," + i * 16 + ")";});
// .on("click", function(d) {
//     // d['chartID'] =  chartID;
//     // chartComponent.chartClickEvent.emit(d);
//   });

legend.append("text")
.attr("x", width - 5)
.attr("y", 12)
.attr("dy", ".35em")
.attr("class", "legendpie")
.text(function(d) {return d.value;}).on("click", function(d) {
  d['chartID'] =  chartID;
  chartComponent.chartClickEvent.emit(d);
}); 

legend.append("rect")
.attr("x", width - 3)
.attr("y", 7)
.attr("width", 10)
.attr("height", 10)
.attr("fill", function(d, i) {return d.color;});

legend.append("text")
.attr("x", width+10)
.attr("y", 12)
.attr("dy", ".35em")
.attr("text-anchor", "start")
.text(function(d, i) {return d.DisplayValue;     
});
        
        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
          .attr("class", "tooltip1")
          .style("display", "none");
            
        tooltip.append("rect")
          .attr("width", 25)
          .attr("height", 15)
          .attr("fill", "white")
          .style("opacity", 0.5);
        tooltip.append("text")
          .attr("x", 15)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");
        
}
// public printChart(){
//   //var content = document.getElementsByClassName('').
//   var content = document.getElementById('chart').innerHTML;
//   var mywindow = window.open('', 'Print', 'height=600,width=800');

//   mywindow.document.write('<html><head><title>Print</title>');
//   mywindow.document.write('</head><body >');
//   mywindow.document.write(content);
//   mywindow.document.write('</body></html>');

//   mywindow.document.close();
//   mywindow.focus()
//   mywindow.print();
//   mywindow.close();
//   return true;
// }

public generateImage(type:any){

  var svgString = new
XMLSerializer().serializeToString(document.querySelector('svg'));

  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var DOMURL = self.URL || (window as any).webkitURL || self;
  var img = new Image();
  var svg = new Blob([svgString], {type: 
"image/svg+xml;charset=utf-8"});
  var url = DOMURL.createObjectURL(svg);
  img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var png = canvas.toDataURL("image/png");
      canvas.toBlob( function(blob) {
          if(type=='PNG'){
              saveAs( blob, 'Chart.png' );
          }else if(type=='JPG'){
              saveAs( blob, 'Chart.jpg' );
          }else if(type=='PDF'){
              var pdf = new jsPDF();
                pdf.addImage(png, 'JPEG',0,0);
                pdf.save("Chart.pdf");

          }
      });
  };
  img.src = url;
}

}