const requested = new Set<ExampleColorPresetInput>();

let animationFrame = -1;

const requestRender = (el: ExampleColorPresetInput) => {
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

export interface ColorOption {
  label: string;
  value: string;
}

export class ExampleColorPresetInput extends HTMLElement {
  _name: string;
  _inverse: string;
  _value: string;
  _colors: ColorOption[];
  constructor() {
    super();
    this._name = this.getAttribute('name') || '';
    this._inverse = this.getAttribute('inverse') || '';
    this._value = this.getAttribute('value') || '';
    this._colors = [];
  }

  connectedCallback() {
    this.render();
  }

  set name(value: string) {
    this._name = value;
    requestRender(this);
  }

  set value(value: string) {
    this._value = value;
    requestRender(this);
  }

  set inverse(value: string) {
    this._inverse = value;
    requestRender(this);
  }

  set colors(value: ColorOption[]) {
    this._colors = value;
    requestRender(this);
  }

  renderHTML(name: string, inverseName: string, colors: ColorOption[]) {
    return `
      <style>
        select,
        ::picker(select) {
          appearance: base-select;
          padding: .25ch 1ch;
          background-color: Field;
          color: FieldText;
          border-radius: unset;
          font-size: 90%;
        }

        option {
          display: grid;
          grid-template-columns: min-content min-content 1fr;
        }

        ::checkmark {
          grid-column: 1;
        }

        .color-sample {
          grid-column: 2;
          aspect-ratio: 1;
          display: inline-block;
          height: 1em;
          width: 1em;
        }

        .color-value {
          color: rgb(from currentColor r g b / 70%);
        }

        .color-value,
        .color-name {
          grid-column: 3;
        }
      </style>
      <select name="${name}" onchange='themeBuilder.handleColorInput(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})'>
        <button>
          <selectedcontent></selectedcontent>
        </button>
        <option value="initial" selected>not set</option>
        ${colors.map(color => `
          <option value="${color.value}" translate="no">
            <span class="color-sample" style="background-color: ${color.value};" aria-hidden="true"></span>
            <span class="color-name">${color.label}</span>
            <span class="color-value">(${color.value})</span>
          </option>`
    ).join('\n')}
      </select>
    `
  }

  render() {
    this.innerHTML = this.renderHTML(this._name, this._inverse, this._colors);
  }
}

customElements.define('example-color-preset-input', ExampleColorPresetInput);
