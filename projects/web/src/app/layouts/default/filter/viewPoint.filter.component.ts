import { Component } from '@angular/core';
import { CityService, ICityBiz } from '@store';

@Component({
    selector: 'app-vp-filter',
    templateUrl: 'viewPoint.filter.component.html',
    styleUrls: ['./viewPoint.filter.component.scss'],
})
export class ViewPointFilterComponent {
    //#region Private member

    //#endregion

    //#region Public member
    selected: ICityBiz;
    //#endregion

    //#region Public property

    //#endregion

    //#region Constructor

    constructor(
        protected _cityService: CityService,
    ) {
    }

    //#endregion

    //#region Public method

    //#endregion

    //#region Private method
}
