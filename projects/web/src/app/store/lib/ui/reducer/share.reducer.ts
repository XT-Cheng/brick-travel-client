import * as ImmutableProxy from 'seamless-immutable';

const Immutable = (<any>ImmutableProxy).default || ImmutableProxy;

import { UIAction, UIActionTypeEnum } from '../ui.action';
import { STORE_UI_COMMON_KEY } from '../ui.model';

export function shareUIReducer(state, action: UIAction) {
  switch (action.type) {
    case UIActionTypeEnum.SELECT: {
      return Immutable(state).set(
        STORE_UI_COMMON_KEY.selectedId,
        action.payload.selectedId,
      );
    }
    case UIActionTypeEnum.SEARCH: {
      return Immutable(state).set(
        STORE_UI_COMMON_KEY.searchKey,
        action.payload.searchKey,
      );
    }
    case UIActionTypeEnum.FILTER: {
      return Immutable(state).set(
        STORE_UI_COMMON_KEY.filters,
        action.payload.filters,
      );
    }
  }
  return state;
}
