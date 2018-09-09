import { NgRedux } from '@angular-redux/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { IBiz } from '../bizModel/biz.model';
import { IFilterCategoryBiz } from '../bizModel/model/filterCategory.biz.model';
import { EntityTypeEnum, IEntity } from '../entity/entity.model';
import { IAppState, STORE_KEY } from '../store.model';
import {
  entityFilterAction,
  entitySearchAction,
  entitySelectAction,
} from '../ui/ui.action';
import { STORE_UI_COMMON_KEY } from '../ui/ui.model';
import { FilterCategoryService } from './filterCategory.service';

export abstract class UIService<T extends IEntity, U extends IBiz> {
  //#region Private members

  private _searchKey: string;
  private _searchKey$: BehaviorSubject<string> = new BehaviorSubject(null);

  private _filters: any[];
  private _filters$: BehaviorSubject<
    any[]
    > = new BehaviorSubject([]);

  private _searchAction;
  private _selectAction;
  private _filterAction;

  //#endregion

  //#region Constructor

  constructor(
    protected _store: NgRedux<IAppState>,
    protected _entityType: EntityTypeEnum,
    protected _storeKey: string,
    protected _filterCategoryService: FilterCategoryService,
  ) {
    this._searchAction = entitySearchAction(this._entityType);
    this._selectAction = entitySelectAction(this._entityType);
    this._filterAction = entityFilterAction(this._entityType);

    this.getSearchKey(this._store).subscribe(value => {
      this._searchKey = value;
      this._searchKey$.next(value);
    });

    this.getFilters(this._store).subscribe(value => {
      this._filters = value;
      this._filters$.next(value);
    });
  }

  //#endregion

  //#region Public property

  public get searchKey(): string {
    return this._searchKey;
  }

  public get searchKey$(): Observable<string> {
    return this._searchKey$.asObservable();
  }

  public get filters$(): Observable<any[]> {
    return this._filters$.asObservable();
  }

  public get filters(): any[] {
    return this._filters;
  }

  //#endregion

  //#region Public methods

  public search(searchKey: string) {
    this._store.dispatch(this._searchAction(searchKey));
  }

  public select(bizModel: U) {
    this._store.dispatch(this._selectAction(bizModel.id));
  }

  public filter(filters: any[]) {
    this._store.dispatch(
      this._filterAction(filters),
    );
  }

  //#endregion

  //#region Private methods

  private getSearchKey(store: NgRedux<IAppState>): Observable<string> {
    return store.select<string>([
      STORE_KEY.ui,
      this._storeKey,
      STORE_UI_COMMON_KEY.searchKey,
    ]);
  }

  private getFilters(
    store: NgRedux<IAppState>,
  ): Observable<any[]> {
    return store.select<any[]>([
      STORE_KEY.ui,
      this._storeKey,
      STORE_UI_COMMON_KEY.filters,
    ]);
  }

  //#endregion
}
