import { noop, validateSelector, validateTemplate } from '../utilities';
import { applyInjectors } from '../injectors';
import { ElementConfig } from '../interfaces';

export const Element = (config: ElementConfig) => (
  target: CustomElementConstructor
) => {
  validateSelector(config);
  validateTemplate(config);

  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  // Crio o template base
  const template = document.createElement('template');

  // Atribui o template ao elemento
  template.innerHTML = config.template;

  // Intercepto atribuindo meu próprio hook
  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true);

    /** Coleta dependências para injeção */
    if (config.providers && this.onInject) {
      this.onInject(applyInjectors(config));
    }

    if (config.useShadow) {
      this.attachShadow({ mode: 'open' }).appendChild(clone);
    } else {
      this.appendChild(clone);
    }

    // Executo o original
    connectedCallback.call(this);

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

  customElements.define(config.selector, target);
};
