import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '@env/environment';
import { EntityFormComponent } from '@routes/features/entity.form.component';
import { CityService, ErrorService, ICity, ICityBiz } from '@store';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-city-form',
  templateUrl: 'city.form.component.html',
  styleUrls: ['./city.form.component.scss'],
})
export class CityFormComponent extends EntityFormComponent<ICity, ICityBiz> {
  //#region Private member

  //#endregion

  //#region Public member

  //#endregion

  //#region Public property

  //#endregion

  //#region Constructor

  constructor(
    protected _cityService: CityService,
    protected _errorService: ErrorService,
    protected _messageService: NzMessageService,
    protected _activeModal: NzModalRef,
  ) {
    super(_cityService, _errorService, _messageService, _activeModal);
  }

  //#endregion

  //#region Interface implementation

  get entityName(): string {
    if (this.newEntity) return this.newEntity.name;

    return '';
  }

  isDataInvalid(): boolean {
    return this.newEntity.thumbnail === '';
  }

  isChanged(): boolean {
    return !(
      this.newEntity.name === this.originalEntity.name &&
      this.newEntity.addressCode === this.originalEntity.addressCode &&
      this.newEntity.thumbnail === this.originalEntity.thumbnail
    );
  }

  //#endregion

  //#region Public method

  isNameInValid(name: FormControl): boolean {
    if (name && name.errors) return name.invalid && name.errors.required;

    return false;
  }

  isThumbnailInValid(): boolean {
    return !this.newEntity.thumbnail && this.fileList('thumbnail').length === 0;
  }

  beforeUpload = (file: any): boolean => {
    this.getBase64(file, (img: string) => {
      this.addFile('thumbnail', file);
      this.newEntity.thumbnail = img;
    });
    return false;
  };

  //#endregion

  //#region Private method
}
