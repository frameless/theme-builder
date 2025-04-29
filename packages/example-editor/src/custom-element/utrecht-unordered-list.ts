import css from '@utrecht/unordered-list-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);
const hostStylesheet = new CSSStyleSheet();
hostStylesheet.replaceSync(`:host { display: contents; }`);

export class UtrechtUnorderedList extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.adoptedStyleSheets.push(hostStylesheet);
    this.shadow.adoptedStyleSheets.push(stylesheet);
    const ul = this.ownerDocument.createElement('ul');
    ul.classList.add('utrecht-unordered-list');
    ul.classList.add('utrecht-unordered-list--html-ul');
    const slot = this.ownerDocument.createElement('slot');
    ul.appendChild(slot);
    this.shadow.appendChild(ul);
  }
}

export const defineUtrechtUnorderedList = () => customElements.define('utrecht-unordered-list', UtrechtUnorderedList);

export const defineCustomElements = defineUtrechtUnorderedList;
