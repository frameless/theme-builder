import { css_to_tokens } from '@projectwallace/css-design-tokens'
import { initDb } from './tb-db'

const INPUT_ID = 'url-input'
const DATALIST_ID = `url-input-list`

const template = document.createElement('template')
template.innerHTML = `
	<form id="url-input-form">
		<fieldset>
			<legend>Website for preset colors:</legend>
			<label for="url-input">URL to scrape</label>
			<input id="${INPUT_ID}" name="url-input" list="${DATALIST_ID}" inputmode="url">
			<datalist id="${DATALIST_ID}">
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
		input[inputmode=url] {
			field-sizing: content;
			min-width: 20ch;
		}
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
		document.addEventListener('DOMContentLoaded', async () => {
			const db = await initDb()
			const websites = await db.getAll('website')
			const currentSite = await db.get('state', 'currentSite')

			if (currentSite !== undefined) {
				const website = await db.get('website', currentSite.value)
				if (website !== undefined) {
					const { css, url } = website
					const input = this.shadowRoot?.getElementById(INPUT_ID) as HTMLInputElement | null
					if (input) {
						input.value = url
					}
					const tokens = css_to_tokens(css)
					this.dispatchEvent(new CustomEvent('preset-tokens', {
						detail: {
							tokens,
							url,
						},
						composed: true,
						bubbles: true,
					}))
				}
			}

			if (websites.length > 0) {
				// Append the URL input datalist
				const datalist = document.getElementById(DATALIST_ID) as null | HTMLDataListElement
				for (const website of websites) {
					const option = document.createElement('option')
					option.textContent = website.url
					datalist?.appendChild(option)
				}
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
				const css = await response.text()
				const tokens = css_to_tokens(css)
				button.textContent = buttonText;

				this.dispatchEvent(new CustomEvent('preset-tokens', {
					detail: { tokens, url: url.toString() },
					composed: true,
					bubbles: true,
				}))

				const db = await initDb()

				await db.put('state', {
					key: 'currentSite',
					value: url.toString(),
				})

				await db.put('website', {
					url: url.toString(),
					css,
				})
			}
		})

		this.shadowRoot?.addEventListener('click', (event) => {
			if (event.target && (event.target as HTMLElement).tagName === 'BUTTON' && (event.target as HTMLButtonElement).type === 'reset') {
				// Whoah, that's hacky
				window.location.reload()
			}
		})
	}
})