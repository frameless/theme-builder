import type { ColorOption, ExampleColorPresetInput } from './color-preset-input.js';
import type { FontOption, ExampleFontPresetInput } from './font-preset-input.js';
import type { DimensionOption } from './dimension-preset-input.js';
import { sortFn as sortCssUnit } from 'css-unit-sort';
import type { FontPanel } from './font-panel.js';
import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import { toCssName, styleAttribute } from './utils.js';
import { ComponentVariant, VariantOptionGroup, VariantsMap } from './types.js';
import { variants } from './design-token-options.js';
import './story-canvas.js';
import './basis-theme-stylesheet.js';
import './example-design-token-value.js';
import './example-font-family-details.js';
import './example-border-width.js';
import './example-single-line-of-text.js';
import './example-design-tokens-table.js';
import './color-preset-input.js';
import './font-preset-input.js';
import './font-panel.js';
import './dimension-preset-input.js';
import '@utrecht/page-layout-css';
import '@utrecht/body-css';
import '@utrecht/root-css';
import '@utrecht/table-css';
import './style.css';
import '@nl-design-system-unstable/basis-design-tokens/dist/theme.css';
import './fluid.css';
import type { css_to_tokens } from '@projectwallace/css-design-tokens';

defineCustomElements();

const buttonWithoutPadding = {
  'utrecht.button.padding-inline-start': '0',
  'utrecht.button.padding-inline-end': '0',
  'utrecht.button.padding-block-start': '0',
  'utrecht.button.padding-block-end': '0',
};

const variantsMap: VariantsMap = new Map(variants.map((group) => [group.id, group]));

interface FontFamilyVariant {
  name: string;
  recommended?: boolean;
}

const fontFamilies: FontFamilyVariant[] = [
  {
    name: 'Atkinson Hyperlegible',
  },
  {
    name: 'Fira Sans',
    recommended: true,
  },
  {
    name: 'Inclusive Sans',
  },
  {
    name: 'Lexend',
  },
  {
    name: 'Noto Sans',
  },
  {
    name: 'Plus Jakarta Sans',
  },
  {
    name: 'Public Sans',
  },
  {
    name: 'Source Sans 3',
  },
  {
    name: 'Varta',
  },
];

const codeFonts: FontFamilyVariant[] = [
  {
    name: 'Courier',
  },
  {
    name: 'Monaco',
  },
  {
    name: 'Fira Code',
    recommended: true,
  },
];

const renderGroup = (groupId: string, appearance?: string) => {
  const group = variantsMap.get(groupId);
  if (!group) {
    const errorMessage = `Group not found: ${groupId}`;
    console.error(errorMessage);
    return `<utrecht-alert type="error">${errorMessage}</utrecht-alert>`;
  }
  return renderVariants(group, appearance);
};

const renderVariants = ({ id, variants }: VariantOptionGroup, appearance = 'subtle-button') =>
  `<utrecht-button-group direction="column">${variants
    .map(
      ({ id: optionId, name, recommended }) =>
        `<div><utrecht-button type="button" name="${id}" appearance="${appearance}" value="${optionId}" onclick="themeBuilder.clickGroupOption(event.currentTarget.name, event.currentTarget.value)">${name}</utrecht-button>${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}</div>`,
    )
    .join('\n')}</utrecht-button-group>`;

const renderTokens = ({ variants }: VariantOptionGroup, appearance = 'subtle-button') =>
  `<ul>${variants
    .map(({ name, recommended, flatTokens }) => {
      const tokens = Object.entries(flatTokens);
      if (tokens.length === 1) {
        const [tokenName, tokenValue] = tokens[0];

        return `<li><utrecht-button type="button" name="${tokenName}" appearance="${appearance}" value='${JSON.stringify(tokenValue)}' onclick="themeBuilder.setToken(event.currentTarget.name, JSON.parse(event.currentTarget.value))">${name}</utrecht-button>${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}</li>`;
      } else {
        return '<utrecht-alert type="error" lang="en">Multiple tokens is not supported yet.</utrecht-alert>';
      }
    })
    .join('\n')}</ul>`;

const renderFontFamilyVariants = (variants: FontFamilyVariant[], tokenName: string) =>
  renderTokens({
    id: tokenName,
    variants: variants.map((obj): ComponentVariant => {
      const { name } = obj;
      return {
        ...obj,
        id: name,
        flatTokens: {
          [tokenName]: `"${name}"`,
        },
        name: `<span class="example-font-sample" style="font-family: '${name}'">${name}</span>`,
      };
    }),
  });

const renderColorScalePicker = (name: string, inverseName: string, defaultValue: string) =>
  `<input type="color" oninput='themeBuilder.handleColorInput(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})' value="${defaultValue}">`;

