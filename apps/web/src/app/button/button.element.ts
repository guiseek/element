import { Attr, AttrChange, ElementExtend, OnChanges } from '@nx-web/core';
import './button.element.scss';

@ElementExtend({
  selector: 'el-button',
  extend: 'button',
})
export class ButtonElement
  extends HTMLButtonElement
  implements OnChanges<string> {
  public static get observedAttributes() {
    return ['mode'];
  }

  @Attr<string>()
  mode: 'primary' | 'secondary';

  onChanges({ next }: AttrChange<string>): void {
    this.setAttribute('class', `el-button-${next}`);
  }
}
