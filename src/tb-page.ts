import { slugify } from "./utils"

const css = String.raw
const html = String.raw

const template = document.createElement('template')
template.innerHTML = html`
	<header>
		<tb-title>Theme builder<tb-title>
	</header>
	<slot></slot>
	<footer>
		<button disabled type="button">Next step →</button>
	</footer>
`

const sheet = new CSSStyleSheet()
sheet.replaceSync(css`
	:host {
		display: flex;
		flex-direction: column;
		gap: 1em;
		margin: 1em;
		border: 2px solid;
		padding: 1em;
		font-family: ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";
		line-height: 1.4;
	}

	header,
	footer {
		background-color: ButtonFace;
		color: ButtonText;
		padding: 1rem;
		align-self: stretch;
	}

	header {
		margin: -1rem -1rem 0 -1rem;
		border-bottom: 1px solid ButtonBorder;
	}

	footer {
		margin: auto -1em -1em -1em;
		border-top: 1px solid ButtonBorder;
		justify-self: end;
		text-align: right;
	}

	tb-title {
		font-weight: 300;
	}
`)

customElements.define('tb-page', class extends HTMLElement {
	private slug: string | undefined;

	constructor() {
		super()
		const t = template.content.cloneNode(true)
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
		root.appendChild(t)
	}

	connectedCallback() {
		const title = this.getAttribute('title')
		if (title) {
			const titleElement = this.shadowRoot?.querySelector('tb-title')
			if (titleElement) {
				titleElement.textContent = `${title} - ${titleElement?.textContent}`
			}
			this.slug = slugify(title)
		} else {
			this.slug = slugify(crypto.randomUUID())
		}

		const button = this.shadowRoot?.querySelector<HTMLButtonElement>('footer button')
		const next = this.nextElementSibling
		if (button && next) {
			button.disabled = false
		}
		button?.addEventListener('click', () => {
			if (!next) return
			this.nextElementSibling.scrollIntoView({
				behavior: window.matchMedia('(prefers-reduced-motion: no-preference)').matches ? 'smooth' : 'auto',
			})
		})
	}
})