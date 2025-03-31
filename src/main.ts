import { generateRadixColors } from './generateRadixColors.js';
import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import { toCssName, styleAttribute, setCssVariables, toCssVariables } from './utils.js';
import { ComponentVariant, VariantOptionGroup, VariantsMap } from './types.js';
import { variants } from './design-token-options.js';
import './story-canvas.js';
import './basis-theme-stylesheet.js';
import '@utrecht/page-layout-css';
import '@utrecht/body-css';
import '@utrecht/root-css';
import './style.css';
import './basis-theme.css';
import './fluid.css';

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
  `<ul>${variants
    .map(
      ({ flatTokens, name, recommended }) =>
        `<li><utrecht-button type="button" name="${id}" appearance="${appearance}" value='${JSON.stringify(flatTokens)}' onclick="themeBuilder.setTokens(event.currentTarget)">${name}</utrecht-button>${recommended ? ' <utrecht-data-badge>recommended</utrecht-data-badge>' : ''}</li>`,
    )
    .join('\n')}</ul>`;

const renderFontFamilyVariants = (variants: FontFamilyVariant[], tokenName: string) =>
  renderVariants({
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
  `<input type="color" oninput='themeBuilder2.handleColor(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})' value="${defaultValue}">`;

const renderColorSamplePicker = (name: string, inverseName: string, colors: { name: string; color: string }[]) =>
  `<details><summary>Show preset colors</summary><utrecht-button-group>${colors
    .map(
      ({ name: colorName, color }) =>
        `<utrecht-button onclick='themeBuilder2.handleColor(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})' value="${color}"><utrecht-color-sample color="${color}"></utrecht-color-sample> ${colorName}</utrecht-button>`,
    )
    .join('\n')}</utrecht-button-group></details>`;

const radixColors = [
  { name: 'voilet', color: '#5315f6' },
  { name: 'Gray', color: '#3f5676' },
  { name: 'Pink', color: '#a60e52' },
  { name: 'Red', color: '#a41e24' },
  { name: 'Orange', color: '#6a2e13' },
  { name: 'Yellow', color: '#8b3e18' },
  { name: 'Green', color: '#645400' },
  { name: 'Green', color: '#116227' },
  { name: 'Sea green', color: '#006053' },
  { name: 'Blue', color: '#00588f' },
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

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <basis-theme-stylesheet></basis-theme-stylesheet>
  <utrecht-page-header>
    <utrecht-heading-1>Frameless Theme Builder</utrecht-heading-1>
  </utrecht-page-header>
  <utrecht-page-body>
    <form>
    <utrecht-heading-2>Colors</utrecht-heading-2>
    <utrecht-heading-3>Primary color</utrecht-heading-3>
    <div>
      ${renderColorScalePicker('basis.color.primary', 'basis.color.primary-inverse', '#FF0000')}
      ${renderColorSamplePicker('basis.color.primary', 'basis.color.primary-inverse', radixColors)}
      ${renderColorScaleExample('basis.color.primary')}
      ${renderColorScaleExample('basis.color.primary-inverse')}
      <example-story-canvas>
        <utrecht-button type="button" appearance="primary-action-button">Primary action</utrecht-button>
      </example-story-canvas>
    </div>
    <utrecht-heading-3>Secondary color</utrecht-heading-3>
    <div>
      ${renderColorScalePicker('basis.color.secondary', 'basis.color.secondary-inverse', '#00FF00')}
      <example-story-canvas>
        <utrecht-button type="button" appearance="secondary-action-button">Secondary action</utrecht-button>
      </example-story-canvas>
      ${renderColorScaleExample('basis.color.secondary')}
      ${renderColorScaleExample('basis.color.secondary-inverse')}
    </div>
    <utrecht-heading-3>Text color</utrecht-heading-3>
    <example-story-canvas>
      <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      <utrecht-separator></utrecht-separator>
      <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
    </example-story-canvas>
    <div>
      ${renderColorScalePicker('basis.color.text', 'basis.color.text-inverse', '#000000')}
      ${renderColorScaleExample('basis.color.text')}
      ${renderColorScaleExample('basis.color.text-inverse')}
    </div>

    <utrecht-heading-3>Info color</utrecht-heading-3>
    <example-story-canvas>
      <utrecht-alert type="info">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </example-story-canvas>
    <div>
      ${renderColorScalePicker('basis.color.info', 'basis.color.info-inverse', '#0000FF')}
      ${renderColorScaleExample('basis.color.info')}
      ${renderColorScaleExample('basis.color.info-inverse')}
    </div>
    <utrecht-heading-3>Success color</utrecht-heading-3>
    <example-story-canvas>
      <utrecht-alert type="ok">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </example-story-canvas>
    <div>
      ${renderColorScalePicker('basis.color.success', 'basis.color.success-inverse', '#228B22')}
      ${renderColorScaleExample('basis.color.success')}
      ${renderColorScaleExample('basis.color.success-inverse')}
    </div>
    <utrecht-heading-3>Warning color</utrecht-heading-3>
    <example-story-canvas>
      <utrecht-alert type="warning">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </example-story-canvas>
    <div>
      ${renderColorScalePicker('basis.color.warning', 'basis.color.warning-inverse', '#FF8C00')}
      ${renderColorScaleExample('basis.color.warning')}
      ${renderColorScaleExample('basis.color.warning-inverse')}
    </div>
    <utrecht-heading-3>Error color</utrecht-heading-3>
    <example-story-canvas>
      <utrecht-alert type="error">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </example-story-canvas>
    <div>
      ${renderColorScalePicker('basis.color.error', 'basis.color.error-inverse', '#FF0000')}
      ${renderColorScaleExample('basis.color.error')}
      ${renderColorScaleExample('basis.color.error-inverse')}
    </div>
    <utrecht-heading-2>Fonts</utrecht-heading-2>
    <div>
      <p>Default font family:</p>
      ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.default')}
    </div>
    <div>
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
      <p>Heading font family:</p>
      ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.heading')}
    </div>
    <div>
      <p>Heading color:</p>
      ${renderGroup('heading-color')}
    </div>
    <div>
      <example-story-canvas>
        <utrecht-code-block>&lt;input type="url" value="https://example.fi/"></utrecht-code-block>
      </example-story-canvas>
      <p>Code family:</p>
      ${renderFontFamilyVariants(codeFonts, 'basis.typography.font-family.code')}
    </div>
    <utrecht-heading-2>Form controls</utrecht-heading-2>
    <div>
      <example-story-canvas>
        <utrecht-textbox></utrecht-textbox>
      </example-story-canvas>
      <p>Form control border radius:</p>
      ${renderGroup('form-control-border-radius')}
    </div>
    <div>
      <example-story-canvas>
        <utrecht-textbox></utrecht-textbox>
      </example-story-canvas>
      <p>Form control border width:</p>
      ${renderGroup('form-control-border-width')}
    </div>
    <div>
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
      <p>Form control padding above and below:</p>
      ${renderGroup('form-control-padding-block')}
      <p>Form control padding left and right:</p>
      ${renderGroup('form-control-padding-inline')}
    </div>
    <utrecht-heading-2>Button</utrecht-heading-2>
    <div>
      <p>Button border radius:</p>
      ${renderGroup('button-border-radius')}
    </div>
    <div>
      <p>Button border width:</p>
      <example-story-canvas>
        <utrecht-textbox></utrecht-textbox>
      </example-story-canvas>
      ${renderGroup('button-border-width')}
    </div>
    <div>
      <p>Primary button style:</p>
      ${renderGroup('primary-button-appearance', 'primary-action-button')}
    </div>
    <div>
      <p>Secondary button style:</p>
      ${renderGroup('secondary-button-appearance', 'secondary-action-button')}
    </div>
    <div>
      <p>Subtle button style:</p>
      ${renderGroup('subtle-button-appearance', 'subtle-button')}
    </div>
    <utrecht-heading-2>Data badge</utrecht-heading-2>
    <example-story-canvas>
      <utrecht-data-badge>Some subject</utrecht-data-badge>
    </example-story-canvas>
    <div>
      <p>Data badge style:</p>
      ${renderGroup('data-badge-appearance')}
    </div>
    <utrecht-heading-2>Number badge</utrecht-heading-2>
    <example-story-canvas>
      <utrecht-number-badge>42</utrecht-number-badge>
    </example-story-canvas>
    <div>
      <p>Number badge style:</p>
      ${renderGroup('number-badge-appearance')}
    </div>
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
    <utrecht-heading-2>Page Footer</utrecht-heading-2>
    <example-story-canvas>
      <utrecht-page-footer>
        <p>Hello world</p>
      </utrecht-page-footer>
    </example-story-canvas>
    <div>
      <p>Page Footer style:</p>
      ${renderGroup('page-footer-appearance')}
    </div>
    <div>
      <p>Page Footer size:</p>
      ${renderGroup('page-footer-inline-size')}
    </div>
    <div>
      <p>Page width (in px):</p>
      ${renderGroup('page-inline-size')}
      <input hidden type="number" min="768" max="1920" name="basis.page.max-inline-size" oninput="themeBuilder.setToken(event.currentTarget, { unit: 'px' })">
    </div>
    <div>
      <p>Minimum target size:</p>
      <figure>
        <example-story-canvas>
          <div style="${styleAttribute(buttonWithoutPadding)}">
            <utrecht-button type="button"><span contentEditable="true">❤️</span></utrecht-button>
          </div>
        </example-story-canvas>
        <figcaption>Button without padding, demonstrating the minimum pointer target size</figcaption>
      </figure>
      ${renderGroup('pointer-target-size')}
    </div>
    <utrecht-heading-2>Space</utrecht-heading-2>
    <div>
      <p>Vertical space inside components:</p>
      ${renderGroup('space-block')}
    </div>
    <div>
      <p>Horizontal space inside components:</p>
      ${renderGroup('space-inline')}
    </div>
    <utrecht-heading-2>Responsive layout</utrecht-heading-2>
    <div>
      <label for="fluid"><input id="fluid" type="checkbox" oninput="document.documentElement.classList.toggle('basis-theme--fluid', event.currentTarget.checked)">Fluid typography and spacing</label>
    </div>
    </form>
  </utrecht-page-body>
  <utrecht-page-footer>
    <p>Hello world</p>
  </utrecht-page-footer>
`;

const handleColor = (target: HTMLInputElement, name: string, inverseName: string) => {
  if (typeof target.value !== 'string') {
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

  const scaleTokens = createScaleObject(accentScale, `${name}.`);
  const inverseScaleTokens = createScaleObject(inverseAccentScale, `${inverseName}.`);

  const tokens = {
    ...scaleTokens,
    ...inverseScaleTokens,
  };
  console.log(tokens);
  setCssVariables(toCssVariables(tokens));
};

[
  { inputId: 'primary-input', name: 'primary', inverseName: 'primary-inverse' },
  { inputId: 'secondary-input', name: 'secondary', inverseName: 'primary-inverse' },
  { inputId: 'text-input', name: 'text', inverseName: 'text-inverse' },
].forEach(({ inputId, name, inverseName }) => {
  const el = document.getElementById(inputId);
  if (el instanceof HTMLInputElement) {
    handleColor(el, name, inverseName);
  }
});
declare global {
  interface Window {
    themeBuilder2: { [index: string]: any };
  }
}

window.themeBuilder2 = {
  handleColor,
};
