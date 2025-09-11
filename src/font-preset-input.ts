const requested = new Set<ExampleFontPresetInput>();

let animationFrame = -1;

const requestRender = (el: ExampleFontPresetInput) => {
  if (animationFrame === -1) {
    requested.add(el);
    requestAnimationFrame(renderThings);
  }
};

const renderThings = () => {
  animationFrame = -1;
  for (let item of requested) {
    requested.delete(item);
    item.render();
  }
};

export interface FontOption {
  name: string;
  font: string;
}

export class ExampleFontPresetInput extends HTMLElement {
  _name: string;
  _value: string;
  _fonts: FontOption[];
  constructor() {
    super();

    this._name = this.getAttribute('name') || '';
    this._value = this.getAttribute('value') || '';
    this._fonts = [];
  }

  connectedCallback() {
    this.render();
    document.addEventListener('PresetFontFamilyChange', (evt) => this._handlePresetChange(evt));
  }

  _handlePresetChange(event: { detail: FontOption[] }) {
    this.fonts = event.detail
  }

  set name(value: string) {
    this._name = value;
    requestRender(this);
  }

  set value(value: string) {
    this._value = value;
    requestRender(this);
  }

  set fonts(value: FontOption[]) {
    this._fonts = value;
    requestRender(this);
  }

  renderHTML(name: string, fonts: FontOption[]) {
    return `
      <style>
        .font-select,
        ::picker(select) {
          appearance: base-select;
          padding: .25ch 1ch;
          background-color: Field;
          color: FieldText;
          border-radius: unset;
          font-size: 90%;
        }

        .font-select {
          .font-specimen {
            color: graytext;
          }

          option {
            display: grid;
            grid-template-columns: min-content 1fr;
            padding: .25lh 1ch;

            .font-name,
            .font-specimen {
              grid-column: 2;
            }
          }

          option::checkmark {
            grid-column: 1;
          }

          selectedcontent {
            .font-specimen {
              display: none;
            }
          }
        }
      </style>
      <select name="${name}" class="font-select" onchange='themeBuilder.handleFontInput(event.currentTarget, ${JSON.stringify(name)})'>
        <button>
          <selectedcontent></selectedcontent>
        </button>
        ${fonts.map(font => `
          <option value="${font.font}" translate="no">
            <span class="font-name">${font.name}</span>
            <span class="font-specimen" style="font-family: ${font.font}">AaBbCcDd 1234567890</span>
          </option>`
    ).join('\n')}
      </select>
    `
  }

  render() {
    this.innerHTML = this.renderHTML(this._name, this._fonts);
  }
}

customElements.define('example-font-preset-input', ExampleFontPresetInput);
