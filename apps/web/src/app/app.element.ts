import { Element, Http, OnInject } from '@nx-web/element';
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
 `,
})
export class AppElement extends HTMLElement implements OnInject<[Http]> {
  static observedAttributes = [];
  static API = 'https://swapi.dev/api/people';

  onInject([http]: [Http]): void {
    http.get(AppElement.API).then(console.log);
  }

  render({ results }: { results: { name: string }[] } = { results: [] }) {
    const icon = `<el-icon href="assets/icons.svg" use="account_circle"></el-icon>`;
    const list = results
      .map((r) => `<tr><td> ${icon} </td><td> ${r.name} </td></tr>`)
      .join('');

    return `<table>${list}</table>`;
  }
}
