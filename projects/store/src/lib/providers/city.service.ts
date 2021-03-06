import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICityBiz } from '../bizModel/model/city.biz.model';
import { EntityTypeEnum } from '../entity/entity.model';
import { citySchema } from '../entity/entity.schema';
import { ICity } from '../entity/model/city.model';
import { StoreConfig } from '../store.config';
import { IAppState } from '../store.model';
import { CityUIService } from './city.ui.service';
import { EntityService } from './entity.service';
import { ErrorService } from './error.service';

@Injectable()
export class CityService extends EntityService<ICity, ICityBiz> {
  //#region Constructor
  constructor(
    protected _http: HttpClient,
    protected _errorService: ErrorService,
    protected _store: NgRedux<IAppState>,
    protected _uiService: CityUIService,
    protected _config: StoreConfig,
  ) {
    super(
      _http,
      _store,
      EntityTypeEnum.CITY,
      citySchema,
      `cities`,
      _errorService,
      _uiService,
      _config,
    );
  }
  //#endregion

  //#region Protected methods

  protected matchSearch(bizModel: ICityBiz, searchKey: any): boolean {
    return bizModel.name.indexOf(searchKey) !== -1;
  }

  protected matchFilter(bizModel: ICityBiz, filters: any[]): boolean {
    return true;
  }

  protected beforeSend(bizModel: ICityBiz): any {
    const thumbnail = bizModel.thumbnail.startsWith(`data:image`)
      ? ``
      : bizModel.thumbnail;

    return Object.assign({}, bizModel, { thumbnail: thumbnail });
  }

  //#endregion
}
