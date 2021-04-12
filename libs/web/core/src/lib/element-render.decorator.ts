import { ElementRenderConfig } from './config';
import { noop } from './noop';

export const ElementRender = (config: ElementRenderConfig) => (
  target: CustomElementConstructor
) => {
  // Original salvo em referência
  const connectedCallback = target.prototype.connectedCallback ?? noop;
  const disconnectedCallback = target.prototype.disconnectedCallback ?? noop;

  // Crio o template base
  const template = document.createElement('template');


  // Intercepto atribuindo meu próprio hook
  target.prototype.connectedCallback = function (): void {
    const clone = document.importNode(template.content, true);

    // Adiciono o template base
    if (config.useShadow) {
      this.attachShadow({ mode: 'open' }).appendChild(clone);
    } else {
      this.appendChild(clone);
    }

    // Atribui o retorno do método ao template
    if (this.render) {
      this.innerHTML = this.render();
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

  // Por fim, defino o web component configurado
  customElements.define(config.selector, target);
};
