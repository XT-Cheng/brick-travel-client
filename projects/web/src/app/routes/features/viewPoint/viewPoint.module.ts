import { NgModule } from '@angular/core';
import { ViewPointFilterComponent } from '@routes/features/viewPoint/components/filter/viewPoint.filter.component';
import { ViewPointFormComponent } from '@routes/features/viewPoint/components/form/viewPoint.form.component';
import { ViewPointListComponent } from '@routes/features/viewPoint/components/list/viewPoint.list.component';
import { MapModalComponent } from '@routes/features/viewPoint/components/mapModal.component';
import { ViewPointRoutingModule } from '@routes/features/viewPoint/viewPoint-routing.module';
import { SharedModule } from '@shared/shared.module';

const VIEWPOINT_COMPONENTS = [
  ViewPointListComponent,
  ViewPointFormComponent,
  MapModalComponent,
  ViewPointFilterComponent,
];

@NgModule({
  imports: [ViewPointRoutingModule, SharedModule],
  declarations: [...VIEWPOINT_COMPONENTS],
  entryComponents: [
    ViewPointFormComponent,
    MapModalComponent,
    ViewPointFilterComponent,
  ],
})
export class ViewPointModule { }
