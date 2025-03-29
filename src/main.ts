import { generateRadixColors } from './generateRadixColors.js';
import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import { toCssName, toCssValue, styleAttribute, setTokens } from './utils.js';
import '@utrecht/page-layout-css';
import '@utrecht/body-css';
import '@utrecht/root-css';
import './style.css';
import './basis-theme.css';

defineCustomElements();

const primaryButton1 = {
  'utrecht.button.primary-action.background-color': '{basis.color.primary.interactive-1}',
  'utrecht.button.primary-action.border-color': '{basis.color.primary.border-2}',
  'utrecht.button.primary-action.color': '{basis.color.primary.text-2}',
  'utrecht.button.primary-action.hover.background-color': '{basis.color.primary.interactive-2}',
  'utrecht.button.primary-action.hover.border-color': '{basis.color.primary.border-3}',
  'utrecht.button.primary-action.hover.color': '{basis.color.primary.text-2}',
  'utrecht.button.primary-action.active.background-color': '{basis.color.primary.interactive-3}',
  'utrecht.button.primary-action.active.border-color': '{basis.color.primary.border-3}',
  'utrecht.button.primary-action.active.color': '{basis.color.primary.text-2}',
};

const primaryButton2 = {
  ...primaryButton1,
  'utrecht.button.primary-action.border-color': '{basis.color.transparent}',
};

const primaryButton3 = {
  'utrecht.button.primary-action.background-color': '{basis.color.primary-inverse.interactive-1}',
  'utrecht.button.primary-action.border-color': '{basis.color.primary-inverse.border-2}',
  'utrecht.button.primary-action.color': '{basis.color.primary-inverse.text-2}',
  'utrecht.button.primary-action.hover.background-color': '{basis.color.primary-inverse.interactive-2}',
  'utrecht.button.primary-action.hover.border-color': '{basis.color.primary-inverse.border-3}',
  'utrecht.button.primary-action.hover.color': '{basis.color.primary-inverse.text-2}',
  'utrecht.button.primary-action.active.background-color': '{basis.color.primary-inverse.interactive-3}',
  'utrecht.button.primary-action.active.border-color': '{basis.color.primary-inverse.border-3}',
  'utrecht.button.primary-action.active.color': '{basis.color.primary-inverse.text-2}',
};

const primaryButton4 = {
  ...primaryButton3,
  'utrecht.button.primary-action.border-color': '{basis.color.transparent}',
  'utrecht.button.primary-action.hover.border-color': '{basis.color.transparent}',
  'utrecht.button.primary-action.active.border-color': '{basis.color.transparent}',
};

const primaryButton5 = {
  ...primaryButton1,
  'utrecht.button.primary-action.background-color': '{basis.color.transparent}',
};

const primaryButton6 = {
  ...primaryButton5,
  'utrecht.button.primary-action.background-color': '{basis.color.transparent}',
  'utrecht.button.primary-action.border-color': '{basis.color.transparent}',
};

// const updateKeys = <T>(object: { [index: string]: T }, callback: (arg: string) => string) =>
// Object.fromEntries(Object.entries(object).map(([key, value]) => [callback(key), value]));

const updateKeysValues = (object: { [index: string]: string }, callback: (arg: string) => string) =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => [callback(key), callback(value)]));

const secondaryButton1 = updateKeysValues(primaryButton1, (arg: string) => arg.replace('primary', 'secondary'));
const secondaryButton2 = updateKeysValues(primaryButton2, (arg: string) => arg.replace('primary', 'secondary'));
const secondaryButton3 = updateKeysValues(primaryButton3, (arg: string) => arg.replace('primary', 'secondary'));
const secondaryButton4 = updateKeysValues(primaryButton4, (arg: string) => arg.replace('primary', 'secondary'));