const radixColors = [
  { label: 'voilet', value: '#5315f6' },
  { label: 'Gray', value: '#3f5676' },
  { label: 'Pink', value: '#a60e52' },
  { label: 'Red', value: '#a41e24' },
  { label: 'Orange', value: '#6a2e13' },
  { label: 'Yellow', value: '#8b3e18' },
  { label: 'Green', value: '#645400' },
  { label: 'Green', value: '#116227' },
  { label: 'Sea green', value: '#006053' },
  { label: 'Blue', value: '#00588f' },
];

const renderColorScaleExample = (name: string) => {
  const keys = [
    'bg-1',
    'bg-2',
    'interactive-1',
    'interactive-2',
    'interactive-3',
    'border-1',
    'border-2',
    'border-3',
    'fill-1',
    'fill-2',
    'text-1',
    'text-2',
  ];
  const content = keys
    .map(
      (color) =>
        `<div><utrecht-color-sample color="var(${toCssName(`${name}.${color}`)})"></utrecht-color-sample></div>`,
    )
    .join('\n');

  return `<div><utrecht-code>${name}</utrecht-code>:</div><div><div class="color-sample-list">${content}</div></div>`;
};

const renderPresetForm = () => {
  return `
    <form id="url-input-form">
      <fieldset>
        <legend>Website for preset colors:</legend>
        <label for="url-input">URL to scrape</label>
        <input id="url-input" name="url-input" list="url-input-list" inputmode="url">
        <datalist id="url-input-list">
          <option value="loket.digitaal.utrecht.nl">loket.digitaal.utrecht.nl</option>
          <option value="rijksoverheid.nl">rijksoverheid.nl</option>
          <option value="purmerend.nl">purmerend.nl</option>
          <option value="rotterdam.nl">rotterdam.nl</option>
        </datalist>
        <button type="submit">Scrape URL</button>
        <p>or use a preset:</p>
        <label>Preset URL</label>
        <select id="url-preset-list">
          <option value=""></option>
          <option value="loket.digitaal.utrecht.nl">loket.digitaal.utrecht.nl</option>
          <option value="rijksoverheid.nl">rijksoverheid.nl</option>
          <option value="purmerend.nl">purmerend.nl</option>
          <option value="rotterdam.nl">rotterdam.nl</option>
        </select>
      </fieldset>
    </form>
  `
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <basis-theme-stylesheet></basis-theme-stylesheet>
  <header>
    <h1>Theme Builder</h1>
  </header>
  <div>
    <theme-builder-frame>
      ${renderPresetForm()}
    </theme-builder-frame>

    <theme-builder-frame>
      <h2>Document</h2>
      <theme-builder-split-view>
        <div>
          <fieldset>
            <legend>Document colors</legend>
            <div>
              <label>
                Text color
                <example-color-preset-input htmlId="document-color" name="basis.color.text.text-1" inverse="basis.color.text-inverse"></example-color-preset-input>
              </label>
            </div>
            <div>
              <label>
                Background color
                <example-color-preset-input htmlId="document-background" name="basis.document.bg"></example-color-preset-input>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Document fonts</legend>
            <div>
              <label>
                Body family
                <example-font-preset-input htmlId="document-font" name="basis.typography.font-family.default"></example-font-preset-input>
              </label>
            </div>
            <div>
              <label>
                Heading font
                <example-font-preset-input htmlId="heading-font" name="basis.typography.font-family.heading"></example-font-preset-input>
              </label>
            </div>
          </fieldset>
        </div>
        <div class="basis-theme">
          <example-story-canvas>
            <utrecht-heading-2>My document</utrecht-heading-2>
            <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </utrecht-paragraph>
          </example-story-canvas>
        </div>
      </theme-builder-split-view>
    </theme-builder-frame>

    <theme-builder-frame>
      <h2>Typography</h2>
      <h3>Headings</h3>
      <theme-builder-split-view>
        <fieldset>
            <legend>Basic Heading</legend>
            <label>
              Font-family
              <example-font-preset-input name="basis.typography.font-family.heading"></example-font-preset-input>
            </label>
            <label>
              Color
              <example-color-preset-input name="basis.heading.color" inverse="basis.heading.color-inverse"></example-color-preset-input>
            </label>
          </fieldset>
          <div class="basis-theme">
            <example-story-canvas>
              <utrecht-heading-1>heading level 1</utrecht-heading-1>
              <utrecht-heading-2>heading level 2</utrecht-heading-2>
              <utrecht-heading-3>heading level 3</utrecht-heading-3>
              <utrecht-heading-4>heading level 4</utrecht-heading-4>
            </example-story-canvas>
          </div>
        </theme-builder-split-view>
        <theme-builder-split-view>
          ${[1, 2, 3, 4].map(level => `
            <fieldset>
              <legend>Heading ${level}</legend>
              <font-panel token="utrecht.heading-${level}"></font-panel>
            </fieldset>
            <div class="basis-theme">
              <example-story-canvas>
                <utrecht-heading-${level}>heading level ${level}</utrecht-heading-${level}>
              </example-story-canvas>
            </div>
          `).join('')}
      </theme-builder-split-view>
      <theme-builder-split-view>
        <div>
          <utrecht-heading-3>Body text</utrecht-heading-3>
          <fieldset>
            <legend>Paragraph</legend>
            <font-panel token="basis.typography"></font-panel>
          </fieldset>
          <fieldset>
            <legend>Lead paragraph</legend>
            <font-panel token="basis.typography" italic></font-panel>
          </fieldset>
        </div>
        <div class="basis-theme">
          <example-story-canvas>
            <utrecht-paragraph>Lorem ipsum</utrecht-heading-1>
            <utrecht-paragraph lead="true">Lorem ipsum lead</utrecht-heading-2>
          </example-story-canvas>
        </div>
      </theme-builder-split-view>
    </theme-builder-frame>

    <theme-builder-frame>
      <h2>Forms</h2>
      <section>
        <h3>Text Inputs</h3>
        <theme-builder-split-view>
          <div>
            <fieldset>
              <legend>Vertical Spacing</legend>
              ${variantsMap.get('form-control-padding-block')?.variants.map(({ id, flatTokens, name, recommended }) => `
                  <label for="form-control-padding-block-${id}">
                  ${name}
                    <input
                      id="form-control-padding-block-${id}"
                      type="radio"
                      value="${id}"
                      name="form-control-padding-block"
                      onchange="themeBuilder.clickGroupOption(event.currentTarget.name, event.currentTarget.value)"
                    >
                    ${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}
                  </label>
                `).join('<br>')}
            </fieldset>
            <fieldset>
              <legend>Horizontal Spacing</legend>
              ${variantsMap.get('form-control-padding-inline')?.variants.map(({ id, flatTokens, name, recommended }) => `
                  <label for="form-control-padding-inline-${id}">
                    ${name}
                    <input
                      id="form-control-padding-inline-${id}"
                      type="radio"
                      value="${id}"
                      name="form-control-padding-inline"
                      onchange="themeBuilder.clickGroupOption(event.currentTarget.name, event.currentTarget.value)"
                    >
                    ${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}
                  </label>
                `).join('<br>')}
            </fieldset>
            <fieldset>
              <legend>Radius</legend>
              ${variantsMap.get('form-control-border-radius')?.variants.map(({ id, flatTokens, name, recommended }) => `
                  <label for="form-control-border-radius-${id}">
                    ${name}
                    <input
                      id="form-control-border-radius-${id}"
                      type="radio"
                      value="${id}"
                      name="form-control-border-radius"
                      onchange="themeBuilder.clickGroupOption(event.currentTarget.name, event.currentTarget.value)"
                      >
                    ${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}
                  </label>
                `).join('<br>')}
            </fieldset>
            <fieldset>
              <legend>Border width</legend>
              ${variantsMap.get('form-control-border-width')?.variants.map(({ id, flatTokens, name, recommended }) => `
                  <label for="form-control-border-width-${id}">
                    ${name}
                    <input
                      id="form-control-border-width-${id}"
                      type="radio"
                      value="${id}"
                      name="form-control-border-width"
                      onchange="themeBuilder.clickGroupOption(event.currentTarget.name, event.currentTarget.value)"
                      >
                    ${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}
                  </label>
                `).join('<br>')}
            </fieldset>
          </div>
          <div class="basis-theme">
            <example-story-canvas>
              <utrecht-paragraph>Single-line input<utrecht-paragraph>
              <utrecht-textbox value="Hello, world!"></utrecht-textbox>
              <utrecht-paragraph>Multi-line input<utrecht-paragraph>
              <utrecht-textarea value="Ut quos illum eligendi. Et aut optio vitae. Reiciendis consectetur ipsam illo laborum rem id. Quo vel iure optio commodi veniam nihil. Quae ipsa non qui. Rem dolores nulla commodi ratione cum.
                Aut iste quam unde. Iure quidem et accusantium pariatur molestiae occaecati consequatur. Aut consectetur amet ea sint officia nesciunt ullam ut. Odio nulla rem neque et facere.
                Necessitatibus debitis eos expedita dolor. Quam laudantium qui officia est et eos. Sunt dolores voluptatibus nisi similique quae consequatur est.
                Repellendus assumenda eveniet qui. Ab eum et ut et odit quia. Voluptates rerum et qui sed aperiam totam veritatis quos."></utrecht-textarea>
            </example-story-canvas>
          </div>
        </theme-builder-split-view>
      </section>
      <section>
        <h3>Checkboxes and radios</h3>
        <theme-builder-split-view>
          <fieldset>
            <legend>Form accent colors</legend>
            <example-color-preset-input name="basis.form-control.accent-color">
          </fieldset>
          <div class="basis-theme">
            <example-story-canvas>
              <label>
                Radio: on
                <input type="radio" name="test-123" value="0">
              </label>
              <label>
                Radio: off
                <input type="radio" name="test-123" value="1" checked>
              </label>
              <br>
              <label>
                Consent?
                <input type="checkbox" name="test-456" value="1" checked>
              </label>
              <br>
              <label>
                Level:
                <input type="range" min="0" max="10000" step="1000">
              <label>
            </example-story-canvas>
          </div>
        </theme-builder-split-view>
      </section>
    </theme-builder-frame>

    <theme-builder-frame>
      <h2>Action colors</h2>
      <section>
        <h3>Primary colors</h3>
        <theme-builder-split-view>
          <fieldset>
            <legend>Primary Colors</legend>
            <label>
              Link
              <example-color-preset-input name="example.color.action-2.color-default"></example-color-preset-input>
            </label>
            <br>
            <label>
              Button background
              <example-color-preset-input name="example.color.action-1-inverse.bg-default"></example-color-preset-input>
            </label>
            <br>
            <label>
              Button text
              <example-color-preset-input name="example.color.action-1-inverse.color-default"></example-color-preset-input>
            </label>
          </fieldset>
          <div class="basis-theme">
            <example-story-canvas>
              <utrecht-button appearance="primary-action-button">Primary button</utrecht-button>
              <utrecht-button>Primary button</utrecht-button>
              <utrecht-link href="https://example.com/">Voorbeeldlink</utrecht-link>
              <utrecht-pagination
  links='[{"href":"./1","index":1,"title":"Resultaat 1 tot 10"},{"href":"./2","index":2,"title":"Resultaat 11 tot 20"},{"href":"./3","index":3,"title":"Resultaat 21 tot 30"},{"href":"./4","index":4,"title":"Resultaat 31 tot 40"},{"href":"./5","index":5,"title":"Resultaat 41 tot 50"}]'
  next='{"href":"./2"}'
  prev='{"disabled":true}'
  current-index="3"
></utrecht-pagination>
            </example-story-canvas>
          </div>
        <theme-builder-split-view>
      </section>
    </theme-builder-frame>

    <form class="scroll-snap-container">
      <utrecht-heading-2>Colors</utrecht-heading-2>
      <example-story>
        <utrecht-heading-3>Primary color</utrecht-heading-3>
        <div>
          ${renderColorScalePicker('basis.color.primary', 'basis.color.primary-inverse', '#FF0000')}
          <example-color-preset-input name="basis.color.primary" inverse="basis.color.primary-inverse"></example-color-preset-input>
          ${renderColorScaleExample('basis.color.primary')}
          ${renderColorScaleExample('basis.color.primary-inverse')}
          <example-story-canvas>
            <utrecht-button type="button" appearance="primary-action-button">Primary action</utrecht-button>
          </example-story-canvas>
        </div>
      </example-story>
      <example-story>
        <utrecht-heading-3>Secondary color</utrecht-heading-3>
        ${renderColorScalePicker('basis.color.secondary', 'basis.color.secondary-inverse', '#00FF00')}
        <example-color-preset-input name="basis.color.secondary" inverse="basis.color.secondary-inverse"></example-color-preset-input>
        <example-story-canvas>
          <utrecht-button type="button" appearance="secondary-action-button">Secondary action</utrecht-button>
        </example-story-canvas>
        ${renderColorScaleExample('basis.color.secondary')}
        ${renderColorScaleExample('basis.color.secondary-inverse')}
      </example-story>
      <example-story>
        <utrecht-heading-3>Text color</utrecht-heading-3>
        <example-story-canvas>
          <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
          <utrecht-separator></utrecht-separator>
          <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
        </example-story-canvas>
        <div>
          ${renderColorScalePicker('basis.color.text', 'basis.color.text-inverse', '#000000')}
          <example-color-preset-input name="basis.color.text" inverse="basis.color.text-inverse"></example-color-preset-input>
          ${renderColorScaleExample('basis.color.text')}
          ${renderColorScaleExample('basis.color.text-inverse')}
        </div>
      </example-story>

      <example-story>
        <utrecht-heading-3>Info color</utrecht-heading-3>
        <div>
          ${renderColorScalePicker('basis.color.info', 'basis.color.info-inverse', '#0000FF')}
        <example-color-preset-input name="basis.color.info" inverse="basis.color.info-inverse"></example-color-preset-input>
          ${renderColorScaleExample('basis.color.info')}
          ${renderColorScaleExample('basis.color.info-inverse')}
        </div>
        <example-story-canvas>
          <utrecht-alert type="info">
            <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
          </utrecht-alert>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-3>Success color</utrecht-heading-3>
        <div>
          ${renderColorScalePicker('basis.color.success', 'basis.color.success-inverse', '#228B22')}
        <example-color-preset-input name="basis.color.success" inverse="basis.color.success-inverse"></example-color-preset-input>
          ${renderColorScaleExample('basis.color.success')}
          ${renderColorScaleExample('basis.color.success-inverse')}
        </div>
        <example-story-canvas>
          <utrecht-alert type="ok">
            <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
          </utrecht-alert>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-3>Warning color</utrecht-heading-3>
        <div>
          ${renderColorScalePicker('basis.color.warning', 'basis.color.warning-inverse', '#FF8C00')}
        <example-color-preset-input name="basis.color.warning" inverse="basis.color.warning-inverse"></example-color-preset-input>
          ${renderColorScaleExample('basis.color.warning')}
          ${renderColorScaleExample('basis.color.warning-inverse')}
        </div>
        <example-story-canvas>
          <utrecht-alert type="warning">
            <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
          </utrecht-alert>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-3>Error color</utrecht-heading-3>
        <div>
          ${renderColorScalePicker('basis.color.error', 'basis.color.error-inverse', '#FF0000')}
          <example-color-preset-input name="basis.color.error" inverse="basis.color.error-inverse"></example-color-preset-input>
          ${renderColorScaleExample('basis.color.error')}
          ${renderColorScaleExample('basis.color.error-inverse')}
        </div>
        <example-story-canvas>
          <utrecht-alert type="error">
            <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
          </utrecht-alert>
        </example-story-canvas>
      </example-story>

      <utrecht-heading-2>Fonts</utrecht-heading-2>
      <example-story>
        <div>
          <utrecht-heading-3>Default font family:</utrecht-heading-3>
          ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.default')}
        </div>
        <example-font-family-details value=""></example-font-family-details>
      </example-story>

      <example-story>
        <utrecht-heading-3>Heading font family:</utrecht-heading-3>
        ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.heading')}

        <example-story-canvas>
          <utrecht-heading-1>Heading 1</utrecht-heading-1>
          <utrecht-paragraph><span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: pre;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></utrecht-paragraph>
          <utrecht-heading-2>Heading 2</utrecht-heading-2>
          <utrecht-paragraph><span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: pre;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></utrecht-paragraph>
          <utrecht-heading-3>Heading 3</utrecht-heading-3>
          <utrecht-paragraph><span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: pre;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></utrecht-paragraph>
          <utrecht-heading-4>Heading 4</utrecht-heading-4>
          <utrecht-paragraph><span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: pre;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></utrecht-paragraph>
          <utrecht-heading-5>Heading 5</utrecht-heading-5>
          <utrecht-paragraph><span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: pre;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></utrecht-paragraph>
          <utrecht-heading-6>Heading 6</utrecht-heading-6>
          <utrecht-paragraph><span style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: pre;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span></utrecht-paragraph>
        </example-story-canvas>
        <example-font-family-details value=""></example-font-family-details>
      </example-story>


      <example-story>
        <utrecht-heading-3>Code font family:</utrecht-heading-3>
        ${renderFontFamilyVariants(codeFonts, 'basis.typography.font-family.code')}

        <example-story-canvas>
          <utrecht-code-block>&lt;input type="url" value="https://example.fi/"></utrecht-code-block>
        </example-story-canvas>
        <example-font-family-details value=""></example-font-family-details>
      </example-story>


      <utrecht-heading-2>Form controls</utrecht-heading-2>
      <example-story>
        <utrecht-heading-3>Form control border radius:</utrecht-heading-3>
        ${renderGroup('form-control-border-radius')}
        <example-story-canvas>
          <utrecht-textbox value="Hello, world!"></utrecht-textbox>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-3>Form control border width:</utrecht-heading-3>
        ${renderGroup('form-control-border-width')}
        <example-story-canvas>
          <utrecht-textbox value="Hello, world!"></utrecht-textbox>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-3>Form control padding</utrecht-heading-3>
        <p>Form control padding above and below:</p>
        ${renderGroup('form-control-padding-block')}
        <p>Form control padding left and right:</p>
        ${renderGroup('form-control-padding-inline')}
        <figure>
        <example-story-canvas>
          <div style="${styleAttribute(buttonWithoutPadding)}">
            <utrecht-textarea value="Ut quos illum eligendi. Et aut optio vitae. Reiciendis consectetur ipsam illo laborum rem id. Quo vel iure optio commodi veniam nihil. Quae ipsa non qui. Rem dolores nulla commodi ratione cum.
  Aut iste quam unde. Iure quidem et accusantium pariatur molestiae occaecati consequatur. Aut consectetur amet ea sint officia nesciunt ullam ut. Odio nulla rem neque et facere.
  Necessitatibus debitis eos expedita dolor. Quam laudantium qui officia est et eos. Sunt dolores voluptatibus nisi similique quae consequatur est.
  Repellendus assumenda eveniet qui. Ab eum et ut et odit quia. Voluptates rerum et qui sed aperiam totam veritatis quos."></utrecht-textarea>
          </div>
          </example-story-canvas>
          <figcaption>Textarea without minimum pointer target size, demonstrating the padding needed for readability</figcaption>
        </figure>
      </example-story>

      <utrecht-heading-2>Button</utrecht-heading-2>
      <example-story>
        <utrecht-heading-3>Button border radius:</utrecht-heading-3>
        ${renderGroup('button-border-radius')}
      </example-story>
      <example-story>
        <utrecht-heading-3>Button border width:</utrecht-heading-3>
        <example-story-canvas>
          <utrecht-textbox></utrecht-textbox>
        </example-story-canvas>
        ${renderGroup('button-border-width')}
      </example-story>
      <example-story>
        <utrecht-heading-3>Primary button style:</utrecht-heading-3>
        ${renderGroup('primary-button-appearance', 'primary-action-button')}
      </example-story>
      <example-story>
        <utrecht-heading-3>Secondary button style:</utrecht-heading-3>
        ${renderGroup('secondary-button-appearance', 'secondary-action-button')}
      </example-story>
      <example-story>
        <utrecht-heading-3>Subtle button style:</utrecht-heading-3>
        ${renderGroup('subtle-button-appearance', 'subtle-button')}
      </example-story>

      <example-story>
        <utrecht-heading-2>Data badge</utrecht-heading-2>
        <div>
          <p>Data badge style:</p>
          ${renderGroup('data-badge-appearance')}
        </div>
        <example-story-canvas>
          <utrecht-data-badge>Some subject</utrecht-data-badge>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-2>Number badge</utrecht-heading-2>
        <div>
          <p>Number badge style:</p>
          ${renderGroup('number-badge-appearance')}
        </div>
        <example-story-canvas>
          <utrecht-number-badge>42</utrecht-number-badge>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-2>Alert</utrecht-heading-2>
        <example-story-canvas>
          <utrecht-alert type="info">
            <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
          </utrecht-alert>
        </example-story-canvas>
        <div>
          <p>Alert style:</p>
          ${renderGroup('alert-appearance')}
        </div>
      </example-story>

      <example-story>
        <utrecht-heading-2>Page Footer</utrecht-heading-2>
        <div>
          <p>Page Footer style:</p>
          ${renderGroup('page-footer-appearance')}
        </div>
        <div>
          <p>Page Footer size:</p>
          ${renderGroup('page-footer-inline-size')}
        </div>
        <example-story-canvas>
          <utrecht-page-footer>
            <p>Hello world</p>
          </utrecht-page-footer>
        </example-story-canvas>
      </example-story>

      <example-story>
        <utrecht-heading-2>Page Layout</utrecht-heading-2>
        <div>
          <p>Page width (in px):</p>
          ${renderGroup('page-inline-size')}
          <input hidden type="number" min="768" max="1920" name="basis.page.max-inline-size" oninput="themeBuilder.setToken(event.currentTarget, { unit: 'px' })">
        </div>
      </example-story>

      <example-story>
        <utrecht-heading-2>Minimum target size:</utrecht-heading-2>
        <figure>
          <example-story-canvas>
            <div style="${styleAttribute(buttonWithoutPadding)}">
              <utrecht-button type="button"><span contentEditable="true">❤️</span></utrecht-button>
            </div>
          </example-story-canvas>
          <figcaption>Button without padding, demonstrating the minimum pointer target size</figcaption>
        </figure>
        ${renderGroup('pointer-target-size')}
      </example-story>

      <utrecht-heading-2>Space</utrecht-heading-2>
      <example-story>
        <utrecht-heading-3>Vertical space inside components</utrecht-heading-3>
        <div>
          ${renderGroup('space-block')}
        </div>
        <details>
        <summary>Bekijk alle <utrecht-code>basis.space.block</utrecht-code> design tokens</summary>
          <example-design-tokens-table tokens="${[
    'basis.space.block.6xl',
    'basis.space.block.5xl',
    'basis.space.block.4xl',
    'basis.space.block.3xl',
    'basis.space.block.2xl',
    'basis.space.block.xl',
    'basis.space.block.lg',
    'basis.space.block.md',
    'basis.space.block.sm',
    'basis.space.block.xs',
    'basis.space.block.2xs',
  ].join(' ')}"></example-design-tokens-table>
        </details>
      </example-story>
      <example-story>
        <utrecht-heading-3>Horizontal space inside components</utrecht-heading-3>
        <div>
          ${renderGroup('space-inline')}
        </div>
        <details>
          <summary>Bekijk alle <utrecht-code>basis.space.inline</utrecht-code> design tokens</summary>
          <example-design-tokens-table tokens="${[
    'basis.space.inline.6xl',
    'basis.space.inline.5xl',
    'basis.space.inline.4xl',
    'basis.space.inline.3xl',
    'basis.space.inline.2xl',
    'basis.space.inline.xl',
    'basis.space.inline.lg',
    'basis.space.inline.md',
    'basis.space.inline.sm',
    'basis.space.inline.xs',
    'basis.space.inline.2xs',
  ].join(' ')}"></example-design-tokens-table>
        </details>
      </example-story>

      <example-story>
        <utrecht-heading-2>Responsive layout</utrecht-heading-2>
        <div>
          <label for="fluid"><input id="fluid" type="checkbox" oninput="document.documentElement.classList.toggle('basis-theme--fluid', event.currentTarget.checked)">Fluid typography and spacing</label>
        </div>
      </example-story>

      <example-story>
        <utrecht-heading-2>Border width scale</utrecht-heading-2>
        ${renderGroup('border-width-scale')}
        <table>
          <thead>
            <th>Border size</th>
            <th>Example 1</th>
            <th>Example 2</th>
            <th>Value</th>
          </thead>
          <tbody>
            <tr>
              <th>Small</th>
              <td><example-border-width-sample orientation="inline" style="--example-border-width: var(--basis-border-width-sm)"></example-border-width-sample></td>
              <td><example-border-width-sample orientation="block" style="--example-border-width: var(--basis-border-width-sm)"></example-border-width-sample></td>
              <td><example-design-token-value name="basis.border-width.sm"></example-design-token-value></td>
            </tr>
            <tr>
              <th>Medium</th>
              <td><example-border-width-sample orientation="inline" style="--example-border-width: var(--basis-border-width-md)"></example-border-width-sample></td>
              <td><example-border-width-sample orientation="block" style="--example-border-width: var(--basis-border-width-md)"></example-border-width-sample></td>
              <td><example-design-token-value name="basis.border-width.md"></example-design-token-value></td>
            </tr>
            <tr>
              <th>Large</th>
              <td><example-border-width-sample orientation="inline" style="--example-border-width: var(--basis-border-width-lg)"></example-border-width-sample></td>
              <td><example-border-width-sample orientation="block" style="--example-border-width: var(--basis-border-width-lg)"></example-border-width-sample></td>
              <td><example-design-token-value name="basis.border-width.lg"></example-design-token-value></td>
            </tr>
            <tr>
              <th>Extra large</th>
              <td><example-border-width-sample orientation="inline" style="--example-border-width: var(--basis-border-width-xl)"></example-border-width-sample></td>
              <td><example-border-width-sample orientation="block" style="--example-border-width: var(--basis-border-width-xl)"></example-border-width-sample></td>
              <td><example-design-token-value name="basis.border-width.xl"></example-design-token-value></td>
            </tr>
          </body>
        </table>
      <example-story>
        <utrecht-heading-2>Font size scale</utrecht-heading-2>
        ${renderGroup('font-size-scale')}
        <table>
          <thead>
            <th>Font size</th>
            <th>Value</th>
            <th>Example</th>
          </thead>
          <tbody>
            <tr>
              <th>Small</th>
              <td><example-design-token-value name="basis.typography.font-size.sm"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-sm);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
            <tr>
              <th>Medium</th>
              <td><example-design-token-value name="basis.typography.font-size.md"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-md);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
            <tr>
              <th>Large</th>
              <td><example-design-token-value name="basis.typography.font-size.lg"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-lg);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
            <tr>
              <th>Extra large</th>
              <td><example-design-token-value name="basis.typography.font-size.xl"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-xl);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
            <tr>
              <th>2XL</th>
              <td><example-design-token-value name="basis.typography.font-size.2xl"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-2xl);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
            <tr>
              <th>3XL</th>
              <td><example-design-token-value name="basis.typography.font-size.3xl"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-3xl);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
            <tr>
              <th>4XL</th>
              <td><example-design-token-value name="basis.typography.font-size.4xl"></example-design-token-value></td>
              <td><span class="example-truncated-line-of-text" style="font-size: var(--basis-typography-font-size-4xl);">The Quick Brown Fox Jumps Over The Lazy Dog</span></td>
            </tr>
          </body>
        </table>
      </example-story>
    </form>
  </div>

  <footer>
    <p>Hello world</p>
  </footer>
