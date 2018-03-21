import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({

    providers: [AuthGuard]

})

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    allowonboard = false;
    allowsettlement = false;
    allowUSerPref = false;
    allowReports = false;
    allowSnapshot = false;
    canActivate() {
        return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        debugger;
        let url: string = state.url;
        if (url == '/settlementDashboard' && this.allowsettlement) 
          return true;
        else if (url == '/onboardingDashboard' && this.allowonboard) 
            return true;
        else if (url == '/userpref' && this.allowUSerPref) 
            return true;
        else if (url == '/report' && this.allowReports) 
            return true;
        else if (url == '/SnapShots' && this.allowSnapshot)
            return true;
        else 
            return false;
        


    }



}
