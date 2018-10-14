import { NgModule } from '@angular/core';
import { UserLoginComponent } from '@routes/passport/login/login.component';
import { RouteRoutingModule } from '@routes/routes-routing.module';
import { SharedModule } from '@shared/shared.module';

import { TestComponent } from './test/test.component';

const COMPONENTS = [UserLoginComponent, TestComponent];

const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [RouteRoutingModule, SharedModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule { }
