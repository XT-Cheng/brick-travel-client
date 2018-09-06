import { ICommonUI } from '../ui.model';

export const INIT_UI_CITY_STATE: ICityUI = {
  selectedId: '',
  searchKey: '',
  filters: [],
};

export interface ICityUI extends ICommonUI { }
