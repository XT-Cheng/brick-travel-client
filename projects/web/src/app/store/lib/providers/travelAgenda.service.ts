/// <reference path="../../amap.d.ts" />
import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { denormalize, normalize } from 'normalizr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as ImmutableProxy from 'seamless-immutable';

import { STORE_UI_TRAVELAGENDA_KEY } from '../../../../../../store/src/lib/ui/model/travelAgenda.model';
import {
  IDailyTripBiz,
  ITravelAgendaBiz,
  ITravelViewPointBiz,
  newDailiyTrip,
  newTravelViewPoint,
} from '../bizModel/model/travelAgenda.biz.model';
import { IViewPointBiz } from '../bizModel/model/viewPoint.biz.model';
import { DirtyTypeEnum } from '../dirty/dirty.action';
import { EntityActionTypeEnum, getEntityKey, getUIKey } from '../entity/entity.action';
import { EntityTypeEnum, INIT_ENTITY_STATE } from '../entity/entity.model';
import { dailyTripSchema, travelAgendaSchema, travelViewPointSchema } from '../entity/entity.schema';
import { ITravelAgenda } from '../entity/model/travelAgenda.model';
import { StoreConfig } from '../store.config';
import { IAppState, STORE_KEY } from '../store.model';
import { EntityService } from './entity.service';
import { ErrorService } from './error.service';
import { TransportationCategoryService } from './transportationCategory.service';
import { TravelAgendaUIService } from './travelAgenda.ui.service';


