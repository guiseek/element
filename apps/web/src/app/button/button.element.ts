import { Attr, AttrChange, ExtendElement, OnChanges } from '@nx-web/element';
import './button.element.scss';

type InputType = 'primary' | 'secondary';

@ExtendElement({
  selector: 'el-button',
  extend: 'button',
})
export class ButtonElement extends HTMLButtonElement implements OnChanges {
  static observedAttributes = ['mode'];

  @Attr() public mode: InputType = 'primary';

  onChanges({ next }: AttrChange<InputType>): void {
    this.setAttribute('class', `el-button-${next}`);
  }
}
