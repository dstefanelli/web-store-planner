import { Template } from './template';

export interface Grid {
  id: string;
  name: string;
  rows: Row;
}

export interface Row {
  templates: Template[];
}
