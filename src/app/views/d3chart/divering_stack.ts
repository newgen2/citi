import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf'
import { polygonArea } from 'd3-polygon';

@Component({
    selector: 'DiveringStack',
    template: `<div #chart></div>`,
    encapsulation: ViewEncapsulation.None
})
export class DiveringStackComponent implements OnInit, OnChanges {
    @ViewChild('chart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    @Input() private id: any;
    // @Input() public colors: Array<any>;
    @Output() private chartClickEvent = new EventEmitter();
    @Output() private chartHoverEvent = new EventEmitter();
    private margin: any = { top: 25, bottom: 20, left: 40, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private radius: number;
    private outerRadius: number;
    private innerRadius: number;
    private donutWidth: number;
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
        debugger;
        let chartComponent = this;
        let chartID = this.id;
        this.htmlElement = this.chartContainer.nativeElement;
        this.host = d3.select(this.htmlElement);
        // Setup svg using Bostock's margin convention
        // var margin = {top: 10, right: 30, bottom: 18, left: 20};
        //var width = this.htmlElement.offsetWidth - margin.left - margin.right;
        var margin = { top: 0, right: 5, bottom: 18, left: 5 };

        //var relatedHeight = 500;//250;
        //debugger;
        //   if(width > 250)
        //   relatedHeight = 450;
        //  else  if(width < 250)
        //  relatedHeight = 210; 

        //var  height = relatedHeight/2 - margin.top - margin.bottom;
        //height = width/1.65 - margin.top - margin.bottom;
        var title = 'KYC to A/C Opening Approval Cycle Time';
        this.host.html("");

        var margin = { top: 25, right: 10, bottom: 25, left: 5 },
            width = this.htmlElement.offsetWidth - margin.left - margin.right,
            // width = 800 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;
        var svg = this.host.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + 40)
            .attr("id", "d3-plot")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + (margin.top + 5) + ")");
        var x = d3.scale.linear()
            .rangeRound([0, width]);
        var y = d3.scale.ordinal()
            .rangeRoundBands([0, height], .3);

        var color = d3.scale.ordinal().range(["#80ffaa", "#ffff00", "#009933", "#ffff00", "#00FFFF", "#494d80", "#ffff00", "#ff0000", "#ffff00", "#c0c0c0", "#f442c5", "#87ceeb"]);
        var newcolor = ["#80ffaa", "#ffff00", "#009933", "#00FFFF", "#494d80", "#ff0000"];
        var data = this.data;
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        /*
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
        */


        color.domain(["CRF-Create to Submit", "Rework 1", "First QA Approval", "Rework 2", "Last Approval", "Account Submit", "Rework 3", "Account Approve", "Rework 4", "First QA Approval Including Rejects", "First AO Submit Including Rejects", "First Submit to A/C Approve"]);
        //	color.domain(["ONE", "TWO", "THREE", "FOUR", "FIVE"]);
        data = this.data;
        debugger;
        data.forEach(function (d, index) {
            // calc percentages

            //var x0 = 1*(16-d.N);
            var x0 = 1 * d["x-fast"];
            var idx = 0;
            var xInit = 0;
            var yInit = 0;
            var index = 0;
            d.boxes = color.domain().map(function (name) {
                index = index + 1;
                xInit = 0;
                var x1Val;
                if (+d[name] == 0) {

                    xInit = x0;
                    x1Val = (+d[name]);
                } else {
                    xInit = xInit + x0;
                    x1Val = (x0 + d[name]);
                }
                return { name: name, index: index, xInit: xInit, x0: x0, x1: x1Val, yInit: (x0 += +d[name]), N: +d.N, n: +d[name] };
            });
        });

       
        var min_val = 0;

        
        //Start ---- Get Max Value For N From data JSON--Mitesh
        var dMax_N = 0;
        for (var j = 0; j < data[0].boxes.length; j++) {
            dMax_N += parseInt(data[0].boxes[j]["n"]);
        }

        var min_val = 0;

        var max_val = dMax_N;

        if (max_val > 0)
            max_val += 2;
        //End ---- Get Max Value For N From data JSON--Mitesh

        x.domain([min_val, max_val]).nice();
        y.domain(data.map(function (d) { return d.YRange; }));
        var countdays = [];
        svg.append("g")
            .attr("class", "x axis")
            .attr('transform', 'translate(0,' + (height - 65) + ')')
            .call(xAxis);


