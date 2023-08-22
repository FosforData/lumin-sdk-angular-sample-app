
# Introduction to Lumin

The fastest way to get to the business insights that matter most! An AI-powered decision intelligence product, Lumin is designed for everyone, to analyze data and share insights in seconds. Lumin instantaneously spots anomalies, trends, and patterns, and reveals insights on why something happened, what changed, what is the impact, and what will come next – and it does so autonomously, without relying on data experts or complex coding skills. Get started at - https://www.fosfor.com/lumin/

# Lumin SDK

Lumin SDK enables the developers to integrate different Lumin widgets within their existing web application effectively in a secured way. It comes with different JavaScript based library/framework such as React, Angular and  provides modular widgets for importing various Lumin capabilities such as Ask, Workspace and Nudges.

# Pre-requisites

Listed below are the pre-requisites for successfull integration with Lumin SDK.

* Developer Console is enabled for your account.
* SDK secret is created in the Developer Console (Please contact Super Admin or Support Team for enabling the SDK secret).
* Ensure the Users of your application are available or added in your Lumin account.
* Your application domain is Whitelisted for the Secret in “Secret Management” section of Developer Console for CORS.

If you want to have custom theme for the Lumin SDK components, make necessary changes in the Developer Console.
This project requires NodeJS (version 14 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.

Below Peer dependencies are needed to be installed in your application to support ngx-lumin-sdk
```
    "@angular/common": ">=12.0.0"
    "@angular/core": ">=12.0.0"
    "@angular/animations": ">=12.0.0"
    "@angular/cdk": ">=12.0.0"
    "@angular/compiler": ">=12.0.0"
    "@angular/forms": ">=12.0.0"
    "@angular/material": ">=12.0.0"
    "@angular/platform-browser": ">=12.0.0"
    "@angular/platform-browser-dynamic": ">=12.0.0"
    "@ctrl/tinycolor": "3.4.1"
    "ngx-skeleton-loader": "^5.0.0",
    "@amcharts/amcharts5": "^5.2.5",
    "material-design-icons-iconfont": "^6.7.0",
```


## Setting up sample application

Current repo comes with sample integration of Lumin SDK's Angular version with sample angular-based client. Post fulfilling the pre-requisites, setup can be done in two simple steps -

* Clone the lumin-sdk-angular-sample-app repo by running `git clone https://github.com/FosforData/lumin-sdk-angular-sample-app.git`

* Navigate to root of the current repo and run `npm install`

* Create a `.env` file at the root of repository, and mention below variables. 
```bash
NG_APP_LUMIN_SDK_DOMAIN = https://sample--dummy-client-instance.lumin.com
NG_APP_LUMIN_SDK_EMAIL = example@example.com
NG_APP_LUMIN_SDK_SECRET =samplydummyeRVXPEXkjoYoVtVME4PI29IkOba7u+lPjZx9
NG_APP_LUMIN_SDK_ENV = dev
NG_APP_LUMIN_AM_CHARTS_LICENCE=samplydummyeRVXPEXkjoYoVtVME4PI29IkOba7u+lPjZx9
NG_APP_LUMIN_MAPBOX_ACCESS_TOKEN=samplydummyeRVXPEXkjoYoVtVME4PI29IkOba7u+lPjZx9
NG_APP_LUMIN_SDK_ENCSTRING=samplydummyeRVXPEXkjoYoVtVME4PI29IkOba7u+lPjZx9
```
Note: 
* If you're running it locally, mention `NG_APP_LUMIN_SDK_ENV=dev`, otherwise it would be `NG_APP_LUMIN_SDK_ENV=prod`
* Current sample app comes with all the below setup code except `.env` file. Post creation and updation of `.env`, it is ready to use.

## CORS

CORS is applicable, if your application intends to access Lumin resources through the Lumin SDK/APIs from your application across origins.

Developers must whitelist your domains in the Developer Console to authorize your application to call Lumin through SDK or API end point and access resources.

Please follow the steps to whitelist domains for CORS.

* Login to your Lumin Instance
* Navigate to Developer Console → Secret Management tab.
* Create Secret if not created and click on Edit for the Secret.
* Add your domain in the Whitelist domain → Save.

Example: If you are hosting your application integrated with Lumin SDK on demo.abc.com then, you must add demo.abc.com to the whitelist domain list to allow CORS.


## Initializing Font Family
After setting .env variables, go to public directory of your application and put below snippet in index.html in <head></head> tag.

```bash
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css' />
```
**Style.css**
* /* You can add global styles to this file, and also import other style files for better visualization  */
@import "../node_modules/ngx-lumin-sdk/styles/styles.css";

## Authentication

* ### Initializing SDK session
* Make sure you have set the .env variables.
* At login/auth page of your app where you are doing authentication, you need to call `initializeApp` which sets authState for SDK.
* If you want user specific authentication, you need to form a config object consisting of Email and Password and pass this object to `initializeApp()` as parameters while login.
* If you don’t want to use individual user credentials to authenticate, you can simply use `initializeApp()` without any config parameter. SDK will initialize the SDK session with default user credentials that is being provided via env variables.
**signin.component.ts**
```bash
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from 'ngx-lumin-sdk';
declare var process: any;
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMsg = '';
  return: string;
  loading: Boolean;
  constructor(
    private luminAuthService: AuthService
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true)
    });
  }

  signin() {
    const signinData = this.signinForm.value
    const reIntialize = true;
    const config = {
      email: signinData.username || process.env.NG_APP_LUMIN_SDK_EMAIL,
      password: signinData.password || process.env.NG_APP_LUMIN_SDK_PASSWORD
    }
    this.luminAuthService.initializeApp(config, reIntialize);
  }
  //Dashboard Rout
}
```
**signin.component.html**
```bash
<div>
    <form
        [formGroup]="signinForm"
        class="signup4-form grey-100"
        (ngSubmit)="signin()"
      >
        <mat-form-field class="full-width" appearance="outline">
          <mat-label>Email</mat-label>
          <input
            matInput
            formControlName="username"
            type="text"
            name="username"
            placeholder="Username"
          />
        </mat-form-field>

        <mat-form-field class="full-width" appearance="outline">
          <mat-label>Password</mat-label>
          <input
            matInput
            formControlName="password"
            type="password"
            name="password"
            placeholder="********"
          />
        </mat-form-field>
        <div
          fxLayout="row wrap"
          fxLayoutAlign="start center"
          style="margin-top: 20px;"
          >
          <button 
          class="mr-16"
          color="primary">Sign in</button>
        </div>
      </form>
    </div>
```
* ### End SDK session
* You can end an active SDK session while logging out from your application simply by calling `endSession()` as shown.

```bash
import { AuthService } from "dist/ngx-lumin-sdk";
constructor(private luminAuthService: AuthService) {}

  onLogout(): void {
    this.luminAuthService.endLuminSession();
  }
```

## Enabling Lumin Widgets
* ### AskLumin
You can integrate ask lumin capability with your app easily as shown. Below are few configuration properties which can be passed as required.

| Property  | Type     | Description |
| --------  | -------- | ----------- |
| solutionSelectorGlobal `Optional` | boolean | `Default value - false` Pass true if solution selector is imported as global module. |
| narrativeRequired `Optional` | boolean | `Default value - true` If passed false, narrative will not be displayed with lumin chart results. |
| fullNarrativeRequired `Optional` | boolean | `Default value - true` If passed `false`, full narrative will not be displayed with lumin chart results. Note: Set `fullNarrativeRequired` flag to true only when `narrativeRequired` flag is set to true in order to enable full narrative section. |
| xaiRequired `Optional` | boolean | `Default value - true` If passed false, xai will not be displayed with lumin chart results. |
| footerInfoRequired `Optional` | boolean | `Default value - true` If passed false, more info will not be displayed with lumin chart results. |
| spellCheckRequired `Optional` | boolean | `Default value - true` If passed false, spellcheck flow will be disabled. |
| intelligentSearchRequired `Optional` | boolean | `Default value - true` If passed false, intelligent search toggle button will not be displayed. |
| searchHistoryRequired `Optional` | boolean | `Default value - true` If passed false, search history will not be displayed. |


* ## Askbar

You can integrate Ask bar  capability with your app easily as shown. Below are few configuration properties which can be passed as required.
you need import AskLumin Module and  Auth Module in  parrent.module.ts. 
**app.module.ts**
```bash
import { NgModule } from "@angular/core";
import { AskLuminModule, AuthModule} from 'ngx-lumin-sdk';
@NgModule({
  imports: [
    AskLuminModule,
    AuthModule,
  ],
  exports: []
})
export class AppModule {}
```
***app.component.html***
```bash
<app-ask-lumin
[spellCheckRequired]="spellCheckRequired" 
[isExternalFiltersEnabled]="isExternalFiltersEnabled"
[externalFiltersValue]="externalFiltersValue"
[solutionSelectorGlobal]="solutionSelectorGlobal"
[fullNarrativeRequired]="fullNarrativeRequired"
[spellCheckRequired]="spellCheckRequired"
[intelligentSearchRequired]="intelligentSearchRequired"
[searchHistoryRequired]="searchHistoryRequired"
></app-ask-lumin>
```


* ### Workspace
You can integrate Workspace capability with your app easily as shown. Below are few configuration properties which can be passed as required.

| Property  | Type     | Description |
| --------  | -------- | ----------- |
| height `Optional` | number | `Default value - 600` Specify the fixed height for workspace in range of 400 to 900. |
| publishedStoriesRequired `Optional` | boolean | `Default value - true` If passed false, published story will not be shown. |
| sharedWithMeStoriesRequired `Optional` | boolean | `Default value - true` If passed false, shared with me story will not be shown.. |
| viewSingleStory `Optional` | boolean | `Default value - false` Pass it as true only in case of if user want a single story to be viewed as workspace. When it is passed as true, make sure to pass below attributes via `.env` file `NG_APP_LUMIN_SDK_STORY_ID = 634501c51072173c662a08ea` and  `NG_APP_LUMIN_SDK_STORY_TYPE = PUBLISHED OR SHARED_WITH_ME` |
***app.component.html***
```bash
<Workspace
             height={500}
             publishedStoriesRequired={true}
             sharedWithMeStoriesRequired={true}
             viewSingleStory={false}
         />

```

* ### Nudges
You can integrate Nudges capability with your app easily as shown. Below are few configuration properties which can be passed as required.

| Property  | Type     | Description |
| --------  | -------- | ----------- |
| height `Optional` | number | `Default value - 600` Specify the fixed height for workspace in range of 400 to 900. |
| topNudgesRequired `Optional` | boolean | `Default value - true` If passed false, top nudges view will not be shown. Note: Please ensure to enable any of the view i.e, either `topNudges` view or `allNudges` view. |
| allNudgesRequired `Optional` | boolean | `Default value - false` If passed false, nudge dashboard story will not be shown. Note: Please ensure to enable any of the view i.e, either `topNudges` view or `allNudges` view. |
| topNudgesLimit `Optional` | number | `Default value - 10` Provide any specific number to be shown as result in `topNudges` view, if `topNudgesRequired` is set to be `true`. |
***app.component.html***
```bash
<Nudges
             height={600}
             topNudgesRequired={true}
             allNudgesRequired={false}
             topNudgesLimit={5}
         />
```
## Documentation
Visit - https://docs.lumin.fosfor.com/

## Contributor
- [@nileshfosfor](https://github.com/nileshfosfor)

## Contributing
Contributions are always welcome!

## 🔗 Links
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/fosfordata)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/showcase/fosfordata/)

![Logo](https://www.fosfor.com/wp-content/uploads/2021/12/logo-new.png)