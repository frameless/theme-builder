import { generateRadixColors } from './generateRadixColors.js';
import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import { toCssName, toCssValue, styleAttribute, setTokens, setCssVariables, toCssVariables } from './utils.js';
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

interface FlatTokens {
  [index: string]: string;
}
interface ComponentVariant {
  flatTokens: FlatTokens;
  name: string;
  recommended?: boolean;
}

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

const primaryButtonVariants: ComponentVariant[] = [
  {
    flatTokens: primaryButton1,
    name: 'Plain with border',
  },
  {
    flatTokens: primaryButton2,
    name: 'Plain without border',
  },
  {
    flatTokens: primaryButton3,
    name: 'Inverse with border',
  },
  {
    flatTokens: primaryButton4,
    name: 'Inverse without border',
    recommended: true,
  },
];

const secondaryButtonVariants: ComponentVariant[] = [
  {
    flatTokens: secondaryButton1,
    name: 'Plain with border',
    recommended: true,
  },
  {
    flatTokens: secondaryButton2,
    name: 'Plain without border',
  },
  {
    flatTokens: secondaryButton3,
    name: 'Inverse with border',
  },
  {
    flatTokens: secondaryButton4,
    name: 'Inverse without border',
  },
];

const subtleButtonVariants: ComponentVariant[] = [
  {
    flatTokens: subtleButton1,
    name: 'Plain with border',
  },
  {
    flatTokens: subtleButton2,
    name: 'Plain without border',
  },
  {
    flatTokens: subtleButton3,
    name: 'Inverse with border',
  },
  {
    flatTokens: subtleButton4,
    name: 'Inverse without border',
  },
  {
    flatTokens: subtleButton5,
    name: 'Transparent without border',
  },
  {
    flatTokens: subtleButton6,
    name: 'Transparent with border',
  },
];

const pointerTargetVariants: ComponentVariant[] = [
  {
    flatTokens: aaTargetSize,
    name: 'WCAG Level AA: 24px',
  },
  {
    flatTokens: aaaTargetSize,
    name: 'WCAG Level AAA: 44px',
    recommended: true,
  },
  {
    flatTokens: materialTargetSize,
    name: 'Material Design: 48px',
  },
];

const buttonBorderRadiusVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.button.border-radius': '0',
    },
    name: 'Square corners',
  },
  {
    flatTokens: {
      'utrecht.button.border-radius': '{basis.border-radius.sm}',
    },
    name: 'Small',
    recommended: true,
  },
  {
    flatTokens: {
      'utrecht.button.border-radius': '{basis.border-radius.md}',
    },
    name: 'Medium',
  },
  {
    flatTokens: {
      'utrecht.button.border-radius': '{basis.border-radius.lg}',
    },
    name: 'Large',
  },
  {
    flatTokens: {
      'utrecht.button.border-radius': '{basis.border-radius.round}',
    },
    name: 'Round',
  },
];

const formControlPaddingBlockVariants: ComponentVariant[] = [
  {
    flatTokens: formControlPaddingBlockZero,
    name: 'No padding',
  },
  {
    flatTokens: formControlPaddingBlockSmall,
    name: 'Small',
  },
  {
    flatTokens: formControlPaddingBlockMedium,
    name: 'Medium',
    recommended: true,
  },
  {
    flatTokens: formControlPaddingBlockLarge,
    name: 'Large',
  },
];

const formControlPaddingInlineVariants: ComponentVariant[] = [
  {
    flatTokens: formControlPaddingInlineZero,
    name: 'No padding',
  },
  {
    flatTokens: formControlPaddingInlineSmall,
    name: 'Small',
  },
  {
    flatTokens: formControlPaddingInlineMedium,
    name: 'Medium',
    recommended: true,
  },
  {
    flatTokens: formControlPaddingInlineLarge,
    name: 'Large',
  },
];

const buttonBorderWidthVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.button.border-width': '{basis.border-width.sm}',
    },
    name: 'Small',
    recommended: true,
  },
  {
    flatTokens: {
      'utrecht.button.border-width': '{basis.border-width.sm}',
    },
    name: 'Medium',
  },
];

const formControlBorderRadius: ComponentVariant[] = [
  {
    flatTokens: {
      'basis.form-control.border-radius': '0',
    },
    name: 'Square corners',
  },
  {
    flatTokens: {
      'basis.form-control.border-radius': '{basis.border-radius.sm}',
    },
    name: 'Small',
    recommended: true,
  },
  {
    flatTokens: {
      'basis.form-control.border-radius': '{basis.border-radius.md}',
    },
    name: 'Medium',
  },
  {
    flatTokens: {
      'basis.form-control.border-radius': '{basis.border-radius.lg}',
    },
    name: 'Large',
  },
];

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

