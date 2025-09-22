const css = String.raw
const html = String.raw

const template = document.createElement('template')
template.innerHTML = html`
	<slot></slot>
`

const sheet = new CSSStyleSheet()
sheet.replaceSync(css`
	:host {
		display: grid;
		grid-template-columns: clamp(5rem, 50vw, 30rem) 1fr;
		gap: 1rem;
	}

	::slotted(& > :first-child) {
		background: black;
	}
`)

customElements.define('tb-split-view', class extends HTMLElement {
	constructor() {
		super()
		const t = template.content.cloneNode(true)
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
		root.appendChild(t)
	}
})
