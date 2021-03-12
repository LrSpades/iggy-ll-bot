const got = require('got');
const cheerio = require('cheerio');

const difficulties = ['Pleasant', 'Painful', 'Death', 'Hell', 'Paradise', 'Reality'];

async function getKanji() {
  difficulties.forEach(df => {
    const uri = `https://www.wanikani.com/kanji?difficulty=${df}`;
    const response = await got(url);
    const $ = cheerio.load(response.body);
    
    const $kanjiCollection = $('.character');
    
    const values = $kanjiCollection.toArray().map(kanji => {
      const kanjiUri = `https://www.wanikani.com/kanji/${kanji.text()}`;
      const kanjiPage = await got(kanjiUri);
      const $ = cheerio.load(response.body);
      
      let kanjiObject = {
      };
      
      const $kanjiInfo = $('h1:not(a > h1), .alt-character-list, .alternative-meaning:not(.user-synonyms), .mnemonic-content, .span4').toArray();
      
      kanjiObject.kanji = $kanjiInfo.shift().text();
      kanjiObject.radicalCombo = $kanjiInfo.shift().text();
      kanjiObject.meanings = $kanjiInfo.shift().text();
      kanjiObject.mnemonic = $kanjiInfo.shift().text();
      kanjiObject.onyomi = $kanjiInfo.shift().text();
      kanjiObject.kunyomi = $kanjiInfo.shift().text();
      kanjiObject.nanori = $kanjiInfo.shift().text();
      kanjiObject.readingsMnemonic = $kanjiInfo.shift().text();
      
      return kanjiObject;
    });
    
    return values
  });
}

async function scrape() {
  console.log('Beginning to get kanji...');
  const kanjiStats = async getKanji();
  
  console.log(kanjiStats);
  console.log('Done!');
}
