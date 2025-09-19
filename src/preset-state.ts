type ColorOption = {
	value: string;
	label: string;
	count?: number;
	properties?: string[];
}

class ColorChangeEvent extends Event {
	colors: ColorOption[]

	constructor(colors: ColorOption[]) {
		super('preset-color-change', {
			bubbles: true,
			composed: true
		})
		this.colors = colors
	}
}

export class PresetState extends EventTarget {
	_colors: ColorOption[] = []
	_families: {}[] = []
	_sizes: {}[] = []

	constructor(initialColors = [], initialFamilies = [], initialSizes = []) {
		super()
		this._colors = initialColors
		this._families = initialFamilies
		this._sizes = initialSizes
	}

	addColor(color: ColorOption) {
		this._colors.push(color)
		this.dispatchEvent(new ColorChangeEvent(this._colors))
	}

	removeColor(color: ColorOption) {
		this._colors = this._colors.filter(c => c.value === color.value)
		this.dispatchEvent(new ColorChangeEvent(this._colors))
	}

	get colors() {
		return this._colors
	}

	set colors(c: ColorOption[]) {
		this._colors = c
		this.dispatchEvent(new ColorChangeEvent(this._colors))
	}
}