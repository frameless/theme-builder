const isSafeURL = (url: any): url is string => {
  if (typeof url !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(url);

    return ['callto:', 'cid:', 'ftp:', 'ftps:', 'http:', 'https:', 'mailto:', 'sms:', 'tel:', 'xmpp:'].includes(
      parsed.protocol,
    );
  } catch (e) {
    return false;
  }
};

const normalizeURL = (url: string): string => {
  return new URL(url).toString();
};

export class UtrechtSafeLink extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    const a = this.ownerDocument.createElement('utrecht-link');
    const href = this.getAttribute('href');
    const safeHref = isSafeURL(href) ? normalizeURL(href) : '#';
    a.setAttribute('href', safeHref);
    const slot = this.ownerDocument.createElement('slot');
    a.appendChild(slot);
    this.shadow.appendChild(a);
  }
}

export const defineUtrechtSafeLink = () => customElements.define('utrecht-safe-link', UtrechtSafeLink);

export const defineCustomElements = defineUtrechtSafeLink;
