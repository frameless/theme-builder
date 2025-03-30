import { generateRadixColors } from './generateRadixColors.js';
import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import { toCssName, toCssValue, styleAttribute, setTokens, setCssVariables, toCssVariables } from './utils.js';
import '@utrecht/page-layout-css';
import '@utrecht/body-css';
import '@utrecht/root-css';
import './style.css';
import './basis-theme.css';
import './story-canvas.css';

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

const headingColorVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.heading-1.color': '{basis.color.text.text-2}',
      'utrecht.heading-2.color': '{basis.color.text.text-2}',
      'utrecht.heading-3.color': '{basis.color.text.text-2}',
      'utrecht.heading-4.color': '{basis.color.text.text-2}',
      'utrecht.heading-5.color': '{basis.color.text.text-2}',
      'utrecht.heading-6.color': '{basis.color.text.text-2}',
    },
    name: 'Text color',
    recommended: true,
  },
  {
    flatTokens: {
      'utrecht.heading-1.color': '{basis.color.primary.text-2}',
      'utrecht.heading-2.color': '{basis.color.primary.text-2}',
      'utrecht.heading-3.color': '{basis.color.primary.text-2}',
      'utrecht.heading-4.color': '{basis.color.primary.text-2}',
      'utrecht.heading-5.color': '{basis.color.primary.text-2}',
      'utrecht.heading-6.color': '{basis.color.primary.text-2}',
    },
    name: 'Primary color',
  },
  {
    flatTokens: {
      'utrecht.heading-1.color': '{basis.color.primary.fill-2}',
      'utrecht.heading-2.color': '{basis.color.primary.fill-2}',
      'utrecht.heading-3.color': '{basis.color.primary.fill-2}',
      'utrecht.heading-4.color': '{basis.color.primary.fill-2}',
      'utrecht.heading-5.color': '{basis.color.primary.fill-2}',
      'utrecht.heading-6.color': '{basis.color.primary.fill-2}',
    },
    name: 'Primary fill color',
  },
  {
    flatTokens: {
      'utrecht.heading-1.color': '{basis.color.secondary.text-2}',
      'utrecht.heading-2.color': '{basis.color.secondary.text-2}',
      'utrecht.heading-3.color': '{basis.color.secondary.text-2}',
      'utrecht.heading-4.color': '{basis.color.secondary.text-2}',
      'utrecht.heading-5.color': '{basis.color.secondary.text-2}',
      'utrecht.heading-6.color': '{basis.color.secondary.text-2}',
    },
    name: 'Secondary color',
  },
  {
    flatTokens: {
      'utrecht.heading-1.color': '{basis.color.secondary.fill-2}',
      'utrecht.heading-2.color': '{basis.color.secondary.fill-2}',
      'utrecht.heading-3.color': '{basis.color.secondary.fill-2}',
      'utrecht.heading-4.color': '{basis.color.secondary.fill-2}',
      'utrecht.heading-5.color': '{basis.color.secondary.fill-2}',
      'utrecht.heading-6.color': '{basis.color.secondary.fill-2}',
    },
    name: 'Secondary fill color',
  },
];

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
    name: 'Transparent with border',
  },
  {
    flatTokens: subtleButton6,
    name: 'Transparent without border',
    recommended: true,
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

const formControlBorderWidthVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'basis.form-control.border-width': '{basis.border-width.sm}',
    },
    name: 'Small',
    recommended: true,
  },
  {
    flatTokens: {
      'basis.form-control.border-width': '{basis.border-width.md}',
    },
    name: 'Medium',
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
      'utrecht.button.border-width': '{basis.border-width.md}',
    },
    name: 'Medium',
  },
];

const dataBadgeAppearanceVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.data-badge.background-color': '{basis.color.primary.interactive-1}',
      'utrecht.data-badge.border-color': '{basis.color.transparent}',
      'utrecht.data-badge.border-width': '{basis.border-width.sm}',
      'utrecht.data-badge.color': '{basis.color.primary.text-2}',
    },
    name: 'Subtle',
  },
  {
    flatTokens: {
      'utrecht.data-badge.background-color': '{basis.color.primary.interactive-1}',
      'utrecht.data-badge.border-color': '{basis.color.primary.border-2}',
      'utrecht.data-badge.border-width': '{basis.border-width.sm}',
      'utrecht.data-badge.color': '{basis.color.primary.text-2}',
    },
    name: 'With border',
    recommended: true,
  },
  {
    flatTokens: {
      'utrecht.data-badge.background-color': '{basis.color.primary-inverse.interactive-1}',
      'utrecht.data-badge.border-color': '{basis.color.transparent}',
      'utrecht.data-badge.border-width': '0',
      'utrecht.data-badge.color': '{basis.color.primary-inverse.text-2}',
    },
    name: 'Inverse',
  },
];

const numberBadgeAppearanceVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.number-badge.background-color': '{basis.color.primary.interactive-1}',
      'utrecht.number-badge.border-color': '{basis.color.transparent}',
      'utrecht.number-badge.border-width': '{basis.border-width.sm}',
      'utrecht.number-badge.color': '{basis.color.primary.text-2}',
    },
    name: 'Subtle',
  },
  {
    flatTokens: {
      'utrecht.number-badge.background-color': '{basis.color.primary.interactive-1}',
      'utrecht.number-badge.border-color': '{basis.color.primary.border-2}',
      'utrecht.number-badge.border-width': '{basis.border-width.sm}',
      'utrecht.number-badge.color': '{basis.color.primary.text-2}',
    },
    name: 'With border',
  },
  {
    flatTokens: {
      'utrecht.number-badge.background-color': '{basis.color.primary-inverse.interactive-1}',
      'utrecht.number-badge.border-color': '{basis.color.transparent}',
      'utrecht.number-badge.border-width': '0',
      'utrecht.number-badge.color': '{basis.color.primary-inverse.text-2}',
    },
    name: 'Inverse',
    recommended: true,
  },
];

const pageFooterAppearanceVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.page-footer.content.background-color': '{basis.color.text.interactive-1}',
      'utrecht.page-footer.border-color': '{basis.color.text.border-1}',
      'utrecht.page-footer.color': '{basis.color.text.text-2}',
    },
    name: 'Text',
  },
  {
    flatTokens: {
      'utrecht.page-footer.content.background-color': '{basis.color.text-inverse.interactive-1}',
      'utrecht.page-footer.border-color': '{basis.color.text-inverse.border-1}',
      'utrecht.page-footer.color': '{basis.color.text-inverse.text-2}',
    },
    name: 'Text inverse',
  },
  {
    flatTokens: {
      'utrecht.page-footer.content.background-color': '{basis.color.primary.interactive-1}',
      'utrecht.page-footer.border-color': '{basis.color.primary.border-1}',
      'utrecht.page-footer.color': '{basis.color.primary.text-2}',
    },
    name: 'Primary',
    recommended: true,
  },
  {
    flatTokens: {
      'utrecht.page-footer.content.background-color': '{basis.color.primary-inverse.interactive-1}',
      'utrecht.page-footer.border-color': '{basis.color.primary-inverse.border-1}',
      'utrecht.page-footer.color': '{basis.color.primary-inverse.text-2}',
    },
    name: 'Primary inverse',
  },
  {
    flatTokens: {
      'utrecht.page-footer.content.background-color': '{basis.color.secondary.interactive-1}',
      'utrecht.page-footer.border-color': '{basis.color.secondary.border-1}',
      'utrecht.page-footer.color': '{basis.color.secondary.text-2}',
    },
    name: 'Secondary',
  },
  {
    flatTokens: {
      'utrecht.page-footer.content.background-color': '{basis.color.secondary-inverse.interactive-1}',
      'utrecht.page-footer.border-color': '{basis.color.secondary-inverse.border-1}',
      'utrecht.page-footer.color': '{basis.color.secondary-inverse.text-2}',
    },
    name: 'Secondary inverse',
  },
];

const pageFooterSizeVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'utrecht.page-footer.background-color': '{basis.color.transparent}',
      'utrecht.page-footer.max-inline-size': '{utrecht.page-footer.content.max-inline-size}',
      'utrecht.page-footer.content.max-inline-size': '{basis.page.max-inline-size}',
    },
    name: 'Centered',
  },
  {
    flatTokens: {
      'utrecht.page-footer.background-color': '{utrecht.page-footer.content.background-color}',
      'utrecht.page-footer.max-inline-size': '100%',
      'utrecht.page-footer.content.max-inline-size': '{basis.page.max-inline-size}',
    },
    name: 'Full width',
    recommended: true,
  },
];

const pageSizeVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'basis.page.max-inline-size': '1140px',
    },
    name: '1140px',
  },
  {
    flatTokens: {
      'basis.page.max-inline-size': '1200px',
    },
    name: '1200px',
  },
];

const spaceBlockVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'basis.space.block.6xl': '160px',
      'basis.space.block.5xl': '64px',
      'basis.space.block.4xl': '32px',
      'basis.space.block.3xl': '24px',
      'basis.space.block.2xl': '20px',
      'basis.space.block.xl': '16px',
      'basis.space.block.lg': '12px',
      'basis.space.block.md': '8px',
      'basis.space.block.sm': '4px',
      'basis.space.block.xs': '2px',
      'basis.space.block.2xs': '1px',
    },
    name: 'Default',
    recommended: true,
  },
  {
    flatTokens: {
      'basis.space.block.6xl': `${160 * 0.75}px`,
      'basis.space.block.5xl': `${64 * 0.75}px`,
      'basis.space.block.4xl': `${32 * 0.75}px`,
      'basis.space.block.3xl': `${24 * 0.75}px`,
      'basis.space.block.2xl': `${20 * 0.75}px`,
      'basis.space.block.xl': `${16 * 0.75}px`,
      'basis.space.block.lg': `${12 * 0.75}px`,
      'basis.space.block.md': `${8 * 0.75}px`,
      'basis.space.block.sm': `${4 * 0.75}px`,
      'basis.space.block.xs': '2px',
      'basis.space.block.2xs': '1px',
    },
    name: 'Compact (75%)',
  },
  {
    flatTokens: {
      'basis.space.block.6xl': `${160 * 0.5}px`,
      'basis.space.block.5xl': `${64 * 0.5}px`,
      'basis.space.block.4xl': `${32 * 0.5}px`,
      'basis.space.block.3xl': `${24 * 0.5}px`,
      'basis.space.block.2xl': `${20 * 0.5}px`,
      'basis.space.block.xl': `${16 * 0.5}px`,
      'basis.space.block.lg': `${12 * 0.5}px`,
      'basis.space.block.md': `${8 * 0.5}px`,
      'basis.space.block.sm': `${4 * 0.5}px`,
      'basis.space.block.xs': '2px',
      'basis.space.block.2xs': '1px',
    },
    name: 'Small (50%)',
  },
];

