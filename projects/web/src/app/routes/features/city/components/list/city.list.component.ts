import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ICityBiz,
  newCity,
  ICity,
  CityService,
  CityUIService,
  SearchService,
  ErrorService,
} from '@store';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { EntityListComponent } from '../../../entity.list.component';
import { CityFormComponent } from '../form/city.form.component';

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
  ) {
    super(
      _route,
      _cityUIService,
      _errorService,
      _modalService,
      _messageService,
      _searchService,
      _cityService,
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
    return 'City';
  }

  protected get entityName(): string {
    return 'name';
  }

  //#endregion

  //#region Public method

  //#endregion
}
