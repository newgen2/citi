
import {Component, OnInit} from "@angular/core";
import { SessionService } from './common-service/session.service';
import {Router} from '@angular/router';
import { AuthGuard }from './common-service/auth-guard.service';
import { AppSidebarNavComponent } from './components/app-sidebar-nav/app-sidebar-nav.component'
import { AppHeaderComponent } from 'app/components/app-header';
import { UserIdleService } from './IdleTimeFiles';
import { onboardingDashboardComponent } from 'app/views/onboardingDashboard/onboardingDashboard.component'
import { settlementDashboardComponent } from 'app/views/settlementDashboard/settlementDashboard.component'

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
  
})
export class AppComponent implements OnInit{
  public defaultModuleComponent : any = { "ONBOARDING_DASHBOARD" : ["onboardingDashboard"] , "SETTLEMENT_DASHBOARD" : ["settlementDashboard"]};
  public iconsArray = {"Dashboard_icon" : "icon-pie-chart", "Maintenance_icon" : "icon-star", "Snapshots_icon" : "icon-chart"};
  public DefaultNavigation : any = [];
  public sidebarNavigationBar:any = [{ title: true, name: 'Quick Links'}];
  public OPSTECH_PROFILE_MENU_ENTITLEMENTS:any  = [];
  public timeout = 600;
  public headerTitle:string = "";
  constructor(private userIdle: UserIdleService, private session: SessionService,private guard:AuthGuard,private router:Router) { }
  
  
    ngOnInit(): void {
      debugger;
     this.session.getOnboardEntitlement().subscribe((data) => {
        this.DefaultNavigation =  (data.MENU_ENTITLEMENTS.setlDashboard == 1 && data.MENU_ENTITLEMENTS.onboardDashboard == 1) ? this.defaultModuleComponent.SETTLEMENT_DASHBOARD :  (data.MENU_ENTITLEMENTS.onboardDashboard == 1) ? this.defaultModuleComponent.ONBOARDING_DASHBOARD : (data.MENU_ENTITLEMENTS.setlDashboard == 1 ) ?  this.defaultModuleComponent.SETTLEMENT_DASHBOARD : []; 
        
        
          this.OPSTECH_PROFILE_MENU_ENTITLEMENTS = [
            {"MENU_ID" : "DASHBOARD", "MENU_NAME" : "Dashboard", "SUBMENU" : [
            {"SUBMENU_ID" : "SETTLEMENT_DASHBOARD", "SUBMENU_NAME" : "Settlement Dashboard", "ACCESS_VALUE" : data.MENU_ENTITLEMENTS.setlDashboard},
            {"SUBMENU_ID" : "ONBOARDING_DASHBOARD", "SUBMENU_NAME" : "Onboarding Dashboard", "ACCESS_VALUE" : data.MENU_ENTITLEMENTS.onboardDashboard}
            ]
          },
          {"MENU_ID" : "MAINTENANCE", "MENU_NAME" : "Maintenance", "SUBMENU" : [
            {"SUBMENU_ID" : "USER_PREFRENCE",  "SUBMENU_NAME" : "User Perfrence", "ACCESS_VALUE" : data.MENU_ENTITLEMENTS.opstechUserPrefAccess}
            ]
          },
          {"MENU_ID" : "SNAPSHOTS", "MENU_NAME" : "Snapshots", "SUBMENU" : [
            {"SUBMENU_ID" : "REPORT", "SUBMENU_NAME" : "REPORTS", "ACCESS_VALUE" : data.MENU_ENTITLEMENTS.opstechReportAccess}, 
            {"SUBMENU_ID" : "SNAPSHOTS", "SUBMENU_NAME" : "Snapshots", "ACCESS_VALUE" : data.MENU_ENTITLEMENTS.opstechSnapshotAccess}
            ]
          }];
    
        
        this.OPSTECH_PROFILE_MENU_ENTITLEMENTS.forEach(element => {
          let sidebarMenuChildObj = [];
          let icon = (element.MENU_ID == "DASHBOARD") ? this.iconsArray.Dashboard_icon :  (element.MENU_ID == "MAINTENANCE") ? this.iconsArray.Maintenance_icon : (element.MENU_ID == "SNAPSHOTS") ?  this.iconsArray.Snapshots_icon : this.iconsArray.Dashboard_icon;
          element.SUBMENU.forEach(elementSub => {

           if(elementSub.SUBMENU_ID == "SETTLEMENT_DASHBOARD" &&  elementSub.ACCESS_VALUE == 1) 
           {
             this.guard.allowsettlement = true ;
              sidebarMenuChildObj.push ({
                name: 'Settlement Dashboard',
                url: '/settlementDashboard',
                icon: 'icon-pie-chart'
              });
            }
           else if(elementSub.SUBMENU_ID == "ONBOARDING_DASHBOARD" &&  elementSub.ACCESS_VALUE == 1)
           {
             this.guard.allowonboard = true ;
             sidebarMenuChildObj.push ({
              name: 'Onboarding Dashboard',
              url: '/onboardingDashboard',
              icon: 'icon-pie-chart'
            });
            }
           else if(elementSub.SUBMENU_ID == "USER_PREFRENCE" &&  elementSub.ACCESS_VALUE == 1) 
           {
             this.guard.allowUSerPref = true ;
            
            sidebarMenuChildObj.push ({
              name: 'User Preferences',
              url: '/userpref',
              icon: 'icon-user'
              });
            }
           else if(elementSub.SUBMENU_ID == "REPORT" &&  elementSub.ACCESS_VALUE == 1) 
           {
             this.guard.allowReports = true ;
             sidebarMenuChildObj.push ({
              name: 'Report',
              url: '/report',
              icon: 'icon-star'
              });
            }
           else if(elementSub.SUBMENU_ID == "SNAPSHOTS" &&  elementSub.ACCESS_VALUE == 1) 
           {
             this.guard.allowSnapshot = true ;
             sidebarMenuChildObj.push ({
              name: 'Snapshots',
              url: '/SnapShots',
              icon: 'icon-star'
              });
            }
         });
         if(sidebarMenuChildObj.length > 0)
         {
           
          this.sidebarNavigationBar.push({
            name: element.MENU_NAME,
            url: '/',
            icon: icon,
            children: sidebarMenuChildObj
         });
        }
        });
        // Set default time out for Logout
        this.userIdle.idle = data.APP_CONFIG_VALUES.SESSION_IDLE * 60;
        this.userIdle.timeout = data.APP_CONFIG_VALUES.SESSION_TIMEOUT * 60;

        // Set default Loggedin user info on header
        AppHeaderComponent.prototype.currentUser = data.USER_INFO.lUserName;
        AppHeaderComponent.prototype.soeid = data.USER_INFO.soeId;
        AppHeaderComponent.prototype.loggedinTime = data.USER_INFO.sCurrentDate;

        // Set Entitled Menus and sub menus to side bar
        AppSidebarNavComponent.prototype.navigation = this.sidebarNavigationBar;
        onboardingDashboardComponent.prototype._onboardingEntitlement = data.ONBOARD_ENTITLEMENTS;
        onboardingDashboardComponent.prototype.businessDate = data.APP_CONFIG_VALUES.BUSINESS_DATE; 
        settlementDashboardComponent.prototype._settlementEntitlements = data.TRADE_SETTLEMENT_ENTITLEMENTS;
        
        // Boostrap default Component as per entitlements.
        this.router.navigate(this.DefaultNavigation);


      }, (err) => {       
        console.log(err);
      });
  
    }
 }
