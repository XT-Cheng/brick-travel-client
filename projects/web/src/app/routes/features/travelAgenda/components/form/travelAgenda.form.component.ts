import { EntityFormComponent, EntityFormMode } from '@routes/features/entity.form.component';
import {
  ITravelAgenda,
  ITravelAgendaBiz,
  TravelAgendaService,
  ErrorService,
  TravelAgendaUIService
} from '@store';
import { Component } from '@angular/core';
import { UploadFile, NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { FormControl } from '@angular/forms';
import { MapModalComponent } from '@routes/features/viewPoint/components/mapModal.component';

@Component({
  selector: 'app-ta-form',
  templateUrl: 'travelAgenda.form.component.html',
  styleUrls: ['./travelAgenda.form.component.scss'],
})
export class TravelAgendaFormComponent extends EntityFormComponent<ITravelAgenda, ITravelAgendaBiz> {
  //#region Private member

  //#endregion

  //#region Protected member

  //#endregion

  //#region Public member

  coverFileList: UploadFile[];

  //#endregion

  //#region Protected property

  //#endregion

  //#region Constructor

  constructor(
    public _travelAgendaService: TravelAgendaService,
    public _travelAgendaUIService: TravelAgendaUIService,
    protected _errorService: ErrorService,
    protected _messageService: NzMessageService,
    protected _activeModal: NzModalRef,
  ) {
    super(_travelAgendaService, _errorService, _messageService, _activeModal);

    this.addFile('cover');

    this.coverFileList = this.fileList('cover');
  }

  //#region Interface implementation

  isDataInvalid(): boolean {
    return (
      this.newEntity.cover === ''
    );
  }

  get entityName(): string {
    if (this.newEntity) return this.newEntity.name;

    return '';
  }

  isChanged(): boolean {
    if (this.mode === EntityFormMode.create) {
      return true;
    }

    const changed = !(
      this.newEntity.name === this.originalEntity.name &&
      this.newEntity.cover === this.originalEntity.cover
    );

    if (changed) {
      return changed;
    }

    return false;
  }

  //#endregion

  //#region Protected method
  protected copyEntity(originalEntity: ITravelAgendaBiz): ITravelAgendaBiz {
    const newEntity = <ITravelAgendaBiz>JSON.parse(JSON.stringify(originalEntity, (key, value) => {
      if (key !== 'travelAgenda' && key !== 'dailyTrip') {
        return value;
      }

      return undefined;
    }));

    newEntity.dailyTrips.map(dt => {
      dt.travelAgenda = newEntity;
      dt.travelViewPoints.map(tvp => {
        tvp.dailyTrip = dt;
      })
    });

    return newEntity;
  }

  protected onOriginalEntitySet() {
    const cover = {
      uid: this.originalEntity.cover,
      size: 0,
      name: this.originalEntity.cover,
      type: '',
      thumbUrl: this.originalEntity.cover,
    };

    this.coverFileList.push(cover);
    this.addFile('cover', cover);
  }

  //#endregion

  //#region Public method
  beforeCoverUpload = (file: any): boolean => {
    this.getBase64(file, (img: string) => {
      this.addFile('cover', file);
      file.status = 'done';
      file.thumbUrl = img;
      this.newEntity.cover = img;
      this.coverFileList = this.fileList('cover').slice();
    });
    return false;
  };

  beforeCoverRemove = (file: any): boolean => {
    this.removeFile('cover', file.uid);
    this.newEntity.cover = '';
    this.coverFileList = this.fileList('cover').slice();
    return true;
  };

  isRequiredInValid(control: FormControl): boolean {
    if (control && control.errors)
      return control.invalid && control.errors.required;

    return false;
  }

  isCoverInValid(): boolean {
    return !this.newEntity.cover && this.fileList('cover').length === 0;
  }

  //#endregion

  //#region Private method

  //#endregion
}
