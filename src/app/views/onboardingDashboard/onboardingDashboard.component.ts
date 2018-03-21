import { Component, OnInit, OnDestroy, ViewChild, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Subject, Observable } from 'rxjs/Rx';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CurrencyPipe } from '@angular/common';
import { SessionService } from '../../common-service/session.service';
import { AppFooterComponent } from '../../components/app-footer';
import { AppHeaderComponent } from '../../components/app-header';
import { ChartDatatableComponent } from '../datatable/chartDatatable.component';
import { AcctMaintDatatableComponent } from '../datatable/AcctMaintDatatable.component';
import { ExcelService } from '../../common-service/xls-download.service';
@Component({
  templateUrl: 'onboardingDashboard.component.html'
})


export class onboardingDashboardComponent implements OnInit {
  @ViewChild(AcctMaintDatatableComponent)
  acctMaintDatatableComponent: AcctMaintDatatableComponent;
  @ViewChild(ChartDatatableComponent)
  chartDatatableComponent: ChartDatatableComponent;

  // variables for widget maximize and minimize
  selectedBox = "";
  acOpeningFlag = false;
  aocFlag = false;
  kycFlag = false;
  acMaintFlag = false;
  scanningDocsFlag = false;
  //nikhil
  webEnrollmentsFlag = false;
  nameScreeningFlag = false;
  webEnrollmentsFlagcard = false;
  nameScreeningFlagcard = false;
  acMaintFlagcard = false;
  scanningDocsFlagcard = false;
  dynColumnAcctMaint: any = [];
  public isLoader = false;
  public businessDate:any;
  public _onboardingEntitlement:any;

  public filterAndSideLinkData: any = {};
  public onBoardData: any = {};
  public filteredACCycleData: any = [];
  public filteredData: any = [];
  public filteredDataDms: any = [];
  public filteredData_AM_WE_CSS: any = [];
  public kycData: any = [];
  public kycChartData: any = [];
  public ytdAvg: 0;
  public ytdVol: 0;
  public volByProductfilteredData: any = [];
  public productData: any = [];
  public webEnrolDatatableData: any = [];

  public WigetAccessObj = { "AOWiget": 0, "KYCWiget": 0, "DMSWiget": 0, "": 0, "AMWiget": 0, "WEWiget": 0, "CSSWidget": 0 };


  public AccountOpeningWidget_Model: any = { "ACCOUNT_TYPE": "3", "CYCLE_TIME_LSLA_LM": "0", "CYCLE_TIME_LSLA_CM": "0", "CYCLE_TIME_LSLA_MOM": "0", "CYCLE_TIME_RQ": "0", "CYCLE_TIME_YTD": "00", "AO_VOL_LSLA_LM": "0", "AO_VOL_LSLA_CM": "0", "AO_VOL_LSLA_MOM": "0", "AO_VOL_RQ": "0", "AO_VOL_YTD": "00" };
  public KYCData: any = [{ "type": "NEW", "RQ": "", "VOL": "0", "CM": "0", "LM": "0", "REJECTS": "" }];
  public KYCCycle: any = [{ "type": "KYC Cycle*", "RQ": "", "VOL": "0", "CM": "0", "LM": "0", "REJECTS": "0" }
  ];
  public accMaintData: any =[];
  public accMaintDataDownload: any = [];
  public ScanningDocs: any = {};
  public onBoardDmsData: any = {};
  public onBoard_AM_WE_CSS_Data: any = {};
  public isVolByProductFlag = false;
  public AccountOpeningVolumeBarChartData: any = [];
  public AccountMaintainencData: any = {};
  public ytdAccountMaintainence=0;
  public webEnrollmentsData: any = {};
  public filterWebEnrollmentsData: any = [];
  public OnBoardwebEnrollmentsData: any = {};


  public KYCChart: any = [];



  public WebEnrollmentsBarChartData: any = [];
  // public NameScreeningBarChartData: any = [{ "month": "JAN", "volume": 58 }, { "month": "FEB", "volume": 12 }, { "month": "MAR", "volume": 6 }, { "month": "APR", "volume": 7 }, { "month": "MAY", "volume": 30 }, { "month": "JUN", "volume": 45 }, { "month": "JUL", "volume": 43 }, { "month": "AUG", "volume": 33 }, { "month": "SEP", "volume": 34 }, { "month": "OCT", "volume": 93 },
  public NameScreeningBarChartData: any = [];
  // public ScanningOfDocsBarChartData: any = [{ "month": "JAN", "volume": 20 }, { "month": "FEB", "volume": 67 }, { "month": "MAR", "volume": 6 }, { "month": "APR", "volume": 7 }, { "month": "MAY", "volume": 30 }, { "month": "JUN", "volume": 45 }, { "month": "JUL", "volume": 43 }, { "month": "AUG", "volume": 33 }, { "month": "SEP", "volume": 20 }, { "month": "OCT", "volume": 23 },
  // { "month": "NOV", "volume": 15 }, { "month": "DEC", "volume": 53 }];
  public AccountOpeningLineChartData: any = [];
  public ScanningOfDocsBarChartData: any = [];
  public KYCLineChartData: any = [
    { "date": "JAN", "close": "5" }, { "date": "FEB", "close": "15" }, { "date": "MAR", "close": "25" }, { "date": "APR", "close": "22" }, { "date": "MAY", "close": "34" }, { "date": "JUN", "close": "55" }, { "date": "JUL", "close": 45 }, { "date": "AUG", "close": 40 }, {
      "date": "SEP", "close": 23
    }, { "date": "OCT", "close": 45 }, { "date": "NOV", "close": 49 }, {
      "date": "DEC", "close": 19
    }];
  public WebEnrollmentLineChartData: any = [
    { "date": "JAN", "close": "5" }, { "date": "FEB", "close": "15" }, { "date": "MAR", "close": "25" }, { "date": "APR", "close": "22" }, { "date": "MAY", "close": "34" }, { "date": "JUN", "close": "55" }, { "date": "JUL", "close": 45 }, { "date": "AUG", "close": 40 }, {
      "date": "SEP", "close": 23
    }, { "date": "OCT", "close": 45 }, { "date": "NOV", "close": 49 }, {
      "date": "DEC", "close": 19
    }];

