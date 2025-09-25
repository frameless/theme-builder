// @ts-expect-error module types not present
import { sortFn as sortCssUnit } from 'css-unit-sort';
import type { css_to_tokens } from '@projectwallace/css-design-tokens'
import { slugify } from './utils'
import { use_context, type Context } from './tb-context';
import './tb-empty.js'
import { getDb, initDb } from './tb-db.js';

const css = String.raw
const html = String.raw

const sheet = new CSSStyleSheet()
sheet.replaceSync(css`
	:host {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
		grid-template-rows: repeat(auto-fit, 30em);
		gap: 1rem;
		align-items: start;
		height: 100%;
		container-type: block-size;
	}

	section:nth-of-type(1) {
		grid-column: span 3;
	}
	section:nth-of-type(2) {
		grid-column: span 2;
	}

	section {
		max-height: 100%;
		overflow: auto;
		scrollbar-color: ButtonBorder ButtonFace;
		scrollbar-gutter: stable;
		overscroll-behavior: contain;
		background:
			/* Shadow Cover TOP */
			linear-gradient(
				Canvas 30%,
				rgba(255, 255, 255, 0)
			) center top,

			/* Shadow Cover BOTTOM */
			linear-gradient(
				rgba(255, 255, 255, 0),
				Canvas 70%
			) center bottom,

			/* Shadow TOP */
			radial-gradient(
				farthest-side at 50% 0,
				rgba(0, 0, 0, 0.2),
				rgba(0, 0, 0, 0)
			) center top,

			/* Shadow BOTTOM */
			radial-gradient(
				farthest-side at 50% 100%,
				rgba(0, 0, 0, 0.2),
				rgba(0, 0, 0, 0)
			) center bottom;

		background-repeat: no-repeat;
		background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
		background-attachment: local, local, scroll, scroll;
	}

	.samples {
		list-style-type: none;
		padding: 0;
		margin: 0;

		& > li {
			display: grid;
			grid-template-columns: max-content 1fr;
			align-items: start;
		}

		& code {
			font-size-adjust: .6;
		}
	}

	.used-properties {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 0.2rem;
		list-style-type: none;
		padding: 0;
		margin: 0;
		color: GrayText;

		& code {
			border: 1px solid;
			padding-inline: 0.5ch;
			font-size: smaller;
		}
	}

	input[type=checkbox] {
		zoom: 1.4;
	}

	.font-specimen {
		display: block;
		font-size-adjust: 0.5;
		color: GrayText;
	}

	label {
		display: inline-block;
		margin-top: .25em;
	}
`)

type Option = {
	label?: string;
	value: string;
	count: number;
}

export type ColorOption = Option & {
	properties?: string[];
}

export type FamilyOption = Option

export type SizeOption = Option

export type LineHeightOption = Option

export class StagingTokens extends HTMLElement {
	_tokens: ReturnType<typeof css_to_tokens> | undefined = undefined
	_stagedColors: ColorOption[] = []
	_stagedFamilies: FamilyOption[] = []
	_stagedSizes: SizeOption[] = []
	_stagedLineHeights: LineHeightOption[] = []

	constructor() {
		super()
		const root = this.attachShadow({ mode: 'open' })
		root.adoptedStyleSheets = [sheet]
	}

	async handleEvent(event: Event) {
		const target = event.target as HTMLElement

		if (target !== null && target.tagName === 'INPUT' && event.type === 'change') {
			const state = use_context(this)
			const input = target as HTMLInputElement
			// Map the <input name=""> to the staged items in `this` and selected items in `state`
			const map = new Map<string, [Option[], keyof Context, 'color' | 'fontFamily' | 'fontSize' | 'lineHeight']>([
				['color-candidate', [this._stagedColors, 'selectedColors', 'color']],
				['family-candidate', [this._stagedFamilies, 'selectedFamilies', 'fontFamily']],
				['size-candidate', [this._stagedSizes, 'selectedSizes', 'fontSize']],
				['line-height-candidate', [this._stagedLineHeights, 'selectedLineHeights', 'lineHeight']],
			])
			const db = await getDb()
			const currentSite = await db.get('state', 'currentSite')

			if (map.has(input.name)) {
				const [stagedItems, stateProperty, tokenType] = map.get(input.name)!
				const checkedItem = stagedItems.find(item => item.value === input.value)
				if (checkedItem !== undefined) {
					if (input.checked) {
						state[stateProperty] = state[stateProperty].add(checkedItem)
						await db.put('stagedTokens', {
							website: currentSite.value,
							type: tokenType,
							value: input.value
						})
					} else {
						state[stateProperty].delete(checkedItem)
						// force reactivity
						state[stateProperty] = state[stateProperty]
						await db.delete('stagedTokens', [currentSite.value, 'color', input.value])
					}
				}
			}
		}
		else if (target !== null && target.tagName === 'BUTTON' && event.type === 'click') {
			const action = target.getAttribute('data-action')
			const inputs = target.closest('section')?.querySelectorAll<HTMLInputElement>('input[type=checkbox]')
			if (!action || !inputs || inputs.length === 0) return

			for (let checkbox of Array.from(inputs)) {
				if (action === 'select-all') {
					checkbox.checked = true
				} else if (action === 'unselect-all') {
					checkbox.checked = false
				}
				checkbox.dispatchEvent(new Event('change', { bubbles: true }))
			}
		}
	}

