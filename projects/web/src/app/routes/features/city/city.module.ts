import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityRoutingModule } from '@routes/features/city/city-routing.module';
import { CityFormComponent } from '@routes/features/city/components/form/city.form.component';
import { CityListComponent } from '@routes/features/city/components/list/city.list.component';
import { SharedModule } from '@shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const CITY_COMPONENTS = [
  CityListComponent,
  CityFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CityRoutingModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    ...CITY_COMPONENTS
  ],
  entryComponents: [CityFormComponent]
})
export class CityModule {
}