        /*svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)*/
        var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, barWidth, barHeight, edgeMargin;

     
        x1 = data[0].boxes[0]["x0"];
        y1 = x1;
        var vakken = svg.selectAll(".YRange")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar")
            .attr("transform", function (d, i) { return "translate(0," + [y(d.YRange) + 45 - (i * 62)] + ")"; });


        var bars = vakken.selectAll("polygon")
            .data(function (d) { return d.boxes; })
            .enter()
            .append("g")
            .attr("class", "subbar");
        var yEnd = 0;
        var storedStartPoint;
        var x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, barWidth, barHeight, edgeMargin;
        bars.append("polygon")
            .attr("points", function (d) {
                var startPoint;
                if (d.index == 1) {
                    startPoint = x(d.xInit);
                    yEnd = x(d.xInit);
                } else {
                    startPoint = x(d.xInit);
                    yEnd = 0;
                }

                var point;
                if (parseInt(d.n) != 0) {
                    point = startPoint + "," + yEnd + ","
                        + (startPoint + 7) + "," + y.rangeBand() / 2 + ","
                        + startPoint + ", " + (yEnd + y.rangeBand()) + ","
                        + (x(d.x1)) + "," + (yEnd + y.rangeBand()) + ","
                        + (x(d.x1) + 7) + "," + y.rangeBand() / 2 + ","
                        + (x(d.x1)) + "," + yEnd;
                    return point;
                } else {
                    return "0,0,0,0,0,0";
                }

            })
            .style("fill", function (d) { return color(d.name); })
            .style("stroke", "#ada8a8")
            .style("stroke-width", 1);

