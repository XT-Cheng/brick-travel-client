import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest, map, takeUntil } from 'rxjs/operators';

import { EntityListComponent } from '../../../entity.list.component';
import { ViewPointFormComponent } from '../form/viewPoint.form.component';
import {
  IViewPoint,
  ViewPointService,
  ViewPointUIService,
  ICityBiz,
  IViewPointBiz,
  CityService,
  ErrorService,
  SearchService,
  newViewPoint,
} from '@store';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-vp-list',
  templateUrl: 'viewPoint.list.component.html',
  styleUrls: ['./viewPoint.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPointListComponent
  extends EntityListComponent<IViewPoint, IViewPointBiz>
  implements OnInit {
  //#region Private members

  private cityId$: BehaviorSubject<string> = new BehaviorSubject('');
  private _selectedCity: ICityBiz;

  //#endregion

  //#region Public members

  viewPointsByCity$: Observable<IViewPointBiz[]>;

  //#endregion

  //#region Constructor
  constructor(
    protected _route: ActivatedRoute,
    public _viewPointUIService: ViewPointUIService,
    protected _cityService: CityService,
    protected _errorService: ErrorService,
    protected _searchService: SearchService,
    protected _modalService: NzModalService,
    public _viewPointService: ViewPointService,
    protected _messageService: NzMessageService,
    @Inject(DOCUMENT) protected _document: any,
    protected _renderer: Renderer2,
  ) {
    super(
      _route,
      _viewPointUIService,
      _errorService,
      _modalService,
      _messageService,
      _searchService,
      _viewPointService,
      _document,
      _renderer,
    );

    this.viewPointsByCity$ = this._viewPointService.filteredAndSearched$.pipe(
      combineLatest(this.cityId$),
      map(([vps, cityId]) => {
        const ret = vps.filter(vp => {
          if (!cityId) {
            return true;
          }

          return vp.city.id === cityId;
        });
        return ret;
      }),
    );
  }

  //#endregion

  //#region Interface implementation
  ngOnInit(): void {
    super.ngOnInit();

    this._route.paramMap
      .pipe(takeUntil(this._destroyed$))
      .subscribe(paramMap => {
        this.cityId$.next(paramMap.get('city') || '');
      });

    this.cityId$
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        cityId => (this._selectedCity = this._cityService.byId(cityId)),
      );
  }

  protected get componentType(): any {
    return ViewPointFormComponent;
  }

  protected get newEntity(): IViewPointBiz {
    const viewPoint = newViewPoint();

    if (this._selectedCity) viewPoint.city = this._selectedCity;

    return viewPoint;
  }

  protected get entityDescription(): string {
    return 'ViewPoint';
  }

  protected get entityName(): string {
    return 'name';
  }

  //#endregion

  //#region Public method

  //#endregion

  //#region Protected method

  //#endregion
}