  public nameScreeningData: any = [];
  public NameScreeningLineChartData: any = [];
  public VolumeByProductScaleChartData: any = [];
  // public VolumeByProductScaleChartData: any = [{ Product: 'CUST', Value: 70 }, { Product: 'TRUST', Value: 9 }, { Product: 'PC', Value: 7 }, {
  //   Product: 'INV', Value: 5
  // }, { Product: 'CM', Value: 4 }, { Product: 'MI', Value: 3 }, { Product: 'BANKING', Value: 2 }];
  public webEnrollmentScaleChartData: any = [5, 10, 15, 20, 25];
  public NameScreeningScaleChartData: any = [5, 10, 15, 20, 25];
  public defaultSelection: any = { "REGION": "1", "FREQUENCY": "3", "PRODUCTS": "12", "ACCOUNT_TYPE": "1", "selectedUsers": "3" };
  private acctBanker;private acctMaint;private acctMift;private acctTitle_Eg;private acctTitle_Acct;
  private acctAddr_Eg;private acctAddr_Acct;
  constructor(private session: SessionService,private excelService: ExcelService) { }
  ngOnInit(): void {
    this.isLoader = true;
    
    //this.session.getOnboardEntitlement().subscribe((data) => {
      debugger;
      
      //this.businessDate = "02/08/2018";
      AppHeaderComponent.prototype.headerTitle = "Onboarding Dashboard";
      AppFooterComponent.prototype.feedType1_text = "Last OneSource Feed Received";
      AppFooterComponent.prototype.feedType1_time = "01/25/2018 11:25:58";
      AppFooterComponent.prototype.feedType2_text = "Last DMS feed received";
      AppFooterComponent.prototype.feedType2_time = "01/25/2018 11:25:58";
      this.WigetAccessObj.AOWiget = this._onboardingEntitlement.onboardGraphAccess.aoGraphAccesss;
      this.WigetAccessObj.KYCWiget = this._onboardingEntitlement.onboardGraphAccess.kycGraphAccess;
      this.WigetAccessObj.DMSWiget = this._onboardingEntitlement.onboardGraphAccess.dmsGraphAccess;
      this.WigetAccessObj.AMWiget = this._onboardingEntitlement.onboardGraphAccess.amGraphAccess;
      this.WigetAccessObj.WEWiget = this._onboardingEntitlement.onboardGraphAccess.webEnrollgraphAccess;
      this.WigetAccessObj.CSSWidget = this._onboardingEntitlement.onboardGraphAccess.cssGraphAccess;

    //});

    this.ClickbtnReload();
  }

