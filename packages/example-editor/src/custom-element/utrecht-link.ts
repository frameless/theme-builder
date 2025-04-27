import css from '@utrecht/link-css/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);

export class UtrechtLink extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.adoptedStyleSheets.push(stylesheet);
    const a = this.ownerDocument.createElement('a');
    a.setAttribute('href', this.getAttribute('href') || '');
    a.classList.add('utrecht-link');
    a.classList.add('utrecht-link--html-a');
    const slot = this.ownerDocument.createElement('slot');
    a.appendChild(slot);
    this.shadow.appendChild(a);
  }
}

export const defineUtrechtLink = () => customElements.define('utrecht-link', UtrechtLink);

export const defineCustomElements = defineUtrechtLink;
