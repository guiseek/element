import { AttrChange } from './life-cycle';
import 'reflect-metadata';


export function Attr<T>(): any {
  return (target: any, property: string) => {
    target.attributeChangedCallback = function (
      name: keyof T,
      prev: string,
      next: string
    ) {
      this[name] = next;

      if (target.onChanges) {
        this.onChanges({ name, prev, next } as AttrChange);
      }
    };
  };
}
