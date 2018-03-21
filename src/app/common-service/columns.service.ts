import { Injectable } from '@angular/core';

@Injectable()
export class ColumnsService {

  constructor() { }

  getFormattedJSON(type, jsonDATA: any) {
    var finalData: any;
    
    //console.log("columnsService");
    if (type == 'MF Offshore RF/DF Failed' || type == 'MF Onshore RF/DF Failed') {
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          "Trade Id": o.TRADE_ID,
          "Account Number": o.ACCOUNT_NUMBER,
          "Account Name": o.ACCOUNT_SHORT_NAME,
          "Trade Date": o.TRADE_DATE,
          "Contractual Settlement Date": o.TRADE_SETTLE_DATE,
          "CUSIP": o.CUSIP,
          "ISIN": o.ISIN,
          "Asset Short Name": o.ASSET_SHORT_NAME,
          "Trade Type": o.TRADE_TYPE,
          "Original Amount": this.parsevalue(o.ORIGINAL_AMOUNT),
          "Shares": o.SHARES,
          "Net Trade Amount": this.parsevalue(o.NET_TRADE_AMOUNT),
          "Price": o.PRICE,
          "Principal Amount": o.PRINCIPAL,
          "Trade Status": o.DASHBOARD_STATUS,
          "Registration": o.REGISTRATION,
          "Location": o.LOCATION,
          "Settlement Location": o.SETTLEMENT_LOCATION,
          "Settlement Currency": o.SETTLEMENT_CURRENCY,
          "Explanation": o.EXPLANATION,
          "Hold Date": o.HOLD_DATE,
          "Hold Date Open": o.HOLD_DATE_OPEN,
          "Processing Date": o.PROCESSING_DATE,
          "Reversed?": o.REVERSED,
          "Accrued Interest Amount": this.parsevalue(o.ACCURED_INTEREST_AMT),
          "Net + AI Amount": this.parsevalue(o.NET_PLUS_AI_AMOUNT),
          "Block Indicator": o.BLOCK_INDICATOR,
          "Clearing Broker": o.CLEARING_BROKER,
          "Executing Broker": o.EXECUTING_BROKER,
          "Account Administrator": o.ADMINISTRATOR,
          "Backup Investment Officer": o.BACKUP_INVESTMENT_OFFICER,
          "Broker Amount": this.parsevalue(o.BROKER_AMOUNT),
          "Confirm File Date": o.CONFIRM_FILE_DATE,
          "Confirm Trade Id": o.CONFIRM_TRADE_ID,
          "Create User": o.CREATED_BY,
          "Last Modified Date": o.LAST_MODIFIED_DATE,
          "Last Modified User": o.LAST_MODIFIED_USER,
          "Maturity Date": o.MATURITY_DATE,
          "Optional Fee 1 Amount": this.parsevalue(o.OPTIONAL_FEE_1_AMOUNT),
          "Optional Fee 2 Amount": this.parsevalue(o.OPTIONAL_FEE_2_AMOUNT),
          "SEC Fee Amount": o.SEC_FEE,
          "Corporate Action Event Type": o.CORPORATE_ACTION_EVENT_TYPE,
          "Line of Business": o.LINE_OF_BUSINESS,
          "Comments": o.COMMENTS,
          "Comments logged by SOEID": o.COMMENTS_LOGGED_BY_SOEID
        };
      });
    }
    else if (type == 'Global Pending') {
      
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          "TRADEID": o.TRADE_ID,
          "SWIFT SEME": o.SWIFT_SEME,
          "Trade Date": o.TRADE_DATE,
          "Contractual Settlement Date": o.TRADE_SETTLE_DATE,
          "Trade Status": o.STATUS_MESSAGE,
          "Trade Type": o.TRADE_TYPE,
          "Account Number": o.ACCOUNT_NUMBER,
          'Account Name': o.ACCOUNT_SHORT_NAME,
          "ISIN": o.ISIN,
          "CUSIP": o.CUSIP,
          "Shares": this.parsevalue(o.SHARES),
          "Principal Amount": this.parsevalue(o.PRINCIPAL),
          "Net + AI Amount": this.parsevalue(o.NET_PLUS_AI_AMOUNT),
          "Settlement Currency": o.SETTLEMENT_CURRENCY,
          "Price": o.PRICE,
          "Settlement Location": o.SETTLEMENT_LOCATION,
          "Clearing Broker": o.CLEARING_BROKER,
          "Executing Broker": o.EXECUTING_BROKER,
          "Registration": o.REGISTRATION,
          "Location": o.LOCATION,
          "Account Administrator": o.ADMINISTRATOR,
          "Backup Investment Officer": o.BACKUP_INVESTMENT_OFFICER,
          "Line of Business": o.LINE_OF_BUSINESS,
          "Last Modified User": o.LAST_MODIFIED_USER,
          "CREATED BY": o.CREATED_BY,
          "Processing Date": o.PROCESSING_DATE,
          "Hold Date Open": o.HOLD_DATE_OPEN,
          "Hold Date": o.HOLD_DATE,
          };
      });
    }
    else if (type == 'Global Incomplete'){
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          'Accrued Interest Amount':  this.parsevalue(o.ACCURED_INTEREST_AMT),
          'Account Administrator': o.ADMINISTRATOR,
          'Account Number': o.ACCOUNT_NUMBER,
          'Backup Investment Officer': o.BACKUP_INVESTMENT_OFFICER,
          'Broker Amount': this.parsevalue(o.BROKER_AMOUNT),
          'Clearing Broker': o.CLEARING_BROKER,
          'Created By': o.CREATED_BY,
          'Settlement Location': o.DASHBOARD_LOCATION,
          'DTC Eligible': o.DTC_ELIGIBLE,
          'Custodian Trade Status': o.DASHBOARD_STATUS,
          'Trade Type': o.DASHBOARD_TRADE_TYPE,
          'Executing Broker': o.EXECUTING_BROKER,
          'ISIN': o.ISIN,
          'Line of Business': o.LINE_OF_BUSINESS,
          'Net Trade Amount':  this.parsevalue(o.NET_TRADE_AMOUNT),
          'Price':  this.parsevalue(o.PRICE),
          'Principal Amount':  this.parsevalue(o.PRINCIPAL),
          'Trade #': o.TRADE_ID,
          'Trade Date': o.TRADE_DATE,
          'Original Face': o.ORIGINAL_FACE,
          'Shares': o.SHARES,
          'SOFT_VALIDATION_MESSAGES': o.SOFT_VALIDATION_MESSAGES,
          'Stamp Duty': o.STAMP_DUTY,
          'Stamp Duty Code': o.STAMP_DUTY_CODE,
          '548 Reason': o.REASON_548,
          'Receiver': o.RECEIVER,
          'Receiver BIC': o.RECEIVER_BIC,
          'Sedol': o.SEDOL,
          'Sender': o.SENDER,
          'Sender BIC': o.SENDER_BIC,
          '548 Status': o.STATUS_548,
          'Settle Date': o.TRADE_SETTLE_DATE,
          'Executing Broker Account Number': o.EXECUTING_BROKER_ACCT_NUMBER,
          'HARD_VALIDATION_MESSAGES': o.HARD_VALIDATION_MESSAGES,
          'Message Type': o.MESSAGE_TYPE,
          'Custody Account': o.CUSTODY_ACCOUNT,
          'Clearing Broker Account Number': o.CLEARING_BROKER_ACCOUNT_NUMBER,
          //'SEME Ref #': o.SWIFT_SEME
          'SWIFT Ref #': o.SWIFTREF
          // "Matched?": '',
          // "Block Indicator": o.BLOCK_INDICATOR,
          // "Trade #": o.uniqueTradeKey,
          // "Internal Confirm #": '',
          // "DTC Confirm #": '',
          // "SWIFT SEME": o.SWIFT_SEME,
          // "Status": o.TRADE_STATUS,
          // "Trade Type": o.TRADE_TYPE,
          // "Logged By": '',
          // "Quantity": o.QUANTITY,
          // "Asset": '',
          // "Account": '',
          // "Administrator": o.ADMINISTRATOR,
          // "Registration": o.REGISTRATION,
          // "Location": o.LOCATION,
          // "Price": o.PRICE,
          // "Principal": o.PRINCIPAL,
          // "Net": '',
          // "Accrued Interest Amount": '',
          // "Net + AI": '',
          // "Brokerage": '',
          // "SEC Fee": o.SEC_FEE,
          // "P I Amount": '',
          // "Original Face": o.ORIGINAL_FACE,
          // "Trade Date": o.TRADE_DATE,
          // "Settle Date": o.TRADE_SETTLE_DATE,
          // "Posted Date": '',
          // "Actual Settlement Date": '',
          // "Cancel Date": '',
          // "Hold Date": '',
          // "Hold Date Open": '',
          // "Swift Eligible": '',
          // "Stamp Duty Code": o.STAMP_DUTY_CODE,
          // "Settlement Location": o.SETTLEMENT_LOCATION,
          // "Settlement Currency": o.SETTLEMENT_CURRENCY,
          // "Executing Broker": '',
          // "Clearing Broker": '',
          // "Affirm Type": '',
          // "Timestamp Entered": '',
          // "Source": o.SOURCE,
          // "Asset Type": o.ASSET_TYPE,
          // "Status Message": o.STATUS_MESSAGE
        };
      });
    }
    else if (type == 'Global Failed') {
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          "Account ID": o.CDS_ACCOUNT_ID,
          "Account Number": o.ACCOUNT_NUMBER,
          "Investment Officer": o.BACKUP_INVESTMENT_OFFICER,
          "Administrator": o.ADMINISTRATOR,
          "Line Of Business": o.LINE_OF_BUSINESS,
          "Trade Date": o.TRADE_DATE,
          "CSD": o.TRADE_SETTLE_DATE,
          "Txn Type": o.CDS_TXN_TYPE,
          "Quantity": o.QUANTITY,
          "ISIN": o.ISIN,
          "Issue Name": o.CDS_ISSUE_NAME,
          "CCY": o.CDS_CCY,
          "Settlement Amount": this.parsevalue(o.CDS_SETTLEMENT_AMOUNT),
          "Client Reference": o.CDS_CLIENT_REF_NO,
          "Citi Reference": o.CDS_CITI_REF_NO,
          "Settlement Location": o.SETTLEMENT_LOCATION,
          "Counterparty": o.CDS_COUNTERPARTY,
          "Fail Description": o.CDS_FAILED_DESCRIPTION,
          "Comments": o.COMMENTS,
          "Fail Text": o.FAILED_REASON
          //"Fail Text(Contd.)": o.FAILTEXT_CONTD
        };
      });
    }else if (type == 'Domestic Purchase/Sell Failed' || type == "Domestic RF/DF Failed") {
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          'Accrued Interest Amount': this.parsevalue(o.ACCURED_INTEREST_AMT),
          'Account Administrator': o.ADMINISTRATOR,
          'Account Number': o.ACCOUNT_NUMBER,
          'Backup Investment Officer': o.BACKUP_INVESTMENT_OFFICER,
          'Block Indicator': o.BLOCK_INDICATOR,
          'Broker Amount': this.parsevalue(o.BROKER_AMOUNT),
          'Clearing Broker': o.CLEARING_BROKER,
          'Confirm File Date': o.CONFIRM_FILE_DATE,
          'Confirm Trade Id': o.CONFIRM_TRADE_ID,
          'Corporate Action Event Type': o.CORPORATE_ACTION_EVENT_TYPE,
          'Created By': o.CREATED_BY,
          'Settlement Location': o.DASHBOARD_LOCATION,
          'Trade Status': o.DASHBOARD_STATUS,
          'Trade Type': o.DASHBOARD_TRADE_TYPE,
          'Executing Broker': o.EXECUTING_BROKER,
          'Explanation': o.EXPLANATION,
          'Hold Date': o.HOLD_DATE,
          'Hold Date Open': o.HOLD_DATE_OPEN,
          'ISIN': o.ISIN,
          'Last Modified Date': o.MODIFICATION_DATE,
          'Last Modified User': o.MODIFIED_BY,
          'Line of Business': o.LINE_OF_BUSINESS,
          'Location': o.LOCATION,
          'Maturity Date': o.MATURITY_DATE,
          'Net + AI Amount': this.parsevalue(o.USD_EQUIVALENT),
          'Optional Fee 1 Amount': this.parsevalue(o.OPTIONAL_FEE_1_AMOUNT),
          'Optional Fee 2 Amount': this.parsevalue(o.OPTIONAL_FEE_2_AMOUNT),
          'Price': o.PRICE,
          'Principal Amount': this.parsevalue(o.PRINCIPAL),
          'Processing Date': o.PROCESSING_DATE,
          'Registration': o.REGISTRATION,
          'SEC Fee Amount': this.parsevalue(o.SEC_FEE),
          'Settlement Currency' : o.SETTLEMENT_CURRENCY,
          'Trade #': o.TRADE_ID,
          'Trade Date':o.TRADE_DATE,
          'CUSIP': o.CUSIP,
          'Asset Short Name': o.ASSET_SHORT_NAME,
          'Shares':this.parsevalue(o.SHARES),
          'Contractual Settlement Date': o.TRADE_SETTLE_DATE,
          'Reversed?': o.REVERSED,
          'Original Amount': this.parsevalue(o.ORIGINAL_AMOUNT),
          'Net Trade Amount' : this.parsevalue(o.NET_TRADE_AMOUNT)
        };
      });
    }else if (type == 'Domestic Incomplete (Confirm)') {
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          'Accrued Interest Amount': this.parsevalue(o.ACCURED_INTEREST_AMT),
          'Account Administrator': o.ADMINISTRATOR,
          'Broker Amount': this.parsevalue(o.BROKER_AMOUNT),
          'Clearing Broker': o.CLEARING_BROKER,
          'Created By': o.CREATED_BY,
          'Create Date': o.CREATE_DATE,
          'Settlement Location': o.DASHBOARD_LOCATION,
          'Trade Status': o.DASHBOARD_STATUS,
          'Trade Type': o.DASHBOARD_TRADE_TYPE,
          'Executing Broker': o.EXECUTING_BROKER,
          'Last Modified Date': o.MODIFICATION_DATE,
          'Last Modified User': o.MODIFIED_BY,
          'Net + AI Amount': this.parsevalue(o.USD_EQUIVALENT),
          'Price': o.PRICE,
          'Principal Amount': this.parsevalue(o.PRINCIPAL),
          'SWIFT SEME': o.SWIFT_SEME,
          'Trade #': o.TRADE_ID,
          'Trade Date': o.TRADE_DATE,
          'CUSIP': o.CUSIP,
          'Affirm Date': o.AFFIRM_DATE,
          'Affirm Type': o.AFFIRM_TYPE,
          'Affirmed By': o.AFFIRMED_BY,
          'Agent FINS': o.AGENT_FINS,
          'Asset Short Name': o.ASSET_SHORT_NAME,
          'Asset Type': o.ASSET_TYPE,
          'Interested Party 1': o.INTERESTED_PARTY_1,
          'Interested Party 2': o.INTERESTED_PARTY_2,
          'Institution Id': o.INSTITUTION_ID,
          'Institution Name': o.INSTITUTION_NAME,
          'DTC Confirm #': o.DTC_CONFIRM,
          'DTC Eligible': o.DTC_ELIGIBLE,
          'Exchange': o.EXCHANGE,
          'Optional Fee': o.OPTIONAL_FEE,
          'Original Face': o.ORIGINAL_FACE,
          'P I Amount': this.parsevalue(o.PI_AMOUNT),
          'Shares': this.parsevalue(o.SHARES),
          'SOFT_VALIDATION_MESSAGES': o.SOFT_VALIDATION_MESSAGES,
          'Contractual Settlement Date': o.TRADE_SETTLE_DATE,
          'HARD_VALIDATION_MESSAGES': o.HARD_VALIDATION_MESSAGES,
          'Internal Confirm #': o.INTERNAL_CONFIRM,
          'Net Trade Amount': this.parsevalue(o.NET_TRADE_AMOUNT),
          'Custodian Trade Status': o.CUSTODIAN_TRADE_STATUS,
          'Custody Account': o.CUSTODY_ACCOUNT,
          'Clrng Broker DTC Id': o.CLRNG_BROKER_DTC_ID,
          'Exec Broker DTC Id': o.EXEC_BROKER_DTC_ID,
          'Federal Tax Cost Amount': this.parsevalue(o.FEDERAL_TAX_COST_AMOUNT),
          'File Timestamp': o.FILE_TIMESTAMP,
          'State Tax Cost Amount': this.parsevalue(o.STATE_TAX_COST_AMOUNT),
          'Special Instruction': o.SPECIAL_INSTRUCTION,
          'Broker Account': this.parsevalue(o.BROKER_ACCOUNT),
          'Trade Instruction': o.TRADE_INSTRUCTION,
          'Source': o.SOURCE
        };
      });
    } else if (type == 'Domestic Incomplete (Swift)') {
      finalData = jsonDATA.map(o => {
        return {
          'RQ Rating': o.RQ_RATING,
          'Ageing': o.AGEING,
          'Accrued Interest Amount': this.parsevalue(o.ACCURED_INTEREST_AMT),
          'Account Administrator': o.ADMINISTRATOR,
          'Account Number': o.ACCOUNT_NUMBER,
          'Broker Amount': this.parsevalue(o.BROKER_AMOUNT),
          'Clearing Broker': o.CLEARING_BROKER,
          'Created By': o.CREATED_BY,
          'Create Date': o.CREATE_DATE,
          'Settlement Location': o.DASHBOARD_LOCATION,
          'Trade Status': o.DASHBOARD_STATUS,
          'Trade Type': o.DASHBOARD_TRADE_TYPE,
          'Executing Broker': o.EXECUTING_BROKER,
          'ISIN': o.ISIN,
          'Last Modified Date': o.MODIFICATION_DATE,
          'Last Modified User': o.MODIFIED_BY,
          'Net + AI Amount': this.parsevalue(o.USD_EQUIVALENT),
          'Price': o.PRICE,
          'Principal Amount': this.parsevalue(o.PRINCIPAL),
          'Settlement Currency': o.SETTLEMENT_CURRENCY,
          'Trade #': o.TRADE_ID,
          'Trade Date': o.TRADE_DATE,
          'CUSIP': o.CUSIP,
          'Affirm Type': o.AFFIRM_TYPE,
          'Asset Short Name': o.ASSET_SHORT_NAME,
          'Asset Type': o.ASSET_TYPE,
          'DTC Confirm #': o.DTC_CONFIRM,
          'DTC Eligible': o.DTC_ELIGIBLE,
          'Exchange': o.EXCHANGE,
          'Original Face': o.ORIGINAL_FACE,
          'Shares': this.parsevalue(o.SHARES),
          'SOFT_VALIDATION_MESSAGES': o.SOFT_VALIDATION_MESSAGES,
          'Stamp Duty': o.STAMP_DUTY,
          'Stamp Duty Code': o.STAMP_DUTY_CODE,
          '548 Reason': o.REASON_548,
          'Receiver': o.RECEIVER,
          'Receiver BIC': o.RECEIVER_BIC,
          'Sedol': o.SEDOL,
          'Sender': o.SENDER,
          'Sender BIC': o.SENDER_BIC,
          '548 Status': o.STATUS_548,
          'Ticker': o.TICKER,
          'Contractual Settlement Date': o.TRADE_SETTLE_DATE,
          'Executing Broker Account Number': o.EXECUTING_BROKER_ACCT_NUMBER,
          'Executing Broker Market Id': o.EXECUTING_BROKER_MARKET_ID,
          'Executing Broker Tag Type': o.EXECUTING_BROKER_TAG_TYPE,
          'FX Currency to Buy/Sell': o.FX_CURRENCY_TO_BUY_SELL,
          'HARD_VALIDATION_MESSAGES': o.HARD_VALIDATION_MESSAGES,
          'Input Date': o.INPUT_DATE,
          'Input/Output Indicator': o.INPUT_OUTPUT_INDICATOR,
          'Internal Confirm #': o.INTERNAL_CONFIRM,
          'Message Type': o.MESSAGE_TYPE,
          'Custodian Trade Status': o.CUSTODIAN_TRADE_STATUS,
          'Custody Account': o.CUSTODY_ACCOUNT,
          'Block Pool #': o.BLOCK_POOL_NO,
          'Clearing Broker Account Number': o.CLEARING_BROKER_ACCOUNT_NUMBER,
          'Clearing Broker Market Id': o.CLEARING_BROKER_MARKET_ID,
          'Clearing Broker Tag Type': o.CLEARING_BROKER_TAG_TYPE,
          'SWIFT Ref #': o.SWIFTREF,
          'Source': o.SOURCE

        };
      });
    }  
    else{
      
      finalData=jsonDATA;
    }
    //console.log(finalData);
    //Test
  // finalData = JSON.parse(JSON.stringify(finalData));
  //   for (var i = 0; i < finalData.length; i++) {
  //     delete finalData[i].Ageing;
  //     delete finalData[i]['RQ Rating'];
  //   }
    return finalData;
  }
  
  public parsevalue(val) {
    
    var v=val+""; 
    v=v.replace(/,/g , "");
    var myValue = v.split(".");
    let retunValue ="" ;
    if(myValue[0] != undefined && myValue[0] != ""){
      retunValue = parseFloat(myValue[0]).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if(myValue[1] != undefined && myValue[1] != ""){
      retunValue = retunValue+"."+myValue[1];
    }else{
      retunValue = retunValue;
    }

    if(retunValue == 'NaN')
      return v;
    else
      return retunValue;
  }
      //   let retunValue = parseFloat(v).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //   if(retunValue == 'NaN')
      //     return v;
      //   else
      //     return retunValue;
      // }
}
