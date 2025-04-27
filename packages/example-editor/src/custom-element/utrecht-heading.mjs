import heading1css from '@utrecht/heading-1-css/dist/index.mjs';
import heading2css from '@utrecht/heading-2-css/dist/index.mjs';
import heading3css from '@utrecht/heading-3-css/dist/index.mjs';
import heading4css from '@utrecht/heading-4-css/dist/index.mjs';
import heading5css from '@utrecht/heading-5-css/dist/index.mjs';
import heading6css from '@utrecht/heading-6-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync([heading1css, heading2css, heading3css, heading4css, heading5css, heading6css].join(''));

const hostStylesheet = new CSSStyleSheet();
hostStylesheet.replaceSync(`:host { display: block; }`);

export class UtrechtHeading extends HTMLElement {
  static observedAttributes = ['level'];
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.adoptedStyleSheets.push(stylesheet, hostStylesheet);
    this.rerender();
  }
  attributeChangedCallback(name) {
    if (name === 'level') {
      this.rerender();
    }
  }
  rerender() {
    while (this.shadow.firstChild) {
      this.shadow.removeChild(this.shadow.firstChild);
    }

    const level = this.getAttribute('level');

    let container;
    if (level) {
      container = this.ownerDocument.createElement(`h${level}`);
      container.classList.add(`utrecht-heading-${level}`);
    } else {
      container = this.ownerDocument.createElement('div');
    }

    const slot = this.ownerDocument.createElement('slot');
    container.appendChild(slot);
    this.shadow.appendChild(container);
  }
}

export const defineUtrechtHeading = () => customElements.define('utrecht-heading', UtrechtHeading);

export const defineCustomElements = defineUtrechtHeading;
