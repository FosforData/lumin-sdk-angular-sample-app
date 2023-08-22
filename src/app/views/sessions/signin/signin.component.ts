import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AuthService } from 'ngx-lumin-sdk';
declare var process: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
  animations: matxAnimations
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMsg = '';
  return: string;
  loading: Boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private matxLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute,
    private luminAuthService: AuthService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(true)
    });

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(params => this.return = params['return'] || '/');
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value
    this.loading = true;
    this.jwtAuth.signin(signinData.username, signinData.password)
      .subscribe(response => {
        this.loading = false;
        const config = {
          email: signinData.username || process.env.NG_APP_LUMIN_SDK_EMAIL,
          password: signinData.password || process.env.NG_APP_LUMIN_SDK_PASSWORD
        };
        this.luminAuthService.initializeApp(config, true);
        this.router.navigateByUrl(this.return);
      }, err => {
        this.loading = false;
        this.errorMsg = err.message;
      })
  }

  autoSignIn() {
    if (this.return === '/') {
      return
    }
    this.matxLoader.open(`Automatically Signing you in! \n Return url: ${this.return.substring(0, 20)}...`, { width: '320px' });
    setTimeout(() => {
      this.signin();
      console.log('autoSignIn');
      this.matxLoader.close()
    }, 2000);
  }
}
