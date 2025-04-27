import css from 'http://unpkg.com/@utrecht/table-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);

export class UtrechtTableContainer extends HTMLElement {
  constructor() {
    super();
    if (!this.ownerDocument.adoptedStyleSheets.includes(stylesheet)) {
      this.ownerDocument.adoptedStyleSheets.push(stylesheet);
    }
    this.classList.add('utrecht-table-container');
  }
}

export const defineUtrechtTableContainer = () =>
  customElements.define('utrecht-table-container', UtrechtTableContainer);

export const defineCustomElements = defineUtrechtTableContainer;
