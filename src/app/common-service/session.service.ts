import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class SessionService {  
  userEntitlement = {};
  constructor(private http: HttpClient) { }
  getEntitlement(): Observable <any>{
    console.log("API NAME - getEntitlement()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.EntitlementServicePost, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.EntitlementService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }

  getTradeDetails(): Observable <any>{
    console.log("API NAME - getTradeDetails()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.GetTradeDetailServicePost, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.GetTradeDetailService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  getSnapshotDetails(inputJson:any): Observable <any>{
    console.log("API NAME - getSnapshotDetails()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.SnapshotServicePost, inputJson).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.SnapshotService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  getAuditTrail(key:any): Observable <any>{
    console.log("API NAME - getAuditTrail()");
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.GetAuditDetailsServicePost, {"SURROGATEKEY": key}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.GetAuditDetailsService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  updateComments(surroKey:any, commentValue: string): Observable <any>{
    //debugger;
    console.log("API NAME - updateComments(surrogateKey:any, comment: string)");
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.UpdateCommentServicePost, {"surrogateKey": surroKey, "comments": commentValue}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.UpdateCommentService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  getFeedStatus(): Observable <any>{
    console.log("API NAME - getFeedStatus()");
    if(config.apiCallTypeIsPost)
    {debugger;
      return this.http.post(config.settlementCalls.feedStatusServicePost, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.feedStatusService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }

  updatePref(value:any): Observable <any>{
    //debugger;
    console.log(value);
    console.log("API NAME - updatePref(value:any)");
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.UpdatePrefServicePost, value).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.UpdatePrefService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }

  // Get Snapshot Data Service
  getSnapshotData(inputJson:any): Observable <any>{
    //debugger;
    console.log("API NAME - getSnapshotData(value:any)");
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.SnapshotServicePost, inputJson).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.SnapshotService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }

  // Get ColorCode Data Service
  getColorCodeData(): Observable <any>{
    //debugger;
    console.log("API NAME - getSnapshotData(value:any)");
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.settlementCalls.getColorCodePost, "").map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.settlementCalls.getColorCodeService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }

  // Onboarding Dashboard Calls Start here -----
  getFilters(): Observable <any>{
    console.log("API NAME - getTradeDetails()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.GetFiltersPostUrl, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.GetFiltersJsonUrl).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
       });
     }
  }

  getOboardData(): Observable <any>{
    console.log("API NAME - getOboardData()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.GetOnboardPostUrl, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.GetOnboardJsonUrl).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
	getOnboardDmsData(): Observable <any>{
    console.log("API NAME - getOnboardDmsData()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.GetOnboardDMSPostUrl, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.GetOnboardDMSJsonUrl).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  get_AM_WE_CSS_Data(): Observable <any>{
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.get_AM_WE_CSS_Post_Url, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.get_AM_WE_CSS_Json_Url).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }

  getOnboardEntitlement(): Observable <any>{
    console.log("API NAME - getEntitlement()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.OnboardEntitlementServicePost, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.OnboardEntitlementService).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  getAcctMaintData(): Observable <any>{
    console.log("API NAME - getAcctMaintData()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.getAcctMaintData_Json_Url, {}).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.getAcctMaintData_Json_Url).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
  //Web Enrollment data
  getWebEnrollData(data): Observable <any>{
    console.log("API NAME - getWebEnrollData()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.getWebEnrollTablePostUrl, data).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.getWebEnrollTableUrl).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
   //AOV  data
   getAOVData(data): Observable <any>{
    console.log("API NAME - getAOVData()" );
    if(config.apiCallTypeIsPost)
    {
      return this.http.post(config.OnboardingCalls.getAOVTablePostUrl, data).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
    else
    {
      return this.http.get(config.OnboardingCalls.getAOVTableUrl).map(response => response)
      .catch((err: Response|any)=>{
        return Observable.throw(err.statusText);
      });
    }
  }
}
