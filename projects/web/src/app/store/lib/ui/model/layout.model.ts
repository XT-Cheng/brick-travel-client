export enum STORE_UI_LAYOUT_KEY {
  sidebar = 'sidebar',
}

export enum STORE_UI_LAYOUT_SIDEBAR_KEY {
  collapsed = 'collapsed',
}

export const INIT_UI_LAYOUT_STATE: ILayoutUI = {
  sidebar: {
    collapsed: false,
  },
};

export interface ILayoutUI {
  sidebar: ISidebarUI;
}

export interface ISidebarUI {
  collapsed: boolean;
}