const Immutable = (<any>ImmutableProxy).default || ImmutableProxy;
@Injectable()
export class TravelAgendaService extends EntityService<
ITravelAgenda,
ITravelAgendaBiz
> {
  //#region Constructor
  constructor(
    protected _http: HttpClient,
    protected _errorService: ErrorService,
    private _transportationCategoryService: TransportationCategoryService,
    private _travelAgendaUISrv: TravelAgendaUIService,
    protected _store: NgRedux<IAppState>,
    protected _config: StoreConfig,
  ) {
    super(
      _http,
      _store,
      EntityTypeEnum.TRAVELAGENDA,
      travelAgendaSchema,
      `travelAgendas`,
      _errorService,
      _travelAgendaUISrv,
      _config,
    );

    this.getSelectedDailyTrip(this._store).subscribe(value => {
      this._selectedDailyTrip = value;
      this._selectedDailyTrip$.next(value);
    });

    this.getSelectedTravelViewPoint(this._store).subscribe(value => {
      this._selectedTravelViewPoint = value;
      this._selectedTravelViewPoint$.next(value);
    });
  }
  //#endregion

  //#region Protected member

  protected _selectedDailyTrip: IDailyTripBiz;
  protected _selectedDailyTrip$: BehaviorSubject<IDailyTripBiz> = new BehaviorSubject(null);

  protected _selectedTravelViewPoint: ITravelViewPointBiz;
  protected _selectedTravelViewPoint$: BehaviorSubject<ITravelViewPointBiz> = new BehaviorSubject(null);

  //#endregion

  //#region Private methods
  private getSelectedDailyTripId(store: NgRedux<IAppState>): Observable<string> {
    return store.select<string>([
      STORE_KEY.ui,
      getUIKey(EntityTypeEnum.TRAVELAGENDA),
      STORE_UI_TRAVELAGENDA_KEY.selectedDailyTripId,
    ]);
  }

  private getSelectedDailyTrip(store: NgRedux<IAppState>): Observable<IDailyTripBiz> {
    return this.getSelectedDailyTripId(store).pipe(
      switchMap(id => {
        return store.select<IDailyTripBiz>([
          STORE_KEY.entities,
          getEntityKey(EntityTypeEnum.DAILYTRIP),
          id,
        ]);
      }),
      map(ct => {
        return ct
          ? denormalize(
            ct.id,
            dailyTripSchema,
            Immutable(store.getState().entities).asMutable({ deep: true }),
          )
          : null;
      }),
    );
  }

  private getSelectedTravelViewPointId(store: NgRedux<IAppState>): Observable<string> {
    return store.select<string>([
      STORE_KEY.ui,
      getUIKey(EntityTypeEnum.TRAVELAGENDA),
      STORE_UI_TRAVELAGENDA_KEY.selectedTravelViewPointId,
    ]);
  }

  private getSelectedTravelViewPoint(store: NgRedux<IAppState>): Observable<ITravelViewPointBiz> {
    return this.getSelectedTravelViewPointId(store).pipe(
      switchMap(id => {
        return store.select<ITravelViewPointBiz>([
          STORE_KEY.entities,
          getEntityKey(EntityTypeEnum.TRAVELVIEWPOINT),
          id,
        ]);
      }),
      map(ct => {
        return ct
          ? denormalize(
            ct.id,
            travelViewPointSchema,
            Immutable(store.getState().entities).asMutable({ deep: true }),
          )
          : null;
      }),
    );
  }

  //#endregion

  //#region Protected methods

  protected matchSearch(bizModel: ITravelAgendaBiz, searchKey: any): boolean {
    return bizModel.name.indexOf(searchKey) !== -1;
  }

  protected matchFilter(bizModel: ITravelAgendaBiz, filters: any[]): boolean {
    return true;
  }

  protected beforeSend(bizModel: ITravelAgendaBiz): any {
    return {
      id: bizModel.id,
      name: bizModel.name,
      user: bizModel.user,
      cover: bizModel.cover,
      dailyTrips: bizModel.dailyTrips.map(dailyTrip => {
        return {
          id: dailyTrip.id,
          travelAgenda: bizModel.id,
          lastViewPoint: dailyTrip.lastViewPoint
            ? dailyTrip.lastViewPoint.id
            : null,
          travelViewPoints: dailyTrip.travelViewPoints.map(travelViewPoint => {
            return {
              id: travelViewPoint.id,
              dailyTrip: dailyTrip.id,
              viewPoint: travelViewPoint.viewPoint.id,
              distanceToNext: travelViewPoint.distanceToNext,
              transportationToNext: travelViewPoint.transportationToNext
                ? travelViewPoint.transportationToNext.id
                : null,
            };
          }),
        };
      }),
    };
  }

  // protected afterReceive(record: any) {
  // return {
  //   id: record.id,
  //   name: record.name,
  //   user: record.user,
  //   cover: record.cover,
  //   dailyTrips: record.dailyTrips.map(dailyTrip => {
  //     return {
  //       id: dailyTrip.id,
  //       travelAgenda: record.id,
  //       lastViewPoint: dailyTrip.lastViewPoint
  //         ? dailyTrip.lastViewPoint.id
  //           ? dailyTrip.lastViewPoint.id
  //           : dailyTrip.lastViewPoint
  //         : null,
  //       travelViewPoints: dailyTrip.travelViewPoints.map(travelViewPoint => {
  //         return {
  //           id: travelViewPoint.id,
  //           dailyTrip: dailyTrip.id,
  //           viewPoint: travelViewPoint.viewPoint.id
  //             ? travelViewPoint.viewPoint.id
  //             : travelViewPoint.viewPoint,
  //           distanceToNext: travelViewPoint.distanceToNext,
  //           transportationToNext: travelViewPoint.transportationToNext
  //             ? travelViewPoint.transportationToNext.id
  //               ? travelViewPoint.transportationToNext.id
  //               : travelViewPoint.transportationToNext
  //             : null,
  //         };
  //       }),
  //     };
  //   }),
  // };
  // return record;
  // return {
  //   id: record.id,
  //   name: record.name,
  //   user: record.user,
  //   cover: record.cover,
  //   dailyTrips: record.dailyTrips.map(dailyTrip => {
  //     return {
  //       id: dailyTrip.id,
  //       travelAgenda: record.id,
  //       lastViewPoint: dailyTrip.lastViewPoint
  //         ? dailyTrip.lastViewPoint.id
  //           ? dailyTrip.lastViewPoint.id
  //           : dailyTrip.lastViewPoint
  //         : null,
  //       travelViewPoints: dailyTrip.travelViewPoints.map(travelViewPoint => {
  //         return {
  //           id: travelViewPoint.id,
  //           dailyTrip: dailyTrip.id,
  //           viewPoint: travelViewPoint.viewPoint,
  //           distanceToNext: travelViewPoint.distanceToNext,
  //           transportationToNext: travelViewPoint.transportationToNext
  //             ? travelViewPoint.transportationToNext.id
  //               ? travelViewPoint.transportationToNext.id
  //               : travelViewPoint.transportationToNext
  //             : null,
  //         };
  //       }),
  //     };
  //   }),
  // };
  // }
  //#endregion

  //#region Public methods
  public add(
    biz: ITravelAgendaBiz,
    files: Map<string, any[]> = null,
  ): Observable<ITravelAgendaBiz> {
    return this.insertEntity(biz, files, true);
  }

  public change(
    biz: ITravelAgendaBiz,
    files: Map<string, any[]> = null,
  ): Observable<ITravelAgendaBiz> {
    return this.updateEntity(biz, files, true);
  }

  public remove(biz: ITravelAgendaBiz): Observable<ITravelAgendaBiz> {
    return this.deleteEntity(biz, true);
  }

  public dailyTripById(id: string): IDailyTripBiz {
    return denormalize(
      id,
      dailyTripSchema,
      Immutable(this._store.getState().entities).asMutable({ deep: true }),
    );
  }

  public travelViewPointById(id: string): ITravelViewPointBiz {
    return denormalize(
      id,
      travelViewPointSchema,
      Immutable(this._store.getState().entities).asMutable({ deep: true }),
    );
  }

  public addTravelViewPoint(viewPoint: IViewPointBiz, dailyTripId: string) {
    const dailyTrip = this.dailyTripById(dailyTripId);
    if (!dailyTrip) {
      throw new Error(`DailyTrip Id ${dailyTripId} not exist!`);
    }

    const travelViewPoint = newTravelViewPoint(viewPoint, dailyTrip);
    dailyTrip.travelViewPoints.push(travelViewPoint);

    this.caculateDistance(dailyTrip);

    travelViewPoint.dailyTrip = dailyTrip;
    const entities = normalize(
      this.afterReceive(dailyTrip.travelAgenda),
      travelAgendaSchema,
    ).entities;

    this._store.dispatch(
      this.succeededAction(
        EntityActionTypeEnum.UPDATE,
        Object.assign({}, INIT_ENTITY_STATE, entities),
      ),
    );
    this._store.dispatch(
      this.addDirtyAction(dailyTrip.travelAgenda.id, DirtyTypeEnum.UPDATED),
    );
  }

  public addDailyTrip(travelAgendaId: string) {
    const travelAgenda = this.byId(travelAgendaId);
    if (!travelAgenda) {
      throw new Error(`TravelAgenda Id ${travelAgendaId} not exist!`);
    }

    const dailyTrip = newDailiyTrip(travelAgenda);
    travelAgenda.dailyTrips.push(dailyTrip);

    this.caculateDistance(
      travelAgenda.dailyTrips[travelAgenda.dailyTrips.length - 1],
    );

    const entities = normalize(
      this.afterReceive(travelAgenda),
      travelAgendaSchema,
    ).entities;

    this._store.dispatch(
      this.succeededAction(
        EntityActionTypeEnum.UPDATE,
        Object.assign({}, INIT_ENTITY_STATE, entities),
      ),
    );
    this._store.dispatch(
      this.addDirtyAction(travelAgenda.id, DirtyTypeEnum.UPDATED),
    );
  }

  public get selectedDailyTrip(): IDailyTripBiz {
    return this._selectedDailyTrip;
  }

  public get selectedDailyTrip$(): Observable<IDailyTripBiz> {
    return this._selectedDailyTrip$.asObservable();
  }

  public get selectedTravelViewPoint(): ITravelViewPointBiz {
    return this._selectedTravelViewPoint;
  }

  public get selectedTravelViewPoint$(): Observable<ITravelViewPointBiz> {
    return this._selectedTravelViewPoint$.asObservable();
  }

  //#endregion

  //#region Private methods

  private caculateDistance(dailyTrip: IDailyTripBiz) {
    for (let i = 0; i < dailyTrip.travelViewPoints.length; i++) {
      const vp = dailyTrip.travelViewPoints[i];
      const vpNext = dailyTrip.travelViewPoints[i + 1];

      if (vpNext) {
        vp.distanceToNext = Math.round(
          new AMap.LngLat(
            vp.viewPoint.longtitude,
            vp.viewPoint.latitude,
          ).distance(
            new AMap.LngLat(
              vpNext.viewPoint.longtitude,
              vpNext.viewPoint.latitude,
            ),
          ),
        );

        if (vp.transportationToNext === null) {
          vp.transportationToNext = this._transportationCategoryService.default;
        }
      } else {
        vp.distanceToNext = -1;
        vp.transportationToNext = null;
      }
    }

    if (dailyTrip.travelViewPoints.length > 0) {
      dailyTrip.travelViewPoints[
        dailyTrip.travelViewPoints.length - 1
      ].transportationToNext = null;
      dailyTrip.lastViewPoint =
        dailyTrip.travelViewPoints[dailyTrip.travelViewPoints.length - 1];
    } else {
      dailyTrip.lastViewPoint = null;
    }
  }

  //#endregion
}
