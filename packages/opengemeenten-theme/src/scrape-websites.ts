import { writeFile } from 'node:fs/promises';
import pLimit from 'p-limit';

export interface ScrapedWebsite {
  css: string;
  url: string;
}

/*
 * Source:
 * https://www.opengemeenten.nl/over-ons/deelnemende-gemeenten
 *
 * JSON.stringify(Array.from(document.querySelectorAll('.card a:link')).map(el => el.href), 2)
 */
let domains = [
  'https://www.barneveld.nl',
  'https://www.bergen-nh.nl/',
  'https://www.bloemendaal.nl/',
  'https://www.bunnik.nl/',
  'https://www.castricum.nl/',
  'https://www.debilt.nl/',
  'https://www.dijkenwaard.nl/',
  'https://www.ede.nl/',
  'https://www.ermelo.nl/',
  'https://www.harderwijk.nl/',
  'https://www.heemskerk.nl/',
  'https://www.heemstede.nl/',
  'https://www.heiloo.nl/',
  'https://www.houten.nl/',
  'https://www.heusden.nl/',
  'https://www.katwijk.nl/',
  'https://www.medemblik.nl/',
  'https://www.nieuwegein.nl/',
  'https://www.nissewaard.nl/',
  'https://www.rhenen.nl/',
  'https://www.schouwen-duiveland.nl/',
  'https://www.soest.nl/',
  'https://www.tholen.nl/',
  'https://www.uitgeest.nl/',
  'https://www.veenendaal.nl/',
  'https://www.voerendaal.nl/',
  'https://www.gemeentewestland.nl/',
  'https://www.wijkbijduurstede.nl/',
  'https://www.woudenberg.nl/',
  'https://www.zeewolde.nl/',
  'https://www.zeist.nl/',
];

domains = [...domains, 'https://www.lenteveld.nl/'];

const init = async () => {
  const limit = pLimit(5);

  const scrapedCss = await Promise.all(
    domains.map(async (url) => {
      console.log(`Scrape domain: ${url}`);
      const html = await limit(() => {
        console.log(url);
        return fetch(url).then((response) => response.text());
      });

      const cssFiles = Array.from(html.matchAll(/href="([^"]+)" rel="stylesheet"\s*/g)).map(([, url]) => url);
      return {
        url,
        css: (
          await Promise.all(
            cssFiles.map(async (cssUrl) => {
              const fullUrl = `${url}${cssUrl}`;
              return limit(() => {
                console.log(fullUrl);
                return fetch(fullUrl).then((r) => r.text());
              });
            }),
          )
        ).join(''),
      };
    }),
  );

  writeFile('./tmp/scraped.json', JSON.stringify(scrapedCss, null, 2));
};

init();