  ngAfterViewInit(): void {

  }
  public getMonthArray=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]; 
  // public getMonthString(monthNumber) {
  //   if (monthNumber == 0) {
  //     return "JAN";
  //   }
  //   else if (monthNumber == 1) {
  //     return "FEB";
  //   }
  //   else if (monthNumber == 2) {
  //     return "MAR";
  //   }
  //   else if (monthNumber == 3) {
  //     return "APR";
  //   }
  //   else if (monthNumber == 4) {
  //     return "MAY";
  //   }
  //   else if (monthNumber == 5) {
  //     return "JUN";
  //   }
  //   else if (monthNumber == 6) {
  //     return "JUL";
  //   }
  //   else if (monthNumber == 7) {
  //     return "AUG";
  //   }
  //   else if (monthNumber == 8) {
  //     return "SEP";
  //   }
  //   else if (monthNumber == 9) {
  //     return "OCT";
  //   }
  //   else if (monthNumber == 10) {
  //     return "NOV";
  //   }
  //   else if (monthNumber == 11) {
  //     return "DEC";
  //   }
  // }
  public onDDItemClick(e: any, prodName: any): void {
    this.defaultSelection.PRODUCTS = prodName;
  }

  public onSelectFilter() {
    this.filteredData = this.onBoardData.RESPONSE_DATA.filter(obj =>
      obj.REGION == this.defaultSelection.REGION
    );

    this.filteredData = this.filteredData[0].FREQUENCY.filter(obj =>
      obj.NAME == this.defaultSelection.FREQUENCY
    );
    this.filteredData = this.filteredData[0].PRODUCTS.filter(obj =>
      obj.PRODUCT == this.defaultSelection.PRODUCTS
    );

    this.filteredData = this.filteredData[0].ACCOUNTTYPE.filter(obj =>
      obj.TYPE == this.defaultSelection.ACCOUNT_TYPE
    );
    this.kycData = this.filteredData[0].DATA.filter(obj =>
      obj.ACTIVITY_NAME == "KYC"
    );

    console.log("sammy")
    console.log(this.kycData[0].ACTIVITY_DATA[0]);
    this.ytdAvg = this.kycData[0].ACTIVITY_DATA[0].YTD_CYCLE_TIME_AVG;
    this.ytdVol = this.kycData[0].ACTIVITY_DATA[0].YTD_VOLUME;
    this.KYCData = [{ "type": "NEW", "RQ": this.kycData[0].ACTIVITY_DATA[0].RQ_VOLUMNE, "VOL": "3456", "CM": this.kycData[0].ACTIVITY_DATA[0].CURR_PRD_VOLUME, "LM": this.kycData[0].ACTIVITY_DATA[0].PREV_PRD_VOLUME, "MOM": this.kycData[0].ACTIVITY_DATA[0].POP_VOLUMNE, "REJECTS": "" }];
    this.KYCCycle = [{ "type": "KYC Cycle*", "RQ": this.kycData[0].ACTIVITY_DATA[0].RQ_CYCLE_TIME, "VOL": "6", "CM": this.kycData[0].ACTIVITY_DATA[0].CURR_PRD_CYCLE_TIME_AVG, "LM": this.kycData[0].ACTIVITY_DATA[0].PREV_PRD_CYCLE_TIME_AVG, "MOM": this.kycData[0].ACTIVITY_DATA[0].POP_CYCLE_TIME_AVG, "REJECTS": "22" }];

    this.loadKycChart(this.kycData[0].ACTIVITY_DATA[0]);
    this.loadAOWidget();
  }
  public onSelectFilterDms() {
    this.ScanningOfDocsBarChartData = [];
    console.log(this.defaultSelection.REGION);
    this.filteredDataDms = this.onBoardDmsData.RESPONSE_DATA.filter(obj =>
      obj.REGION == this.defaultSelection.REGION
    );

    this.filteredDataDms = this.filteredDataDms[0].FREQUENCY.filter(obj =>
      obj.NAME == this.defaultSelection.FREQUENCY
    );

    this.ScanningDocs = this.filteredDataDms[0].DATA;
    
    var d = new Date(this.businessDate);
    
    var m = d.getMonth();
    console.log("Month" + m);
    for (let i = 0; i < 12; i++) {

      let scanningDmsKeyObj = { "month": this.getMonthArray[(m + i) % 12], "volume": "" };

      this.ScanningOfDocsBarChartData.push(scanningDmsKeyObj);
    }
    this.ScanningOfDocsBarChartData[11].volume = this.ScanningDocs[0].MNTH_1_VOLUME;
    this.ScanningOfDocsBarChartData[10].volume = this.ScanningDocs[0].MNTH_2_VOLUME;
    this.ScanningOfDocsBarChartData[9].volume = this.ScanningDocs[0].MNTH_3_VOLUME;
    this.ScanningOfDocsBarChartData[8].volume = this.ScanningDocs[0].MNTH_4_VOLUME;
    this.ScanningOfDocsBarChartData[7].volume = this.ScanningDocs[0].MNTH_5_VOLUME;
    this.ScanningOfDocsBarChartData[6].volume = this.ScanningDocs[0].MNTH_6_VOLUME;
    this.ScanningOfDocsBarChartData[5].volume = this.ScanningDocs[0].MNTH_7_VOLUME;
    this.ScanningOfDocsBarChartData[4].volume = this.ScanningDocs[0].MNTH_8_VOLUME;
    this.ScanningOfDocsBarChartData[3].volume = this.ScanningDocs[0].MNTH_9_VOLUME;
    this.ScanningOfDocsBarChartData[2].volume = this.ScanningDocs[0].MNTH_10_VOLUME;
    this.ScanningOfDocsBarChartData[1].volume = this.ScanningDocs[0].MNTH_11_VOLUME;
    this.ScanningOfDocsBarChartData[0].volume = this.ScanningDocs[0].MNTH_12_VOLUME;
  }
  public onSelectFilter_AM_WE_CSS() {

    this.filteredData_AM_WE_CSS = this.onBoard_AM_WE_CSS_Data.RESPONSE_DATA.filter(obj =>
      obj.REGION == this.defaultSelection.REGION
    );

    this.filteredData_AM_WE_CSS = this.filteredData_AM_WE_CSS[0].FREQUENCY.filter(obj =>
      obj.NAME == this.defaultSelection.FREQUENCY
    );
    this.filteredData_AM_WE_CSS = this.filteredData_AM_WE_CSS[0].ACCOUNT_TYPE.filter(obj =>
      obj.TYPE == this.defaultSelection.ACCOUNT_TYPE
    );
    let AODATA = this.filteredData_AM_WE_CSS[0].DATA.filter(obj =>
      obj.ACTIVITY_NAME == "ACCOUNT_MAINTENANCE"
    );
    let WEData = this.filteredData_AM_WE_CSS[0].DATA.filter(obj =>
      obj.ACTIVITY_NAME == "WEB_ENROLLMENT"
    );
    let CSSData = this.filteredData_AM_WE_CSS[0].DATA.filter(obj =>
      obj.ACTIVITY_NAME == "CSS"
    );
    this.AccountMaintainencData = AODATA[0].ACTIVITY_DATA;
    this.ytdAccountMaintainence= this.AccountMaintainencData[0].YTD_BANKER_VOLUME + this.AccountMaintainencData[0].YTD_MAINTENANCE_VOLUME + this.AccountMaintainencData[0].YTD_MIFT_VOLUME + this.AccountMaintainencData[0].YTD_TITLE_VOLUME_EG + this.AccountMaintainencData[0].YTD_TITLE_VOLUME_ACCT +this.AccountMaintainencData[0].YTD_ADDRESS_VOLUME_EG +this.AccountMaintainencData[0].YTD_ADDRESS_VOLUME_ACCT;
    
    this.acctBanker=this.AccountMaintainencData[0].CURR_BANKER_VOLUME;
    this.acctMaint=this.AccountMaintainencData[0].CURR_MAINTENANCE_VOLUME;
    this.acctMift=this.AccountMaintainencData[0].CURR_MIFT_VOLUME;
    this.acctTitle_Eg=this.AccountMaintainencData[0].CURR_TITLE_VOLUME_EG;
    this.acctTitle_Acct=this.AccountMaintainencData[0].CURR_TITLE_VOLUME_ACCT;
    this.acctAddr_Eg=this.AccountMaintainencData[0].CURR_ADDRESS_VOLUME_EG;
    this.acctAddr_Acct=this.AccountMaintainencData[0].CURR_ADDRESS_VOLUME_ACCT;

    this.webEnrollmentsData = WEData[0].ACTIVITY_DATA;
    this.nameScreeningData = CSSData[0].ACTIVITY_DATA;

    this.loadWebEnrollmentsWidget();
    this.loadCSSWidget();
  }
  public loadWebEnrollmentsWidget() {
    debugger;
    this.WebEnrollmentsBarChartData = [];
    var d = new Date(this.businessDate);
    var m = d.getMonth();
    for (let i = 0; i < 12; i++) {

      let webenrollmentKeyObj = { "month": this.getMonthArray[(m + i) % 12], "volume": "","valueOFMonth":(m + i) % 12 };
      this.WebEnrollmentsBarChartData.push(webenrollmentKeyObj);
    }
    this.WebEnrollmentsBarChartData[11].volume = this.webEnrollmentsData[0].MNTH_1_VOLUME;
    this.WebEnrollmentsBarChartData[10].volume = this.webEnrollmentsData[0].MNTH_2_VOLUME;
    this.WebEnrollmentsBarChartData[9].volume = this.webEnrollmentsData[0].MNTH_3_VOLUME;
    this.WebEnrollmentsBarChartData[8].volume = this.webEnrollmentsData[0].MNTH_4_VOLUME;
    this.WebEnrollmentsBarChartData[7].volume = this.webEnrollmentsData[0].MNTH_5_VOLUME;
    this.WebEnrollmentsBarChartData[6].volume = this.webEnrollmentsData[0].MNTH_6_VOLUME;
    this.WebEnrollmentsBarChartData[5].volume = this.webEnrollmentsData[0].MNTH_7_VOLUME;
    this.WebEnrollmentsBarChartData[4].volume = this.webEnrollmentsData[0].MNTH_8_VOLUME;
    this.WebEnrollmentsBarChartData[3].volume = this.webEnrollmentsData[0].MNTH_9_VOLUME;
    this.WebEnrollmentsBarChartData[2].volume = this.webEnrollmentsData[0].MNTH_10_VOLUME;
    this.WebEnrollmentsBarChartData[1].volume = this.webEnrollmentsData[0].MNTH_11_VOLUME;
    this.WebEnrollmentsBarChartData[0].volume = this.webEnrollmentsData[0].MNTH_12_VOLUME;
    console.log("web");
    console.log(this.WebEnrollmentsBarChartData);
  }

  public loadCSSWidget() {
    debugger;
    this.NameScreeningBarChartData = [];
    var d = new Date(this.businessDate);
    var m = d.getMonth();
    for (let i = 0; i < 12; i++) {

      let cssKeyObj = { "month": this.getMonthArray[(m + i) % 12], "volume": "" };
      this.NameScreeningBarChartData.push(cssKeyObj);
    }
    this.NameScreeningBarChartData[11].volume = this.nameScreeningData[0].MNTH_1_VOLUME;
    this.NameScreeningBarChartData[10].volume = this.nameScreeningData[0].MNTH_2_VOLUME;
    this.NameScreeningBarChartData[9].volume = this.nameScreeningData[0].MNTH_3_VOLUME;
    this.NameScreeningBarChartData[8].volume = this.nameScreeningData[0].MNTH_4_VOLUME;
    this.NameScreeningBarChartData[7].volume = this.nameScreeningData[0].MNTH_5_VOLUME;
    this.NameScreeningBarChartData[6].volume = this.nameScreeningData[0].MNTH_6_VOLUME;
    this.NameScreeningBarChartData[5].volume = this.nameScreeningData[0].MNTH_7_VOLUME;
    this.NameScreeningBarChartData[4].volume = this.nameScreeningData[0].MNTH_8_VOLUME;
    this.NameScreeningBarChartData[3].volume = this.nameScreeningData[0].MNTH_9_VOLUME;
    this.NameScreeningBarChartData[2].volume = this.nameScreeningData[0].MNTH_10_VOLUME;
    this.NameScreeningBarChartData[1].volume = this.nameScreeningData[0].MNTH_11_VOLUME;
    this.NameScreeningBarChartData[0].volume = this.nameScreeningData[0].MNTH_12_VOLUME;
    console.log("web");
  }
  public loadAOWidget() {
    debugger;
    this.volumebyProductFunction();
    //"ACCOUNT_TYPE" : "3"
    this.AccountOpeningLineChartData = [];
    this.AccountOpeningVolumeBarChartData = [];
    console.log(this.filteredData[0].DATA[0].ACTIVITY_DATA);
    let AO_widget_Data_inner = this.filteredData[0].DATA[0].ACTIVITY_DATA.filter(obj =>
      obj.CLIENT_TYPE_ID == this.defaultSelection.selectedUsers
    );
    var d = new Date(this.businessDate);
    var m = d.getMonth();
    console.log(AO_widget_Data_inner);
    this.AccountOpeningWidget_Model.CYCLE_TIME_LSLA_LM = AO_widget_Data_inner[0].PREV_PRD_LSLA_AVG;
    this.AccountOpeningWidget_Model.CYCLE_TIME_LSLA_CM = AO_widget_Data_inner[0].CURR_PRD_LSLA_AVG;
    this.AccountOpeningWidget_Model.CYCLE_TIME_LSLA_MOM = AO_widget_Data_inner[0].POP_LSLA;
    this.AccountOpeningWidget_Model.CYCLE_TIME_RQ = AO_widget_Data_inner[0].RQ_RATING_LSLA_CYCLE;
    this.AccountOpeningWidget_Model.CYCLE_TIME_YTD = AO_widget_Data_inner[0].YTD_LSLA_AVG;
    for (let i = 0; i < 12; i++) {

      let aoLineKeyObj = { "date": this.getMonthArray[(m + i) % 12], "close": "" };
      this.AccountOpeningLineChartData.push(aoLineKeyObj);
    }
    this.AccountOpeningLineChartData[11].close = AO_widget_Data_inner[0].ONE_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[10].close = AO_widget_Data_inner[0].TWO_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[9].close = AO_widget_Data_inner[0].THREE_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[8].close = AO_widget_Data_inner[0].FOUR_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[7].close = AO_widget_Data_inner[0].FIVE_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[6].close = AO_widget_Data_inner[0].SIX_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[5].close = AO_widget_Data_inner[0].SEVEN_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[4].close = AO_widget_Data_inner[0].EIGHT_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[3].close = AO_widget_Data_inner[0].NINE_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[2].close = AO_widget_Data_inner[0].TEN_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[1].close = AO_widget_Data_inner[0].ELEVEN_PRD_BEFORE_LSLA_AVG;
    this.AccountOpeningLineChartData[0].close = AO_widget_Data_inner[0].TWELVE_PRD_BEFORE_LSLA_AVG;
    console.log(this.AccountOpeningLineChartData);

    this.AccountOpeningWidget_Model.AO_VOL_LSLA_LM = AO_widget_Data_inner[0].PREV_PRD_VOLUME;
    this.AccountOpeningWidget_Model.AO_VOL_LSLA_CM = AO_widget_Data_inner[0].CURR_PRD_VOLUME;
    this.AccountOpeningWidget_Model.AO_VOL_LSLA_MOM = AO_widget_Data_inner[0].POP_VOLUME;
    this.AccountOpeningWidget_Model.AO_VOL_RQ = AO_widget_Data_inner[0].RQ_RATING_VOLUME;
    this.AccountOpeningWidget_Model.AO_VOL_YTD = AO_widget_Data_inner[0].YTD_VOLUME;
    for (let i = 0; i < 12; i++) {

      let aoVolumneKeyObj = { "month": this.getMonthArray[(m + i) % 12], "volume": "","valueOFMonth":(m + i) % 12 };
      this.AccountOpeningVolumeBarChartData.push(aoVolumneKeyObj);
    }
    this.AccountOpeningVolumeBarChartData[11].volume = AO_widget_Data_inner[0].ONE_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[10].volume = AO_widget_Data_inner[0].TWO_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[9].volume = AO_widget_Data_inner[0].THREE_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[8].volume = AO_widget_Data_inner[0].FOUR_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[7].volume = AO_widget_Data_inner[0].FIVE_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[6].volume = AO_widget_Data_inner[0].SIX_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[5].volume = AO_widget_Data_inner[0].SEVEN_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[4].volume = AO_widget_Data_inner[0].EIGHT_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[3].volume = AO_widget_Data_inner[0].NINE_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[2].volume = AO_widget_Data_inner[0].TEN_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[1].volume = AO_widget_Data_inner[0].ELEVEN_PRD_BEFORE_VOLUME;
    this.AccountOpeningVolumeBarChartData[0].volume = AO_widget_Data_inner[0].TWELVE_PRD_BEFORE_VOLUME;
    console.log(this.AccountOpeningVolumeBarChartData);
  }

  volumebyProductFunction() {
    this.isVolByProductFlag = true;
    this.VolumeByProductScaleChartData = [];
    var colorArray=["#ffffff","#3366cc","#7094db","#ff6600","#ff33cc","#66ff33","#ffccff","#ff0000","#ffff00","#990000","#666699","#cc9900"];
    this.volByProductfilteredData = this.onBoardData.RESPONSE_DATA.filter(obj =>
      obj.REGION == this.defaultSelection.REGION
    );
    console.log(this.VolumeByProductScaleChartData.length);
    this.volByProductfilteredData = this.volByProductfilteredData[0].FREQUENCY.filter(obj =>
      obj.NAME == this.defaultSelection.FREQUENCY
    );
 
    var ProductPieChartData = this.filterAndSideLinkData.PRODUCTS.map(item => {
      let volProduct = 0;
      this.volByProductfilteredData[0].PRODUCTS.forEach(elementProd => {

        if (elementProd.PRODUCT == item.VALUE) {
            elementProd.ACCOUNTTYPE.forEach(elementAcc => {
            if (elementAcc.TYPE == this.defaultSelection.ACCOUNT_TYPE) {
                elementAcc.DATA.forEach(elementData => {
                if (elementData.ACTIVITY_NAME == "ACCOUNT_OPENING") {
                  elementData.ACTIVITY_DATA.forEach(elementActivity => {
                  if (elementActivity.CLIENT_TYPE_ID == this.defaultSelection.selectedUsers) {
                  volProduct = volProduct + elementActivity.CURR_PRD_VOLUME;
                  }
                });
              }
            });
          }
        });
      }
      });
      return {Product : item.NAME, Color : "#ffffff", Value : volProduct, Perc : "0"}
    });
    var totVolumeProduct = ProductPieChartData.filter(obj =>
      obj.Product == 'All'
    );
      var totVolume= totVolumeProduct[0].Value;
      ProductPieChartData= ProductPieChartData.map((item,index) => {
        var volPerc = Math.round((item.Value * 100) / totVolume);
        return {Product : item.Product, Color : colorArray[index], Value : item.Value, Perc : volPerc}
      });
  this.VolumeByProductScaleChartData=ProductPieChartData.filter(obj =>
        obj.Product != 'All'
  );
    
  }
  public seletedType() {

  }

  toggleSelectedBox(newValue: string) {

    if (this.selectedBox === newValue) {

      this.selectedBox = "";
      this.acOpeningFlag = false;
      this.aocFlag = false;
      this.kycFlag = false;
      this.acMaintFlag = false;
      this.scanningDocsFlag = false;
      this.acMaintFlagcard = false;
      this.scanningDocsFlagcard = false;
      // nikhil
      this.webEnrollmentsFlag = false;
      this.nameScreeningFlag = false;
      this.webEnrollmentsFlagcard = false;
      this.nameScreeningFlagcard = false;
      this.onSelectFilter();
    }

    else {
      this.selectedBox = newValue;
      if (this.selectedBox == "acOpening") {
        this.kycFlag = true;
        this.acMaintFlag = true;
        this.scanningDocsFlag = true;
        this.aocFlag = true;
        this.acMaintFlagcard = true;
        this.scanningDocsFlagcard = true;
        //nikhil
        this.webEnrollmentsFlag = true;
        this.nameScreeningFlag = true;
        this.nameScreeningFlagcard = true;
      }

      if (this.selectedBox == "acMaint") {
        this.acOpeningFlag = true;
        this.acMaintFlag = true;
        this.scanningDocsFlag = true;
        this.aocFlag = true;
        this.scanningDocsFlagcard = true;
        //nikhil
        this.webEnrollmentsFlag = true;
        this.nameScreeningFlag = true;
        this.nameScreeningFlagcard = true;
      }

      if (this.selectedBox == "acMain") {
        this.acOpeningFlag = true;
        this.kycFlag = true;
        this.scanningDocsFlag = true;
        this.scanningDocsFlagcard = true;
        this.aocFlag = true;
        //nikhil
        this.webEnrollmentsFlag = true;
        this.nameScreeningFlag = true;
        this.nameScreeningFlagcard = true;
      }
      if (this.selectedBox == "scanningDocs") {
        // this.acOpeningFlag = true;
        // this.acMaintFlag = true;
        // this.kycFlag = true;
        // this.webEnrollmentsFlag=true;
        this.acOpeningFlag = true;
        this.aocFlag = true;
        this.nameScreeningFlagcard = true;
        this.kycFlag = true;
        this.nameScreeningFlag = true;
        //this.scanningDocsFlagcard = false;
        this.scanningDocsFlag = true;
        this.webEnrollmentsFlag = true;
        this.acMaintFlagcard = true;
      }

      //nikhil
      if (this.selectedBox == "webEnrollments") {
        this.acOpeningFlag = true;
        this.acMaintFlagcard = true;
        this.aocFlag = true;
        this.scanningDocsFlagcard = true;
        //nikhil
        this.kycFlag = true;
        this.nameScreeningFlag = true;
        this.scanningDocsFlag = true;
        this.nameScreeningFlagcard = true;
      }

      if (this.selectedBox == "nameScreening") {
        this.acOpeningFlag = true;
        this.acMaintFlag = true;
        this.aocFlag = true;
        this.acMaintFlagcard = true;
        this.scanningDocsFlagcard = true;
        //nikhil
        this.kycFlag = true;
        //this.webEnrollmentsFlag = true;
        this.webEnrollmentsFlagcard = true;
        this.scanningDocsFlag = true;
        //this.nameScreeningFlag=true;
      }
      if (this.selectedBox == "AOC") {
        this.acOpeningFlag = true;
        this.acMaintFlag = true;
        this.kycFlag = true;
        this.webEnrollmentsFlagcard = true;
        this.scanningDocsFlag = true;
        this.nameScreeningFlagcard = true;
        this.acMaintFlagcard = true;
        this.scanningDocsFlagcard = true;
        this.onSelectFilter();
      }
    }
  }

  public loadKycChart(kycData: any) {
    debugger;
    let Rework1_kycChartData = kycData.FST_CRF_SBMT_FST_CRF_APRV_AVG - kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG;
    let Rework2_kycChartData = kycData.LST_CRF_SBMT_LST_CRF_APRV_AVG - kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG;
    let LastApproval_kycChartData = kycData.LST_CRF_APRV_FST_AO_APRV_AVG - kycData.FST_AO_SBMT_FST_AO_APRV_AVG;
    let Rework3_kycChartData = kycData.FST_AO_SBMT_FST_AO_APRV_AVG - kycData.LST_AO_SBMT_FST_AO_APRV_AVG;
    let AccountSubmit_kycChartData = kycData.AO_APP_SBMSN_FST_AO_APRV_AVG - kycData.LST_AO_SBMT_FST_AO_APRV_AVG; 
    let Rework4_kycChartData = kycData.LST_CRF_APRV_LST_AO_APRV_AVG - kycData.LST_CRF_APRV_FST_AO_APRV_AVG;
    let firstQaApproveRej = kycData.FST_CRF_SBMT_FST_CRF_APRV_AVG - kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG + kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG;
    let firstQaApproveExcludeRej = kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG + kycData.LST_CRF_SBMT_LST_CRF_APRV_AVG - kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG + kycData.LST_CRF_APRV_FST_AO_APRV_AVG - kycData.FST_AO_SBMT_FST_AO_APRV_AVG;
    let firstSubAccApprov = kycData.CRF_CREATE_LST_AO_APRV_AVG - kycData.CRF_CREATE_FST_CRF_SBMT_AVG;
    
    if(kycData.CRF_CREATE_FST_CRF_SBMT_AVG<0) kycData.CRF_CREATE_FST_CRF_SBMT_AVG=0; 
    if(Rework1_kycChartData<0) Rework1_kycChartData=0;
    if(LastApproval_kycChartData<0) LastApproval_kycChartData=0;
    if(Rework2_kycChartData<0) Rework2_kycChartData=0;
    if(Rework3_kycChartData<0) Rework3_kycChartData=0;
    if(AccountSubmit_kycChartData<0) AccountSubmit_kycChartData=0;
    if(Rework4_kycChartData<0) Rework4_kycChartData=0;
    if(firstQaApproveRej<0) firstQaApproveRej=0;
    if(firstQaApproveExcludeRej<0) firstQaApproveExcludeRej=0;
    if(firstSubAccApprov<0) firstSubAccApprov=0;
    if(kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG<0) kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG=0;
    if(kycData.AO_APP_SBMSN_FST_AO_APRV_AVG<0) kycData.AO_APP_SBMSN_FST_AO_APRV_AVG=0;
    if(kycData.FST_CRF_SBMT_FST_CRF_APRV_AVG<0) kycData.FST_CRF_SBMT_FST_CRF_APRV_AVG=0;

    
    this.kycChartData = [
      {
        "CRF-Create to Submit": kycData.CRF_CREATE_FST_CRF_SBMT_AVG,
        "Rework 1": Rework1_kycChartData,
        "First QA Approval": kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG,
        "Rework 2": Rework2_kycChartData,
        "Last Approval": LastApproval_kycChartData,
        "Rework 3": Rework3_kycChartData, // Newly added
        "Account Submit": AccountSubmit_kycChartData,
        "Account Approve": kycData.AO_APP_SBMSN_FST_AO_APRV_AVG,
        "Rework 4": Rework4_kycChartData,
        "First QA Approval Including Rejects": 0,
        "First AO Submit Including Rejects": 0,
        "First Submit to A/C Approve": 0,
        "YRange": "Step1", "N": 18,
        "x-fast": 0
      },
      {
        "CRF-Create to Submit": 0, "Rework 1": 0, "First QA Approval": 0, "Rework 2": 0, "Last Approval": 0, "Account Submit": 0, "Rework 3": 0,
        "Rework 4": 0,
        "Account Approve": 0,
        "First QA Approval Including Rejects": firstQaApproveRej,
        "First AO Submit Including Rejects": 0,
        "First Submit to A/C Approve": 0,
        "YRange": "Step2", "N": 4, "x-fast": kycData.CRF_CREATE_FST_CRF_SBMT_AVG
      },
      {
        "CRF-Create to Submit": 0, "Rework 1": 0, "First QA Approval": 0, "Rework 2": 0, "Last Approval": 0, "Account Submit": 0, "Rework 3": 0, "Account Approve": 0,
        "Rework 4": 0,
        "First QA Approval Including Rejects": 0,
        "First AO Submit Including Rejects": firstQaApproveExcludeRej,
        "First Submit to A/C Approve": 0,
        "YRange": "Step3", "N": 9, "x-fast": kycData.FST_CRF_SBMT_FST_CRF_APRV_AVG - kycData.LST_CRF_SBMT_FST_CRF_APRV_AVG + kycData.CRF_CREATE_FST_CRF_SBMT_AVG
      },
      {
        "CRF-Create to Submit": 0, "Rework 1": 0, "First QA Approval": 0, "Rework 2": 0, "Last Approval": 0, "Account Submit": 0, "Rework 3": 0, "Account Approve": 0,
        "Rework 4": 0,
        "First QA Approval Including Rejects": 0, "First AO Submit Including Rejects": 0,
        "First Submit to A/C Approve": firstSubAccApprov,
        "YRange": "Step4", "N": 18, "x-fast": kycData.CRF_CREATE_FST_CRF_SBMT_AVG
      },
    ];
  }

  // Added function for Reload btn click event by RAJ on 03/12/2018
  public ClickbtnReload() {

    this.session.getFilters().subscribe((data) => {
      this.filterAndSideLinkData = data;
    });
    
    this.session.getOboardData().subscribe((data) => {
      this.onBoardData = data;
      this.onSelectFilter();
      this.isLoader = false;
    });
    
    this.session.getOnboardDmsData().subscribe((data) => {
      this.onBoardDmsData = data;
      this.onSelectFilterDms();
    });

    this.session.get_AM_WE_CSS_Data().subscribe((data) => {
      this.onBoard_AM_WE_CSS_Data = data;
      this.onSelectFilter_AM_WE_CSS();
      
    });

  }

  // Added function for Reset btn click event by RAJ on 03/12/2018
  public ClickbtnReset() {
  this.defaultSelection = { "REGION": "1", "FREQUENCY": "3", "PRODUCTS": "12", "ACCOUNT_TYPE": "1", "selectedUsers": "3" };
    this.onSelectFilter();
    this.onSelectFilterDms();
    this.onSelectFilter_AM_WE_CSS();
}
  public colorCalculator(col)
  {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(col);
    // Counting the perceptive luminance - human eye favors green color... 
    var a = 1 - (0.299 * parseInt(result[1], 16) + 0.587 * parseInt(result[2], 16) + 0.114 * parseInt(result[3], 16)) / 255;
    if (Math.abs(a) < 0.5)
        return "#000000"; // bright colors - black font
    else
        return "#ffffff"; // dark colors - white font
  }
  public absValue(val)
  {
    return Math.abs(val);
  }
