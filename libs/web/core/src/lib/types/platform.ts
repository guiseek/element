/**
 * A policy for use with the standard trustedTypes platform API.
 * @public
 */
export type TrustedTypesPolicy = {
  /**
   * Creates trusted HTML.
   * @param html - The HTML to clear as trustworthy.
   */
  createHTML(html: string): string;
};

/**
 * Enables working with trusted types.
 * @public
 */
export type TrustedTypes = {
  /**
   * Creates a trusted types policy.
   * @param name - The policy name.
   * @param rules - The policy rules implementation.
   */
  createPolicy(name: string, rules: TrustedTypesPolicy): TrustedTypesPolicy;
};

/**
 * Represents a callable type such as a function or an object with a "call" method.
 * @public
 */
export type Callable = typeof Function.prototype.call | { call(): void };

/**
 * Allows for the creation of Constructable mixin classes.
 *
 * @public
 */
export type Constructable<T = {}> = {
  new (...args: any[]): T;
};

/**
 * Reverses all readonly members, making them mutable.
 * @internal
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
