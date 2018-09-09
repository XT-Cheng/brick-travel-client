import { FluxStandardAction } from 'flux-standard-action';
import * as ImmutableProxy from 'seamless-immutable';

const Immutable = (<any>ImmutableProxy).default || ImmutableProxy;

import { IActionMetaInfo, IActionPayload } from '../../store.action';
import {
  STORE_UI_LAYOUT_KEY,
  INIT_UI_LAYOUT_STATE,
  ILayoutUI,
  STORE_UI_LAYOUT_SIDEBAR_KEY,
} from '../model/layout.model';

export interface IUILayoutActionPayload extends IActionPayload {
  sidebar: { collapsed: boolean };
}

const defaultUILayoutActionPayload: IUILayoutActionPayload = {
  sidebar: { collapsed: false },
  error: null,
  actionId: '',
};

export type UILayoutAction = FluxStandardAction<
  IUILayoutActionPayload,
  IActionMetaInfo
>;

enum UILayoutActionTypeEnum {
  SIDEBAR_SET_COLLAPSE = 'UI:LAYOUT:SIDEBAR_SET_COLLAPSE',
}

export function sidebarCollapseAction(collapse: boolean): UILayoutAction {
  return {
    type: UILayoutActionTypeEnum.SIDEBAR_SET_COLLAPSE,
    meta: { progressing: false },
    payload: <any>Object.assign({}, defaultUILayoutActionPayload, {
      [STORE_UI_LAYOUT_KEY.sidebar]: {
        [STORE_UI_LAYOUT_SIDEBAR_KEY.collapsed]: collapse,
      },
    }),
  };
}

export function layoutReducer(
  state = INIT_UI_LAYOUT_STATE,
  action: UILayoutAction,
): ILayoutUI {
  switch (action.type) {
    case UILayoutActionTypeEnum.SIDEBAR_SET_COLLAPSE: {
      return Immutable(state).setIn(
        [STORE_UI_LAYOUT_KEY.sidebar, STORE_UI_LAYOUT_SIDEBAR_KEY.collapsed],
        action.payload[STORE_UI_LAYOUT_KEY.sidebar][
          STORE_UI_LAYOUT_SIDEBAR_KEY.collapsed
        ],
      );
    }
  }
  return state;
}
