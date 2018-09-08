import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FilterComp } from '@routes/features/entity.list.component';
import { CityService, ICityBiz, ViewPointUIService } from '@store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-vp-filter',
  templateUrl: 'viewPoint.filter.component.html',
  styleUrls: ['./viewPoint.filter.component.scss'],
})
export class ViewPointFilterComponent implements FilterComp, OnDestroy {

  @Output()
  filterSelectedEvent: EventEmitter<void>;

  //#region Private member

  private _unsubscribe$ = new Subject<void>();
  private _currentFilters = [];

  //#endregion

  //#region Public member

  selected: ICityBiz;

  //#endregion

  //#region Public property

  //#endregion

  //#region Constructor

  constructor(protected _cityService: CityService, private _viewPointUIService: ViewPointUIService) {
    this.filterSelectedEvent = new EventEmitter<void>();

    this._viewPointUIService.filters$.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe(filters => {
      this._currentFilters = filters;
      filters.forEach(filter => {
        if (filter.cityId) {
          this.selected = this._cityService.byId(filter.cityId);
        }
      })
    });
  }

  //#endregion

  //#region Public method
  setFilter() {
    this._viewPointUIService.filter([{ cityId: this.selected ? this.selected.id : '' }]);
    this.filterSelectedEvent.emit();
  }

  compareEntityFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  currentFilters(): any[] {
    return this._currentFilters;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
  }

  //#endregion

  //#region Private method
}
