import { RenderElement, OnConnect, OnChanges, Attr } from '@nx-web/element';

@RenderElement({
  selector: 'el-icon',
})
export class IconElement extends HTMLElement implements OnConnect, OnChanges {
  static observedAttributes = ['href', 'use'];

  @Attr() public href: string;

  @Attr() public use: string;

  private useEl: SVGUseElement;

  render() {
    return `<svg> <use xlink:href=""></use> </svg>`;
  }

  onConnect(): void {
    this.useEl = this.querySelector('use');
    this.attrSwapped();
  }

  onChanges(): void {
    if (this.useEl) this.attrSwapped();
  }

  attrSwapped() {
    const href = `${this.href}#${this.use}`;
    this.useEl.setAttribute('xlink:href', href);
  }
}
