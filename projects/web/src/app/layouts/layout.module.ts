import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutDefaultComponent } from './default/default.component';
import { HeaderFullScreenComponent } from './default/header/components/fullscreen.component';
import { HeaderIconComponent } from './default/header/components/icon.component';
import { HeaderNotifyComponent } from './default/header/components/notify.component';
import { HeaderSearchComponent } from './default/header/components/search.component';
import { HeaderTaskComponent } from './default/header/components/task.component';
import { HeaderUserComponent } from './default/header/components/user.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { LayoutPassportComponent } from './passport/passport.component';
import { DynamicModule } from '@dynamic-component';
import { SharedComponentModule } from '../shared-component/shared-components.module';

const COMPONENTS = [
  LayoutDefaultComponent,
  SidebarComponent,
  LayoutPassportComponent,
];

const ENTRIES = [];

const HEADERCOMPONENTS = [
  HeaderComponent,
  HeaderFullScreenComponent,
  HeaderIconComponent,
  HeaderNotifyComponent,
  HeaderSearchComponent,
  HeaderTaskComponent,
  HeaderUserComponent,
];

@NgModule({
  imports: [
    SharedModule,
    SharedComponentModule,
    DynamicModule.withComponents(null)
  ],
  providers: [],
  declarations: [...COMPONENTS, ...HEADERCOMPONENTS],
  exports: [...COMPONENTS],
  entryComponents: [...ENTRIES],
})
export class LayoutModule { }
