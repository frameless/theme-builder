import { variants } from './design-token-options';
import { VariantsMap } from './types';
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
  parameters: URLSearchParams;
  variantsMap: VariantsMap;
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    this.sheet = sheet;
    this.map = new Map();
    sheet.replaceSync('');
    window.themeBuilder = this;
    this.parameters = new URLSearchParams();
    this.variantsMap = new Map(variants.map((group) => [group.id, group]));

    for (const [key, value] of new URL(location.href).searchParams) {
      if (this.variantsMap.has(key) && this.variantsMap.get(key)?.variants.some(({ id }) => id === value)) {
        this.setGroupOption(key, value);
      }
    }

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

  setGroupOption(groupId: string, optionId: string) {
    const group = this.variantsMap.get(groupId);

    if (!group) {
      return;
    }

    const option = group.variants.find(({ id }) => id === optionId) || { flatTokens: {} };

    if (!option) {
      return;
    }
    this.parameters.set(groupId, optionId);
    history.replaceState({}, document.title, `?${this.parameters}`);

    this.toggleTokens(groupId, option.flatTokens);
  }

  clickGroupOption(groupId: string, optionId: string) {
    this.setGroupOption(groupId, optionId);

    history.replaceState({}, document.title, `?${this.parameters}`);
  }
}

customElements.define('basis-theme-stylesheet', BasisThemeStylesheet);
