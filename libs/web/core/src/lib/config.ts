export interface Config {
  selector: string;
}

export interface ElementConfig extends Config {
  useShadow?: boolean;
  template: string;
}

export interface ElementRenderConfig extends Config {
  useShadow?: boolean;
}

export interface ElementExtendConfig extends Config {
  extend: keyof HTMLElementTagNameMap
}
