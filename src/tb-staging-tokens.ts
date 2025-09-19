// @ts-expect-error module types not present
import { sortFn as sortCssUnit } from 'css-unit-sort';
import type { css_to_tokens } from '@projectwallace/css-design-tokens'
import { slugify } from './utils'
import { use_context } from './tb-context';
import './tb-empty.js'

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

export type ColorOption = {
	label: string;
	value: string;
	properties: string[];
	count: number;
}

export type FamilyOption = {
	label: string;
	value: string;
	count: number;
}

export type SizeOption = {
	label?: string;
	value: string;
	count: number;
}

export type LineHeightOption = {
	label?: string;
	value: string;
	count: number;
}

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

	handleEvent(event: Event) {
		const state = use_context(this)
		const target = event.target as HTMLElement

		if (target !== null && target.tagName === 'INPUT' && event.type === 'change') {
			const input = event.target as HTMLInputElement

			if (input.name === 'color-candidate') {
				const selectedColor = this._stagedColors.find(color => color.value === input.value)
				if (selectedColor !== undefined) {
					if (input.checked) {
						state.selectedColors = state.selectedColors.add(selectedColor)
					} else {
						state.selectedColors.delete(selectedColor)
						// force reactivity
						state.selectedColors = state.selectedColors
					}
				}
			}
			else if (input.name === 'family-candidate') {
				const selectedFamily = this._stagedFamilies.find(color => color.value === input.value)
				if (selectedFamily !== undefined) {
					if (input.checked) {
						state.selectedFamilies = state.selectedFamilies.add(selectedFamily)
					} else {
						state.selectedFamilies.delete(selectedFamily)
						state.selectedFamilies = state.selectedFamilies
					}
				}
			}
			else if (input.name === 'size-candidate') {
				const selectedSize = this._stagedSizes.find(option => option.value === input.value)
				if (selectedSize !== undefined) {
					if (input.checked) {
						state.selectedSizes = state.selectedSizes.add(selectedSize)
					} else {
						state.selectedSizes.delete(selectedSize)
						state.selectedSizes = state.selectedSizes
					}
				}
			}
			else if (input.name === 'line-height-candidate') {
				const selectedLineHeight = this._stagedLineHeights.find(option => option.value === input.value)
				if (selectedLineHeight !== undefined) {
					if (input.checked) {
						state.selectedLineHeights = state.selectedLineHeights.add(selectedLineHeight)
					} else {
						state.selectedLineHeights.delete(selectedLineHeight)
						state.selectedLineHeights = state.selectedLineHeights
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

	connectedCallback() {
		this.shadowRoot!.addEventListener('change', this)
		this.shadowRoot!.addEventListener('click', this)
	}

	set tokens(t: NonNullable<typeof this._tokens>) {
		this._tokens = t
		this.render(t)
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
						${colors.map(option => `
							<li>
								<input type="checkbox" name="color-candidate" id="color-${slugify(option.label)}" value="${option.value}">
								<span>
									<label for="color-${slugify(option.label)}">
										<color-inline value="${option.value}">
											<code>${option.value}</code>
										</color-inline>
											${option.label}
									</label>
									<ul class="used-properties">
										${option.properties.map(property => `
											<li>
												<code>${property}</code>
											</li>
										`).join('')}
									</ul>
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
							${families.map(option => `
								<li>
									<input type="checkbox" name="family-candidate" id="color-${slugify(option.label)}" value="${option.value}">
									<span>
										<label for="color-${slugify(option.label)}">
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
						${sizes.map(option => `
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
						${lineHeights.map(option => `
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
