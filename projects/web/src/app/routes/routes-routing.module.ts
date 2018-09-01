import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

import { LayoutDefaultComponent } from '../layouts/default/default.component';
import { LayoutPassportComponent } from '../layouts/passport/passport.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './passport/login/login.component';
import { RoutingGuard } from './route-guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [RoutingGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: '仪表盘',
          titleI18n: 'dashboard',
        },
      },
      // 业务子模块
      { path: 'cities', loadChildren: './features/city/city.module#CityModule' }
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'pro-login' },
      },
      // { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      // { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
    ],
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // 单页不包裹Layout
  // { path: 'callback/:type', component: CallbackComponent },
  // { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  // { path: '403', component: Exception403Component },
  // { path: '404', component: Exception404Component },
  // { path: '500', component: Exception500Component },
  // { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [],
  providers: [RoutingGuard],
})
export class RouteRoutingModule { }
