import { variants } from './design-token-options';
import { ExampleDesignTokenValue } from './example-design-token-value';
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
  _eventHandler: (evt: Event) => void;
  _designTokenValueListeners: Set<ExampleDesignTokenValue>;
  _flatTokensCache: FlatTokens;

  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    this.sheet = sheet;
    sheet.replaceSync('');

    this.map = new Map();
    this._flatTokensCache = {};
    window.themeBuilder = this;
    this.parameters = new URLSearchParams();
    this.variantsMap = new Map(variants.map((group) => [group.id, group]));

    this._designTokenValueListeners = new Set();
    this._eventHandler = (evt) => this.handleRequestDesignTokenValue(evt);
  }

  connectedCallback() {
    const self = this;

    if (this.sheet) {
      this.ownerDocument.adoptedStyleSheets.push(this.sheet);
    }
    this.ownerDocument.addEventListener('subscribeDesignTokenValue', this._eventHandler, true);
    this.ownerDocument.addEventListener('unsubscribeDesignTokenValue', this._eventHandler, true);

    // TODO: remove listeners
    this.ownerDocument.addEventListener('fontpanelchange', (event: CustomEvent<{ token: string; value: string }>) => {
      self.setToken(event.detail.token, event.detail.value);
    });
  }

  disconnectedCallback() {
    // TODO: Remove from adoptedStyleSheets
    this.ownerDocument.removeEventListener('subscribeDesignTokenValue', this._eventHandler, true);
    this.ownerDocument.removeEventListener('unsubscribeDesignTokenValue', this._eventHandler, true);
  }

  handleRequestDesignTokenValue(evt: Event) {
    if (evt.type === 'subscribeDesignTokenValue' && evt.target instanceof Element) {
      // Set initial value
      if (evt.target instanceof ExampleDesignTokenValue) {
        this._designTokenValueListeners.add(evt.target);
        const tokenName = evt.target.name;
        if (typeof tokenName === 'string' && this._flatTokensCache.hasOwnProperty(tokenName)) {
          evt.target.value = this._flatTokensCache[tokenName];
        }
      }
    }
    if (evt.type === 'unsubscribeDesignTokenValue' && evt.target instanceof ExampleDesignTokenValue) {
      this._designTokenValueListeners.delete(evt.target);
    }
  }

  update() {
    let properties = Array.from(this.map.values())
      .map((tokens) => cssVariablesToString(toCssVariables(tokens)))
      .join(';\n');

    let css = `.basis-theme {\n${properties}\n}`;
    this.sheet?.replaceSync(css);

    this._flatTokensCache = Array.from(this.map.values()).reduce((map, tokens) => ({ ...map, ...tokens }), {});

    if (!this._designTokenValueListeners) {
      return;
    }
    for (let key in this._flatTokensCache) {
      const value = this._flatTokensCache[key];

      this._designTokenValueListeners.forEach((el) => {
        if (el.name === key) {
          el.value = value;
        }
      });
    }
  }

  toggleTokens(id: string, tokens: FlatTokens) {
    this.map.set(id, tokens);
    this.update();
  }
  setTokens(input: HTMLButtonElement | HTMLInputElement) {
    const tokens = JSON.parse(input.value) as { [index: string]: string };

    this.toggleTokens(input.name, tokens);
  }

  setToken(name: string, value: string) {
    this.toggleTokens(name, { [name]: value });
    this.setParameter(name, value);
  }

  removeToken(id: string) {
    this.map.delete(id);
    this.update();
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

    this.setParameter(groupId, optionId);

    this.toggleTokens(groupId, option.flatTokens);
  }

  setParameter(key: string, value: string) {
    // this.parameters.set(key, value);
    // history.replaceState({}, document.title, `?${this.parameters}`);
  }

  clickGroupOption(groupId: string, optionId: string) {
    this.setGroupOption(groupId, optionId);

    // history.replaceState({}, document.title, `?${this.parameters}`);
  }

  handleFontInput(target: HTMLInputElement, name: string) {
    const value = target.value;
    if (typeof value !== 'string') {
      return;
    }

    this.setToken(name, value);
    this.update();
  }

  handleDimensionInput(target: HTMLInputElement, name: string) {
    const value = target.value;
    if (typeof value !== 'string') {
      return;
    }

    this.setToken(name, value);
    this.update();
  }

  handleColorInput(target: HTMLInputElement, name: string, inverseName: string) {
    const value = target.value;
    if (typeof value !== 'string') {
      return;
    }
    this.setToken(name, value);
    this.update();
  }
}

customElements.define('basis-theme-stylesheet', BasisThemeStylesheet);
