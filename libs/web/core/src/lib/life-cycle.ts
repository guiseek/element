/**
 * Interface para implementação do método
 * executado a cada alteração de atributos
 *
 * @export
 * @interface OnInject
 */
export interface OnInject<T> {
  onInject(dependencies: T): void;
}

/**
 * Interface para implementação do método
 * executado ao carregar o custom element
 *
 * @export
 * @interface OnConnect
 */
export interface OnConnect {
  onConnect(): void;
}

/**
 * Interface para implementação do método
 * executado quando um elemento é desconectado
 *
 * @export
 * @interface OnDisconnect
 */
export interface OnDisconnect {
  onDisconnect(): void;
}

/**
 * Interface para implementação do método
 * executado a cada alteração de atributos
 *
 * @export
 * @interface OnChanges
 */
export interface OnChanges<T> {
  onChanges(changes: AttrChange<T>): void;
}

export interface AttrChange<T = any> {
  name: string;
  prev: T | null;
  next: T | null;
}
