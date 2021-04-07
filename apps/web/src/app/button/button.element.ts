import './button.element.scss';

export class ButtonElement extends HTMLButtonElement {
  public static get observedAttributes() {
    return ['mode'];
  }

  private mode: 'primary' | 'secondary';

  attributeChangedCallback(name: string, prev: string, next: string) {
    if (prev !== next) {
      this.setAttribute('class', `el-button-${next}`)
    }
  }
}
customElements.define('el-button', ButtonElement, { extends: 'button' });
