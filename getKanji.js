const got = require('got');
const cheerio = require('cheerio');

const difficulties = ['Pleasant', 'Painful', 'Death', 'Hell', 'Paradise', 'Reality'];

async function getKanji() {
  difficulties.forEach(async (df) => {
    const uri = `https://www.wanikani.com/kanji?difficulty=${df}`;
    const response = await got(uri);
    const $ = cheerio.load(response.body);
    
    const $kanjiCollection = $('.character');
    
    const values = $kanjiCollection.toArray().map(async (kanji) => {
      const kanjiUri = `https://www.wanikani.com/kanji/${kanji.text()}`;
      const kanjiPage = await got(kanjiUri);
      const T = cheerio.load(response.body);
      
      let kanjiObject = {
      };
      
      const $kanjiInfo = T('h1:not(a > h1), .alt-character-list, .alternative-meaning:not(.user-synonyms), .mnemonic-content, .span4').toArray();
      
      kanjiObject.kanji = T($kanjiInfo.shift()).text();
      kanjiObject.radicalCombo = T($kanjiInfo.shift()).text();
      kanjiObject.meanings = T($kanjiInfo.shift()).text();
      kanjiObject.mnemonic = T($kanjiInfo.shift()).text();
      kanjiObject.onyomi = T($kanjiInfo.shift()).text();
      kanjiObject.kunyomi = T($kanjiInfo.shift()).text();
      kanjiObject.nanori = T($kanjiInfo.shift()).text();
      kanjiObject.readingsMnemonic = T($kanjiInfo.shift()).text();
      
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
