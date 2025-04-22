import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';

export class YolijnElement extends HTMLElement {
  _shadow: ShadowRoot;
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
  }
  connectedCallback() {
    this._shadow.innerHTML = '<utrecht-heading-1>YOLIJN!</utrecht-heading-1>';
  }
  disconnectedCallback() {
    this._shadow.innerHTML = 'ROBBERT!';
  }
}

export class FramelessFormFieldInput extends HTMLElement {
  static formAssociated = true;
  internals_: ElementInternals;
  name = 'foo';
  value = 'barf';

  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.setFormValue('boooo');
    console.log('Hallo Robbertus');
    console.log(this.internals_.form);
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

const init = () => {
  customElements.define('yolijn-element', YolijnElement);
  customElements.define('frameless-form-field-input', FramelessFormFieldInput);

  defineCustomElements();
};

init();
