import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ViewPointFormComponent } from './components/form/viewPoint.form.component';
import { ViewPointListComponent } from './components/list/viewPoint.list.component';
import { MapModalComponent } from './components/mapModal.component';
import { ViewPointRoutingModule } from './viewPoint-routing.module';

// import { ViewPointFilterComponent } from './components/filter/viewPoint.filter.component';
const VIEWPOINT_COMPONENTS = [
  ViewPointListComponent,
  ViewPointFormComponent,
  MapModalComponent,
  // ViewPointFilterComponent
];

@NgModule({
  imports: [
    ViewPointRoutingModule,
    SharedModule
  ],
  declarations: [
    ...VIEWPOINT_COMPONENTS
  ],
  entryComponents: [ViewPointFormComponent, MapModalComponent]
})
export class ViewPointModule {
}
