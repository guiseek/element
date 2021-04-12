import { injector } from './injector';
import 'reflect-metadata';

export function Inject<T>(entity?: new () => T): any {
  return (target: any, property: keyof T) => {
    if (!(target[property] instanceof entity)) {
      target[property] = injector.get(entity);
      console.log(target[property]);
    }

    console.log('target: ', target);
    console.log('property: ', property);

    // target.attributeChangedCallback = function (
    //   name: string,
    //   prev: string,
    //   next: string
    // ) {
    //   if (prev !== next) {
    //     this[name] = next;
    //   }
    //   if (target.onChanges) {
    //     target.onChanges();
    //   }
    // };
  };
}
