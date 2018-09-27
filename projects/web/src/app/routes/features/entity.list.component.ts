import { Injector, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutDefaultComponent } from '@layouts/default/default.component';
import { TranslateService } from '@ngx-translate/core';
import { EntityFormComponent, EntityFormMode } from '@routes/features/entity.form.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { EntityService, ErrorService, IBiz, IEntity, SearchService, UIService } from '@store';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ModelConfig {
  nzWidth: number
}

export interface ComponentType {
  layoutComp: LayoutDefaultComponent;
  filterComp(): any;
  injector(): Injector;
  createEntity();
}

export interface FilterComp {
  currentFilters(): any[];
}

export abstract class EntityListComponent<T extends IEntity, U extends IBiz>
  implements ComponentType, OnInit, OnDestroy {
  //#region Protected members

  protected _destroyed$: Subject<boolean> = new Subject();

  //#endregion

  //#region Private members
  private _scrollBarWidth: number;
  private _layoutCmp: LayoutDefaultComponent;

  private _modelRef: NzModalRef;

  private _oKBtnOption = {
    label: this._translate.instant(`OK`),
    type: 'primary',
    disabled: (componentInstance: EntityFormComponent<T, U>) => {
      return componentInstance.isSubmitDisAllowed();
    },
  };

  private _cancelBtnOption = {
    label: this._translate.instant(`Cancel`),
    onClick: (componentInstance: EntityFormComponent<T, U>) => {
      this._modelRef.close();
    },
  };

  private _changeAction = (componentInstance: EntityFormComponent<T, U>) => {
    this._service
      .change(componentInstance.newEntity, componentInstance.filesToUpload)
      .subscribe(
        _ => {
          this._modelRef.close();
          this._messageService.success(this._translate.instant(`Changed`, { value: componentInstance.entityName }));
        },
        err => {
          this._messageService.error(this._translate.instant(`Error`, { value: componentInstance.entityName }));
        },
      );
  };

  private _deleteAction = (entity: U, name: string) => (
    componentInstance: ModalComponent,
  ) => {
    this._service.remove(entity).subscribe(
      _ => {
        this._modelRef.close();
        this._messageService.success(`${name} deleted`);
      },
      err => {
        this._messageService.error(
          `Can't delete ${this.entityDescription}, pls try later`,
        );
      },
    );
  };

  private _createAction = (componentInstance: EntityFormComponent<T, U>) => {
    this._service
      .add(componentInstance.newEntity, componentInstance.filesToUpload)
      .subscribe(
        _ => {
          this._modelRef.close();
          this._messageService.success(
            `${componentInstance.entityName} created`,
          );
        },
        err => {
          this._messageService.error(
            `Can't create ${this.entityDescription}, pls try later`,
          );
        },
      );
  };

  //#endregion

  //#region Constructor

  constructor(
    protected _route: ActivatedRoute,
    protected _uiService: UIService<T, U>,
    protected _errorService: ErrorService,
    protected _modalService: NzModalService,
    protected _messageService: NzMessageService,
    protected _searchService: SearchService,
    protected _service: EntityService<T, U>,
    protected _document: any,
    protected _renderer: Renderer2,
    protected _translate: TranslateService,
  ) {
    this._service.fetch();
    this._searchService
      .onSearchSubmit()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(value => {
        this._searchService.currentSearchKey = value.term;
        this._uiService.search(value.term);
      });
  }

  //#endregion

  //#region Protected property

  protected abstract get entityDescription(): string;
  protected abstract get entityName(): string;
  protected abstract get componentType(): any;
  protected abstract get newEntity(): U;

  abstract filterComp(): any;
  abstract injector(): Injector;

  //#endregion

  //#region Public property

  get layoutComp(): LayoutDefaultComponent {
    return this._layoutCmp;
  }

  set layoutComp(layout: LayoutDefaultComponent) {
    this._layoutCmp = layout;
  }

  //#endregion

  //#region Interface implementation


  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  ngOnInit(): void {
    this._searchService.currentSearchKey = this._uiService.searchKey;
  }

  createEntity() {
    this._scrollBarWidth = this.scrollBarWidth();
    this._modelRef = this._modalService.create({
      nzTitle: this._translate.instant(`City.Create`, { value: this.entityDescription }),
      nzContent: this.componentType,
      nzComponentParams: {
        mode: EntityFormMode.create,
        originalEntity: this.newEntity,
        ...this.createEntityParas,
      },
      nzFooter: [
        { ...this._oKBtnOption, ...{ onClick: this._createAction } },
        this._cancelBtnOption,
      ],
    });

    this._modelRef.afterOpen.subscribe(() => {
      // this.changeBodyOverflow();
    });
  }

  //#endregion

  //#region Public methods

  //#endregion

  //#region Private methods
  private _onReuseInit() {
    this._layoutCmp.entityListComp = this;
  }

  private hasBodyScrollBar(): boolean {
    return (
      window.document.body.scrollHeight >
      (window.innerHeight || window.document.documentElement.clientHeight)
    );
  }

  private scrollBarWidth(): number {
    return window.innerWidth - window.document.documentElement.clientWidth;
  }

  private changeBodyOverflow(): void {
    if (this.hasBodyScrollBar()) {
      // Adding padding-right only when body's scrollbar is able to shown up
      this._renderer.setStyle(
        this._document.body,
        'padding-right',
        `${this._scrollBarWidth}px`,
      );
      this._renderer.setStyle(this._document.body, 'overflow', 'hidden');
    }
  }

  private editEntity(entity: U, name: string) {
    this._modelRef = this._modalService.create({
      nzTitle: `Edit ${this.entityDescription} ${name}`,
      nzContent: this.componentType,
      nzComponentParams: {
        mode: EntityFormMode.edit,
        originalEntity: entity,
        ...this.editEntityParas,
      },
      nzFooter: [
        { ...this._oKBtnOption, ...{ onClick: this._changeAction } },
        this._cancelBtnOption,
      ],
      ...this.modelConfig
    });
  }

  private deleteEntity(entity: U, name: string) {
    this._modelRef = this._modalService.create({
      nzTitle: `Delete ${this.entityDescription} ${name}`,
      nzContent: ModalComponent,
      nzComponentParams: {
        modalHeader: `Confrim`,
        modalContent: `Delete ${name}, are you sure?`,
        ...this.deleteEntityParas,
      },
      nzFooter: [
        {
          ...this._oKBtnOption,
          ...{
            disabled: () => false,
            onClick: this._deleteAction(entity, name),
          },
        },
        {
          label: 'Cancel',
          onClick: () => {
            this._modelRef.close();
          },
        },
      ],
    });
  }

  //#endregion

  //#region Protected methods
  protected get createEntityParas(): any {
    return {};
  }

  protected get editEntityParas(): any {
    return {};
  }

  protected get deleteEntityParas(): any {
    return {};
  }

  protected get modelConfig(): ModelConfig {
    return null;
  }

  protected edit(entity: U) {
    this._scrollBarWidth = this.scrollBarWidth();
    this.editEntity(entity, entity[this.entityName]);
  }

  protected delete(entity: U) {
    this._scrollBarWidth = this.scrollBarWidth();
    this.deleteEntity(entity, entity[this.entityName]);
  }

  //#endregion
}
