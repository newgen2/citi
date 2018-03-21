import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf'

@Component({
    selector: 'ScaleChart',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})
export class ScaleChartcomponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private id:any;
  // @Input() public colors: Array<any>;
  @Output() private chartClickEvent = new EventEmitter();
  @Output() private chartHoverEvent = new EventEmitter();
  private margin: any = { top: 10, bottom: 20, left: 20, right: 20};
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
        var margin = {top: 10, right: 10, bottom: 10, left: 10};
        var width = this.htmlElement.offsetWidth;
        
      //   if(width > 250)
      //   relatedHeight = 450;
      //  else  if(width < 250)
      //  relatedHeight = 210; 
      
       var  height = width/2;
            //height = width/1.65 - margin.top - margin.bottom;
      this.host.html("");
      var svg = this.host.append("svg")
                .attr("width", width)
                .attr("height", height);
        /* Data in strings like it would be if imported from a csv */
        /*var data = [{pid: 145, p: 'SHIPSLOG', minutes: 54},
            {pid: 245, p: 'D2L-HELP', minutes: 143},
            {pid: 345, p: 'ANGEL-HELP', minutes: 41},
            {pid: 445, p: 'SWF101', minutes: 44},
            {pid: 545, p: 'TPL800', minutes: 35}];*/
//	debugger;		
//var data = [2, 3, 4, 5 , 7, 79];
var data = this.data;
  data.sort(function(a, b){return -(a.Value - b.Value)});
  //data.sort(d3.descending());
var perc_so_far = 0;
  
  
  //console.log(d3.sum(data));
 var total = 0;
   //set a variable that holds our total
for (var i = 0; i < data.length; i++) {  //loop through the array
total += data[i].Value;  //Do the math!
}
  var bar_x = 0;
    bar_x = 0;
    //var chart_width = chart.style("width").replace("px", "");
  var chart_width = width;
  console.log(chart_width);
  
  var color = d3.scale.category20c();
    //d3.scale.ordinal()
    //.domain(["6TH", "7TH", "5TH", "4TH"])
    //.range(colorbrewer.RdBu[12]);
  var bar = svg.selectAll("g")
    .data(data)
    .enter().append("g");
    console.log(bar);
  bar.append("rect")
    .attr("width", function(d) { return ((d.Value/total)*100) + "%"; } )
    .attr("x", function(d) {
      var prev_perc = perc_so_far;
      var this_perc = 100*(d.Value/total);
      perc_so_far = perc_so_far + this_perc;
      console.log("perc_so_far:" + perc_so_far + "; this_perc:" + this_perc + "; prev_perc:" + prev_perc + ";");
      return prev_perc + "%";
    })
    .attr("height", height-127)
    .attr("fill",  function(d) { return (d.Color) } );
  
  perc_so_far = 0;
  bar.append("text")
    .attr("x", function(d) {
      var prev_perc = perc_so_far;
      var this_perc = 100*(d.Value/total);
      perc_so_far = perc_so_far + this_perc;
    //	console.log("perc_so_far:" + perc_so_far + "; this_perc:" + this_perc + "; prev_perc:" + prev_perc + ";");
      return prev_perc + "%";
    })
    //.attr("y", 11)
    .attr("dy", "1.35em")
    .text(function(d) { return d.Value+"%"; });
    //-----------------------------------------------------------
    var n = data.length;
    var itemWidth = 70;
    var itemHeight = 10;
    
    // var svg = bar
    // .attr("width",400)
    // .attr("height",50);
    
    var color = d3.scale.category20c();
    
    // var legend_tabs = [0,50, 180, 350, 450, 550, 0, 80, 210, 350, 500 ];
    var legendHeight = height-120;
    var lengthVar=[];
    // var totLength=0;
    var flagtab=0;
    var lengthtobeused=0;
    var legendLength = [];

    var legend = svg.selectAll("svg")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) { 
        legendLength[i] = getTextWidth(d.Product + "8000", "10", "sans-serif"); 
        lengthVar[i]=d.Product.length;
         flagtab=1;
        // totLength=totLength+(lengthVar[i]*7);
        if(i!=0)
        lengthtobeused=lengthtobeused+legendLength[i-1];
        // console.log(totLength);
        if(lengthVar[i-1]>25 || (lengthtobeused+legendLength[i])>width)
        {
          // totLength=0;
          legendHeight = legendHeight + 18;
          flagtab=0;
          lengthtobeused=0;
        }
        if(i==0 || flagtab==0)
         return "translate(" + lengthtobeused + ","+ legendHeight +")"; 
         else
         return "translate(" + lengthtobeused + ","+ legendHeight +")"; 
      
      });
      // .attr("transform", function(d,i) { return "translate(" + (i*43+1) + "," +( Math.floor(i/n) * itemHeight + 35) + ")"; });
      
      
    var rects = legend.append('rect')
      .attr("x", 0)
      .attr("width",10)
      .attr("height",10)
      // .style("fill", color);
       .style("margin-left","50")
       .attr("fill",  function(d) { return (d.Color) } );
      
    var text = legend.append('text')
      .attr("x", 12)
      .attr("y",5)
      .attr("dy", ".35em")
      .style("text-anchor", "begin")
      .style("font" ,"10px sans-serif")
      .text(function(d) { return d.Product; });
      
    //----------------------------------------------------------------      
  d3.select(window).on('resize', resize);
  
  function resize () {
    var width = parseInt(d3.select("#chart").style("width"));
    //console.log(width);
    //console.log(bar);
  }
  function getTextWidth(text, fontSize, fontFace) {
    var a = document.createElement('canvas');
    var b = a.getContext('2d');
    b.font = fontSize + 'px ' + fontFace;
    return b.measureText(text).width;
  }
}
}