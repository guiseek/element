/**
 * Interface para implementação do método
 * executado para injetar dependências ao
 * elemento em uso, via decorator de elemento
 *
 * @export
 * @interface OnInject
 * @template T
 */
export interface OnInject<T> {
  onInject(dependencies: T): void;
}
