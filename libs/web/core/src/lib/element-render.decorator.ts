import { ElementRenderConfig } from './config';
import { noop } from './noop';

export const ElementRender = (config: ElementRenderConfig) => (
  target: CustomElementConstructor
) => {
  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  const render = target.prototype.render;

  const template = document.createElement('template');

  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true);

    if (config.useShadow) {
      this.attachShadow({ mode: 'open' });
    } else {
      this.appendChild(clone);
    }

    if (this.render) {
      this.innerHTML = render()
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
