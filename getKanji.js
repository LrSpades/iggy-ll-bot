const got = require('got');
const cheerio = require('cheerio');

const difficulties = ['Pleasant', 'Painful', 'Death', 'Hell', 'Paradise', 'Reality'];

async function getKanji() {
  difficulties.forEach(async (df) => {
    const uri = `https://www.wanikani.com/kanji?difficulty=${df}`;
    const response = await got(uri);
    let $ = cheerio.load(response.body);
    
    const $kanjiCollection = $('.character');
    
    const values = $kanjiCollection.toArray().map(async (kanji) => {
      const kanjiUri = `https://www.wanikani.com/kanji/${kanji.text()}`;
      const kanjiPage = await got(kanjiUri);
      $ = cheerio.load(response.body);
      
      const kanjiInfo = $kanjiCollection.find('h1:not(a > h1), .alt-character-list, .alternative-meaning:not(.user-synonyms), .mnemonic-content, .span4').toArray();
      
      let kanjiObject = '';
      
      for (info of kanjiInfo) {
        const info = $(info);
        
        kanjiObject = kanjiObject + $info.text();
      }
      
      return kanjiObject;
    });
    
    console.log(values);
  });
}

async function scrape() {
  console.log('Getting kanji...')
  await getKanji();
  console.log('Done!')
}

scrape();
