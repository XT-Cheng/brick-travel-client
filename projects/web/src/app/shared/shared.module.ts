import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelonABCModule } from '@delon/abc';
import { AlainThemeModule } from '@delon/theme';
import { TranslateModule } from '@ngx-translate/core';
import { AMapComponent } from '@shared/components/a-map/a-map.component';
import { InformationWindowComponent } from '@shared/components/a-map/information-window/information-window.component';
import { RateComponent } from '@shared/components/a-map/rate/rate.component';
import { ViewPointMarkerComponent } from '@shared/components/a-map/viewpoint-marker/viewpoint-marker.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { QuickMenuComponent } from '@shared/components/quick-menu.component';
import { SidebarNavComponent } from '@shared/components/sidebar/sidebar-nav.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { DailyTripsComponent } from './components/dailyTrips/dailyTrips.component';
import { AutofocusDirective } from './directives/autofocus.directive';

const THIRDMODULES = [NgZorroAntdModule, TranslateModule];

const COMPONENTS = [
  SidebarNavComponent,
  ModalComponent,
  QuickMenuComponent,
  AMapComponent,
  InformationWindowComponent,
  ViewPointMarkerComponent,
  RateComponent,
  DailyTripsComponent
];
const DIRECTIVES = [AutofocusDirective];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule,
    DelonABCModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ViewPointMarkerComponent,
    InformationWindowComponent
  ]
})
export class SharedModule { }
