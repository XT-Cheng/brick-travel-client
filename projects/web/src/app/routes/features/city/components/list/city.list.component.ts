import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityFormComponent } from '@routes/features/city/components/form/city.form.component';
import { EntityListComponent } from '@routes/features/entity.list.component';
import { CityService, CityUIService, ErrorService, ICity, ICityBiz, newCity, SearchService } from '@store';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-city-list',
  templateUrl: 'city.list.component.html',
  styleUrls: ['./city.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityListComponent extends EntityListComponent<ICity, ICityBiz> {
  //#region Private members

  //#endregion

  //#region Constructor
  constructor(
    protected _route: ActivatedRoute,
    protected _cityUIService: CityUIService,
    protected _errorService: ErrorService,
    protected _searchService: SearchService,
    protected _modalService: NzModalService,
    public _cityService: CityService,
    protected _messageService: NzMessageService,
    @Inject(DOCUMENT) protected _document: any,
    protected _renderer: Renderer2,
    protected _translate: TranslateService,
  ) {
    super(
      _route,
      _cityUIService,
      _errorService,
      _modalService,
      _messageService,
      _searchService,
      _cityService,
      _document,
      _renderer,
      _translate
    );
  }
  //#endregion

  //#region Interface implementation
  protected get componentType(): any {
    return CityFormComponent;
  }

  protected get newEntity(): ICityBiz {
    return newCity();
  }

  protected get entityDescription(): string {
    return this._translate.instant(`City.Description`);
  }

  protected get entityName(): string {
    return 'name';
  }

  filterComp() {
    return null;
  }

  injector() {
    return null;
  }

  //#endregion

  //#region Public method

  //#endregion
}