const renderVariants = (variants: ComponentVariant[], appearance = 'subtle-button') => `<ul>${variants
  .map(
    ({ flatTokens, name, recommended }) =>
      `<li><utrecht-button type="button" appearance="${appearance}" value='${JSON.stringify(flatTokens)}' onclick="themeBuilder.setTokens(event.target)">${name}</utrecht-button>${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}</li>`,
  )
  .join('\n')}
      </ul>`;

const renderFontFamilyVariants = (variants: FontFamilyVariant[], tokenName: string) =>
  renderVariants(
    variants.map((obj): ComponentVariant => {
      const { name } = obj;
      return {
        ...obj,
        flatTokens: {
          [tokenName]: `"${name}"`,
        },
        name: `<span class="example-font-sample" style="font-family: '${name}'">${name}</span>`,
      };
    }),
  );

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <utrecht-page-header>
    <utrecht-heading-1>Ceci n'est pas un theme builder</utrecht-heading-1>
  </utrecht-page-header>
  <utrecht-page-body>
    <form>
    <div>
    <input type="color" oninput="themeBuilder.handleColor(event.target, 'primary')" id="primary-input" value="#FF0000">
    <utrecht-button type="button" appearance="primary-action-button">Primary action</utrecht-button>
    </div>
    <div>
    <input type="color" oninput="themeBuilder.handleColor(event.target, 'secondary')" id="secondary-input" value="#00FF00">
    <utrecht-button type="button" appearance="secondary-action-button">Secondary action</utrecht-button>
    </div>
    <div>
      <input type="color" oninput="themeBuilder.handleColor(event.target, 'text')" id="text-input" value="#000000">
      <div>Text</div>
    </div>
    <div>
      <p>Default font family:</p>
      ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.default')}
    </div>
    <div>
    <div>
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
    </div>
      <p>Heading font family:</p>
      ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.heading')}
    </div>
    <div>
      <utrecht-code-block>&lt;input type="url" value="https://example.fi/"></utrecht-code-block>
      <p>Code family:</p>
      ${renderFontFamilyVariants(codeFonts, 'basis.typography.font-family.code')}
    </div>
    <div>
      <p>Form control border radius:</p>
      <utrecht-textbox></utrecht-textbox>
      ${renderVariants(formControlBorderRadius)}
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
      ${renderVariants(formControlPaddingBlockVariants)}
      <p>Form control padding left and right:</p>
      ${renderVariants(formControlPaddingInlineVariants)}
    </div>
    <div>
      <p>Button border radius:</p>
      ${renderVariants(buttonBorderRadiusVariants)}
    </div>
    <div>
      <p>Button border width:</p>
      <utrecht-textbox></utrecht-textbox>
      ${renderVariants(buttonBorderWidthVariants)}
    </div>
    <div>
      <p>Primary button style:</p>
      ${renderVariants(primaryButtonVariants, 'primary-action-button')}
    </div>
    <div>
      <p>Secondary button style:</p>
      ${renderVariants(secondaryButtonVariants, 'secondary-action-button')}
    </div>
    <div>
      <p>Subtle button style:</p>
      ${renderVariants(subtleButtonVariants, 'subtle-button')}
    </div>
    <div>
      <p>Minimum target size:</p>
      <figure>
        <div style="${styleAttribute(buttonWithoutPadding)}">
          <utrecht-button type="button"><span contentEditable="true">❤️</span></utrecht-button>
        </div>
        <figcaption>Button without padding, demonstrating the minimum pointer target size</figcaption>
      </figure>
      ${renderVariants(pointerTargetVariants)}
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

  const createScaleObject = (scale: Array<string>, prefix = ''): { [index: string]: string } =>
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
        [`${prefix}${scalePrefix}${colorNumber}`]: color,
      };
    }, {});

  const scaleTokens = createScaleObject(accentScale, `basis.color.${name}.`);
  const inverseScaleTokens = createScaleObject(inverseAccentScale, `basis.color.${name}-inverse.`);

  const tokens = {
    ...scaleTokens,
    ...inverseScaleTokens,
  };

  setCssVariables(toCssVariables(tokens));
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

[
  { inputId: 'primary-input', name: 'primary' },
  { inputId: 'secondary-input', name: 'secondary' },
  { inputId: 'text-input', name: 'text' },
].forEach(({ inputId, name }) => {
  const el = document.getElementById(inputId);
  if (el instanceof HTMLInputElement) {
    handleColor(el, name);
  }
});
declare global {
  interface Window {
    themeBuilder: { [index: string]: any };
  }
}

window.themeBuilder = {
  handleColor,
  setToken,
  setTokens,
};
