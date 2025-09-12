import type { ColorOption } from "./color-preset-input"
import type { ExampleColorPresetInput } from "./color-preset-input"

export class FontPanel extends HTMLElement {
	static get observedAttributes() {
		return ['family', 'weight', 'size', 'leading', 'italic']
	}

	private _name: string | null = null

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.render()
	}

	connectedCallback() {
		this._name = this.getAttribute('token')
		this.setupEventListeners()
		this.syncFormState()
	}

	private render() {
		if (!this.shadowRoot) return

		this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: .5rem;
        }

        .sr-only {
          display: none;
        }

        font-panel-group:has(select) label {
          display: none;
        }

        font-panel-group {
          display: flex;
					width: 100%;
          gap: 1ch;
          align-items: center;
        }

        font-panel-misc {
          display: flex;
          gap: 1rem;
					grid-column: 1 / -1;
        }

				select {
          width: 100%;
          padding-block: .25lh;
          padding-inline: .25ch;
        }

        font-panel-faux-label {
          color: ButtonText;
        }

        example-font-preset-input {
          width: 100%;
        }
      </style>

      <font-panel-group token="font-family">
        <label>Family</label>
        <example-font-preset-input token="font-family" prop="family"></example-font-preset-input>
      </font-panel-group>

      <font-panel-group token="font-weight">
        <label>Weight</label>
        <select prop="weight" token="font-weight">
					<option disabled selected>not set</option>
          <option value="100">100 - Thin (hairline)</option>
          <option value="200">200 - Extra light</option>
          <option value="300">300 - Light</option>
          <option value="400">400 - Normal</option>
          <option value="500">500 - Medium</option>
          <option value="600">600 - Semi Bold</option>
          <option value="700">700 - Bold</option>
          <option value="800">800 - Extra Bold</option>
          <option value="900">900 - Black</option>
        </select>
      </font-panel-group>

      <font-panel-group token="font-size">
        <label>Size</label>
        <font-panel-faux-label style="white-space: nowrap; font-weight: 900; font-size: 1.2em; line-height: 1;">
          <small style="font-size:.7em">T</small>T
        </font-panel-faux-label>
        <select prop="size" token="font-size">
					<option disabled>not set</option>
          <option>1rem</option>
          <option>2rem</option>
        </select>
      </font-panel-group>

      <font-panel-group token="line-height">
        <label>Line height</label>
        <font-panel-faux-label style="white-space: nowrap; font-weight: 700; line-height: 1; letter-spacing: -.2em; line-height: 0;">
          <sub>A</sub>
          <sup>A</sup>
        </font-panel-faux-label>
        <select prop="leading" token="line-height">
					<option value="initial" selected>not set</option>
          <option>0</option>
          <option>0.75</option>
          <option>1</option>
          <option>1.5</option>
          <option>2</option>
        </select>
      </font-panel-group>

			<font-panel-group token="color">
				<label>Color</label>
				<font-panel-color-sample style="display: inline-block; border: 1px solid ButtonBorder; aspect-ratio: 1; height: 1lh;" title="click to open color picker">
				</font-panel-color-sample>
				<example-color-preset-input name="${this.getAttribute('token') || ''}.color"></example-color-preset-input>
			</font-panel-group>
    `
	}

	private setupEventListeners() {
		if (!this.shadowRoot) return

		// Handle select and input changes
		this.shadowRoot.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement | HTMLInputElement
			const token = target.getAttribute('token')
			const prop = target.getAttribute('prop')

			if (!token || !prop) return

			this.dispatchEvent(new CustomEvent('fontpanelchange', {
				detail: {
					value: target.value,
					token: `${this._name}.${token}`
				},
				bubbles: true,
				composed: true,
			}))

			// Update component property
			this.updateProperty(prop, target.value)
		})
	}

	private updateProperty(prop: string, value: string) {
		switch (prop) {
			case 'family':
				this.family = value
				break
			case 'weight':
				this.weight = value
				break
			case 'size':
				this.size = value
				break
			case 'leading':
				this.leading = value
				break
		}
	}

	private syncFormState() {
		if (!this.shadowRoot) return

		// Sync select values with attributes
		const selects = this.shadowRoot.querySelectorAll('select[prop]')
		selects.forEach(select => {
			const prop = select.getAttribute('prop')
			if (prop && this.hasAttribute(prop)) {
				(select as HTMLSelectElement).value = this.getAttribute(prop) || ''
			}
		})
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			this.syncFormState()
		}
	}

	// Property getters and setters
	set family(value: string | undefined) {
		if (value) {
			this.setAttribute('family', value)
		} else {
			this.removeAttribute('family')
		}
	}

	get family(): string | null {
		return this.getAttribute('family')
	}

	set weight(value: string | number | undefined) {
		if (value) {
			this.setAttribute('weight', value.toString())
		} else {
			this.removeAttribute('weight')
		}
	}

	get weight(): string | null {
		return this.getAttribute('weight')
	}

	set size(value: string | undefined) {
		if (value) {
			this.setAttribute('size', value)
		} else {
			this.removeAttribute('size')
		}
	}

	get size(): string | null {
		return this.getAttribute('size')
	}

	set leading(value: string | undefined) {
		if (value) {
			this.setAttribute('leading', value)
		} else {
			this.removeAttribute('leading')
		}
	}

	get leading(): string | null {
		return this.getAttribute('leading')
	}

	set italic(value: boolean | undefined) {
		if (value) {
			this.setAttribute('italic', '')
		} else {
			this.removeAttribute('italic')
		}
	}

	get italic(): boolean {
		return this.hasAttribute('italic')
	}

	// Method to update font size options
	updateFontSizeOptions(sizes: string[]) {
		const select = this.shadowRoot?.querySelector('font-panel-group[token="font-size"] select') as HTMLSelectElement
		if (!select) return

		const currentValue = select.value
		select.replaceChildren()

		const option = document.createElement('option')
		option.textContent = 'not set'
		option.disabled = true
		select.appendChild(option)

		for (let size of sizes) {
			const option = document.createElement('option')
			option.value = size
			option.textContent = size
			select.appendChild(option)

			// Restore selection if it still exists
			if (size === currentValue) {
				select.value = currentValue
			}
		}
	}

	updateColorOptions(colors: ColorOption[]) {
		const input = this.shadowRoot?.querySelector('example-color-preset-input') as ExampleColorPresetInput
		if (!input) return

		input.colors = colors
	}
}

customElements.define('font-panel', FontPanel)