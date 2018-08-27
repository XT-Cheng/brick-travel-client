import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EntityTypeEnum } from '../entity/entity.model';
import { applicationSchema } from '../entity/entity.schema';
import { IAppState } from '../store.model';
import { EntityService } from './entity.service';
import { ErrorService } from './error.service';
import { StoreConfig } from '../store.config';
import { IApplication } from '../entity/model/application.model';
import { IApplicationBiz } from '../bizModel/model/app.biz.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApplicationService extends EntityService<
  IApplication,
  IApplicationBiz
> {
  //#region private member

  //#endregion

  //#region Constructor
  constructor(
    protected _http: HttpClient,
    protected _errorService: ErrorService,
    protected _store: NgRedux<IAppState>,
    protected _config: StoreConfig,
  ) {
    super(
      _http,
      _store,
      EntityTypeEnum.APPLICATION,
      applicationSchema,
      `application`,
      _errorService,
      null,
      _config,
    );
  }
  //#endregion

  //#region Public methods
  public get application$(): Observable<IApplicationBiz> {
    return this.all$.pipe(map(apps => apps[0]));
  }
  //#endregion
}
