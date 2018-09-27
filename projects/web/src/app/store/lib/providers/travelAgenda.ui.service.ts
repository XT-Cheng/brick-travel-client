import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IDailyTripBiz, ITravelAgendaBiz, ITravelViewPointBiz } from '../bizModel/model/travelAgenda.biz.model';
import { EntityTypeEnum } from '../entity/entity.model';
import { ITravelAgenda } from '../entity/model/travelAgenda.model';
import { IAppState } from '../store.model';
import { defaultUIAgendaActionPayload, UITravelAgendaActionTypeEnum } from '../ui/reducer/travelAgenda.reducer';
import { STORE_UI_KEY } from '../ui/ui.model';
import { FilterCategoryService } from './filterCategory.service';
import { UIService } from './ui.service';

//#region Select Actions
export function dailyTripSelectAction(selectedDailyTripId: string) {
  return {
    type: UITravelAgendaActionTypeEnum.SELECT_DAILYTRIP,
    meta: { progressing: false },
    payload: Object.assign({}, defaultUIAgendaActionPayload, {
      entityType: EntityTypeEnum.TRAVELAGENDA,
      selectedDailyTripId: selectedDailyTripId
    })
  };
}

export function travelViewPointSelectAction(selectedTravelViewPointId: string) {
  return {
    type: UITravelAgendaActionTypeEnum.SELECT_TRAVELVIEWPOINT,
    meta: { progressing: false },
    payload: Object.assign({}, defaultUIAgendaActionPayload, {
      entityType: EntityTypeEnum.TRAVELAGENDA,
      selectedTravelViewPointId: selectedTravelViewPointId
    })
  };
}
//#endregion

@Injectable()
export class TravelAgendaUIService extends UIService<
ITravelAgenda,
ITravelAgendaBiz
> {
  //#region Constructor

  constructor(
    protected _store: NgRedux<IAppState>,
    protected _filterCategoryService: FilterCategoryService,
  ) {
    super(
      _store,
      EntityTypeEnum.TRAVELAGENDA,
      STORE_UI_KEY.travelAgenda,
      _filterCategoryService,
    );
  }

  //#endregion

  public selectDailyTrip(dt: IDailyTripBiz) {
    this._store.dispatch(dailyTripSelectAction(dt.id));
  }

  public selectTravelViewPoint(tvp: ITravelViewPointBiz) {
    this._store.dispatch(travelViewPointSelectAction(tvp.id));
  }
}
