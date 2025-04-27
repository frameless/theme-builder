import css from '@utrecht/paragraph-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);

export class UtrechtParagraph extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.adoptedStyleSheets.push(stylesheet);
    const p = this.ownerDocument.createElement('p');
    p.classList.add('utrecht-paragraph');
    const slot = this.ownerDocument.createElement('slot');
    p.appendChild(slot);
    this.shadow.appendChild(p);
  }
}

export const defineUtrechtParagraph = () => customElements.define('utrecht-paragraph', UtrechtParagraph);

export const defineCustomElements = defineUtrechtParagraph;
