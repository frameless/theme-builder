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
    name: 'utrecht.button.font-size',
    selector: '.button',
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