const spaceInlineVariants: ComponentVariant[] = [
  {
    flatTokens: {
      'basis.space.inline.6xl': '160px',
      'basis.space.inline.5xl': '64px',
      'basis.space.inline.4xl': '32px',
      'basis.space.inline.3xl': '24px',
      'basis.space.inline.2xl': '20px',
      'basis.space.inline.xl': '16px',
      'basis.space.inline.lg': '12px',
      'basis.space.inline.md': '8px',
      'basis.space.inline.sm': '4px',
      'basis.space.inline.xs': '2px',
      'basis.space.inline.2xs': '1px',
    },
    name: 'Default',
    recommended: true,
  },
  {
    flatTokens: {
      'basis.space.inline.6xl': `${160 * 0.75}px`,
      'basis.space.inline.5xl': `${64 * 0.75}px`,
      'basis.space.inline.4xl': `${32 * 0.75}px`,
      'basis.space.inline.3xl': `${24 * 0.75}px`,
      'basis.space.inline.2xl': `${20 * 0.75}px`,
      'basis.space.inline.xl': `${16 * 0.75}px`,
      'basis.space.inline.lg': `${12 * 0.75}px`,
      'basis.space.inline.md': `${8 * 0.75}px`,
      'basis.space.inline.sm': `${4 * 0.75}px`,
      'basis.space.inline.xs': '2px',
      'basis.space.inline.2xs': '1px',
    },
    name: 'Compact (75%)',
  },
  {
    flatTokens: {
      'basis.space.inline.6xl': `${160 * 0.5}px`,
      'basis.space.inline.5xl': `${64 * 0.5}px`,
      'basis.space.inline.4xl': `${32 * 0.5}px`,
      'basis.space.inline.3xl': `${24 * 0.5}px`,
      'basis.space.inline.2xl': `${20 * 0.5}px`,
      'basis.space.inline.xl': `${16 * 0.5}px`,
      'basis.space.inline.lg': `${12 * 0.5}px`,
      'basis.space.inline.md': `${8 * 0.5}px`,
      'basis.space.inline.sm': `${4 * 0.5}px`,
      'basis.space.inline.xs': '2px',
      'basis.space.inline.2xs': '1px',
    },
    name: 'Small (50%)',
  },
];

// TODO: Include these as default values in the Basis Theme
const basisAlertTokens = {
  'utrecht.alert.border-color': '{basis.color.text.border-1}',
  'utrecht.alert.info.border-color': '{basis.color.info.border-1}',
  'utrecht.alert.error.border-color': '{basis.color.error.border-1}',
  'utrecht.alert.ok.border-color': '{basis.color.success.border-1}',
  'utrecht.alert.warning.border-color': '{basis.color.warning.border-1}',
};
const alertAppearanceVariants: ComponentVariant[] = [
  {
    flatTokens: {
      ...basisAlertTokens,
      'utrecht.alert.border-width': '0',
    },
    name: 'No border',
  },
  {
    flatTokens: {
      ...basisAlertTokens,
      'utrecht.alert.border-width': '{basis.border-width.sm}',
    },
    name: 'Small border',
  },
  {
    flatTokens: {
      ...basisAlertTokens,
      'utrecht.alert.border-width': '{basis.border-width.md}',
    },
    name: 'Medium border',
    recommended: true,
  },
];

