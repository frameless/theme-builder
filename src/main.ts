import { generateRadixColors } from './generateRadixColors.js';
import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import '@utrecht/page-layout-css';
import '@utrecht/body-css';
import '@utrecht/root-css';
import './style.css';
import './basis-theme.css';

defineCustomElements();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <utrecht-page-header>
    <h1>Theme Builder</h1>
  </utrecht-page-header>
  <utrecht-page-body>
    <div>
    <input type="color" oninput="handleColor(event.target, 'primary')" id="primary-input" value="#FF0000">
    <utrecht-button appearance="primary-action-button">Primary action</utrecht-button>
    </div>
    <div>
    <input type="color" oninput="handleColor(event.target, 'secondary')" id="secondary-input" value="#00FF00">
    <utrecht-button appearance="secondary-action-button">Secondary action</utrecht-button>
    </div>
    <div>
      <input type="color" oninput="handleColor(event.target, 'text')" id="text-input" value="#000000">
      <div>Text</div>
    </div>
    <div>
    </div>
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

handleColor(document.getElementById('primary-input'), 'primary');
handleColor(document.getElementById('secondary-input'), 'secondary');
handleColor(document.getElementById('text-input'), 'text');

window['handleColor'] = handleColor;
