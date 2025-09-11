export class FontPanel extends HTMLElement {
	static get observedAttributes() {
		return ['family']
	}

	_name: string | null = null;
	_family: string | null = null;
	_weight: string | null = null;
	_leading: string | null = null
	_italic: boolean = false;

	constructor() {
		super()

		this.attachShadow({ mode: 'open' })
		const template = (document.getElementById('font-panel-template') as HTMLTemplateElement)!.content.cloneNode(true)

		this.shadowRoot?.appendChild(template)
	}

	connectedCallback() {
		const self = this

		this._name = this.getAttribute('token')

		// Reflect component state to inner components
		const familySelect = this.shadowRoot?.querySelector<HTMLSelectElement>('select[name="font-family"]')

		if (familySelect && this.family) {
			familySelect.value = this.family
		}
		this._upgradeProperty('family')

		// =*=
		const weightSelect = this.shadowRoot?.querySelector<HTMLSelectElement>('select[name="font-weight"]')

		if (weightSelect && this.weight) {
			weightSelect.value = this.weight
		}

		const italic = this.getAttribute('italic')
		this.italic = italic !== null

		this._upgradeProperty('weight')
		this._upgradeProperty('size')
		this._upgradeProperty('leading')
		this._upgradeProperty('style')

		this.shadowRoot?.addEventListener('togglebuttonchange', (event) => {
			const target = event.target as HTMLSelectElement | HTMLInputElement
			const token = target.getAttribute('token')
			const prop = target.getAttribute('prop')
			if (!token) {
				throw new Error('Form element must have a "token" sttribute')
			}
			if (!prop) {
				throw new Error('Form element must have a "prop" attribute')
			}

			self.dispatchEvent(new CustomEvent('fontpaneltoggle', {
				detail: {
					enabled: event.detail.pressed,
					value: self._name,
					token: `${self._name}.${token}`,
				},
				composed: true,
				bubbles: true,
			}))

			if (prop in self) {
				self[prop] = event.detail.pressed
			}
		})

		this.shadowRoot?.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement | HTMLInputElement
			const token = target.getAttribute('token')
			const prop = target.getAttribute('prop')
			if (!token) {
				throw new Error('Form element must have a "token" sttribute')
			}
			if (!prop) {
				throw new Error('Form element must have a "prop" attribute')
			}

			if (target.tagName === 'SELECT') {
				self.dispatchEvent(new CustomEvent('fontpanelchange', {
					detail: {
						value: target.value,
						token: `${self._name}.${token}`
					},
					bubbles: true,
					composed: true,
				}))

				if (prop in self) {
					self[prop] = target.value
				}
			}
		})

		document.addEventListener('PresetFontSizeChange', (event) => {
			console.log(event)
			const select = self.shadowRoot.querySelector('font-panel-group[token="font-size"] select')
			console.log(select)
			select?.replaceChildren()
			for (let { value } of event.detail) {
				const option = document.createElement('option')
				option.textContent = value
				select?.appendChild(option)
			}
		})
	}

	_upgradeProperty(prop: string) {
		if (this.hasOwnProperty(prop)) {
			const value = this[prop]
			delete this[prop]
			this[prop] = value
		}
	}

	set family(family: string | undefined) {
		if (family) {
			this.setAttribute('family', family)
		} else {
			this.removeAttribute('family')
		}
	}

	get family(): string | null {
		return this.getAttribute('family')
	}

	set weight(weight: string | number | undefined) {
		if (weight) {
			this.setAttribute('weight', weight.toString())
		} else {
			this.removeAttribute('weight')
		}
	}

	get weight(): string | null {
		return this.getAttribute('weight')
	}

	set leading(leading: string | undefined) {
		if (leading) {
			this.setAttribute('leading', leading)
		} else {
			this.removeAttribute('leading')
		}
	}

	get leading(): string | null {
		return this.getAttribute('leading')
	}

	set size(size: string | undefined) {
		if (size) {
			this.setAttribute('size', size)
		} else {
			this.removeAttribute('size')
		}
	}

	get size(): string | null {
		return this.getAttribute('size')
	}

	set italic(style: boolean | undefined) {
		if (style) {
			this.setAttribute('italic', '')
		} else {
			this.removeAttribute('italic')
		}
	}

	get italic(): boolean {
		return this.hasAttribute('italic')
	}
}

customElements.define('font-panel', FontPanel)
