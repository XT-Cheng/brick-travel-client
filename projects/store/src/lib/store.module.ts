import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { throwIfAlreadyLoaded } from '@utilities';
import { UserService } from './providers/user.service';
import { StoreConfig } from './store.config';
import { ErrorService } from './providers/error.service';
import { NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';

const PROVIDERS = [
  ErrorService,
  // RootEpics,
  // EntityEpics,
  // CityService,
  // ViewPointService,
  UserService,
  // FilterCategoryService,
  // MasterDataService,
  // TravelAgendaService,
  // TravelAgendaUIService,
  // ViewPointCategoryService,
  // TransportationCategoryService,
  // CityUIService,
  // ViewPointUIService,
  // DataFlushService,
  // SearchService,
  StoreConfig,
];

@NgModule({
  imports: [NgReduxModule, HttpClientModule],
  declarations: [],
  exports: [NgReduxModule],
})
export class StoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: StoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'StoreModule');
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: [...PROVIDERS],
    };
  }
}
