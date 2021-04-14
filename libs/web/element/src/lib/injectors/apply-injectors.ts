import { Config } from '../interfaces';
import { injector } from './injector';

/**
 * Verifica se foram declaradas dependências,
 * coleta
 *
 * @export
 * @param {Config} config
 * @returns
 */
export function applyInjectors(config: Config) {
  const providers = [];

  config.providers.map((service) => {
    let dep: new () => void;

    try {
      dep = injector.get(service);
    } catch (err) {
      injector.set(service);
      dep = injector.get(service);
    }

    providers.push(dep);
  });
  return providers;
}
