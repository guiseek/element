import { ElementExtendConfig } from './config';
import { noop } from './noop';



export const ElementExtend = (config: ElementExtendConfig) => (
  target: CustomElementConstructor
) => {
  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  target.prototype.connectedCallback = function (): void {
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

  customElements.define(config.selector, target, { extends: config.extend });
};
