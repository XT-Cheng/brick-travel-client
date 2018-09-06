import { Component } from '@angular/core';
import { FilterComp } from '@routes/features/entity.list.component';
import { CityService, ICityBiz } from '@store';

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

  constructor(protected _cityService: CityService) { }

  //#endregion

  //#region Public method
  setFilter() {

  }
  //#endregion

  //#region Private method
}
