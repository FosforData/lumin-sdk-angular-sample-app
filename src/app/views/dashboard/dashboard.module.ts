import { SharedMaterialModule } from "app/shared/shared-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";

import { DashboardRoutes } from "./dashboard.routing";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { AskLuminModule, AuthModule, NudgesModule, WorkspaceModule } from 'ngx-lumin-sdk';
import { AnalyticsTabletComponent } from "./analytics-tablet/analytics-tablet.component";
import { AnalyticsMobileComponent } from "./analytics-mobile/analytics-mobile.component";
// import { LuminSdkAngularDocComponent } from './lumin-sdk-angular-doc/lumin-sdk-angular-doc.component';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    PerfectScrollbarModule,
    RouterModule.forChild(DashboardRoutes),
    AskLuminModule,
    AuthModule,
    WorkspaceModule,
    NudgesModule
  ],
  declarations: [AnalyticsComponent, AnalyticsTabletComponent, AnalyticsMobileComponent],
  exports: []
})
export class DashboardModule {}
