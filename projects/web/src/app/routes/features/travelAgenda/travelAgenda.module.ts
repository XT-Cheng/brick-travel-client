import { NgModule } from '@angular/core';

import { TravelAgendaListComponent } from './components/list/travelAgenda.list.component';
import { TravelAgendaRoutingModule } from './travelAgenda-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TravelAgendaFormComponent } from '@routes/features/travelAgenda/components/form/travelAgenda.form.component';

const TRAVELAGENDA_COMPONENTS = [
  TravelAgendaListComponent,
  TravelAgendaFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TravelAgendaRoutingModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    ...TRAVELAGENDA_COMPONENTS
  ],
  entryComponents: [TravelAgendaFormComponent]
})
export class TravelAgendaModule {
}