const subtleButton1 = updateKeysValues(primaryButton1, (arg: string) => arg.replace('primary-action', 'subtle'));
const subtleButton2 = updateKeysValues(primaryButton2, (arg: string) => arg.replace('primary-action', 'subtle'));
const subtleButton3 = updateKeysValues(primaryButton3, (arg: string) => arg.replace('primary-action', 'subtle'));
const subtleButton4 = updateKeysValues(primaryButton4, (arg: string) => arg.replace('primary-action', 'subtle'));
const subtleButton5 = updateKeysValues(primaryButton5, (arg: string) => arg.replace('primary-action', 'subtle'));
const subtleButton6 = updateKeysValues(primaryButton6, (arg: string) => arg.replace('primary-action', 'subtle'));

const aaTargetSize = {
  'basis.pointer-target.min-block-size': '24px',
  'basis.pointer-target.min-inline-size': '24px',
};
const aaaTargetSize = {
  'basis.pointer-target.min-block-size': '44px',
  'basis.pointer-target.min-inline-size': '44px',
};

const materialTargetSize = {
  'basis.pointer-target.min-block-size': '48px',
  'basis.pointer-target.min-inline-size': '48px',
};

const buttonWithoutPadding = {
  'utrecht.button.padding-inline-start': '0',
  'utrecht.button.padding-inline-end': '0',
  'utrecht.button.padding-block-start': '0',
  'utrecht.button.padding-block-end': '0',
};

const formControlPaddingBlockZero = {
  'basis.form-control.padding-block-start': '0',
  'basis.form-control.padding-block-end': '0',
};
const formControlPaddingBlockSmall = {
  'basis.form-control.padding-block-start': '{basis.space.block.sm}',
  'basis.form-control.padding-block-end': '{basis.space.block.sm}',
};
const formControlPaddingBlockMedium = {
  'basis.form-control.padding-block-start': '{basis.space.block.md}',
  'basis.form-control.padding-block-end': '{basis.space.block.md}',
};
const formControlPaddingBlockLarge = {
  'basis.form-control.padding-block-start': '{basis.space.block.lg}',
  'basis.form-control.padding-block-end': '{basis.space.block.lg}',
};

