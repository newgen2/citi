import { Component, OnInit, OnDestroy, ViewChild, SimpleChange, QueryList  } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { Subject ,Observable } from 'rxjs/Rx';
import { SessionService } from '../../common-service/session.service';
import { ExcelService } from '../../common-service/xls-download.service';
import { ColumnsService } from '../../common-service/columns.service';
import { DialogConfirmService } from '../../common-service/dialog-confirm/dialog-confirm.service';


@Component({
  selector : 'report',
  templateUrl: 'report.component.html'
})

export class ReportComponent implements  OnInit {
  public downloadData: any;
  public xlData: any;
  public MfxlData:any;
  public GBLxlData:any;
  
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
    { name: 'Global Pending', filters: { SETTLEMENT_LOCATION : [this.GLOBAL], TRADE_TYPE : [], TRADE_STATUS : [this.PENDING], TRADE_SOURCE : []}},
    { name: 'Global Incomplete', filters: { SETTLEMENT_LOCATION : [this.GLOBAL], TRADE_TYPE : [], TRADE_STATUS : [this.INCOMPLETE], TRADE_SOURCE : []}},
    { name: 'Domestic Incomplete (Confirm)', filters: { SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [], TRADE_STATUS : [this.INCOMPLETE], TRADE_SOURCE : [this.CONFIRM]}},
    { name: 'Domestic Incomplete (Swift)', filters: {SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [], TRADE_STATUS : [this.INCOMPLETE], TRADE_SOURCE : [this.SWIFT]}},
    { name: 'Domestic Purchase/Sell Failed', filters: { SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [this.BUY, this.SELL], TRADE_STATUS : [this.FAILED], TRADE_SOURCE : []}},
    { name: 'Domestic RF/DF Failed', filters: { SETTLEMENT_LOCATION : [this.DTC,this.FED,this.CLEAR_STREAM], TRADE_TYPE : [this.RECEIVE_FREE, this.DELIVER_FREE], TRADE_STATUS : [this.FAILED], TRADE_SOURCE : []}}
    ];


  constructor(private excelService: ExcelService, private session:SessionService, private columnsService:ColumnsService, private dialog : DialogConfirmService) { }

  getData(type:any){
    debugger;
      if(this.downloadData == undefined){
        this.session.getTradeDetails().subscribe((data)=> {
        this.downloadData=data.TRADEDATA;
        this.filterReport(type);
        });
      }
      else{
        this.filterReport(type);
      }
  }
  
  public filterReport(filters:any){
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

    //console.log(this.downloadData)

  // Updated to work on IE --Sameer Ahmed-- 
  // this.xlData = this.downloadData.filter(obj => 
  //   (Object.keys(locations).length>0  ? locations.includes(obj.DASHBOARD_LOCATION):true)
  //   &&
  //   ( Object.keys(status).length>0  ? status.includes(obj.DASHBOARD_STATUS):true)
  //   &&
  //   (Object.keys(tradeTypes).length>0 ? tradeTypes.includes(obj.DASHBOARD_TRADE_TYPE):true)
  //   &&
  //   (Object.keys(tsource).length>0 ? tsource.includes(obj.SOURCE):true)
  // );

  this.xlData = this.downloadData.filter(obj =>
    (Object.keys(locations).length>0  ? locations.indexOf(obj.DASHBOARD_LOCATION)>=0:true)
    &&
    ( Object.keys(status).length>0  ? status.indexOf(obj.DASHBOARD_STATUS)>=0:true)
    &&
    (Object.keys(tradeTypes).length>0 ? tradeTypes.indexOf(obj.DASHBOARD_TRADE_TYPE)>=0:true)
    &&
    (Object.keys(tsource).length>0 ? tsource.indexOf(obj.SOURCE)>=0:true)
  );

  this.xlData=this.columnsService.getFormattedJSON(type, this.xlData);

    if (Object.keys(this.xlData).length > 0) {
      // this.xlData.forEach(element => {
      //   if (element.SHARES != undefined) {
      //     element.SHARES = this.parseShares(element.SHARES);
      //   }
      //   if (element.Shares != undefined) {
      //     element.Shares = this.parseShares(element.Shares);
      //   }
      // });
    this.xlData = JSON.parse(JSON.stringify(this.xlData));
      for (var i = 0; i < this.xlData.length; i++) {
        delete this.xlData[i].Ageing;
        delete this.xlData[i]['RQ Rating'];
      }
      this.excelService.exportAsExcelFile(this.xlData, type);
    } else {
      this.dialog.alert("No data found!");
    }
  
//   if(type =='MF Offshore RF/DF Failed' || type =='MF Onshore RF/DF Failed')
//      {
//       this.MfxlData = this.xlData.map(o => {
//        return{
//          "Account Number": o.ACCOUNT_NUMBER,
//          "Account Name": o.ACCOUNT_SHORT_NAME,
//          "Trade Date":o.TRADE_DATE,
//          "Contractual Settlement Date":o.TRADE_SETTLE_DATE,
//          "CUSIP":o.CUSIP,
//          "ISIN":o.ISIN,
//          "Asset Short Name":o.ASSET_SHORT_NAME,
//          "Trade Type":o.TRADE_TYPE,
//          "Original Amount":o.ORIGINAL_AMOUNT,
//          "Shares":o.SHARES,
//          "Net Trade Amount":o.NET_PLUS_AI_AMOUNT,
//          "Price":o.PRICE,
//          "Principal Amount":o.PRINCIPAL,
//          "Trade Status":o.DASHBOARD_STATUS,
//          "Registration":o.REGISTRATION,
//          "Location":o.LOCATION,
//          "Settlement Location":o.SETTLEMENT_LOCATION,
//          "Settlement Currency":o.SETTLEMENT_CURRENCY,
//          "Explanation":o.EXPLANATION,
//          "Hold Date":o.HOLD_DATE,
//          "Hold Date Open":o.HOLD_DATE_OPEN,
//          "Processing Date":o.PROCESSING_DATE,
//          "Reversed?":o.REVERSED,
//          "Accrued Interest Amount":o.ACCURED_INTEREST_AMT,
//          "Net + AI Amount":o.NET_PLUS_AI_AMOUNT,
//          "Block Indicator":o.BLOCK_INDICATOR,
//          "Clearing Broker":o.CLEARING_BROKER,
//          "Executing Broker":o.EXECUTING_BROKER,
//          "Account Administrator":o.ADMINISTRATOR,
//          "Backup Investment Officer":o.BACKUP_INVESTMENT_OFFICER,
//          "Broker Amount":o.BROKER_AMOUNT,
//          "Confirm File Date":o.CONFIRM_FILE_DATE,
//          "Confirm Trade Id":o.CONFIRM_TRADE_ID,
//          "Create User":o.CREATED_BY,
//          "Last Modified Date":o.LAST_MODIFIED_DATE,
//          "Last Modified User":o.LAST_MODIFIED_USER,
//          "Maturity Date":o.MATURITY_DATE,
//          "Optional Fee 1 Amount":o.OPTIONAL_FEE_1_AMOUNT,
//          "Optional Fee 2 Amount":o.OPTIONAL_FEE_2_AMOUNT,
//          "SEC Fee Amount":o.SEC_FEE,
//          "Corporate Action Event Type":o.CORPORATE_ACTION_EVENT_TYPE,
//          "Line of Business":o.LINE_OF_BUSINESS,
//          "Comments":o.COMMENTS,
//          "Comments logged by SOEID":o.COMMENTS_LOGGED_BY_SOEID
//        };
//      });
//      }
//    if(type == 'Global Pending' || type == "Global Incomplete")
//   {
//    this.GBLxlData = this.xlData.map(o => {
//     return{ 
//       "Matched?": '',
//       "Block Indicator":o.BLOCK_INDICATOR,
//       "Trade #" : o.uniqueTradeKey,
//       "Internal Confirm #" : '',
//       "DTC Confirm #": '',
//       "SWIFT SEME":o.SWIFT_SEME,
//       "Status":o.DASHBOARD_STATUS,
//       "Trade Type":o.TRADE_TYPE,
//       "Logged By":'',
//       "Quantity":o.QUANTITY,
//       "Asset" :'', 
//       "Account":'',
//       "Administrator":o.ADMINISTRATOR,
//       "Registration":o.REGISTRATION,
//       "Location":o.LOCATION,
//       "Price":o.PRICE,
//       "Principal":o.PRINCIPAL,
//       "Net":'',
//       "Accrued Interest Amount":'',
//       "Net + AI":'',
//       "Brokerage":'',
//       "SEC Fee":o.SEC_FEE,
//       "P I Amount":'',
//       "Original Face":o.ORIGINAL_FACE,
//       "Trade Date":o.TRADE_DATE,
//       "Settle Date":o.TRADE_SETTLE_DATE,
//       "Posted Date":'',
//       "Actual Settlement Date":'',
//       "Cancel Date":'',
//       "Hold Date":'',
//       "Hold Date Open":'',
//       "Swift Eligible":'',
//       "Stamp Duty Code":o.STAMP_DUTY_CODE,
//       "Settlement Location":o.SETTLEMENT_LOCATION,
//       "Settlement Currency":o.SETTLEMENT_CURRENCY,
//       "Executing Broker":'',
//       "Clearing Broker":'',
//       "Affirm Type":'',
//       "Timestamp Entered":'',	
//       "Source":o.SOURCE,
//       "Asset Type":o.ASSET_TYPE,
//       "Status Message":o.STATUS_MESSAGE
//     };
//   });
//   }
//   else if(type == 'Global Failed')
//   {
//     this.GBLxlData = this.xlData.map(o => {
//     return{
//     "Account ID":o.ACCOUNT_ID,
//     "Investment Officer":o.BACKUP_INVESTMENT_OFFICER,
//     "Administrator":o.ADMINISTRATOR,
//     "Line Of Business":o.LINE_OF_BUSINESS,
//     "Trade Date":o.TRADE_DATE,
//     "CSD":o.TRADE_SETTLE_DATE,
//     "Txn Type":o.CDS_TXN_TYPE,
//     "Quantity":o.QUANTITY,
//     "ISIN":o.ISIN,
//     "Issue Name":o.CDS_ISSUE_NAME,
//     "CCY":o.CDS_CCY,
//     "Settlement Amount":o.CDS_SETTLEMENT_AMOUNT,
//     "Client Reference":o.CDS_CLIENT_REF_NO,
//     "Citi Reference":o.CDS_CITI_REF_NO,
//     "Settlement Location":o.SETTLEMENT_LOCATION,
//     "Counterparty":o.CDS_COUNTERPARTY,
//     "Fail Description":o.CDS_FAILED_DESCRIPTION,
//     "Comments":o.COMMENTS,
//     "Fail Text":o.FAILED_REASON,
//     "Fail Text(Contd.)":o.FAILTEXT_CONTD
//   };
//   });
//   }
//   if(type =='MF Offshore RF/DF Failed' || type =='MF Onshore RF/DF Failed')
//   {
//     if(Object.keys(this.MfxlData).length>0){
//     this.excelService.exportAsExcelFile(this.MfxlData, type);
//   }else{
//     alert("No data found!");
//   }
//   }
//   else if(type == 'Global Failed' || type == 'Global Pending' || type == "Global Incomplete")
//   {
//     if(Object.keys(this.GBLxlData).length>0){
//       this.excelService.exportAsExcelFile(this.GBLxlData, type);
//     }else{
//       alert("No data found!");
//     }
//   }
// else
// {
//   if(Object.keys(this.xlData).length>0){
//     this.excelService.exportAsExcelFile(this.xlData, type);
//   }else{
//     alert("No data found!");
//   }
// }
   
}

  public parseShares(v: string) {
    var myValue = v.split(".");

    let retunValue = "";
    if (myValue[0] != undefined && myValue[0] != "") {
      retunValue = parseFloat(myValue[0]).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (myValue[1] != undefined && myValue[1] != "") {
      retunValue = retunValue + "." + myValue[1];
    } else {
      retunValue = retunValue;
    }

    if (retunValue == 'NaN')
      return v;
    else
      return retunValue;
  }

    ngOnInit() {

    }
   
 }

