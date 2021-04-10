export interface OnConnect {
  onConnect(): void;
}

export interface OnDisconnect {
  onDisconnect(): void;
}

export interface AttrChange<T = any> {
  name: string, prev: T | null, next: T | null
}

export interface OnChanges<T> {
  onChanges(changes: AttrChange<T>): void
}

