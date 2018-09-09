import { IBiz } from '../biz.model';

export interface IApplicationMenuBiz extends IBiz {
  name: string;
  link: string;
  icon: string;
  acl: string;
}

export interface IApplicationBiz extends IBiz {
  name: string;
  version: string;
  menus: IApplicationMenuBiz[];
}
