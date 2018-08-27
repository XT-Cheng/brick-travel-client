import { IEntity } from '../entity.model';

export interface IApplication extends IEntity {
  name: string;
  version: string;
}
