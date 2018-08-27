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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataFlushService } from './providers/dataFlush.service';
import { TravelAgendaService } from './providers/travelAgenda.service';
import { EntityEpics } from './entity/entity.epic';
import { RootEpics } from './store.epic';
import { CityService } from './providers/city.service';
import { ViewPointService } from './providers/viewPoint.service';
import { FilterCategoryService } from './providers/filterCategory.service';
import { MasterDataService } from './providers/masterData.service';
import { TravelAgendaUIService } from './providers/travelAgenda.ui.service';
import { ViewPointCategoryService } from './providers/viewPointCategory.service';
import { TransportationCategoryService } from './providers/transportationCategory.service';
import { CityUIService } from './providers/city.ui.service';
import { ViewPointUIService } from './providers/viewPoint.ui.service';
import { SearchService } from './providers/search.service';
import { ApplicationService } from './providers/application.service';
import { ErrorInterceptorService } from './error.interceptor.service';

const PROVIDERS = [
  ErrorService,
  RootEpics,
  EntityEpics,
  CityService,
  ViewPointService,
  UserService,
  FilterCategoryService,
  MasterDataService,
  TravelAgendaService,
  TravelAgendaUIService,
  ViewPointCategoryService,
  TransportationCategoryService,
  CityUIService,
  ViewPointUIService,
  DataFlushService,
  SearchService,
  StoreConfig,
  ApplicationService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptorService,
    multi: true,
  },
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
