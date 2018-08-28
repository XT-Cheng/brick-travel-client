import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { denormalize } from 'normalizr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as ImmutableProxy from 'seamless-immutable';

const Immutable = (<any>ImmutableProxy).default || ImmutableProxy;
import { IUserBiz } from '../bizModel/model/user.biz.model';
import { EntityActionTypeEnum } from '../entity/entity.action';
import {
  EntityTypeEnum,
  INIT_ENTITY_STATE,
  STORE_ENTITIES_KEY,
} from '../entity/entity.model';
import { userSchema } from '../entity/entity.schema';
import { IUser } from '../entity/model/user.model';
import { IAppState, STORE_KEY } from '../store.model';
import {
  userLoggedInAction,
  userLoggedOutAction,
} from '../ui/reducer/user.reducer';
import { STORE_UI_KEY } from '../ui/ui.model';
import { EntityService } from './entity.service';
import { ErrorService } from './error.service';
import { StoreConfig } from '../store.config';
import {
  ITokenService,
  DA_SERVICE_TOKEN,
  DelonAuthConfig,
  JWTTokenModel,
} from '@delon/auth';

@Injectable()
export class UserService extends EntityService<IUser, IUserBiz> {
  //#region Private member

  private _loggedIn$: BehaviorSubject<IUserBiz> = new BehaviorSubject(null);
  private _loggedIn: IUserBiz;

  //#endregion

  //#region Constructor
  constructor(
    protected _http: HttpClient,
    protected _errorService: ErrorService,
    protected _store: NgRedux<IAppState>,
    private _authConfig: DelonAuthConfig,
    @Inject(DA_SERVICE_TOKEN) private _tokenSrv: ITokenService,
    protected _config: StoreConfig,
  ) {
    super(
      _http,
      _store,
      EntityTypeEnum.USER,
      userSchema,
      `users`,
      _errorService,
      null,
      _config,
    );

    this.getLoggedIn(this._store).subscribe(value => {
      this._loggedIn = value;
      this._loggedIn$.next(value);
    });
  }
  //#endregion

  //#region Public methods
  public logout() {
    this.setCurrentUser(null);
    this._tokenSrv.clear();
  }

  public authenticate(userName: string, password: string) {
    return this._http
      .post(this._authConfig.login_url, {
        username: userName,
        password: password,
      })
      .pipe(
        tap((res: any) => {
          const jwt = new JWTTokenModel();
          jwt.token = res.token;
          this._tokenSrv.set(jwt);
          const { id, name, nick, picture } = jwt.payload;
          this.setCurrentUser({
            id,
            name,
            nick,
            picture,
          });
        }),
      );
  }

  public get loggedIn$(): Observable<IUserBiz> {
    return this._loggedIn$.asObservable();
  }

  public get loggedIn(): IUserBiz {
    return this._loggedIn;
  }

  public byId(id: string): IUserBiz {
    return denormalize(
      id,
      userSchema,
      Immutable(this._store.getState().entities).asMutable({ deep: true }),
    );
  }

  public setCurrentUser(u: IUserBiz) {
    if (!u) {
      this._store.dispatch(userLoggedOutAction());
      return;
    }

    this._store.dispatch(
      this.succeededAction(
        EntityActionTypeEnum.LOAD,
        Object.assign({}, INIT_ENTITY_STATE, { users: { [u.id]: u } }),
      ),
    );

    this._store.dispatch(userLoggedInAction(u));
  }

  //#endregion

  //#region Private methods

  private getLoggedIn(store: NgRedux<IAppState>): Observable<IUserBiz> {
    return this.getLoggedInId(store).pipe(
      switchMap(id => {
        return store.select<IUser>([
          STORE_KEY.entities,
          STORE_ENTITIES_KEY.users,
          id,
        ]);
      }),
      map(ct => {
        return ct
          ? denormalize(
              ct.id,
              userSchema,
              Immutable(store.getState().entities).asMutable({ deep: true }),
            )
          : null;
      }),
    );
  }

  private getLoggedInId(store: NgRedux<IAppState>): Observable<string> {
    return store.select<string>([
      STORE_KEY.ui,
      STORE_UI_KEY.user,
      'userLoggedIn',
    ]);
  }

  //#endregion
}
