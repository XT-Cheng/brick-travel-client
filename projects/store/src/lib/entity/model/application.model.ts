import { IEntity } from '../entity.model';

export interface IApplicationMenu extends IEntity {
  name: string;
  link: string;
  icon: string;
  acl: string;
}
export interface IApplication extends IEntity {
  name: string;
  version: string;
  menus: string[];
}
