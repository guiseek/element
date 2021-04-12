import { noop, validateSelector } from '../utilities';
import { RenderElementConfig } from '../interfaces';
import { applyInjectors } from '../injectors';

export const RenderElement = (config: RenderElementConfig) => (
  target: CustomElementConstructor
) => {
  validateSelector(config);

  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  const template = document.createElement('template');

  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true);

    // Vinculo o template criado ao web component
    if (config.useShadow) {
      this.attachShadow({ mode: 'open' }).appendChild(clone);
    } else {
      this.appendChild(clone);
    }

    this.innerHTML = this.render();

    // Executo o original
    connectedCallback.call(this);

    /** Coleta dependências para injeção */
    if (config.providers && this.onInject) {
      this.onInject(applyInjectors(config));
    }

    // Executo hook criado
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
  customElements.define(config.selector, target);
};
