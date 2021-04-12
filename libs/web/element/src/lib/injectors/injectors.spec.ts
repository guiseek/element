import { OnInject } from '../interfaces';
import { Element } from './../decorators/element';
import { injector } from './injector';

class Service {
  get(url: string) {
    return url;
  }
}

@Element({
  selector: 'el-component',
  providers: [Service],
  template: `<h1>Component</h1>`,
})
class Component extends HTMLElement implements OnInject<[Service]> {
  service: Service;
  onInject([service]: [Service]): void {
    this.service = service;
  }
}

describe('webCore', () => {
  injector.set(Service);
  let component: Component;

  beforeEach(() => {
    component = new Component();
  });

  it('should work', () => {
    const service = injector.get(Service);
    expect(service).toBeInstanceOf(Service);
  });

  it('should work', () => {
    const service = injector.get(Service);
    expect(service.get('url.com')).toEqual('url.com');
  });

  it('should work', async () => {
    customElements
      .whenDefined('el-component')
      .then(() => {
        expect(component.service).toBeDefined();
        expect(component.service.get('url.com')).toEqual('url.com');
      })
      .catch((e) => e);
  });

  it('should work', async () => {
    customElements
      .whenDefined('el-component')
      .then(() => {
        expect(component.service.get('url.com')).toEqual('url.com');
      })
      .catch((e) => e);
  });
});