const formControlBorderRadius: ComponentVariant[] = [
  {
    flatTokens: {
      'basis.form-control.border-radius': '0',
    },
    name: 'Square corners',
    recommended: true,
  },
  {
    flatTokens: {
      'basis.form-control.border-radius': '{basis.border-radius.sm}',
    },
    name: 'Small',
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

const renderColorScalePicker = (name: string, inverseName: string, defaultValue: string) =>
  `<input type="color" oninput='themeBuilder.handleColor(event.target, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})' value="${defaultValue}">`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <utrecht-page-header>
    <utrecht-heading-1>Ceci n'est pas un theme builder</utrecht-heading-1>
  </utrecht-page-header>
  <utrecht-page-body>
    <form>
    <utrecht-heading-2>Colors</utrecht-heading-2>
    <utrecht-heading-3>Primary color</utrecht-heading-3>
    <div>
      ${renderColorScalePicker('basis.color.primary', 'basis.color.primary-inverse', '#FF0000')}
      <div class="example-story-canvas">
        <utrecht-button type="button" appearance="primary-action-button">Primary action</utrecht-button>
      </div>
    </div>
    <utrecht-heading-3>Secondary color</utrecht-heading-3>
    <div>
      ${renderColorScalePicker('basis.color.secondary', 'basis.color.secondary-inverse', '#00FF00')}
      <div class="example-story-canvas">
        <utrecht-button type="button" appearance="secondary-action-button">Secondary action</utrecht-button>
      </div>
    </div>
    <utrecht-heading-3>Text color</utrecht-heading-3>
    <div class="example-story-canvas">
      <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      <utrecht-separator></utrecht-separator>
      <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
    </div>
    <div>
      ${renderColorScalePicker('basis.color.text', 'basis.color.text-inverse', '#000000')}
    </div>

    <utrecht-heading-3>Info color</utrecht-heading-3>
    <div class="example-story-canvas">
      <utrecht-alert type="info">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </div>
    <div>
      ${renderColorScalePicker('basis.color.info', 'basis.color.info-inverse', '#0000FF')}
    </div>
    <utrecht-heading-3>Success color</utrecht-heading-3>
    <div class="example-story-canvas">
      <utrecht-alert type="ok">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </div>
    <div>
      ${renderColorScalePicker('basis.color.success', 'basis.color.success-inverse', '#228B22')}
    </div>
    <utrecht-heading-3>Warning color</utrecht-heading-3>
    <div class="example-story-canvas">
      <utrecht-alert type="warning">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </div>
    <div>
      ${renderColorScalePicker('basis.color.warning', 'basis.color.warning-inverse', '#FF8C00')}
    </div>
    <utrecht-heading-3>Error color</utrecht-heading-3>
    <div class="example-story-canvas">
      <utrecht-alert type="error">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </div>
    <div>
      ${renderColorScalePicker('basis.color.error', 'basis.color.error-inverse', '#FF0000')}
    </div>
    <utrecht-heading-2>Fonts</utrecht-heading-2>
    <div>
      <p>Default font family:</p>
      ${renderFontFamilyVariants(fontFamilies, 'basis.typography.font-family.default')}
    </div>
    <div>
    <div class="example-story-canvas">
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
      <p>Heading color:</p>
      ${renderVariants(headingColorVariants)}
    </div>
    <div>
      <div class="example-story-canvas">
        <utrecht-code-block>&lt;input type="url" value="https://example.fi/"></utrecht-code-block>
      </div>
      <p>Code family:</p>
      ${renderFontFamilyVariants(codeFonts, 'basis.typography.font-family.code')}
    </div>
    <utrecht-heading-2>Form controls</utrecht-heading-2>
    <div>
      <div class="example-story-canvas">
        <utrecht-textbox></utrecht-textbox>
      </div>
      <p>Form control border radius:</p>
      ${renderVariants(formControlBorderRadius)}
    </div>
    <div>
      <div class="example-story-canvas">
        <utrecht-textbox></utrecht-textbox>
      </div>
      <p>Form control border width:</p>
      ${renderVariants(formControlBorderWidthVariants)}
    </div>
    <div>
      <figure>
      <div class="example-story-canvas">
        <div style="${styleAttribute(buttonWithoutPadding)}">
          <utrecht-textarea value="Ut quos illum eligendi. Et aut optio vitae. Reiciendis consectetur ipsam illo laborum rem id. Quo vel iure optio commodi veniam nihil. Quae ipsa non qui. Rem dolores nulla commodi ratione cum.
Aut iste quam unde. Iure quidem et accusantium pariatur molestiae occaecati consequatur. Aut consectetur amet ea sint officia nesciunt ullam ut. Odio nulla rem neque et facere.
Necessitatibus debitis eos expedita dolor. Quam laudantium qui officia est et eos. Sunt dolores voluptatibus nisi similique quae consequatur est.
Repellendus assumenda eveniet qui. Ab eum et ut et odit quia. Voluptates rerum et qui sed aperiam totam veritatis quos."></utrecht-textarea>
        </div>
        </div>
        <figcaption>Textarea without minimum pointer target size, demonstrating the padding needed for readability</figcaption>
      </figure>
      <p>Form control padding above and below:</p>
      ${renderVariants(formControlPaddingBlockVariants)}
      <p>Form control padding left and right:</p>
      ${renderVariants(formControlPaddingInlineVariants)}
    </div>
    <utrecht-heading-2>Button</utrecht-heading-2>
    <div>
      <p>Button border radius:</p>
      ${renderVariants(buttonBorderRadiusVariants)}
    </div>
    <div>
      <p>Button border width:</p>
      <div class="example-story-canvas">
        <utrecht-textbox></utrecht-textbox>
      </div>
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
    <utrecht-heading-2>Data badge</utrecht-heading-2>
    <div class="example-story-canvas">
      <utrecht-data-badge>Some subject</utrecht-data-badge>
    </div>
    <div>
      <p>Data badge style:</p>
      ${renderVariants(dataBadgeAppearanceVariants)}
    </div>
    <utrecht-heading-2>Number badge</utrecht-heading-2>
    <div class="example-story-canvas">
      <utrecht-number-badge>42</utrecht-number-badge>
    </div>
    <div>
      <p>Number badge style:</p>
      ${renderVariants(numberBadgeAppearanceVariants)}
    </div>
    <utrecht-heading-2>Alert</utrecht-heading-2>
    <div class="example-story-canvas">
      <utrecht-alert type="info">
        <utrecht-paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</utrecht-paragraph>
      </utrecht-alert>
    </div>
    <div>
      <p>Alert style:</p>
      ${renderVariants(alertAppearanceVariants)}
    </div>
    <utrecht-heading-2>Page Footer</utrecht-heading-2>
    <div class="example-story-canvas">
      <utrecht-page-footer>
        <p>Hello world</p>
      </utrecht-page-footer>
    </div>
    <div>
      <p>Page Footer style:</p>
      ${renderVariants(pageFooterAppearanceVariants)}
    </div>
    <div>
      <p>Page Footer size:</p>
      ${renderVariants(pageFooterSizeVariants)}
    </div>
    <div>
      <p>Page width (in px):</p>
      ${renderVariants(pageSizeVariants)}
      <input hidden type="number" min="768" max="1920" name="basis.page.max-inline-size" oninput="themeBuilder.setToken(event.target, { unit: 'px' })">
    </div>
    <div>
      <p>Minimum target size:</p>
      <figure>
        <div class="example-story-canvas">
          <div style="${styleAttribute(buttonWithoutPadding)}">
            <utrecht-button type="button"><span contentEditable="true">❤️</span></utrecht-button>
          </div>
        </div>
        <figcaption>Button without padding, demonstrating the minimum pointer target size</figcaption>
      </figure>
      ${renderVariants(pointerTargetVariants)}
    </div>
    <utrecht-heading-2>Space</utrecht-heading-2>
    <div>
      <p>Vertical space inside components:</p>
      ${renderVariants(spaceBlockVariants)}
    </div>
    <div>
      <p>Horizontal space inside components:</p>
      ${renderVariants(spaceInlineVariants)}
    </div>
    </form>
  </utrecht-page-body>
  <utrecht-page-footer>
    <p>Hello world</p>
  </utrecht-page-footer>
`;

const handleColor = (target: HTMLInputElement, name: string, inverseName: string) => {
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

  const scaleTokens = createScaleObject(accentScale, `${name}.`);
  const inverseScaleTokens = createScaleObject(inverseAccentScale, `${inverseName}.`);

  const tokens = {
    ...scaleTokens,
    ...inverseScaleTokens,
  };
  console.log(tokens);
  setCssVariables(toCssVariables(tokens));
};

const setToken = (input: HTMLButtonElement | HTMLInputElement, { unit }: { unit?: string } = {}) => {
  const tokenName = input.name;
  let tokenValue = input.value;

  if (typeof unit === 'string') {
    tokenValue = `${tokenValue}${unit}`;
  }

  // Convert Design Token name to CSS custom property
  const cssName = toCssName(tokenName);

  // Convert Design Token alias to CSS variable
  const cssValue = toCssValue(tokenValue);
  // console.log(cssName, cssValue);
  document.documentElement.style.setProperty(cssName, cssValue);
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
    themeBuilder: { [index: string]: any };
  }
}

window.themeBuilder = {
  handleColor,
  setToken,
  setTokens,
};
