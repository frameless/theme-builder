import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import type { VariantsMap } from './types.js';
import { variants } from './design-token-options.js';
import './story-canvas.js';
import './basis-theme-stylesheet.js';
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
import "https://elements.colorjs.io/src/color-scale/color-scale.js";
import "https://elements.colorjs.io/src/color-inline/color-inline.js";
import './tb-page.js'
import './tb-url-form.js'
import './tb-staging-tokens.js'
import './tb-context.js'
import './tb-context-provider.js'
import type { StagingTokens, ColorOption } from './tb-staging-tokens.js';

defineCustomElements();

const variantsMap: VariantsMap = new Map(variants.map((group) => [group.id, group]));

document.addEventListener('preset-tokens', (event: CustomEvent<ReturnType<typeof css_to_tokens>>) => {
  Array.from(document.querySelectorAll<StagingTokens>('tb-staging-tokens')).forEach(element => {
    element.tokens = event.detail
  })
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <basis-theme-stylesheet></basis-theme-stylesheet>

  <tb-context-provider>
    <tb-page>
      <tb-url-form></tb-url-form>
      <tb-staging-tokens></tb-staging-tokens>
    </tb-page>

    <tb-page>
      <h2>Document</h2>
      <theme-builder-split-view>
        <div>
          <fieldset>
            <legend>Document colors</legend>
            <div>
              <label>
                Text color
                <example-color-preset-input name="basis.color.text"></example-color-preset-input>
              </label>
            </div>
            <div>
              <label>
                Background color
                <example-color-preset-input name="basis.document.bg"></example-color-preset-input>
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
    </tb-page>

    <tb-page>
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
            <font-panel token="basis.typography"></font-panel>
          </fieldset>
        </div>
        <div class="basis-theme">
          <example-story-canvas>
            <utrecht-paragraph>Lorem ipsum</utrecht-heading-1>
            <utrecht-paragraph lead="true">Lorem ipsum lead</utrecht-heading-2>
          </example-story-canvas>
        </div>
      </theme-builder-split-view>
    </tb-page>
  </tb-context-provider>





  <!--<div>
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
            <fieldset>
              <legend>Colors</legend>
              <label>
                Border
                <example-color-preset-input name="basis.form-control.border.color"></example-color-preset-input>
              </label>
              <br>
              <label>
                Background
                <example-color-preset-input name="basis.form-control.background-color"></example-color-preset-input>
              </label>
              <br>
              <label>
                Text
                <example-color-preset-input name="basis.form-control.color"></example-color-preset-input>
              </label>
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
              <example-color-preset-input name="basis.color.default"></example-color-preset-input>
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
    </theme-builder-frame>-->
`;


;[
  { inputId: 'primary-input', name: 'primary', inverseName: 'primary-inverse' },
  { inputId: 'secondary-input', name: 'secondary', inverseName: 'primary-inverse' },
  { inputId: 'text-input', name: 'text', inverseName: 'text-inverse' },
].forEach(({ inputId, name, inverseName }) => {
  const el = document.getElementById(inputId);
  if (el instanceof HTMLInputElement) {
    window.themeBuilder.handleColorInput(el, name, inverseName);
  }
});

declare global {
  interface Window {
    themeBuilder2: { [index: string]: any };
  }
}
