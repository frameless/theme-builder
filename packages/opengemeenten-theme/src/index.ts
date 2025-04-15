import postcss from 'postcss';
import type { AcceptedPlugin } from 'postcss';
import { findCss } from './findcss';
import { readFile, writeFile } from 'node:fs/promises';
import { ScrapedWebsite } from './scrape-websites';

interface Mapping {
  name: string;
  selector: string;
  property: string;
}

const designTokens = [
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
    property: '--root-heading-1-color',
  },
  {
    name: 'utrecht.heading-2.color',
    selector: ':root',
    property: '--root-heading-2-color',
  },
  {
    name: 'utrecht.heading-3.color',
    selector: ':root',
    property: '--root-heading-3-color',
  },
  {
    name: 'utrecht.heading-4.color',
    selector: ':root',
    property: '--root-heading-4-color',
  },
];

const map = designTokens.reduce((map, item) => {
  let arr = map.get(item.selector);
  if (arr) {
    arr.push(item);
  } else {
    map.set(item.selector, [item]);
  }
  return map;
}, new Map<string, Mapping[]>());

interface FlatTokens {
  [index: string]: string;
}
export const findCssVariables = (fileName: string): AcceptedPlugin => {
  return (css) => {
    const tokens: FlatTokens = {};

    css.walk((node) => {
      // console.log(node);
      if (node.type === 'rule') {
        const interestingMappings = map.get(node.selector);
        // const customProperties = arr?.map(({ customProperty }) => customProperty);

        // const customPropertyNodes = node.nodes.filter(
        //   (node) => node.type === 'decl' && customProperties.includes(node.prop),
        // );
        interestingMappings?.forEach((mapping) => {
          const customPropertyNode = node.nodes.findLast(
            (node) => node.type === 'decl' && node.prop === mapping.property,
          );

          if (customPropertyNode) {
            if (tokens.hasOwnProperty(mapping.name)) {
              const newValue = customPropertyNode.value;
              const oldValue = tokens[mapping.name];
              if (newValue !== oldValue) {
                console.warn(`Collision: ${mapping.name}\nOld: ${oldValue}\nNew: ${newValue}`);
              }
            }
            tokens[mapping.name] = customPropertyNode.value;
          }
        });
      }
    });
    console.log(tokens);
    writeFile(fileName, JSON.stringify(tokens, null, 2));
  };
};

// const css = ':root { --color: red }';

const init = async () => {
  // const css = await findCss();

  // // Store file for debuggin purpose
  // await writeFile('./dump.css', css);

  const scrapedWebsites = JSON.parse(await readFile('./scraped.json', 'utf-8')) as ScrapedWebsite[];

  scrapedWebsites.forEach(({ css, url }) => {
    try {
      const fileName = `${new URL(url).hostname}.tokens.json`;

      postcss([findCssVariables(fileName)])
        // .process(css, { from, to })
        .process(css)
        .then(
          (result) => {
            // console.log(result.css);
          },
          (e) => {
            console.log(`failure for ${url}`);
          },
        );
    } catch (e) {
      console.log(`failure for ${url}`);
    }
  });
};

init();
