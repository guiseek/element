import 'reflect-metadata';

export function Attr(): any {
  return (target: any) => {
    function attrChange(name: string, prev: string, next: string) {
      this[name] = next;
      if (target.onChanges) {
        this.onChanges({ name, prev, next });
      }
    }
    target.attributeChangedCallback = attrChange;
  };
}
