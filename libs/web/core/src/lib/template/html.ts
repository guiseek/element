export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  const doc = document;
  if (this) {
    if (this.nodeType == Node.DOCUMENT_NODE) {
    }
  }
  console.log(this);
  console.log(strings);
  console.log(values);
  return strings.map((str, i) => str + (values[i] ?? '')).join('');
}

export const ul = (strings: TemplateStringsArray, items: any[]) => {
  // prettier-ignore
  const ul = `<ul>`, li = `<li>`, eofLi = `</li>`, eofUl = `</ul>`;
  return ul + items.map((item) => li + item + eofLi).join('') + eofUl;
};

export const htmlLi = (strings: TemplateStringsArray, items: string[]) => {
  return items.map((item) => `<li>${item}</li>`).join('');
};