	async connectedCallback() {
		this.shadowRoot!.addEventListener('change', this)
		this.shadowRoot!.addEventListener('click', this)
	}

	set tokens(t: NonNullable<typeof this._tokens>) {
		this._tokens = t
		this.render(t)
		this.restoreState()
	}

	private async restoreState() {
		const db = await initDb();

		const currentSite = await db.get('state', 'currentSite')
		if (currentSite !== undefined) {
			const state = use_context(this)
			const tokens = await db.getAllFromIndex('stagedTokens', 'website', currentSite.value)
			for (let token of tokens) {
				if (token.type === 'color') {
					const color = this._stagedColors.find(c => c.value === token.value)
					if (color) {
						state.selectedColors = state.selectedColors.add(color);
						(this.shadowRoot?.querySelector(`input[name=color-candidate][value="${color.value}"]`) as HTMLInputElement).checked = true
					}
				}
				else if (token.type === 'fontSize') {
					const item = this._stagedSizes.find(i => i.value === token.value)
					if (item) {
						state.selectedSizes = state.selectedSizes.add(item);
						(this.shadowRoot?.querySelector(`input[name=size-candidate][value="${item.value}"]`) as HTMLInputElement).checked = true
					}
				}
				else if (token.type === 'fontFamily') {
					const item = this._stagedFamilies.find(i => i.value === token.value)
					if (item) {
						state.selectedFamilies = state.selectedFamilies.add(item);
						(this.shadowRoot?.querySelector(`input[name=family-candidate][value="${item.value}"]`) as HTMLInputElement).checked = true
					}
				}
				else if (token.type === 'lineHeight') {
					const item = this._stagedLineHeights.find(i => i.value === token.value)
					console.log(item)
					if (item) {
						state.selectedLineHeights = state.selectedLineHeights.add(item);
						(this.shadowRoot?.querySelector(`input[name=line-height-candidate][value="${item.value}"]`) as HTMLInputElement).checked = true
					}
				}
			}
		}
	}

	private getColorCandidates(tokens: NonNullable<typeof this._tokens>): ColorOption[] {
		const colors = Object.entries(tokens.color)
			.map(([name, colorToken]) => {
				return ({
					label: name,
					value: colorToken.$extensions['com.projectwallace.css-authored-as'],
					properties: colorToken.$extensions['com.projectwallace.css-properties'],
					count: colorToken.$extensions['com.projectwallace.usage-count'],
				})
			})
		return colors
	}

	private getFamilyCandidates(tokens: NonNullable<typeof this._tokens>): FamilyOption[] {
		const families = Object.entries(tokens.font_family)
			.filter(([, fontToken]) => {
				return fontToken.$type === 'fontFamily' && !fontToken.$value.at(0)!.includes('var(')
			})
			.map(([, fontToken]) => ({
				label: fontToken.$value.join(','),
				value: fontToken.$value.join(', '),
				count: fontToken.$extensions['com.projectwallace.usage-count'],
			}))
		return families
	}

	private getSizeCandidates(tokens: NonNullable<typeof this._tokens>): SizeOption[] {
		const fontSizes =
			Object.entries(tokens.font_size)
				.filter(([, token]) => {
					return token.$type === 'dimension'
				})
				.map(([, token]) => ({
					value: token.$extensions['com.projectwallace.css-authored-as'],
					count: token.$extensions['com.projectwallace.usage-count'],
				}))
				.sort((a, b) => {
					return sortCssUnit(b.value, a.value)
				})
		return fontSizes
	}

