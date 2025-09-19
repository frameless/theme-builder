const css = String.raw
const html = String.raw

const template = document.createElement('template')
template.innerHTML = html`
	<slot></slot>
`

const sheet = new CSSStyleSheet()
sheet.replaceSync(css`
	:host {
		display: flex;
		flex-direction: column;
		gap: 1em;
		background: ButtonFace;
		color: GrayText;
		padding: 1em;
		text-align: center;
		font-size: smaller;
	}
`)

customElements.define('tb-empty', class extends HTMLElement {
	constructor() {
		super()
		const t = template.content.cloneNode(true)
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
		root.appendChild(t)
	}
})