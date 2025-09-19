// Convert Design Token name to CSS custom property
export const toCssName = (tokenName: string): string => `--${tokenName.replace(/\./g, '-')}`;

// Convert Design Token alias to CSS variable
export const toCssValue = (tokenValue: string): string =>
  tokenValue.replace(/\{([^}]+)\}/g, (_, reference) => `var(--${reference.replace(/\./g, '-')})`);

export const toCssVariables = (tokens: { [index: string]: string }) =>
  Object.fromEntries(Object.entries(tokens).map(([name, value]) => [toCssName(name), toCssValue(value)]));

export const cssVariablesToString = (cssVariables: { [index: string]: string }) =>
  Object.entries(cssVariables)
    .map(([name, value]) => `${name}: ${value}`)
    .join(';\n');

export const styleAttribute = (tokens: { [index: string]: string }) =>
  Object.entries(toCssVariables(tokens))
    .map(([name, value]) => `${name}: ${value}`)
    .join('; ');

export const setCssVariables = (cssVariables: { [index: string]: string }) => {
  Object.entries(cssVariables).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
};

export const setTokens = (input: HTMLButtonElement | HTMLInputElement) => {
  const tokens = JSON.parse(input.value) as { [index: string]: string };

  const cssVariables = Object.fromEntries(
    Object.entries(tokens).map(([name, value]) => [toCssName(name), toCssValue(value)]),
  );
  setCssVariables(cssVariables);
};

/**
 * @see https://byby.dev/js-slugify-string
 */
export const slugify = (str: string): string => {
  return String(str)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens
}