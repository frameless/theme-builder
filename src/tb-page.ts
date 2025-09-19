const css = String.raw
const html = String.raw

const template = document.createElement('template')
template.innerHTML = html`
	<header>
		<tb-title>Theme builder<tb-title>
	</header>
	<slot></slot>
`

const sheet = new CSSStyleSheet()
sheet.replaceSync(css`
	:host {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: 1em;
		border: 2px solid;
		min-height: 50vmin;
		padding: 1em;
		font-family: ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";
		line-height: 1.4;
	}

	header {
		background-color: ButtonFace;
		color: ButtonText;
		padding: 1rem;
		align-self: stretch;
		margin: -1rem -1rem 0 -1rem;
		border-bottom: 1px solid ButtonBorder;
	}

	tb-title {
		font-weight: 300;
	}
`)

customElements.define('tb-page', class extends HTMLElement {
	constructor() {
		super()
		const t = template.content.cloneNode(true)
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
		root.appendChild(t)
	}
})