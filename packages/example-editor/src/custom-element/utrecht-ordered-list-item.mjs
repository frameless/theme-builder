import css from '@utrecht/ordered-list-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);
const hostStylesheet = new CSSStyleSheet();
hostStylesheet.replaceSync(`:host { display: contents; }`);

export class UtrechtOrderedListItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.adoptedStyleSheets.push(hostStylesheet);
    this.shadow.adoptedStyleSheets.push(stylesheet);
    const li = this.ownerDocument.createElement('li');
    li.classList.add('utrecht-ordered-list__item');
    const slot = this.ownerDocument.createElement('slot');
    li.appendChild(slot);
    this.shadow.appendChild(li);
  }
}

export const defineUtrechtOrderedListItem = () =>
  customElements.define('utrecht-ordered-list-item', UtrechtOrderedListItem);

export const defineCustomElements = defineUtrechtOrderedListItem;
