### How to run the application with latest ngx-lumin-sdk

 1. Run ***npm i***
 2. Run ***npm i ngx-lumin-sdk@<the version you want to test/deploy>***
	 Example: npm i ngx-lumin-sdk@0.0.25.
 3. Create a .env file above properties: <br/>
   	NG_APP_LUMIN_SDK_DOMAIN = https://leni-stage-tech-reactui-lpm-852-bf3mds3yyq-de.a.run.app <br/>
	NG_APP_LUMIN_SDK_EMAIL = satyendra.pandit@lntinfotech.com<br/>
	NG_APP_LUMIN_SDK_PASSWORD = Password#2022201<br/>
	NG_APP_LUMIN_SDK_SECRET = hQaJAtdjRCeLuxVsXAYZ9uFtW/QV+CDkJlKBePiES8+A0nGEovfN2+gqgBQFuRCI7R0hNl<br/>+4aKvxuKM1NM05g2E6POvs2k/XdkO51lqnev4=<br/>
	NG_APP_LUMIN_SDK_ENV = dev<br/>
	NG_APP_LUMIN_AM_CHARTS_LICENCE=AM5C299949696<br/>
 4. To run the demo application execute: ***npm run start***
 5. Application will be running on *localhost:4201*

### How to build and deploy the application
1. Make sure you have installed the correct version for ngx-lumin-sdk
2. run following command: ***npm run build***
3. It will create the bundle in dist folder in project root
4. copy the .env file to the dist folder
5. Go to https://app.netlify.com/. Login with the credentials.
6. Select ***lumin-sdk-demo-angular*** from sites.
7. Select Deploy
8. Upload the dist folder. After 2-5 minutes the bundle should be uploaded and site should be live. If it get stuck in publishing state then cancel the deployment and re-attempt
