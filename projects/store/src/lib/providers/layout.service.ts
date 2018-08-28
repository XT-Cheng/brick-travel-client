import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState, STORE_KEY } from '../store.model';
import { STORE_UI_KEY } from '../ui/ui.model';
import {
  STORE_UI_LAYOUT_KEY,
  STORE_UI_LAYOUT_SIDEBAR_KEY,
} from '../ui/model/layout.model';
import { sidebarCollapseAction } from '../ui/reducer/layout.reducer';

@Injectable()
export class LayoutService {
  //#region Private member

  private _sidebarCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  private _sidebarCollapsed: boolean;

  //#endregion

  //#region Constructor
  constructor(protected _store: NgRedux<IAppState>) {
    this.getSidebarCollapsed(this._store).subscribe(value => {
      this._sidebarCollapsed = value;
      this._sidebarCollapsed$.next(value);
    });
  }
  //#endregion

  //#region Public methods
  public get sidebarCollapsed$(): Observable<boolean> {
    return this._sidebarCollapsed$.asObservable();
  }

  public setSidebarCollapsed(collapsed: boolean) {
    this._store.dispatch(sidebarCollapseAction(collapsed));
  }

  public get sidebarCollapsed(): boolean {
    return this._sidebarCollapsed;
  }

  //#endregion

  //#region Private methods
  private getSidebarCollapsed(store: NgRedux<IAppState>): Observable<boolean> {
    return store.select<boolean>([
      STORE_KEY.ui,
      STORE_UI_KEY.layout,
      STORE_UI_LAYOUT_KEY.sidebar,
      STORE_UI_LAYOUT_SIDEBAR_KEY.collapsed,
    ]);
  }
  //#endregion
}
