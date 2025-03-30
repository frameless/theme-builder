import { cssVariablesToString, toCssVariables } from './utils';

interface FlatTokens {
  [index: string]: string;
}

declare global {
  interface Window {
    themeBuilder: BasisThemeStylesheet;
  }
}

class BasisThemeStylesheet extends HTMLElement {
  sheet: CSSStyleSheet;
  map: Map<string, FlatTokens>;
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    this.sheet = sheet;
    this.map = new Map();
    sheet.replaceSync('');
    window.themeBuilder = this;

    console.log(
      Array.from(new Map<string, FlatTokens>([['', { 'basis.foo.bar': '42px' }]]).values()).map((tokens) =>
        cssVariablesToString(toCssVariables(tokens)),
      ),
    );
  }

  connectedCallback() {
    if (this.sheet) {
      this.ownerDocument.adoptedStyleSheets.push(this.sheet);
    }
  }

  disconnectedCallback() {
    // TODO: Remove from adoptedStyleSheets
  }

  update() {
    let properties = Array.from(this.map.values())
      .map((tokens) => cssVariablesToString(toCssVariables(tokens)))
      .join(';\n');
    console.log(Array.from(this.map.values()));
    let css = `.basis-theme {\n${properties}\n}`;
    console.log(css);
    this.sheet?.replaceSync(css);
  }

  toggleTokens(id: string, tokens: FlatTokens) {
    this.map.set(id, tokens);
    this.update();
  }
  setTokens(input: HTMLButtonElement | HTMLInputElement) {
    const tokens = JSON.parse(input.value) as { [index: string]: string };

    this.toggleTokens(input.name, tokens);
  }
}

customElements.define('basis-theme-stylesheet', BasisThemeStylesheet);
