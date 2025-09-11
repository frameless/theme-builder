const requested = new Set<ExampleDimensionPresetInput>();

let animationFrame = -1;

const requestRender = (el: ExampleDimensionPresetInput) => {
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

export interface DimensionOption {
	value: string;
}

export class ExampleDimensionPresetInput extends HTMLElement {
	_name: string;
	_value: string;
	_dimensions: DimensionOption[];
	constructor() {
		super();

		this._name = this.getAttribute('name') || '';
		this._value = this.getAttribute('value') || '';
		this._dimensions = [];
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

	set dimensions(value: DimensionOption[]) {
		this._dimensions = value;
		requestRender(this);
	}

	renderHTML(name: string, dimensions: DimensionOption[]) {
		return `
      <select name="${name}" class="dimension-select" onchange='themeBuilder.handleDimensionInput(event.currentTarget, ${JSON.stringify(name)})'>
        <button>
          <selectedcontent></selectedcontent>
        </button>
        ${dimensions.map(dimension => `
          <option translate="no">
            ${dimension.value}
          </option>`
		).join('\n')}
      </select>
    `
	}

	render() {
		this.innerHTML = this.renderHTML(this._name, this._dimensions);
	}
}

customElements.define('example-dimension-preset-input', ExampleDimensionPresetInput);
