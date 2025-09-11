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
  name: string;
  color: string;
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
      <input type="color" list="${name}-list" onchange='themeBuilder.handleColorInput(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})'>
      <datalist id="${name}-list">
        ${colors.map(color => `
          <option value="${color.color}"></option>`
    ).join('\n')}
      </datalist>
      <select name="${name}" class="color-select" onchange='themeBuilder.handleColorInput(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})'>
        <button>
          <selectedcontent></selectedcontent>
        </button>
        ${colors.map(color => `
          <option value="${color.color}" translate="no">
            <span class="color-sample" style="background-color: ${color.color};" aria-hidden="true"></span>
            <span class="color-name">${color.name}</span>
            <span class="color-value">(${color.color})</span>
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
