export interface Config {
  selector: string;
  providers?: (new (...args: unknown[]) => unknown)[];
}
