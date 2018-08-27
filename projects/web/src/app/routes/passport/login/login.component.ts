import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@store';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  type = 0;
  loading = false;
  count = 0;
  interval$: any;
  readonly REDIRECT_DELAY = 1000;

  constructor(
    fb: FormBuilder,
    private _router: Router,
    private _modalSrv: NzModalService,
    private _usrSrv: UserService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    this._modalSrv.closeAll();
  }

  //#region Fields
  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  //#endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  //#region get captcha

  getCaptcha() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  forgetPassword() { }
  // #endregion

  submit() {
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    this.loading = true;

    this._usrSrv
      .authenticate(this.userName.value, this.password.value)
      .subscribe(
        () => {
          this.loading = false;
          setTimeout(() => {
            return this._router.navigateByUrl('/');
          }, this.REDIRECT_DELAY);
        },
        () => {
          this.loading = false;
        },
      );
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
