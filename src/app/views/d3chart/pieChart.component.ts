import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { fail } from 'assert';
import * as d3 from 'd3';
//declare let d3: any;
declare let $: any;

@Component({
    selector: 'PieChart',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})

export class PieChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private id:any;
  @Input() private drillDetail:any;
  @Input() private isDonut:boolean;
  @Input() private viewType:any;
  @Output() private chartClickEvent = new EventEmitter();
  @Output() private chartHoverEvent = new EventEmitter();
  private margin: any = { top: 0, bottom: 0, left: 0, right: 0};
  private chart: any;
  private width: number;
  private height: number;
  private host: d3.Selection;
  private svg: d3.Selection;
  private htmlElement: HTMLElement;

  constructor() {}

  ngOnInit() {
    //console.log(this.data);
     if (this.data) {
     this.setup();
     //this.buildSVG();
     //this.buildPie();
    }
  }

  ngOnChanges() {
    if (this.data) {
      this.setup();
      //this.buildSVG();
      //this.buildPie();
     }
  }
    public setup() {
        debugger;
        this.htmlElement = this.chartContainer.nativeElement;
        let chartID = this.id;
        let chartComponent = this;
        let drillDetail = this.drillDetail;
        this.width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;
        this.host = d3.select(this.htmlElement);
        let data = this.data;
        let innerRadius = 0;
        let outerRadius = 0;
        let width = this.width;
        let height = this.height;
        let isDonut = this.isDonut;
        let legendLength = 0;
        let legendMaxChar = "";
        let viewType = this.viewType;
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
        // Globals
         // Globals
 //this.width = 200;
 data.forEach(element => {
   if(element.DisplayValue.length > legendMaxChar.length)
   legendMaxChar = element.DisplayValue;
 });
 legendMaxChar = legendMaxChar + "10000";
 legendLength = getTextWidth(legendMaxChar, "9", "sans-serif");
 var relatedHeight;
//  if(width > 300)
//  relatedHeight = 450;
// else  if(width < 300)
// relatedHeight = 210;
var size:any = { width : window.innerWidth || document.body.clientWidth, height : window.innerHeight || document.body.clientHeight};
if(viewType == 0)
relatedHeight = size.height/1.5;
else
relatedHeight = size.height/3;

  height = relatedHeight/2;
//  height = 100;
 width = Math.round(this.width - legendLength);

 //height = width/1.2;
 var margin = 10,
 radius = Math.min(width - margin, height - margin) / 2;
 if(isDonut)
 {
  outerRadius = radius/1.7;
  innerRadius = radius;
 }
 else
 {
  outerRadius = radius;   
 }
 
 // Pie layout will use the "val" property of each data object entry
 var pieChart = d3.layout.pie().sort(null).value(function(d) {
   return d.val;
 }),
 arc = d3.svg.arc().outerRadius(outerRadius).innerRadius(innerRadius),
 MAX_SECTORS = 15, // Less than 20 please
  colors = d3.scale.category20();

// Synthetic data generation ------------------------------------------------

// --------------------------------------------------------------------------

// SVG elements init
this.host.html("");
var svg = this.host.append("svg").attr("width", width + legendLength).attr("height", height),
 defs = svg.append("svg:defs"),
 // Declare a main gradient with the dimensions for all gradient entries to refer
 // The pie sectors container
 arcGroup = svg.append("svg:g")
 .attr("class", "arcGroup")
 .attr("filter", "url(#shadow)")
 .attr("transform", "translate(" + (width/2.2) + "," + (height/2) + ")"),
 // Header text
 header = svg.append("text").data(drillDetail)
 .attr("transform", "translate(2, 8)").attr("class", "header").text(function(d, i) {
  return d.cat + '-' + d.val;
}),
 btn = svg.append("button")
 .text("wiggle")
 .attr("transform", "translate(2, 8)")
 .attr("float", "left")
 .attr("class", "btnChart")
 .on("click", updateGraph),
// Draw legend
legend = svg.append("g")
.attr("font-family", "sans-serif")
.attr("font-size", 9)
.attr("text-anchor", "end")
.selectAll("g")
.data(pieChart(this.data))
.enter().append("g")
.attr("transform", function(d, i) { return "translate(0," + i * 16 + ")";})


  legend.append("text")
  .attr("x", this.width - legendLength)
  .attr("y", 20)
  .attr("dy", "0.32em")
  //.attr("cursor", "pointer")
  //.attr("text-decoration", "underline")
  .attr("class", "legendpie")
  .text(function(d) { return d.data.val})
  .on("click", function(d) {
    d['chartID'] =  chartID;
    if (d.data.children != undefined && d.data.children.length > 0) 
    chartComponent.chartClickEvent.emit(d);
  });
  
legend.append("rect")
.attr("x", this.width - legendLength + 5)
.attr("y", 14)
.attr("width", 10)
.attr("height", 10)
.attr("fill", function(d, i) {return d.data.color;});

legend.append("text")
.attr("x", this.width - legendLength + 20)
.attr("y", 20)
.attr("text-anchor", "start")
.attr("dy", "0.32em")
.text(function(d) { return d.data.DisplayValue; });


// Declare shadow filter
var shadow = defs.append("filter").attr("id", "shadow")
 .attr("filterUnits", "userSpaceOnUse")
 .attr("x", -1 * (this.width / 2)).attr("y", -1 * (this.height / 2))
 .attr("width", this.width).attr("height", this.height);
shadow.append("feGaussianBlur")
 .attr("in", "SourceAlpha")
 .attr("stdDeviation", "4")
 .attr("result", "blur");
shadow.append("feOffset")
 .attr("in", "blur")
 .attr("dx", "4").attr("dy", "4")
 .attr("result", "offsetBlur");
shadow.append("feBlend")
 .attr("in", "SourceGraphic")
 .attr("in2", "offsetBlur")
 .attr("mode", "normal");

// Redraw the graph given a certain level of data
function updateGraph(cat) {
 var currData = data;

 // Simple header text
 if (cat != undefined) {

   //var currentEle:any = currData.find(data => data.cat == cat);
   currData = cat.children;
   //currData = findChildenByCat(cat);
   //d3.select(".header"+chartID).text(cat.cat + '-' + cat.val);
   //document.getElementById("reDrawButton").style.display = null ;
  //  document.getElementById("reDrawButton").innerHTML = "Back" ; 
   
   //document.getElementById("lblDrillValue").style.backgroundColor = currentEle.color ;
   //document.getElementById("lblDrillValue").innerHTML = cat.cat + '-' + cat.val;
   
 } else {
   //d3.select(".header").text("");
   // document.getElementById("reDrawButton").style.display = "none";
  //  document.getElementById("lblDrillValue").innerHTML = "" ;
   
 }
  //d3.select(".header"+chartID).text(data.length + '-' + data.length);
 
 // Create a gradient for each entry (each entry identified by its unique category)
 var gradients = defs.selectAll(".gradient").data(currData, function(d) {
   return d.cat;
 });
 gradients.enter().append("svg:radialGradient")
   .attr("id", function(d, i) {
     return "gradient" + d.cat;
   })
   .attr("class", "gradient")
   .attr("xlink:href", "#master");

 gradients.append("svg:stop").attr("offset", "0%").attr("stop-color", getColor);
 //gradients.append("svg:stop").attr("offset", "90%").attr("stop-color", getColor);
// gradients.append("svg:stop").attr("offset", "100%").attr("stop-color", getDarkerColor);

 // Create a sector for each entry in the enter selection
 var paths = arcGroup.selectAll("path")
   .data(pieChart(currData), function(d) {
     return d.data.cat;
   });
  
  /*if (cat == undefined) 
    paths.enter().append("svg:path").attr("class", "sector");
  else
    paths.enter().append("svg:path");
  */
    paths.enter().append("svg:path").attr("class", "sector");
    
  
 // Each sector will refer to its gradient fill
 paths.attr("fill", function(d, i) {
     return "url(#gradient" + d.data.cat + ")";
   })
   .transition().duration(1000).attrTween("d", tweenIn).each("end", function(d) {
    if (d.data.children != undefined && d.data.children.length > 0) 
        this._listenToEvents = true;
    else
        this._listenToEvents = false;
   });

 // Mouse interaction handling
 paths.on("click", function(d) {
     if (this._listenToEvents) {
       // Reset inmediatelly
       d3.select(this).attr("transform", "translate(0,0)")
         // Change level on click if no transition has started                
       paths.each(function() {
         this._listenToEvents = false;
       });
       d['chartID'] =  chartID;
       //updateGraph(d.data.children ? d.data : undefined);
        //d3.select(".header"+chartID).text(d.cat + '-' + d.val);
       
       chartComponent.chartClickEvent.emit(d);
       return tooltip.style("display", 'none');
     }
   })
   .on("mouseover", function(d) {
     // Mouseover effect if no transition has started                
     if (this._listenToEvents) {
       // Calculate angle bisector
       var ang = d.startAngle + (d.endAngle - d.startAngle) / 2;
       // Transformate to SVG space
       ang = (ang - (Math.PI / 2)) * -1;

       // Calculate a 10% radius displacement
       var x = Math.cos(ang) * radius * 0.1;
       var y = Math.sin(ang) * radius * -0.1;
      
       d3.select(this).transition()
         .duration(250).attr("transform", "translate(" + x + "," + y + ")");
     }
     tooltip.text(d.data.DisplayValue + ' - ' + d.data.val); return tooltip.style("display", null);
   })
   .on("mouseout", function(d) {
     // Mouseout effect if no transition has started                
     if (this._listenToEvents) {
       d3.select(this).transition()
         .duration(150).attr("transform", "translate(0,0)");
     }
     return tooltip.style("display", "none");
   }).on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");});

 // Collapse sectors for the exit selection
 paths.exit().transition()
   .duration(1000)
   .attrTween("d", tweenOut).remove();
}

// "Fold" pie sectors by tweening its current start/end angles
// into 2*PI
function tweenOut(data) {
 data.startAngle = data.endAngle = (2 * Math.PI);
 var interpolation = d3.interpolate(this._current, data);
 this._current = interpolation(0);
 return function(t) {
   return arc(interpolation(t));
 };
}

// "Unfold" pie sectors by tweening its start/end angles
// from 0 into their final calculated values
function tweenIn(data) {
 var interpolation = d3.interpolate({
   startAngle: 0,
   endAngle: 0
 }, data);
 this._current = interpolation(0);
 return function(t) {
   return arc(interpolation(t));
 };
}

// Helper function to extract color from data object
function getColor(data, index) {
 return data.color;
}


function findChildenByCat(cat) {
 for (let i = -1; i++ < data.length - 1;) {
   if (data[i].cat == cat) {
     return data[i].children;
   }
 }
 return data;
}
function getTextWidth(text, fontSize, fontFace) {
  var a = document.createElement('canvas');
  var b = a.getContext('2d');
  b.font = fontSize + 'px ' + fontFace;
  return b.measureText(text).width;
} 
// Start by updating graph at root level
updateGraph(undefined);
// document.getElementById("reDrawButton").addEventListener("click", reDrawChart);

}

    
}