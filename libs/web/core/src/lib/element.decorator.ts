import { ElementConfig } from './config';
import { noop } from './noop';

export const Element = (config: ElementConfig) => (
  target: CustomElementConstructor
) => {
  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  const template = document.createElement('template');

  template.innerHTML = config.template;

  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true);

    if (config.useShadow) {
      this.attachShadow({ mode: 'open' });
    } else {
      this.appendChild(clone);
    }

    connectedCallback.call(this);

    if (this.onConnect) {
      this.onConnect();
    }
  };
  target.prototype.disconnectedCallback = function (): void {

    disconnectedCallback.call(this);

    if (this.onDisconnect) {
      this.onDisconnect();
    }
  };

  customElements.define(config.selector, target);
};
