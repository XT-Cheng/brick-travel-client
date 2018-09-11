import { ChangeDetectionStrategy, Component, Renderer2, Inject, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

import { EntityListComponent } from '../../../entity.list.component';
import {
  ITravelAgenda,
  ITravelAgendaBiz,
  SearchService,
  ViewPointService, ErrorService, TravelAgendaService, TravelAgendaUIService, newTravelAgenda
} from '@store';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { TravelAgendaFormComponent } from '@routes/features/travelAgenda/components/form/travelAgenda.form.component';

@Component({
  selector: 'bt-ta-list',
  templateUrl: 'travelAgenda.list.component.html',
  styleUrls: ['./travelAgenda.list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TravelAgendaListComponent extends EntityListComponent<ITravelAgenda, ITravelAgendaBiz> {
  //#region Private members

  //#endregion

  //#region Private members

  //#endregion

  //#region Constructor
  constructor(protected _route: ActivatedRoute,
    protected _searchService: SearchService, protected _modalService: NzModalService, protected _viewPointService: ViewPointService,
    protected _errorService: ErrorService, @Inject(DOCUMENT) protected _document: any,
    private _injector: Injector,
    protected _renderer: Renderer2,
    public _travelAgendaService: TravelAgendaService, protected _travelAgendaUIService: TravelAgendaUIService,
    protected _messageService: NzMessageService, protected _translate: TranslateService, ) {
    super(_route, _travelAgendaUIService, _errorService, _modalService, _messageService, _searchService, _travelAgendaService, _document,
      _renderer,
      _translate);
  }

  //#endregion

  //#region Interface implementation

  protected get componentType(): any {
    return TravelAgendaFormComponent;
  }

  protected get newEntity(): ITravelAgendaBiz {
    return newTravelAgenda();
  }

  protected get entityDescription(): string {
    return 'Travel Agenda';
  }

  protected get entityName(): string {
    return 'name';
  }

  filterComp() {
    return null;
  }

  injector() {
    return this._injector;
  }
  //#endregion

  //#region Public method

  //#endregion
}
