import { Http, Element, OnInject } from '@nx-web/element';
import './app.element.scss';

@Element({
  selector: 'element-root',
  providers: [Http],
  template: `
    <section class="flex">
      <el-icon href="assets/icons.svg" use="account_circle"></el-icon>
    </section>
    <section class="flex">
      <button is="el-button" type="button" mode="primary"> Botão </button>
      <button is="el-button" type="button" mode="secondary"> Botão </button>
    </section>

    <el-home></el-home>
  `,
})
export class AppElement extends HTMLElement implements OnInject<[Http]> {
  static observedAttributes = [];

  onInject([http]: [Http]): void {
    console.log(http.get);
  }
}
