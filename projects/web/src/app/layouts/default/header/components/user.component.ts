import { Component } from '@angular/core';
import { UserService } from '@store';
import { Router } from '@angular/router';
import { DelonAuthConfig } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="(userService.loggedIn$ | async).picture" nzSize="small" class="mr-sm"></nz-avatar>
      {{(userService.loggedIn$ | async).name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {
  constructor(
    public userService: UserService,
    private _router: Router,
    private _authConfig: DelonAuthConfig,
  ) {}

  logout() {
    this.userService.logout();
    this._router.navigateByUrl(this._authConfig.login_url);
  }
}
