import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { SessionService } from './common-service/session.service';
import { ExcelService } from './common-service/xls-download.service';
import { ColumnsService } from './common-service/columns.service';
import { CommonFunctions } from './common-service/commonFunctions.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserIdleModule } from './IdleTimeFiles';
// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DialogConfirmComponent } from './common-service/dialog-confirm/dialog-confirm.component';
import { DialogConfirmService } from './common-service/dialog-confirm/dialog-confirm.service';
import { AuthGuard }from './common-service/auth-guard.service';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    DataTablesModule,
    CommonModule,UserIdleModule,
    NgbModule.forRoot(),
    UserIdleModule.forRoot({idle: 1490, timeout: 300, ping: 2})
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    DialogConfirmComponent
    ],
  providers: [SessionService, ExcelService,AuthGuard, ColumnsService, CommonFunctions, DialogConfirmService, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ],
  entryComponents: [ DialogConfirmComponent ],
})
export class AppModule { }