        bars.append("text")
            .attr("x", function (d) { return x(d.x0) + 9; })
            .attr("y", y.rangeBand() / 2.5)
            .attr("dy", "0.5em")
            .attr("dx", "0.5em")
            .style("font", "10px sans-serif")
            .attr("fill", function (d) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color(d.name));
                // Counting the perceptive luminance - human eye favors green color... 
                var a = 1 - (0.299 * parseInt(result[1], 16) + 0.587 * parseInt(result[2], 16) + 0.114 * parseInt(result[3], 16)) / 255;
                if (Math.abs(a) < 0.5)
                    return "#000000"; // bright colors - black font
                else
                    return "#ffffff"; // dark colors - white font
            })
            .style("text-anchor", "begin")
            .text(function (d) {
                if (d.name == "First QA Approval Including Rejects" || d.name == "First AO Submit Including Rejects" || d.name == "First Submit to A/C Approve")
                    return d.n > 0 ? d.n + (d.n == 1 ? " Day" : " Days") + " (" + d.name + ")" : "";
                else {
                    countdays.push({ "Type": d.name, "CountDays": d.n });
                    return d.n > 0 ? d.n + (d.n == 1 ? " Day" : " Days") : ""
                }
            });


        vakken.insert("rect", ":first-child")
            .attr("height", y.rangeBand())
            .attr("x", "1")
            .attr("width", width)
            .attr("fill-opacity", "0.5")
            .style("fill", "#F5F5F5")
            .attr("class", function (d, index) { return index % 2 == 0 ? "even" : "uneven"; });


        //  svg.append("g")
        //       .attr("class", "y axis")
        //   .	append("line")
        //       .attr("x1", x(0))
        //       .attr("x2", x(0))
        //       .attr("y2", height);
        // svg.append("text")
        //       .attr("x", 22)
        //       .attr("y", 9)
        //       .attr("dy", ".35em")
        //       .style("text-anchor", "begin")
        //       .style("font" ,"10px sans-serif")
        //       .text(function(d) { return d; });
        var holderboxesinfo = {};
        countdays.forEach(elementboxes => {
            if (holderboxesinfo.hasOwnProperty(elementboxes.Type)) {
                holderboxesinfo[elementboxes.Type] = holderboxesinfo[elementboxes.Type] + elementboxes.CountDays;
            } else {
                holderboxesinfo[elementboxes.Type] = elementboxes.CountDays;
            }
        });
        var obj2 = [];

        for (var prop in holderboxesinfo) {
            obj2.push({ name: prop, value: holderboxesinfo[prop] });
        }

        var startp = svg.append("g").attr("class", "legendbox").attr("id", "mylegendbox");
        // this is not nice, we should calculate the bounding box and use that
        //var legend_tabs = [0, 150, 230, 350, 450, 550, 0, 80, 210, 350, 500 ];
        var legendHeight = height - 15;
        var abc = 0;
        var lengthVar = [];
        var totLength = 0;
        var flagtab = 0;
        var lengthtobeused = 0;
        var colorarray = [];
        var totalReworkValue = 0;
        for (var i = 0; i < obj2.length; i++) {
            if (obj2[i].name == "Rework 1" || obj2[i].name == "Rework 2" || obj2[i].name == "Rework 3" || obj2[i].name == "Rework 4") {
                totalReworkValue = totalReworkValue + obj2[i].value
            }
        }
        for (var i = 0; i < obj2.length; i++) {
            if (obj2[i].name == "Rework 1") {
                colorarray.push({ name: "Rework", value: totalReworkValue });
            }
            else if (obj2[i].name != "Rework 2" && obj2[i].name != "Rework 3" && obj2[i].name != "Rework 4") {
                colorarray.push({ name: obj2[i].name, value: obj2[i].value });
            }

        }
        var legend = startp.selectAll(".legend")
            .data(colorarray)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {

                lengthVar[i] = d.name.length;
                flagtab = 1;
                totLength = totLength + (lengthVar[i - 1] * 6 + (width / 16.2));
                if (i != 0)
                    lengthtobeused = lengthtobeused + (lengthVar[i - 1] * 6 + (width / 21.6));
                if (i == 3)
                    lengthtobeused = lengthtobeused + (lengthVar[i - 1] - (width / 16.2));
                if (i > 8)
                    lengthtobeused = lengthtobeused + (lengthVar[i - 1] - (width / 9.2));

                //console.log(totLength);
                if (totLength > (width - width / 45) || lengthtobeused > (width - width / 45)) {
                    totLength = 0;
                    legendHeight = legendHeight + 20;
                    flagtab = 0;
                    lengthtobeused = 0;
                }
                if (i == 0 || flagtab == 0)
                    return "translate(" + lengthtobeused + "," + legendHeight + ")";
                else
                    return "translate(" + lengthtobeused + "," + legendHeight + ")";
            });
        //alert(lastWordLenth);
        legend.append("text")
            .attr("x", 0)
            .attr("y", 5)
            .attr("text-anchor","middle")
            .attr("dy", ".35em")
            .text(function (d) {
                return d.value;
            })
            .style("font-size","10px")
            .on("click", function (d) {
                d['chartID'] = chartID;
            });
        legend.append("rect")
            .attr("x", 7)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
                return newcolor[i]
            });

        legend.append("text")
            .attr("x", 20)
            .attr("y", 5)
            .attr("dy", ".35em")
            .style("text-anchor", "begin")
            .style("font", "10px sans-serif")
            .text(function (d) { return d.name; });

        d3.selectAll(".axis path")
            .style("fill", "none")
            .style("stroke", "#000")
            .style("shape-rendering", "crispEdges")

        d3.selectAll(".axis line")
            .style("fill", "none")
            .style("stroke", "#000")
            .style("shape-rendering", "crispEdges")

        svg.append("text")
            .attr("x", (width / 2 - (title.length / 16)))
            .attr("y", (height - (height / 4.5)))
            .attr("text-anchor", "middle")
            .style("font", "bold 10px sans-serif")
            .style("text-align", "center")
            .style("font-size", "14px")
            .text(title);


        var line = svg.append("line")
            .attr("x1", width / 2 - (title.length / 16) + (4.05 * title.length))
            .attr("y1", 113.28)
            .attr("x2", width / 2 - (title.length / 16) + (4.05 * title.length) + 15)
            .attr("y2", 113.28)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("marker-end", "url(#arrow)")
            .text(title);
        svg.append("text")
            .attr("x", width / 2 - (title.length / 16) + (4.05 * title.length) + 15)
            .attr("y", 118.28)
            .attr("text-anchor", "middle")
            .style("font", "bold 10px sans-serif")
            .style("text-align", "center")
            .style("font-size", "14px")
            .text(">");

        //svg.append("text")
        // .attr("x", (width /2-(title.length/16)))             
        // .attr("y", (height-(height/3.5)))
        // .attr("text-anchor", "middle")  
        // .style("font", "bold 10px sans-serif")
        //.style("text-align", "center")
        //.style("font-size","14px")
        //.text(title);

        //var movesize = width/2 - startp.node().getBBox().width/2;
        //d3.selectAll(".legendbox").attr("transform", "translate(" + movesize  + ",0)");

    }
}