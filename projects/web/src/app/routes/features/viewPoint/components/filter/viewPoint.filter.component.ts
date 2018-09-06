import { Component } from '@angular/core';
import { FilterComp } from '@routes/features/entity.list.component';
import { CityService, ICityBiz, ViewPointUIService } from '@store';

@Component({
  selector: 'app-vp-filter',
  templateUrl: 'viewPoint.filter.component.html',
  styleUrls: ['./viewPoint.filter.component.scss'],
})
export class ViewPointFilterComponent implements FilterComp {
  //#region Private member

  //#endregion

  //#region Public member

  selected: ICityBiz;

  //#endregion

  //#region Public property

  //#endregion

  //#region Constructor

  constructor(protected _cityService: CityService, private _viewPointUIService: ViewPointUIService) { }

  //#endregion

  //#region Public method
  setFilter() {
    this._viewPointUIService.filter(null);
  }
  //#endregion

  //#region Private method
}
