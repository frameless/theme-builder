let tmpl = document.createElement('template')
tmpl.innerHTML = `
	<style>
		:host {
			display: contents;
		}
		button[aria-pressed="true"] {
			background-color: highlight;
			color: highlighttext;
		}
	</style>
	<button>
		<slot></slot>
	</button>
`

export class PressableButton extends HTMLElement {
	button: HTMLButtonElement | null;

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot!.appendChild(tmpl.content.cloneNode(true))

		this.button = this.shadowRoot!.querySelector('button')
		// bind once so removeEventListener works
		this.on_click = this.on_click.bind(this)
	}

	static get observedAttributes() {
		return ['pressed']
	}

	get pressed() {
		return this.getAttribute('pressed') === 'true'
	}

	set pressed(val) {
		this.setAttribute('pressed', val ? 'true' : 'false')
	}

	attributeChangedCallback(name: string, old_val: string | null, new_val: string | null) {
		if (name === 'pressed') {
			if (new_val === 'true') {
				this.button?.setAttribute('aria-pressed', 'true')
			} else {
				this.button?.removeAttribute('aria-pressed')
			}
			if (old_val !== new_val) {
				this.dispatchEvent(new CustomEvent('pressedchange', {
					detail: { pressed: this.pressed },
					bubbles: true,
					composed: true
				}))
			}
		}
	}

	connectedCallback() {
		this.button?.addEventListener('click', this.on_click)
		// ensure attribute exists on init
		if (!this.hasAttribute('pressed')) {
			this.pressed = false
		} else {
			this.attributeChangedCallback('pressed', null, this.getAttribute('pressed'))
		}
	}

	disconnectedCallback() {
		this.button?.removeEventListener('click', this.on_click)
	}

	on_click() {
		this.pressed = !this.pressed
	}
}

customElements.define('toggle-button', PressableButton)
