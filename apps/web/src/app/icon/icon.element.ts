import './icon.element.scss';

export class IconElement extends HTMLElement {
  public static get observedAttributes() {
    return ['href', 'use'];
  }

  private href: string;

  private use: string;


  observer: MutationObserver;

  connectedCallback() {
    this.innerHTML = `<svg> <use xlink:href=""></use> </svg>`;

    const svgUse = this.querySelector('use');

    const attrSwapped = () => {
      const href = `${this.href}#${this.use}`;
      svgUse.setAttribute('xlink:href', href);
    };

    attrSwapped();

    this.observer = new MutationObserver(attrSwapped);
    this.observer.observe(this, { attributes: true });
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    if (prev !== next) {
      this[name] = next;
    }
  }

  disconnectCallback() {
    this.observer.disconnect();
  }
}
customElements.define('el-icon', IconElement);