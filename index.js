const fs = require('fs');
const fetch = require('node-fetch');

const get = async page => {
  const resp = await fetch(
    `https://disney-studios-awards.s3.amazonaws.com/encanto/books/flipJSi56TV4ke/files/mobile/${page}.jpg?211115084458`,
  );
  const buffer = await resp.buffer();
  fs.writeFileSync(`./pages/${page}.jpg`, buffer);
  console.log(`Done fetching page ${page}`);
};

const main = async () => {
  const batchSize = 40;
  const maxPage = 180;
  for (let i = 1; i <= maxPage; i += batchSize) {
    // batching
    const promises = [];
    for (let j = i; j < i + batchSize && j <= maxPage; j++) {
      promises.push(get(j));
    }
    await Promise.all(promises);
  }
};

main();