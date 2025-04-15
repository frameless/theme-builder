export interface Mapping {
  name: string;
  selector: string;
  property: string;
}

export const designTokens = [
  {
    name: 'basis.border-radius.md',
    selector: ':root',
    property: '--root-border-radius',
  },
  {
    name: 'basis.border-width.md',
    selector: ':root',
    property: '--root-border-width',
  },
  { name: 'og.color.transformation.dark', selector: ':root', property: '--darkTransformation' },
  { name: 'og.color.transformation.darkest', selector: ':root', property: '--darkestTransformation' },
  { name: 'og.color.transformation.light', selector: ':root', property: '--lightTransformation' },
  { name: 'og.color.transformation.lightest', selector: ':root', property: '--lightestTransformation' },
  { name: 'og.color.primary.default', selector: ':root', property: '--root-color--primary' },
  { name: 'og.color.primary-dark', selector: ':root', property: '--root-color--primary-dark' },
  { name: 'og.color.primary-light', selector: ':root', property: '--root-color--primary-light' },
  { name: 'og.color.primary.hue', selector: ':root', property: '--root-color--primary-hue' },
  { name: 'og.color.primary.saturation', selector: ':root', property: '--root-color--primary-saturation' },
  { name: 'og.color.primary.lightness', selector: ':root', property: '--root-color--primary-lightness' },
  {
    name: 'og.color.primary.lightness-dark',
    selector: ':root',
    property: '--root-color--primary-lightness-dark',
  },
  {
    name: 'og.color.primary.lightness-light',
    selector: ':root',
    property: '--root-color--primary-lightness-light',
  },
  { name: 'og.color.secondary.default', selector: ':root', property: '--root-color--secondary' },
  { name: 'og.color.secondary-dark', selector: ':root', property: '--root-color--secondary-dark' },
  { name: 'og.color.secondary-light', selector: ':root', property: '--root-color--secondary-light' },
  { name: 'og.color.secondary.hue', selector: ':root', property: '--root-color--secondary-hue' },
  {
    name: 'og.color.secondary.saturation',
    selector: ':root',
    property: '--root-color--secondary-saturation',
  },
  { name: 'og.color.secondary.lightness', selector: ':root', property: '--root-color--secondary-lightness' },
  {
    name: 'og.color.secondary.lightness-dark',
    selector: ':root',
    property: '--root-color--secondary-lightness-dark',
  },
  {
    name: 'og.color.secondary.lightness-light',
    selector: ':root',
    property: '--root-color--secondary-lightness-light',
  },
  { name: 'og.color.support.default', selector: ':root', property: '--root-color--support' },
  { name: 'og.color.support-dark', selector: ':root', property: '--root-color--support-dark' },
  { name: 'og.color.support-light', selector: ':root', property: '--root-color--support-light' },
  { name: 'og.color.support.hue', selector: ':root', property: '--root-color--support-hue' },
  { name: 'og.color.support.saturation', selector: ':root', property: '--root-color--support-saturation' },
  { name: 'og.color.support.lightness', selector: ':root', property: '--root-color--support-lightness' },
  {
    name: 'og.color.support.lightness-dark',
    selector: ':root',
    property: '--root-color--support-lightness-dark',
  },
  {
    name: 'og.color.support.lightness-light',
    selector: ':root',
    property: '--root-color--support-lightness-light',
  },
  { name: 'og.color.contrast.default', selector: ':root', property: '--root-color--contrast' },
  { name: 'og.color.contrast-dark', selector: ':root', property: '--root-color--contrast-dark' },
  { name: 'og.color.contrast-light', selector: ':root', property: '--root-color--contrast-light' },
  { name: 'og.color.contrast.hue', selector: ':root', property: '--root-color--contrast-hue' },
  { name: 'og.color.contrast.saturation', selector: ':root', property: '--root-color--contrast-saturation' },
  { name: 'og.color.contrast.lightness', selector: ':root', property: '--root-color--contrast-lightness' },
  {
    name: 'og.color.contrast.lightness-dark',
    selector: ':root',
    property: '--root-color--contrast-lightness-dark',
  },
  {
    name: 'og.color.contrast.lightness-light',
    selector: ':root',
    property: '--root-color--contrast-lightness-light',
  },
  { name: 'og.color.grey.default', selector: ':root', property: '--root-color--grey' },
  { name: 'og.color.grey-dark', selector: ':root', property: '--root-color--grey-dark' },
  { name: 'og.color.grey-light', selector: ':root', property: '--root-color--grey-light' },
  { name: 'og.color.grey.hue', selector: ':root', property: '--root-color--grey-hue' },
  { name: 'og.color.grey.saturation', selector: ':root', property: '--root-color--grey-saturation' },
  { name: 'og.color.grey.lightness', selector: ':root', property: '--root-color--grey-lightness' },
  { name: 'og.color.grey.lightness-dark', selector: ':root', property: '--root-color--grey-lightness-dark' },
  {
    name: 'og.color.grey.lightness-light',
    selector: ':root',
    property: '--root-color--grey-lightness-light',
  },
  { name: 'og.color.white.default', selector: ':root', property: '--root-color--white' },
  { name: 'og.color.white-dark', selector: ':root', property: '--root-color--white-dark' },
  { name: 'og.color.white-light', selector: ':root', property: '--root-color--white-light' },
  { name: 'og.color.white.hue', selector: ':root', property: '--root-color--white-hue' },
  { name: 'og.color.white.saturation', selector: ':root', property: '--root-color--white-saturation' },
  { name: 'og.color.white.lightness', selector: ':root', property: '--root-color--white-lightness' },
  {
    name: 'og.color.white.lightness-dark',
    selector: ':root',
    property: '--root-color--white-lightness-dark',
  },
  {
    name: 'og.color.white.lightness-light',
    selector: ':root',
    property: '--root-color--white-lightness-light',
  },
  { name: 'og.color.footer.default', selector: ':root', property: '--root-color--footer' },
  { name: 'og.color.footer-dark', selector: ':root', property: '--root-color--footer-dark' },
  { name: 'og.color.footer-light', selector: ':root', property: '--root-color--footer-light' },
  { name: 'og.color.footer.hue', selector: ':root', property: '--root-color--footer-hue' },
  { name: 'og.color.footer.saturation', selector: ':root', property: '--root-color--footer-saturation' },
  { name: 'og.color.footer.lightness', selector: ':root', property: '--root-color--footer-lightness' },
  {
    name: 'og.color.footer.lightness-dark',
    selector: ':root',
    property: '--root-color--footer-lightness-dark',
  },
  {
    name: 'og.color.footer.lightness-light',
    selector: ':root',
    property: '--root-color--footer-lightness-light',
  },
  { name: 'og.color.red.default', selector: ':root', property: '--root-color--red' },
  { name: 'og.color.red-dark', selector: ':root', property: '--root-color--red-dark' },
  { name: 'og.color.red-light', selector: ':root', property: '--root-color--red-light' },
  { name: 'og.color.red.hue', selector: ':root', property: '--root-color--red-hue' },
  { name: 'og.color.red.saturation', selector: ':root', property: '--root-color--red-saturation' },
  { name: 'og.color.red.lightness', selector: ':root', property: '--root-color--red-lightness' },
  { name: 'og.color.red.lightness-dark', selector: ':root', property: '--root-color--red-lightness-dark' },
  {
    name: 'og.color.red.lightness-light',
    selector: ':root',
    property: '--root-color--red-lightness-light',
  },
  { name: 'og.color.orange.default', selector: ':root', property: '--root-color--orange' },
  { name: 'og.color.orange-dark', selector: ':root', property: '--root-color--orange-dark' },
  { name: 'og.color.orange-light', selector: ':root', property: '--root-color--orange-light' },
  { name: 'og.color.orange.hue', selector: ':root', property: '--root-color--orange-hue' },
  { name: 'og.color.orange.saturation', selector: ':root', property: '--root-color--orange-saturation' },
  { name: 'og.color.orange.lightness', selector: ':root', property: '--root-color--orange-lightness' },
  {
    name: 'og.color.orange.lightness-dark',
    selector: ':root',
    property: '--root-color--orange-lightness-dark',
  },
  {
    name: 'og.color.orange.lightness-light',
    selector: ':root',
    property: '--root-color--orange-lightness-light',
  },
  { name: 'og.color.yellow.default', selector: ':root', property: '--root-color--yellow' },
  { name: 'og.color.yellow-dark', selector: ':root', property: '--root-color--yellow-dark' },
  { name: 'og.color.yellow-light', selector: ':root', property: '--root-color--yellow-light' },
  { name: 'og.color.yellow.hue', selector: ':root', property: '--root-color--yellow-hue' },
  { name: 'og.color.yellow.saturation', selector: ':root', property: '--root-color--yellow-saturation' },
  { name: 'og.color.yellow.lightness', selector: ':root', property: '--root-color--yellow-lightness' },
  {
    name: 'og.color.yellow.lightness-dark',
    selector: ':root',
    property: '--root-color--yellow-lightness-dark',
  },
  {
    name: 'og.color.yellow.lightness-light',
    selector: ':root',
    property: '--root-color--yellow-lightness-light',
  },
  { name: 'og.color.blue.default', selector: ':root', property: '--root-color--blue' },
  { name: 'og.color.blue-dark', selector: ':root', property: '--root-color--blue-dark' },
  { name: 'og.color.blue-light', selector: ':root', property: '--root-color--blue-light' },
  { name: 'og.color.blue.hue', selector: ':root', property: '--root-color--blue-hue' },
  { name: 'og.color.blue.saturation', selector: ':root', property: '--root-color--blue-saturation' },
  { name: 'og.color.blue.lightness', selector: ':root', property: '--root-color--blue-lightness' },
  { name: 'og.color.blue.lightness-dark', selector: ':root', property: '--root-color--blue-lightness-dark' },
  {
    name: 'og.color.blue.lightness-light',
    selector: ':root',
    property: '--root-color--blue-lightness-light',
  },
  { name: 'og.color.green.default', selector: ':root', property: '--root-color--green' },
  { name: 'og.color.green-dark', selector: ':root', property: '--root-color--green-dark' },
  { name: 'og.color.green-light', selector: ':root', property: '--root-color--green-light' },
  { name: 'og.color.green.hue', selector: ':root', property: '--root-color--green-hue' },
  { name: 'og.color.green.saturation', selector: ':root', property: '--root-color--green-saturation' },
  { name: 'og.color.green.lightness', selector: ':root', property: '--root-color--green-lightness' },
  {
    name: 'og.color.green.lightness-dark',
    selector: ':root',
    property: '--root-color--green-lightness-dark',
  },
  {
    name: 'og.color.green.lightness-light',
    selector: ':root',
    property: '--root-color--green-lightness-light',
  },
  {
    name: 'utrecht.body.line-height',
    selector: 'body',
    property: 'line-height',
  },
  {
    name: 'utrecht.body.font-family',
    selector: 'body',
    property: 'font-family',
  },
  {
    name: 'basis.border-width.md',
    selector: ':root',
    property: '--root-border-width',
  },
  {
    name: 'utrecht.body.font-size',
    selector: ':root',
    property: '--root-font-size',
  },
  {
    name: 'basis.typography.font-family.default',
    selector: ':root',
    property: '--root-font-family--primary',
  },
  {
    // Not an exact mapping
    name: 'basis.typography.font-family.heading',
    selector: ':root',
    property: '--root-font-family--secondary',
  },
  {
    name: 'basis.typography.font-weight.light',
    selector: ':root',
    property: '--root-font-weight--light',
  },
  {
    name: 'basis.typography.font-weight.normal',
    selector: ':root',
    property: '--root-font-weight--normal',
  },
  {
    name: 'basis.typography.font-weight.semi-bold',
    selector: ':root',
    property: '--root-font-weight--semi-bold',
  },
  {
    name: 'basis.typography.font-weight.bold',
    selector: ':root',
    property: '--root-font-weight--bold',
  },
  {
    name: 'basis.typography.line-height.md',
    selector: ':root',
    property: '--root-line-height',
  },
  {
    name: 'utrecht.heading-1.color',
    selector: ':root',
    property: '--utrecht-heading-1-color',
  },
  {
    name: 'utrecht.heading-2.color',
    selector: ':root',
    property: '--utrecht-heading-2-color',
  },
  {
    name: 'utrecht.heading-3.color',
    selector: ':root',
    property: '--utrecht-heading-3-color',
  },
  {
    name: 'utrecht.heading-4.color',
    selector: ':root',
    property: '--utrecht-heading-4-color',
  },
  // --root-heading-1-color-link: var(--root-color-text-link);
  // --root-heading-2-color-link: var(--root-color-text-link);
  // --root-heading-3-color-link: var(--root-color-text-link);
  // --root-heading-4-color-link: var(--root-color-text-link);

  // --root-heading-1-color-link--hover: var(--root-color-text-link--hover);
  // --root-heading-2-color-link--hover: var(--root-color-text-link--hover);
  // --root-heading-3-color-link--hover: var(--root-color-text-link--hover);
  // --root-heading-4-color-link--hover: var(--root-color-text-link--hover);

  {
    name: 'utrecht.heading-1.font-family',
    selector: ':root',
    property: '--root-heading-1-family',
  },
  {
    name: 'utrecht.heading-2.font-family',
    selector: ':root',
    property: '--root-heading-2-family',
  },
  {
    name: 'utrecht.heading-3.font-family',
    selector: ':root',
    property: '--root-heading-3-family',
  },
  {
    name: 'utrecht.heading-4.font-family',
    selector: ':root',
    property: '--root-heading-4-family',
  },

  {
    name: 'utrecht.heading-1.font-size',
    selector: ':root',
    property: '--root-heading-1-size',
  },
  {
    name: 'utrecht.heading-2.font-size',
    selector: ':root',
    property: '--root-heading-2-size',
  },
  {
    name: 'utrecht.heading-3.font-size',
    selector: ':root',
    property: '--root-heading-3-size',
  },
  {
    name: 'utrecht.heading-4.font-size',
    selector: ':root',
    property: '--root-heading-4-size',
  },

  // --root-heading-1-style: normal;
  // --root-heading-2-style: normal;
  // --root-heading-3-style: normal;
  // --root-heading-4-style: normal;

  {
    name: 'utrecht.heading-1.font-weight',
    selector: ':root',
    property: '--root-heading-1-weight',
  },
  {
    name: 'utrecht.heading-2.font-weight',
    selector: ':root',
    property: '--root-heading-2-weight',
  },
  {
    name: 'utrecht.heading-3.font-weight',
    selector: ':root',
    property: '--root-heading-3-weight',
  },
  {
    name: 'utrecht.heading-4.font-weight',
    selector: ':root',
    property: '--root-heading-4-weight',
  },
  {
    name: 'utrecht.heading-1.line-height',
    selector: ':root',
    property: '--root-heading-1-line-height',
  },
  {
    name: 'utrecht.heading-2.line-height',
    selector: ':root',
    property: '--root-heading-2-line-height',
  },
  {
    name: 'utrecht.heading-3.line-height',
    selector: ':root',
    property: '--root-heading-3-line-height',
  },
  {
    name: 'utrecht.heading-4.line-height',
    selector: ':root',
    property: '--root-heading-4-line-height',
  },
  {
    name: 'utrecht.button.background-color',
    selector: '.button',
    property: '--background-color',
  },
  {
    name: 'utrecht.button.border-radius',
    selector: '.button',
    property: '--border-radius',
  },
  {
    // Not an exact mapping, but I suspect only the `--border-bottom-width` varies
    name: 'utrecht.button.border-width',
    selector: '.button',
    property: '--border-top-width',
  },
  {
    // Not an exact mapping, but I suspect only the `--border-bottom-width` varies
    name: 'og.button.border-block-end-width',
    selector: '.button',
    property: '--border-bottom-width',
  },
  // --border-right-width: var(--root-border-width);
  // --border-left-width: var(--root-border-width);
  // --border-top-style: solid;
  // --border-right-style: solid;
  // --border-bottom-style: solid;
  // --border-left-style: solid;
  // --border-top-color: var(--root-color--primary);
  // --border-right-color: var(--root-color--primary);
  {
    // Not an exact mapping
    name: 'utrecht.button.border-color',
    selector: '.button',
    property: '--border-bottom-color',
  },
  // --border-left-color: var(--root-color--primary);
  {
    name: 'utrecht.button.color',
    selector: '.button',
    property: '--color',
  },
  {
    name: 'utrecht.button.font-family',
    selector: '.button',
    property: '--font-family',
  },
  {
    name: 'utrecht.button.min-block-size',
    selector: '.button',
    property: '--height',
  },
  // {
  //   // 🤔
  //   name: 'utrecht.button.font-size',
  //   selector: '.button',
  //   property: '--font-size',
  // },
  {
    // 🤔
    name: 'utrecht.button.font-size',
    selector: '.button__content',
    property: '--font-size',
  },
  // --font-style: normal;
  {
    name: 'utrecht.button.font-weight',
    selector: '.button',
    property: '--font-weight',
  },
  // --height: 3rem;
  {
    name: 'utrecht.button.line-height',
    selector: '.button',
    property: '--line-height',
  },
];
