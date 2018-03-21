import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { fail } from 'assert';
import * as d3 from 'd3';
//declare let d3: any;
declare let $: any;

@Component({
    selector: 'pieDrillDown',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})

export class PieDrillDownChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private id:any;
  @Input() private isDonut:boolean;
  @Output() private chartClickEvent = new EventEmitter();
  @Output() private chartHoverEvent = new EventEmitter();
  private margin: any = { top: 0, bottom: 0, left: 0, right: 0};
  private chart: any;
  private width: number;
  private height: number;
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
    console.log(this.data);
    if (this.data) {
      this.setup();
      //this.buildSVG();
      //this.buildPie();
     }
  }
    public setup() {
        //debugger;
        this.htmlElement = this.chartContainer.nativeElement;
        let chartID = this.id;
        let chartComponent = this;
        this.width = this.htmlElement.offsetWidth - this.margin.left - this.margin.right;
        this.height = this.htmlElement.offsetHeight - this.margin.top - this.margin.bottom;
        this.host = d3.select(this.htmlElement);
        let data = this.data;
        let innerRadius = 0;
        let outerRadius = 0;
        let width = this.width;
        let height = this.height;
        let isDonut = this.isDonut;
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
//  height = width/2;
 height = 100;
 var margin = 5,
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
var svg = this.host.append("svg").attr("width", width).attr("height", height),
 defs = svg.append("svg:defs"),
 // Declare a main gradient with the dimensions for all gradient entries to refer
 // The pie sectors container
 arcGroup = svg.append("svg:g")
 .attr("class", "arcGroup")
 .attr("filter", "url(#shadow)")
 .attr("transform", "translate(" + (width/3.5) + "," + (height/2) + ")"),
 // Header text
 header = svg.append("text").text("")
 .attr("transform", "translate(2, 8)").attr("class", "header"+chartID),
 btn = svg.append("button")
 .text("wiggle")
 .attr("transform", "translate(2, 8)")
 .attr("float", "left")
 .attr("class", "btnChart")
 .on("click", updateGraph),
// Draw legend
legendG = svg.selectAll(".legend")
.data(pieChart(this.data))
.enter().append("g")
.attr("transform", function(d,i){
  return "translate(" + (width-width/2.9) + "," + ((i * 15)+10) + ")";
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
  return d.data.DisplayValue;
})
.style("font-size", 10)
.attr("y", 10)
.attr("x", 11);

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
 // debugger;
 var currData = data;

 
 // Simple header text
 if (cat != undefined) {

   //var currentEle:any = currData.find(data => data.cat == cat);
   currData = cat.children;
   //currData = findChildenByCat(cat);
   d3.select(".header"+chartID).text(cat.cat + '-' + cat.val);
  //  document.getElementById("reDrawButton").style.display = null ;
  //  document.getElementById("reDrawButton").innerHTML = "Back" ; 
   
   //document.getElementById("lblDrillValue").style.backgroundColor = currentEle.color ;
   //document.getElementById("lblDrillValue").innerHTML = cat.cat + '-' + cat.val;
   
 } else {
   //d3.select(".header").text("");
  //  document.getElementById("reDrawButton").style.display = "none";
  //  document.getElementById("lblDrillValue").innerHTML = "" ;
   
 }

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
     //debugger;
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
       updateGraph(d.data.children ? d.data : undefined);
       chartComponent.chartClickEvent.emit(d);
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

// Start by updating graph at root level
updateGraph(undefined);
// document.getElementById("reDrawButton").addEventListener("click", reDrawChart);
function reDrawChart() {
    //updateGraph(undefined);
  }
}

    
}