const formControlPaddingInlineZero = {
  'basis.form-control.padding-inline-start': '0',
  'basis.form-control.padding-inline-end': '0',
};
const formControlPaddingInlineSmall = {
  'basis.form-control.padding-inline-start': '{basis.space.inline.sm}',
  'basis.form-control.padding-inline-end': '{basis.space.inline.sm}',
};
const formControlPaddingInlineMedium = {
  'basis.form-control.padding-inline-start': '{basis.space.inline.md}',
  'basis.form-control.padding-inline-end': '{basis.space.inline.md}',
};
const formControlPaddingInlineLarge = {
  'basis.form-control.padding-inline-start': '{basis.space.inline.lg}',
  'basis.form-control.padding-inline-end': '{basis.space.inline.lg}',
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <utrecht-page-header>
    <h1>Theme Builder</h1>
  </utrecht-page-header>
  <utrecht-page-body>
    <form>
    <div>
    <input type="color" oninput="handleColor(event.target, 'primary')" id="primary-input" value="#FF0000">
    <utrecht-button type="button" appearance="primary-action-button">Primary action</utrecht-button>
    </div>
    <div>
    <input type="color" oninput="handleColor(event.target, 'secondary')" id="secondary-input" value="#00FF00">
    <utrecht-button type="button" appearance="secondary-action-button">Secondary action</utrecht-button>
    </div>
    <div>
      <input type="color" oninput="handleColor(event.target, 'text')" id="text-input" value="#000000">
      <div>Text</div>
    </div>
    <div>
      <p>Form control border radius:</p>
      <utrecht-textbox></utrecht-textbox>
      <ul>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="basis.form-control.border-radius" value="0" onclick="setToken(event.target)">Square corners</utrecht-button> (recommended)</li>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="basis.form-control.border-radius" value="{basis.border-radius.sm}" onclick="setToken(event.target)">Small</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="basis.form-control.border-radius" value="{basis.border-radius.md}" onclick="setToken(event.target)">Medium</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="basis.form-control.border-radius" value="{basis.border-radius.lg}" onclick="setToken(event.target)">Large</utrecht-button></li>
      </ul>
    </div>
    <div>
      <figure>
        <div style="${styleAttribute(buttonWithoutPadding)}">
          <utrecht-textarea value="Ut quos illum eligendi. Et aut optio vitae. Reiciendis consectetur ipsam illo laborum rem id. Quo vel iure optio commodi veniam nihil. Quae ipsa non qui. Rem dolores nulla commodi ratione cum.
Aut iste quam unde. Iure quidem et accusantium pariatur molestiae occaecati consequatur. Aut consectetur amet ea sint officia nesciunt ullam ut. Odio nulla rem neque et facere.
Necessitatibus debitis eos expedita dolor. Quam laudantium qui officia est et eos. Sunt dolores voluptatibus nisi similique quae consequatur est.
Repellendus assumenda eveniet qui. Ab eum et ut et odit quia. Voluptates rerum et qui sed aperiam totam veritatis quos."></utrecht-textarea>
        </div>
        <figcaption>Textarea without minimum pointer target size, demonstrating the padding needed for readability</figcaption>
      </figure>
      <p>Form control padding above and below:</p>
      <ul>
      <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingBlockZero)}' onclick="setTokens(event.target)">No padding</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingBlockSmall)}' onclick="setTokens(event.target)">Small</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingBlockMedium)}' onclick="setTokens(event.target)">Medium</utrecht-button> (recommended)</li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingBlockLarge)}' onclick="setTokens(event.target)">Large</utrecht-button></li>
      </ul>
      <p>Form control padding left and right:</p>
      <ul>
      <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingInlineZero)}' onclick="setTokens(event.target)">No padding</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingInlineSmall)}' onclick="setTokens(event.target)">Small</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingInlineMedium)}' onclick="setTokens(event.target)">Medium</utrecht-button> (recommended)</li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(formControlPaddingInlineLarge)}' onclick="setTokens(event.target)">Large</utrecht-button></li>
      </ul>
    </div>
    <div>
      <p>Button border radius:</p>
      <utrecht-textbox></utrecht-textbox>
      <ul>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="utrecht.button.border-radius" value="0" onclick="setToken(event.target)">Square corners</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="utrecht.button.border-radius" value=onclick="setToken(event.target)">Small</utrecht-button> (recommended)</li>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="utrecht.button.border-radius" value="{basis.border-radius.md}" onclick="setToken(event.target)">Medium</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" name="utrecht.button.border-radius" value="{basis.border-radius.lg}" onclick="setToken(event.target)">Large</utrecht-button></li>
      </ul>
    </div>
    <div>
      <p>Primary button style:</p>
      <ul>
        <li><utrecht-button type="button" appearance="primary-action-button" value='${JSON.stringify(primaryButton1)}' onclick="setTokens(event.target)">Plain with border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="primary-action-button" value='${JSON.stringify(primaryButton2)}' onclick="setTokens(event.target)">Plain without border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="primary-action-button" value='${JSON.stringify(primaryButton3)}' onclick="setTokens(event.target)">Inverse with border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="primary-action-button" value='${JSON.stringify(primaryButton4)}' onclick="setTokens(event.target)">Inverse without border</utrecht-button> (recommended)</li>
      </ul>
    </div>
    <div>
      <p>Secondary button style:</p>
      <ul>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(secondaryButton1)}' onclick="setTokens(event.target)">Plain with border</utrecht-button>  (recommended)</li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(secondaryButton2)}' onclick="setTokens(event.target)">Plain without border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(secondaryButton3)}' onclick="setTokens(event.target)">Inverse with border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-action-button" value='${JSON.stringify(secondaryButton4)}' onclick="setTokens(event.target)">Inverse without border</utrecht-button></li>
      </ul>
    </div>
    <div>
      <p>Subtle button style:</p>
      <ul>
        <li><utrecht-button type="button" appearance="subtle-button" value='${JSON.stringify(subtleButton1)}' onclick="setTokens(event.target)">Plain with border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="subtle-button" value='${JSON.stringify(subtleButton2)}' onclick="setTokens(event.target)">Plain without border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="subtle-button" value='${JSON.stringify(subtleButton3)}' onclick="setTokens(event.target)">Inverse with border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="subtle-button" value='${JSON.stringify(subtleButton4)}' onclick="setTokens(event.target)">Inverse without border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="subtle-button" value='${JSON.stringify(subtleButton5)}' onclick="setTokens(event.target)">Transparent without border</utrecht-button></li>
        <li><utrecht-button type="button" appearance="subtle-button" value='${JSON.stringify(subtleButton6)}' onclick="setTokens(event.target)">Transparent with border</utrecht-button> (recommended)</li>
      </ul>
    </div>
    <div>
      <p>Minimum target size:</p>
      <figure>
        <div style="${styleAttribute(buttonWithoutPadding)}">
          <utrecht-button type="button"><span contentEditable="true">❤️</span></utrecht-button>
        </div>
        <figcaption>Button without padding, demonstrating the minimum pointer target size</figcaption>
      </figure>
      <ul>
        <li><utrecht-button type="button" appearance="secondary-button" value='${JSON.stringify(aaTargetSize)}' onclick="setTokens(event.target)">WCAG Level AA: 24px</utrecht-button></li>
        <li><utrecht-button type="button" appearance="secondary-button" value='${JSON.stringify(aaaTargetSize)}' onclick="setTokens(event.target)">WCAG Level AAA: 44px</utrecht-button> (recommended)</li>
        <li><utrecht-button type="button" appearance="secondary-button" value='${JSON.stringify(materialTargetSize)}' onclick="setTokens(event.target)">Material Design: 48px</utrecht-button></li>
      </ul>
    </div>
    </form>
  </utrecht-page-body>
