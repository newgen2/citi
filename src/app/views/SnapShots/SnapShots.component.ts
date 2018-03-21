import { Component, OnInit, OnDestroy, ViewChild, SimpleChange, QueryList  } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import 'rxjs/Rx';
//import * as jsPDF from 'jspdf';
declare let jsPDF;
import { saveAs } from 'file-saver';
// import * as jsPDF from 'jspdf';
import { Subject ,Observable } from 'rxjs/Rx';
import { SessionService } from '../../common-service/session.service';
import { ExcelService } from '../../common-service/xls-download.service';
import { ColumnsService } from '../../common-service/columns.service';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  templateUrl: 'SnapShots.component.html'
})

export class SnapShotsComponent implements  OnInit {
  showRow1:boolean = false;
  showRow2:boolean = false;
  showRow3:boolean = false;
  showRow4:boolean = false;
  showRow5:boolean = false;
  public downloadData: any;
  public xlData: any;
  public MfxlData:any;
  public FAILED = 'Failed';
  public PENDING = 'Pending';
  public INCOMPLETE = 'Incomplete';
  public BUY = 'BUY';
  public SELL = 'Sell';
  public RECEIVE_FREE = 'Receive Free';
  public DELIVER_FREE = 'Deliver Free';
  public GLOBAL = 'Global';
  public CLEAR_STREAM = 'Clear Stream';
  public DTC = 'DTC';
  public FED = 'FED';
  public MF_OFF = 'MF-OFF';
  public MF_DOM = 'MF-DOM';
  public FUTURE_FAIL = 'Future Fail';
  public CONFIRM = 'Confirm';
  public SWIFT = 'Swift';
  public ReportSource = [
    { name: 'MF Offshore RF/DF Failed', filters: {SETTLEMENT_LOCATION : [this.MF_OFF], TRADE_TYPE : [this.RECEIVE_FREE, this.DELIVER_FREE], TRADE_STATUS : [this.FAILED], TRADE_SOURCE : []}},
    { name: 'MF Onshore RF/DF Failed', filters: { SETTLEMENT_LOCATION : [this.MF_DOM], TRADE_TYPE : [this.RECEIVE_FREE, this.DELIVER_FREE], TRADE_STATUS : [this.FAILED], TRADE_SOURCE : []}},
    { name: 'Global Failed', filters: { SETTLEMENT_LOCATION : [this.GLOBAL], TRADE_TYPE : [], TRADE_STATUS : [this.FAILED,this.FUTURE_FAIL], TRADE_SOURCE : []}},
    // { name: 'Global Pending', filters: { SETTLEMENT_LOCATION : [this.GLOBAL], TRADE_TYPE : [], TRADE_STATUS : [this.PENDING], TRADE_SOURCE : []}},
    // { name: 'Global Incomplete', filters: { SETTLEMENT_LOCATION : [this.GLOBAL], TRADE_TYPE : [], TRADE_STATUS : [this.INCOMPLETE], TRADE_SOURCE : []}},
    // { name: 'Domestic Incomplete (Confirm)', filters: { SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [], TRADE_STATUS : [this.INCOMPLETE], TRADE_SOURCE : [this.CONFIRM]}},
    // { name: 'Domestic Incomplete (Swift)', filters: {SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [], TRADE_STATUS : [this.INCOMPLETE], TRADE_SOURCE : [this.SWIFT]}},
    { name: 'Domestic Purchase/Sell Failed', filters: { SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [this.BUY, this.SELL], TRADE_STATUS : [this.FAILED], TRADE_SOURCE : []}},
    { name: 'Domestic RF/DF Failed', filters: { SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [this.RECEIVE_FREE, this.DELIVER_FREE], TRADE_STATUS : [this.FAILED], TRADE_SOURCE : []}}
    ];

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
   // disableUntil: { year: this.uiSearchDate.getFullYear() - 5, month: 12, day: 31 },
      disableSince: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 , day: new Date().getDate() + 1 }
      
  };

