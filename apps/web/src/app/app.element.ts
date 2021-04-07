import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'web';
    this.innerHTML = `
      <el-icon href="assets/icons.svg" use="add"></el-icon>
      <br>
      <button is="el-button" mode="primary">Botão</button>
    `;
  }
}
customElements.define('element-root', AppElement);
