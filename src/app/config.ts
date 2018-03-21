export const config = {
    title: "Config File",
    apiCallTypeIsPost: false,
    settlementCalls : {
      // "EntitlementService":"../assets/js/OpstechEntitlementJson.json",
      // "EntitlementServicePost":"../service/Opstech/UserDetails",
      "EntitlementService":"../assets/js/OpstechEntitlementJson.json",
      "EntitlementServicePost":"../service/HybridEntitlement/Entitlements",
      "GetTradeDetailService":"../assets/js/JSON_Trade_Details.json",
      "GetTradeDetailServicePost":"../service/TradeData/tradeDetails",
      "GetAuditDetailsServicePost":"../service/Opstech/commentHistory",
      "GetAuditDetailsService":"../assets/js/audit.json",
      "UpdateCommentService":"../assets/js/JSON_Trade_Details.json",
      "UpdateCommentServicePost":"../service/Opstech/updateComments",
      "feedStatusService":"../assets/js/JSON_Trade_Details.json",
      "feedStatusServicePost":"../service/Opstech/feedStatus",
      "UpdatePrefService":"../assets/js/JSON_Trade_Details.json",
      "UpdatePrefServicePost":"../service/Opstech/updatePreference",
      "SnapshotService":"../assets/js/snapshot.json",
      "SnapshotServicePost":"../service/Opstech/snapshot",
      "getColorCodeService":"../assets/js/ColorCode.json",
      "getColorCodePost":"../service/Opstech/ColorCode"
    },
    OnboardingCalls : {
      // "OnboardEntitlementService":"../assets/js/EntitlementJSON_onboard.json",
      // "OnboardEntitlementServicePost":"../service/OBEntitlement/UserDetails", 
      "OnboardEntitlementService":"../assets/js/OpstechEntitlementJson.json",
      "OnboardEntitlementServicePost":"../service/HybridEntitlement/Entitlements", 
      "GetFiltersJsonUrl":"../assets/js/Filters.json",
      "GetFiltersPostUrl" : "../service/Onboarding/masterData",
      "GetOnboardJsonUrl":"../assets/js/Onboarding_Data.json",
      "GetOnboardPostUrl" : "../service/Onboarding/AccountOpening",
	    "GetOnboardDMSJsonUrl":"../assets/js/Onboarding_Dms_Data.json",
      "GetOnboardDMSPostUrl" : "../service/Onboarding/DMSData",
      "get_AM_WE_CSS_Json_Url" : "../assets/js/MAINT_WEB_CSS.json",
      "get_AM_WE_CSS_Post_Url" : "../service/Onboarding/AcctMaint",
      "getAcctMaintData_Json_Url" : "../assets/js/AcctMaint.json",
      "getAcctMaintData_Post_Url" : "",
      "getWebEnrollTableUrl" : "../assets/js/WebEnrollJSON.json",
      "getWebEnrollTablePostUrl" : "../service/Onboarding/WEHist",
      "getAOVTableUrl" : "../assets/js/Acctop.json",
      "getAOVTablePostUrl" : "../service/Onboarding/"
    }
    
  };

  export var  userEntitlement = {};
  export var tradeDetails = [];
  export var feedStatus = [];
