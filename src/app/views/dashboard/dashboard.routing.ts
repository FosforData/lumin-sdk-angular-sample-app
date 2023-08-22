import { Routes } from "@angular/router";
import { AnalyticsMobileComponent } from "./analytics-mobile/analytics-mobile.component";
import { AnalyticsTabletComponent } from "./analytics-tablet/analytics-tablet.component";

import { AnalyticsComponent } from "./analytics/analytics.component";
// import { LuminSdkAngularDocComponent } from "./lumin-sdk-angular-doc/lumin-sdk-angular-doc.component";

export const DashboardRoutes: Routes = [
  {
    path: "analytics",
    component: AnalyticsComponent
  },
  // {
  //   path: "analytics-tablet",
  //   component: AnalyticsTabletComponent
  // },
  // {
  //   path: "analytics-mobile",
  //   component: AnalyticsMobileComponent
  // },
  // {
  //   path: "lumin-sdk",
  //   component: LuminSdkAngularDocComponent
  // }
];