//This is for Account Maintainenece Click
public accMaintTableDataClick(product)
  {
    var filterAccMaintData=[];
    var region="";var frequency="";var acctType="";
    filterAccMaintData = this.filterAndSideLinkData.REGION.filter(obj =>
      obj.VALUE == this.defaultSelection.REGION
    );
    region=filterAccMaintData[0].NAME;
    filterAccMaintData = this.filterAndSideLinkData.FREQUENCY.filter(obj =>
      obj.VALUE == this.defaultSelection.FREQUENCY
    );
    frequency=filterAccMaintData[0].NAME;
    filterAccMaintData = this.filterAndSideLinkData.ACCOUNT_TYPE.filter(obj =>
      obj.VALUE == this.defaultSelection.ACCOUNT_TYPE
    );
    acctType=filterAccMaintData[0].NAME;
    var countrows=0;
    this.dynColumnAcctMaint = [];
    if(product=="Banker")
    {
      countrows=6;
      this.dynColumnAcctMaint=[
        "Changed Date",
        "Rel Number",
        "User ID",
        "MARKET_RGN_CD",
        "Member Type",
        "Lead Banker Id"
      ];
    }
    else if(product=="Maint")
    {
      countrows=8;
      this.dynColumnAcctMaint=[
        "Acct Close Date",
        "Acct type Desc",
        "Acct Number",
        "Acct PP CD",
        "Control Id SEI",
        "PP",
        "MARKET_RGN_CD",
        "Member Type"
      ];
    }
    else if(product=="Mift")
    {
      countrows=6;
      this.dynColumnAcctMaint=[
        "Member Id",
        "MARKET_RGN_CD",
        "Member Type",
        "Lead Banker Id",
        "Checker Id",
        "Checker Date"
      ];
    }
    else if(product=="Title_EG" || product=="Title_Acct")
    {
      countrows=6;
      this.dynColumnAcctMaint=[
        "ACTN_Date",
        "Maker Id",
        "EG#",
        "MARKET_RGN_CD",
        "Member Type",
        "Lead Banker Id"
      ];
    }
    else if(product=="Address_EG" || product=="Address_Acct")
    {
      countrows=8;
      this.dynColumnAcctMaint=[
        "Maker Date",
        "Maker Id",
        "EG#",
        "MARKET_RGN_CD",
        "Member Type",
        "Lead Banker Id",
        "Checker Date",
        "Checker Id"
    
      ];
    }
    this.session.getAcctMaintData().subscribe((data) => {
      console.log(data);
      this.accMaintData = data;
      this.acctMaintDatatableComponent.setup(this.accMaintData,this.dynColumnAcctMaint,countrows);
    });
    
  }
  public xlsAcctMaint() {
        // this.accMaintDataDownload = JSON.parse(JSON.stringify(this.accMaintData));
        this.excelService.exportAsExcelFile(this.accMaintData, 'AccountMaintainence');
    }
      //This will handle the chart click event
  public wechartClicked(month:any)
  {
      var region="";
      this.filterAndSideLinkData.REGION.forEach(element => {
        if (element.VALUE == this.defaultSelection.REGION) {
          region= element.NAME;
        }
      });

      var accountType="";
      this.filterAndSideLinkData.ACCOUNT_TYPE.forEach(element => {
        if (element.VALUE == this.defaultSelection.ACCOUNT_TYPE) {
          accountType= element.NAME.charAt(0);
        }
      });

      var value = {"REGION_ID":region,"ACCOUNT_TYPE_ID":accountType,"MONTH":month};
      console.log(value);
      this.session.getWebEnrollData(value).subscribe((data) => {
       this.webEnrolDatatableData = data;
       this.chartDatatableComponent.setup(this.webEnrolDatatableData);
        }, (err) => {
          console.log(err);
        });

      }
      public aoChartClicked(month:any){
      }
          public xlsTrade() {
            console.log("here")
            console.log(this.webEnrolDatatableData);
            this.excelService.exportAsExcelFile(this.webEnrolDatatableData, 'Web_Enrollment_Data');
          }
      public acctMaintRQBGColor(RQVal)
      {
          if(RQVal==0 || RQVal==1 || RQVal==2)
          return 'green';
          else if(RQVal==3 || RQVal==4)
          return 'yellow';
          else if(RQVal==5)
          return 'red';
          else
          return 'normal';
      }
      public acctMaintRQFontColor(RQVal)
      {
          if(RQVal==3 || RQVal==4)
          return 'black';
          else
          return 'white';
      }
}


    