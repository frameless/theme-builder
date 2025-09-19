import type { css_to_tokens } from '@projectwallace/css-design-tokens'

const INPUT_ID = 'url-input'
const STATE_ID = 'tb-url-state'

const template = document.createElement('template')
template.innerHTML = `
	<form id="url-input-form">
		<fieldset>
			<legend>Website for preset colors:</legend>
			<label for="url-input">URL to scrape</label>
			<input id="${INPUT_ID}" name="url-input" list="url-input-list" inputmode="url">
			<datalist id="url-input-list">
				<option value="loket.digitaal.utrecht.nl">loket.digitaal.utrecht.nl</option>
				<option value="rijksoverheid.nl">rijksoverheid.nl</option>
				<option value="purmerend.nl">purmerend.nl</option>
				<option value="rotterdam.nl">rotterdam.nl</option>
			</datalist>
			<button type="submit">Scrape URL</button>
			<button type="reset">Reset</button>
		</fieldset>
	</form>
`

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
	:host {
	}
`)

customElements.define('tb-url-form', class extends HTMLElement {
	constructor() {
		super()
		const t = template.content.cloneNode(true)
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
		root.appendChild(t)
	}

	connectedCallback() {
		// Hack to work around the readyness of the initial render in main.ts
		document.addEventListener('DOMContentLoaded', () => {
			const storedState = localStorage.getItem(STATE_ID)
			if (storedState !== null) {
				const state = JSON.parse(storedState) as { url: string; tokens: ReturnType<typeof css_to_tokens>; }
				(this.shadowRoot!.getElementById(INPUT_ID)! as HTMLInputElement).value = state.url
				this.dispatchEvent(new CustomEvent('preset-tokens', {
					detail: state.tokens,
					composed: true,
					bubbles: true,
				}))
			}
		})

		this.shadowRoot?.addEventListener('submit', async event => {
			event.preventDefault()
			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);
			const url = formData.get('url-input');
			const button = form.querySelector('button[type=submit');

			if (url && url.toString().trim() !== '' && button) {
				const buttonText = button?.textContent;
				button.textContent = 'scraping…';
				const fetchUrl = new URL(`http://localhost:3000`);
				fetchUrl.pathname = '/api/get-css';
				fetchUrl.searchParams.set('url', url.toString());
				const response = await fetch(fetchUrl);
				const tokens = (await response.json()) as ReturnType<typeof css_to_tokens>;
				button.textContent = buttonText;

				this.dispatchEvent(new CustomEvent('preset-tokens', {
					detail: tokens,
					composed: true,
					bubbles: true,
				}))
				localStorage.setItem(STATE_ID, JSON.stringify({ url, tokens }))
			}
		})

		this.shadowRoot?.addEventListener('click', (event) => {
			if (event.target && event.target.tagName === 'BUTTON' && event.target.type === 'reset') {
				localStorage.removeItem(STATE_ID)
				// Whoah, that's hacky
				window.location.reload()
			}
		})
	}
})