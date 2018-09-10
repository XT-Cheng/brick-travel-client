import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityListComponent } from '@routes/features/entity.list.component';
import { ViewPointFilterComponent } from '@routes/features/viewPoint/components/filter/viewPoint.filter.component';
import { ViewPointFormComponent } from '@routes/features/viewPoint/components/form/viewPoint.form.component';
import {
  CityService,
  ErrorService,
  ICityBiz,
  IViewPoint,
  IViewPointBiz,
  newViewPoint,
  SearchService,
  ViewPointService,
  ViewPointUIService,
} from '@store';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest, map, takeUntil } from 'rxjs/operators';
import { ALAIN_I18N_TOKEN, AlainI18NService } from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';

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
    private _injector: Injector,
    protected _translate: TranslateService,
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
      _translate
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
    return this._translate.instant(`ViewPoint.Description`);
  }

  protected get entityName(): string {
    return 'name';
  }

  //#endregion

  //#region Public method

  filterComp() {
    return ViewPointFilterComponent;
  }

  injector() {
    return this._injector;
  }
  //#endregion

  //#region Protected method

  //#endregion
}
