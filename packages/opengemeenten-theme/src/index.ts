import postcss from 'postcss';
import type { AcceptedPlugin } from 'postcss';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { ScrapedWebsite } from './scrape-websites';
import set from 'lodash-es/set';
import type { DesignTokenTree } from '@nl-design-system-unstable/tokens-lib/dist/design-tokens';
import { designTokens, Mapping } from './mappings';

const treeTokens = (tokens: FlatTokens): DesignTokenTree => {
  const tree: DesignTokenTree = {};
  for (let key in tokens) {
    const item = tokens[key];
    set(tree, key, { $value: item });
  }
  return tree;
};

const map = designTokens.reduce((map, item) => {
  let arr = map.get(item.selector);
  if (arr) {
    arr.push(item);
  } else {
    map.set(item.selector, [item]);
  }
  return map;
}, new Map<string, Mapping[]>());

const cssVariableMap = designTokens.reduce((map, item) => {
  map.set(item.property, item.name);
  return map;
}, new Map<string, string>());

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
            tokens[mapping.name] = customPropertyNode.value.trim();
          }
        });
      }
    });

    for (let key in tokens) {
      const value = tokens[key];

      tokens[key] = value.replace(/var\(([^)]+)\)/g, (_, property) => {
        const tokenRef = cssVariableMap.get(property);
        return tokenRef ? `{${tokenRef}}` : _;
      });
    }

    // TODO: Remove this workaround for Style Dictionary adding extra quote marks in CSS
    tokens['basis.typography.font-family.default'] = tokens['basis.typography.font-family.default'].replace(/"/g, '');
    tokens['basis.typography.font-family.heading'] = tokens['basis.typography.font-family.heading'].replace(/"/g, '');

    const tree = treeTokens(tokens);
    writeFile(
      fileName,
      JSON.stringify(
        {
          ['opengemeenten']: tree,
        },
        null,
        2,
      ),
    );
    console.log(`Generated ${fileName}`);
  };
};

// const css = ':root { --color: red }';

const init = async () => {
  // const css = await findCss();

  // // Store file for debuggin purpose
  // await writeFile('./dump.css', css);

  await mkdir('./dist/', { recursive: true });
  await mkdir('./tmp/', { recursive: true });

  const scrapedWebsites = JSON.parse(await readFile('./tmp/scraped.json', 'utf-8')) as ScrapedWebsite[];

  scrapedWebsites.forEach(({ css, url }) => {
    try {
      const fileName = `./dist/${new URL(url).hostname}.tokens.json`;

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