// Initialized to specific date (09.10.2018).
public model: any = { };
// public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(private excelService: ExcelService, private session:SessionService, private columnsService:ColumnsService) { }
  getData(type:any, snapType:any){
    debugger;
    if(snapType == "past" && this.model != null)
    {
      snapType = this.model.formatted; 
    }
    else if(snapType == "past" && this.model == null)
    {
      alert("Please enter a valid date (MM/DD/YYYY).");
      return false;
    }
    let inputJson = { SETTLEMENT_LOCATION : type.filters.SETTLEMENT_LOCATION, TRADE_TYPE: type.filters.TRADE_TYPE, TRADE_STATUS: type.filters.TRADE_STATUS, TRADE_SOURCE: type.filters.TRADE_SOURCE, SNAPSHOT_TYPE : snapType};
    console.log(JSON.stringify(inputJson));
    console.log(this.model);
    this.session.getSnapshotDetails(inputJson).subscribe((data)=> {
        this.downloadData=data;
        this.downloadTodays(type,snapType);
        });
      
  }
  downloadTodays(filters:any,snapType:any){
    console.log(snapType);
    debugger;
    var locations : string[],status : string[], tradeTypes : string[], tsource :string[];
    locations = filters.filters.SETTLEMENT_LOCATION;
    status = filters.filters.TRADE_STATUS;
    tradeTypes = filters.filters.TRADE_TYPE;
    tsource = filters.filters.TRADE_SOURCE;
    var type = filters.name;
        // if(type =='MF Offshore RF/DF Failed'){
        //   console.log("Entered: "+type);
        //   locations = [this.MF_OFF];
        //   status = [this.FAILED];
        //   tradeTypes = [this.DELIVER_FREE,this.RECEIVE_FREE];
        //  }
        // else if(type =='MF Onshore RF/DF Failed'){
        //   console.log("Entered: "+type);
        //   locations = [this.MF_DOM];
        //   status = [this.FAILED];
        //   tradeTypes = [this.DELIVER_FREE,this.RECEIVE_FREE];        
        // }
        // else if(type =='Global Failed'){
        //   console.log("Entered: "+type);
        //   locations = [this.GLOBAL];
        //   status = [this.FAILED, this.FUTURE_FAIL];            
        // }
        // else if(type =='Global Pending'){
        //   console.log("Entered: "+type);
        //   locations = [this.GLOBAL];
        //   status = [this.PENDING];           
        // }
        // else if(type =='Global Incomplete'){
        //   console.log("Entered: "+type);
        //   locations = [this.GLOBAL];
        //   status = [this.INCOMPLETE];
        //   tradeTypes = [this.SELL,this.BUY];       
        // }
        // else if(type =='Domestic Incomplete (Confirm)'){
        //   console.log("Entered: "+type);
        //   locations = [this.DTC,this.FED,this.CLEAR_STREAM];
        //   status = [this.INCOMPLETE];
        //   tradeTypes = [this.SELL,this.BUY];    
        //   tsource = [this.CONFIRM];           
        // }  
        // else if(type =='Domestic Incomplete (Swift)'){
        //   console.log("Entered: "+type);
        //   locations = [this.DTC,this.FED,this.CLEAR_STREAM];
        //   status = [this.INCOMPLETE];
        //   tradeTypes = [this.SELL,this.BUY];    
        //   tsource = [this.SWIFT];          
        // } 
        // else if(type =='Domestic Purchase/Sell Failed'){
        //   console.log("Entered: "+type);
        //   locations = [this.DTC,this.FED,this.CLEAR_STREAM];
        //   status = [this.FAILED];
        //   tradeTypes = [this.SELL,this.BUY];   
        // }
        // else if(type =='Domestic RF/DF Failed'){
        //   console.log("Entered: "+type);
        //   locations = [this.DTC,this.FED,this.CLEAR_STREAM];
        //   status = [this.FAILED];
        //   tradeTypes = [this.DELIVER_FREE,this.RECEIVE_FREE];                                
        // }
    
         
        if(Object.keys(this.downloadData).length > 0 && this.downloadData.RESPONSECODE == undefined){
          this.MfxlData  = this.columnsService.getFormattedJSON(type, this.downloadData);
            this.MfxlData = JSON.parse(JSON.stringify(this.MfxlData));
            for (var i = 0; i < this.MfxlData.length; i++) {
              delete this.MfxlData[i].Ageing;
              delete this.MfxlData[i]['RQ Rating'];
            }
          this.generatePDF(this.MfxlData, type, snapType);
          //this.excelService.exportAsExcelFile(this.MfxlData, type);
        }else{
          alert("No data found!");
        }
      
       
    //console.log(this.downloadData);
//     this.downloadData = this.downloadData.filter(obj =>
//       obj.DASHBOARD_STATUS == 'Failed'
//     );
  
//     if(type =='MF-OFF'){
//       this.xlData = this.downloadData.filter(obj => 
//         obj.DASHBOARD_LOCATION == 'MF-OFF'
//         &&
//         (
//           obj.DASHBOARD_TRADE_TYPE == 'Receive Free'
//             ||
//           obj.DASHBOARD_TRADE_TYPE == 'Deliver Free'
//         )
//       );
//       var pdf = new jsPDF();
      
//       var col = [];
//       var rows = [];
     

//     for(let result of this.xlData){
//       col=Object.keys(result);
//      // console.log(Object.keys(result));
//       break;
//    }
//    for(let result of this.xlData){
//      var row= [];
//       for(let keys of col){
//         row.push(result[keys]);
          
//       }
//       rows.push(row);
//       console.log(rows);
//  }
//   //  col=["sameer","ahmed"]
//   //  rows=["ss","ssd"]
//    pdf.autoTable(col,rows);
//    pdf.save("test.pdf")
//       //console.log(Object.keys(this.xlData));
//       //this.excelService.exportAsExcelFile(this.xlData, 'Report');
//     }

//     else if(type =='MF-DOM'){
//         this.xlData = this.downloadData.filter(obj => 
//           obj.DASHBOARD_LOCATION == 'MF-DOM'
//           &&
//           (
//             obj.DASHBOARD_TRADE_TYPE == 'Receive Free'
//               ||
//             obj.DASHBOARD_TRADE_TYPE == 'Deliver Free'
//           )
//         );
//         this.excelService.exportAsExcelFile(this.xlData, 'Report');
//       }
      
//       else if(type =='Global'){
//           this.xlData = this.downloadData.filter(obj => obj.DASHBOARD_LOCATION == 'Global');
//           this.excelService.exportAsExcelFile(this.xlData, 'Report');
//           }
//           else if(type =='Domestic P/S'){
//                   this.xlData = this.downloadData.filter(obj => 
//                       (
//                         obj.DASHBOARD_LOCATION == 'DTC'
//                           ||
//                         obj.DASHBOARD_LOCATION == 'FED'
//                           ||
//                         obj.DASHBOARD_LOCATION == 'Clear Stream'
//                       )
//                         &&
//                       (
//                         obj.DASHBOARD_TRADE_TYPE == 'Sale'
//                           ||
//                         obj.DASHBOARD_TRADE_TYPE == 'Buy'
//                       )
//                     );
//                     this.excelService.exportAsExcelFile(this.xlData, 'Report');
//                 }
//         else if(type =='Domestic  RF/DF'){
//           this.xlData = this.downloadData.filter(obj => 
//             (
//               obj.DASHBOARD_LOCATION == 'DTC'
//                 ||
//               obj.DASHBOARD_LOCATION == 'FED'
//                 ||
//               obj.DASHBOARD_LOCATION == 'Clear Stream'
//             )
//               &&
//             (
//               obj.DASHBOARD_TRADE_TYPE == 'Receive Free'
//                 ||
//               obj.DASHBOARD_TRADE_TYPE == 'Deliver Free'
//             )
//           );  
//           this.excelService.exportAsExcelFile(this.xlData, 'Report');                      
//         }
  
  
  }

  toggleRow1() {
    if(this.showRow1 == true){
        this.showRow1 = false;
      }else{
        this.showRow1=true;
        this.showRow2 = false;
        this.showRow3 = false;
        this.showRow4 = false;
        this.showRow5 = false;
      }
  }

  toggleRow2() {
    if(this.showRow2 == true){
        this.showRow2 = false;
      }else{
        this.showRow1= false;
        this.showRow2 = true;
        this.showRow3 = false;
        this.showRow4 = false;
        this.showRow5 = false;
      }
  }

  toggleRow3() {
    if(this.showRow3 == true){
        this.showRow3 = false;
      }else{
        this.showRow1= false;
        this.showRow2 = false ;
        this.showRow3 = true;
        this.showRow4 = false;
        this.showRow5 = false;
      }
  }

  toggleRow4() {
    if(this.showRow4 == true){
        this.showRow4 = false;
      }else{
        this.showRow1= false;
        this.showRow2 = false ;
        this.showRow3 = false;
        this.showRow4 = true;
        this.showRow5 = false;
      }
  }

  toggleRow5() {
    if(this.showRow5 == true){
        this.showRow5 = false;
      }else{
        this.showRow1= false;
        this.showRow2 = false ;
        this.showRow3 = false;
        this.showRow4 = false;
        this.showRow5 = true;
      }
  }



    ngOnInit() {
    }

    public generatePDF(pdfDATA:any,name:any,snapType:any){
      console.log(snapType);
      var header="";
      if(snapType == 'TODAY'){
          header="Today's Snapshot";
      }else if(snapType == 'THIS_WEEK'){
          header="This Week's Snapshot";
      }else if(snapType == 'LAST_WEEK'){
          header="Last Week's";
      }else if(snapType == 'THIS_MONTH'){
          header="This Month's";
      }else{
          header="Past : "+ snapType;
      }
      var pdfsize = 'a0';
      var pdf = new jsPDF('l', 'pt', pdfsize);
      var col = [];
      var rows = [];
      pdf.setFontSize(10);
      //pdf.setTextColor(255,0,0);
      //pdf.text(40,40, header);
      pdf.text(40,20, header);
      pdf.setFontSize(8);
      pdf.text(40,40, name);
     
    for(let result of pdfDATA){
      col=Object.keys(result);
      break;
   }
   for(let result of pdfDATA){
     var row= [];
      for(let keys of col){
        row.push(result[keys]);

      }
      rows.push(row);
 }
   pdf.autoTable(col,rows, {
    startY: 60,
    styles: {
      overflow: 'linebreak',
      fontSize: 5,
      //fontSize: 15,
      rowHeight: 30,
      halign: 'center',
      columnWidth:'wrap'
    },
    // columnStyles: {
    //   id: {columnWidth: 100}
    // }
  });
   pdf.save(name+".pdf");

    }
   
 }

