import css from '@utrecht/ordered-list-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);
const hostStylesheet = new CSSStyleSheet();
hostStylesheet.replaceSync(`:host { display: contents; }`);

export class UtrechtOrderedList extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.adoptedStyleSheets.push(hostStylesheet);
    this.shadow.adoptedStyleSheets.push(stylesheet);
    const ol = this.ownerDocument.createElement('ol');
    ol.classList.add('utrecht-ordered-list');
    ol.classList.add('utrecht-ordered-list--html-ol');
    const slot = this.ownerDocument.createElement('slot');
    ol.appendChild(slot);
    this.shadow.appendChild(ol);
  }
}

export const defineUtrechtOrderedList = () => customElements.define('utrecht-ordered-list', UtrechtOrderedList);

export const defineCustomElements = defineUtrechtOrderedList;
