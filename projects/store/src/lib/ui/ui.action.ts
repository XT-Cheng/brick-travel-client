import { FluxStandardAction } from 'flux-standard-action';

import { EntityTypeEnum } from '../entity/entity.model';
import { IActionMetaInfo, IActionPayload } from '../store.action';

export enum UIActionTypeEnum {
  SELECT = 'UI:SELECT',
  SEARCH = 'UI:SEARCH',
  FILTER = 'UI:FILTER',
}

export interface IUIActionPayload extends IActionPayload {
  entityType: EntityTypeEnum;
  searchKey: string;
  selectedId: string;
  filters: any[];
}

// Flux-standard-action gives us stronger typing of our actions.
export type UIAction = FluxStandardAction<IUIActionPayload, IActionMetaInfo>;

export const defaultUIActionPayload: IUIActionPayload = {
  error: null,
  entityType: null,
  searchKey: '',
  selectedId: '',
  filters: [],
  actionId: '',
};

//#region Search Actions
export function entitySearchAction(entityType: EntityTypeEnum) {
  return (searchKey: string) => ({
    type: UIActionTypeEnum.SEARCH,
    meta: { progressing: false },
    payload: Object.assign({}, defaultUIActionPayload, {
      entityType: entityType,
      searchKey: searchKey,
    }),
  });
}
//#endregion

//#region Select Actions
export function entitySelectAction(entityType: EntityTypeEnum) {
  return (selectedId: string) => ({
    type: UIActionTypeEnum.SELECT,
    meta: { progressing: false },
    payload: Object.assign({}, defaultUIActionPayload, {
      entityType: entityType,
      selectedId: selectedId,
    }),
  });
}
//#endregion

//#region Filter Actions
export function entityFilterAction(entityType: EntityTypeEnum) {
  return (filters: any[]) => ({
    type: UIActionTypeEnum.FILTER,
    meta: { progressing: false },
    payload: Object.assign({}, defaultUIActionPayload, {
      entityType: entityType,
      filters: filters,
    }),
  });
}
//#endregion