`;

[
  { inputId: 'primary-input', name: 'primary', inverseName: 'primary-inverse' },
  { inputId: 'secondary-input', name: 'secondary', inverseName: 'primary-inverse' },
  { inputId: 'text-input', name: 'text', inverseName: 'text-inverse' },
].forEach(({ inputId, name, inverseName }) => {
  const el = document.getElementById(inputId);
  if (el instanceof HTMLInputElement) {
    window.themeBuilder.handleColorInput(el, name, inverseName);
  }
});

interface DesignToken {
  $value: string;
}
interface DesignTokenMap {
  [index: string]: DesignToken;
}

interface ProjectWallaceJSON {
  Color: DesignTokenMap;
  FontSizes: DesignTokenMap;
  FontFamily: DesignTokenMap;
  LineHeight: DesignTokenMap;
  Gradient: DesignTokenMap;
  BoxShadow: DesignTokenMap;
  Radius: DesignTokenMap;
  Duration: DesignTokenMap;
  Easing: DesignTokenMap;
}

const domainInput = document.getElementById('url-preset-list');
if (domainInput) {
  domainInput.addEventListener('input', async (event) => {
    if (event.currentTarget instanceof HTMLSelectElement) {
      const url = event.currentTarget.value.replace(/[./]+/g, '.');
      if (url) {
        const response = await fetch(`/design-tokens/${url}.json`);
        const json = (await response.json()) as ProjectWallaceJSON;
        const colors = Object.entries(json.Color).map(([name, { $value }]) => ({
          label: name,
          value: $value,
        }));

        setPresetColors(colors);

        const families = Object.entries(json.FontFamily)
          .filter(([, token]) => {
            return !token.$value.at(0)!.includes('var(')
          })
          .map(([, token]) => ({
            label: token.$value.at(0)!,
            value: token.$value.at(0)!
          }))
        setPresetFonts(families)
      } else {
        setPresetColors(radixColors);
      }
    }
  });
}

const domainInputForm = document.getElementById('url-input-form');
if (domainInputForm) {
  domainInputForm.addEventListener('submit', async function (event) {
    event.preventDefault();
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

      // Preset colors
      const colors = Object.entries(tokens.color)
        // Filter out any non-color token (system colors or unparseable 'colors')
        .filter(([, colorToken]) => colorToken.$type === 'color')
        .map(([name, colorToken]) => ({
          label: name,
          value: colorToken.$extensions?.['com.projectwallace.css-authored-as'] || '',
        }));
      setPresetColors(colors);

      // Preset font-families
      const fontFamilies = Object.entries(tokens.font_family)
        .filter(([, fontToken]) => {
          return fontToken.$type === 'fontFamily' && !fontToken.$value.at(0)!.includes('var(')
        })
        .map(([, fontToken]) => ({
          label: fontToken.$value.at(0)!,
          value: fontToken.$value.at(0)!,
        }))

      if (fontFamilies.length > 0) {
        setPresetFonts(fontFamilies)
      } else {
        setPresetFonts(PRESET_FONTS)
      }

      // Preset font-sizes
      const fontSizes =
        Object.entries(tokens.font_size)
          .filter(([, fontToken]) => {
            return fontToken.$type === 'dimension'
          })
          .map(([, fontToken]) => ({
            value: fontToken.$extensions?.['com.projectwallace.css-authored-as'] || ''
          }))
          .sort((a, b) => {
            return sortCssUnit(b.value, a.value)
          })

      if (fontSizes.length > 0) {
        // prevent the select from becoming empty if there are no suitable candidates
        setPresetFontSizes(fontSizes)
      } else {
        setPresetFontSizes(PRESET_FONT_SIZES)
      }
    }
  });
}

const setPresetColors = (colors: ColorOption[]) => {
  Array.from(document.querySelectorAll<ExampleColorPresetInput>('example-color-preset-input')).forEach((el) => {
    el.colors = colors;
  });
  for (const panel of Array.from(document.querySelectorAll<FontPanel>('font-panel'))) {
    panel.updateColorOptions(colors)
  }
};

const setPresetFonts = (fonts: FontOption[]) => {
  Array.from(document.querySelectorAll<ExampleFontPresetInput>('example-font-preset-input')).forEach((el) => {
    el.fonts = fonts;
  });

  document.dispatchEvent(new CustomEvent('PresetFontFamilyChange', {
    detail: fonts,
  }))
};

const setPresetFontSizes = (dimensions: DimensionOption[]) => {
  const panels = document.querySelectorAll<FontPanel>('font-panel')
  for (const panel of Array.from(panels)) {
    panel.updateFontSizeOptions(dimensions.map(d => d.value))
  }
};


const PRESET_FONTS = [
  {
    label: 'Sans Serif',
    value: 'sans-serif'
  },
  {
    label: 'Serif',
    value: 'serif'
  },
  {
    label: 'System',
    value: 'system-ui'
  }
]
const PRESET_FONT_SIZES = [
  { value: '1rem' },
  { value: '2rem' }
]

document.addEventListener('DOMContentLoaded', (event) => {
  setPresetColors(radixColors);
  setPresetFonts(PRESET_FONTS)
  setPresetFontSizes(PRESET_FONT_SIZES)
})

window.setPresetColors = setPresetColors;
window.setPresetFonts = setPresetFonts;
window.setPresetFontSizes = setPresetFontSizes;

declare global {
  interface Window {
    themeBuilder2: { [index: string]: any };
    setPresetColors: typeof setPresetColors;
    setPresetFonts: typeof setPresetFonts;
    setPresetFontSizes: typeof setPresetFontSizes;
  }
}
