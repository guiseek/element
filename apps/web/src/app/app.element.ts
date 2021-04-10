import { Element, OnConnect } from '@nx-web/core';
import './app.element.scss';

@Element({
  selector: 'element-root',
  template: `
    <el-icon href="assets/icons.svg" use="add"></el-icon>
    <br>
    <button is="el-button" mode="primary">Botão</button>
  `,
})
export class AppElement extends HTMLElement implements OnConnect {
  public static observedAttributes = [];

  onConnect(): void {
    console.log('connect');
  }

  onDisconnect() {
    console.log('disconnect');
  }
}
