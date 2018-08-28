import { NgRedux } from '@angular-redux/store';
import { Inject, Injectable } from '@angular/core';
import {
  DA_STORE_TOKEN,
  DelonAuthConfig,
  IStore,
  JWTTokenModel,
} from '@delon/auth';
import {
  DataFlushService,
  IAppState,
  INIT_APP_STATE,
  MasterDataService,
  RootEpics,
  rootReducer,
  UserService,
} from '@store';
import { deepExtend } from '@utilities';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { stateTransformer } from 'redux-seamless-immutable';
import * as Immutable from 'seamless-immutable';
import { AlainI18NService, ALAIN_I18N_TOKEN } from '@delon/theme';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable({ providedIn: 'root' })
export class StartupService {
  constructor(
    private _dataService: DataFlushService,
    private _masterDataService: MasterDataService,
    private _store: NgRedux<IAppState>,
    private _rootEpics: RootEpics,
    private _authConfig: DelonAuthConfig,
    private _userSrv: UserService,
    @Inject(ALAIN_I18N_TOKEN) private _i18n: AlainI18NService,
    @Inject(DA_STORE_TOKEN) private _storeSrv: IStore,
  ) {}

  private viaHttp(resolve: any, reject: any) {
    resolve({});
  }

  // TODO: Retrieve required information from local storage
  private viaLocalStorage(resolve: any, reject: any) {
    const epicMiddleware = createEpicMiddleware();
    this._store.configureStore(
      rootReducer,
      <any>(
        Immutable(deepExtend(INIT_APP_STATE, this._dataService.restoreState()))
      ),
      [createLogger({ stateTransformer: stateTransformer }), epicMiddleware],
    );

    epicMiddleware.run(this._rootEpics.createEpics());

    this.getToken();

    this.getMasterData();

    this._i18n.use('zh-CN');

    resolve(null);

    // .then(() => this._storage.get(TokenStorage.TOKEN_KEY))
    // .then(value => this._tokenService.setRaw(value))
    // .then(_ => this._masterService.fetch())
    // .then(_ => {
    // });
  }

  private viaMock(resolve: any, reject: any) {
    resolve({});
  }

  private getToken() {
    const jwt = new JWTTokenModel();
    jwt.token = this._storeSrv.get(this._authConfig.store_key).token;

    if (jwt.token && !jwt.isExpired()) {
      const { id, name, nick, picture } = jwt.payload;
      const userBiz = {
        id,
        name,
        nick,
        picture,
      };
      this._userSrv.setCurrentUser(userBiz);
    }
  }

  private getMasterData() {
    this._masterDataService.fetch();
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.viaLocalStorage(resolve, reject);
    });
  }
}
