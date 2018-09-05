import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Renderer2,
  NgModuleFactory,
  Compiler,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

import { EntityListComponent } from '../../../entity.list.component';
import { ViewPointFormComponent } from '../form/viewPoint.form.component';
import { ViewPointFilterComponent } from '../filter/viewPoint.filter.component';
import { ViewPointModule } from '../../viewPoint.module';

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
  private _moduleFactory: any;

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
    private _compiler: Compiler,
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

    this._moduleFactory = this._compiler.compileModuleSync(ViewPointModule);

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

  filterComp() {
    return ViewPointFilterComponent;
  }

  moduleFactory() {
    return this._moduleFactory;
  }
  //#endregion

  //#region Protected method

  //#endregion
}