`;

const handleColor = (target: HTMLInputElement, name: string) => {
  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  const radixTheme = generateRadixColors({
    appearance: 'light',
    accent: target.value,
    gray: '#EEEEEE',
    background: '#FFFFFF',
  });

  const inverseTheme = generateRadixColors({
    appearance: 'dark',
    accent: target.value,
    gray: '#111111',
    background: '#000000',
  });
  const { accentScale } = radixTheme;
  const { accentScale: inverseAccentScale } = inverseTheme;

  const createScaleObject = (scale, prefix = '') =>
    scale.reduce((obj, color, index) => {
      let colorNumber = index + 1;
      let scalePrefix = 'color';
      if ([0, 1].includes(index)) {
        scalePrefix = 'bg-';
        colorNumber = index + 1;
      } else if ([2, 3, 4].includes(index)) {
        scalePrefix = 'interactive-';
        colorNumber = index - 1;
      } else if ([5, 6, 7].includes(index)) {
        scalePrefix = 'border-';
        colorNumber = index - 4;
      } else if ([8, 9].includes(index)) {
        scalePrefix = 'fill-';
        colorNumber = index - 7;
      } else if ([10, 11].includes(index)) {
        scalePrefix = 'text-';
        colorNumber = index - 9;
      }
      return {
        ...obj,
        [`${prefix}${scalePrefix}${colorNumber}`]: {
          ['$value']: color,
        },
      };
    }, {});
  console.log(inverseAccentScale, accentScale);
  const scaleTokens = createScaleObject(accentScale);
  const inverseScaleTokens = createScaleObject(inverseAccentScale, 'inverse-');

  const tokens = {
    ...scaleTokens,
    ...inverseScaleTokens,
  };
  console.log(tokens);
  for (var key in tokens) {
    document.documentElement.style.setProperty(`--basis-color-${name}-${key}`, String(tokens[key]['$value']));
  }
  // setTheme(set(theme, tokenData.tokenRef, scaleTokens));
};

const setToken = (input: HTMLButtonElement | HTMLInputElement) => {
  const tokenName = input.name;
  const tokenValue = input.value;

  // Convert Design Token name to CSS custom property
  const cssName = toCssName(tokenName);

  // Convert Design Token alias to CSS variable
  const cssValue = toCssValue(tokenValue);

  console.log(cssName, cssValue);

  document.documentElement.style.setProperty(cssName, cssValue);
};

handleColor(document.getElementById('primary-input'), 'primary');
handleColor(document.getElementById('secondary-input'), 'secondary');
handleColor(document.getElementById('text-input'), 'text');

window['handleColor'] = handleColor;
window['setToken'] = setToken;
window['setTokens'] = setTokens;
