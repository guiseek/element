import { noop, validateExtend, validateSelector } from './../utilities';
import { ExtendElementConfig } from '../interfaces';
import { applyInjectors } from '../injectors';

export const ExtendElement = (config: ExtendElementConfig) => (
  target: CustomElementConstructor
) => {
  validateSelector(config);
  validateExtend(config);

  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  // Intercepto atribuindo meu próprio hook
  target.prototype.connectedCallback = function (): void {

    /** Coleta dependências para injeção */
    if (config.providers && this.onInject) {
      this.onInject(applyInjectors(config));
    }

    // Executo o original
    connectedCallback.call(this);

    if (this.onConnect) {
      this.onConnect();
    }
  };

  target.prototype.disconnectedCallback = function (): void {
    // Executo o original
    disconnectedCallback.call(this);

    // Executo hook criado
    if (this.onDisconnect) {
      this.onDisconnect();
    }
  };
  // Por fim, defino o web component configurado
  customElements.define(config.selector, target, { extends: config.extend });
};
