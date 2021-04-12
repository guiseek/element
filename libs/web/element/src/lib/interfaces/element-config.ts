import { Config } from './config';

export interface ElementConfig extends Config {
  template: string;
  templateUrl?: string;
  useShadow?: boolean;
}