	private getLineHeightCandidates(tokens: NonNullable<typeof this._tokens>): LineHeightOption[] {
		const lineHeights =
			Object.entries(tokens.line_height)
				.filter(([, token]) => {
					return token.$type === 'dimension' || token.$type === 'number'
				})
				.map(([, token]) => ({
					value: token.$extensions['com.projectwallace.css-authored-as'],
					count: token.$extensions['com.projectwallace.usage-count'],
				}))
				.sort((a, b) => {
					return sortCssUnit(b.value, a.value)
				})
		return lineHeights
	}

	private render(tokens: NonNullable<typeof this._tokens>) {
		const colors = this.getColorCandidates(tokens)
		const families = this.getFamilyCandidates(tokens)
		const sizes = this.getSizeCandidates(tokens)
		const lineHeights = this.getLineHeightCandidates(tokens)

		this._stagedColors = colors
		this._stagedFamilies = families
		this._stagedSizes = sizes
		this._stagedLineHeights = lineHeights

		this.shadowRoot!.innerHTML = html`
			<section>
				<h3>Colors</h3>
				${colors.length === 0
				? html`<tb-empty>No colors</tb-empty>`
				: html`
					<button type="button" data-action="select-all">Select all</button>
					<button type="button" data-action="unselect-all">Unselect all</button>
					<ol class="samples">
						${colors.map(option => html`
							<li>
								<input type="checkbox" name="color-candidate" id="color-${slugify(option.value)}" value="${option.value}">
								<span>
									<label for="color-${slugify(option.value)}">
										<color-inline value="${option.value}">
											<code>${option.value}</code>
										</color-inline>
											${option.label}
									</label>
									${option.properties ? html`<ul class="used-properties">
										${option.properties.map(property => `
											<li>
												<code>${property}</code>
											</li>
										`).join('')}
									</ul>`: ''}
								</span>
							</li>
						`).join('')}
					</ol>
				`
			}
			</section>
			<section>
				<h3>Font-families</h3>
				${families.length === 0
				? html`<tb-empty>No font-families</tb-empty>`
				: html`
						<button type="button" data-action="select-all">Select all</button>
						<button type="button" data-action="unselect-all">Unselect all</button>
						<ol class="samples">
							${families.map(option => html`
								<li>
									<input type="checkbox" name="family-candidate" id="color-${slugify(option.value)}" value="${option.value}">
									<span>
										<label for="color-${slugify(option.value)}">
											<code>${option.value}</code>
										</label>
										<span class="font-specimen" style="font-family: ${option.value}">AaBbCcDd 1234567890</span>
									<span>
								</li>
							`).join('')}
						</ol>
					`
			}
			</section>
			<section>
				<h3>Font-sizes</h3>
				${sizes.length === 0
				? html`<tb-empty>No font-sizes</tb-empty>`
				: html`
					<button type="button" data-action="select-all">Select all</button>
					<button type="button" data-action="unselect-all">Unselect all</button>
					<ol class="samples">
						${sizes.map(option => html`
							<li>
								<input type="checkbox" name="size-candidate" id="color-${slugify(option.value)}" value="${option.value}">
								<span>
									<label for="color-${slugify(option.value)}">
										<code>${option.value}</code>
									</label>
								<span>
							</li>
						`).join('')}
					</ol>
				`
			}
			</section>
			<section>
				<h3>Line-heights</h3>
				${lineHeights.length === 0
				? html`<tb-empty>No line-heights</tb-empty>`
				: html`
					<button type="button" data-action="select-all">Select all</button>
					<button type="button" data-action="unselect-all">Unselect all</button>
					<ol class="samples">
						${lineHeights.map(option => html`
							<li>
								<input type="checkbox" name="line-height-candidate" id="line-height-${slugify(option.value)}" value="${option.value}">
								<span>
									<label for="line-height-${slugify(option.value)}">
										<code>${option.value}</code>
									</label>
								<span>
							</li>
						`).join('')}
					</ol>
				`
			}
			</section>
		`
	}
}

customElements.define('tb-staging-tokens', StagingTokens)
