import { use_context } from "./tb-context"
import { effect } from "./tb-reactive"
import type { SizeOption, LineHeightOption } from "./tb-staging-tokens"
const css = String.raw

const sheet = new CSSStyleSheet()
sheet.replaceSync(css`
	:host {
		display: grid;
		grid-template-columns: 3fr 2fr;
		row-gap: .5rem;
		column-gap: 1ch;
	}

	.sr-only {
		display: none;
	}

	font-panel-group {
		display: grid;
		width: 100%;
		column-gap: 1ch;
		row-gap: .2rem;
		align-items: center;

		& label {
			font-size: smaller;
			grid-column: 1 / -1;
		}

		&:has(font-panel-faux-label) {
			grid-template-columns: max-content 1fr;
		}
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
`)

export class FontPanel extends HTMLElement {
	static get observedAttributes() {
		return ['family', 'weight', 'size', 'leading', 'italic']
	}

	private _name: string | null = null
	private _sizes: SizeOption[] = []
	private _lineHeights: LineHeightOption[] = []

	constructor() {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
		this.render()
	}

	connectedCallback() {
		this._name = this.getAttribute('token')
		this.setupEventListeners()
		this.syncFormState()

		effect(() => {
			const context = use_context(this)
			this._lineHeights = context.selectedLineHeights.size > 0
				? Array.from(context.selectedLineHeights)
				: [{ value: '0', count: 1 }, { value: '1', count: 1 }, { value: '1.5', count: 1 }, { value: '2', count: 1 }]
			this._sizes = context.selectedSizes.size > 0
				? Array.from(context.selectedSizes)
				: [{ value: '1rem', count: 1, }, { value: '2rem', count: 1, }]
			this.render()
		})
	}

	private render() {
		if (!this.shadowRoot) return

		this.shadowRoot.innerHTML = `
      <font-panel-group token="font-family">
        <label>Family</label>
        <example-font-preset-input token="font-family" prop="family"></example-font-preset-input>
      </font-panel-group>

      <font-panel-group token="font-weight">
        <label>Weight</label>
        <select prop="weight" token="font-weight">
					<option selected value="initial">not set</option>
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
					<option selected value="initial">not set</option>
					${this._sizes.map(option => `<option value="${option.value}">${option.label || option.value}</option>`).join('')}
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
					${this._lineHeights.map(option => `<option value="${option.value}">${option.label || option.value}</option>`).join('')}
        </select>
      </font-panel-group>

			<font-panel-group token="color">
				<label>Color</label>
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
}

customElements.define('font-panel', FontPanel)