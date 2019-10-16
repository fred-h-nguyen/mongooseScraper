const axios = require('axios');
const cheerio = require('cheerio');

const scrape = cb => {
    //make axios to nytimes homepage
    axios.get("http://www.nytimes.com/")
        .then(res => {
            //axios being loaded by cheerio
            const $ = cheerio.load(res.data);
            const headlines = [];

            $('div.assetWrapper a').each(
                (i, element) => {
                    //array to store all valid elements

                    let title = $(this)
                        .find('h2')
                        .text()
                        .trim();

                    let link = $(this)
                        .attr('href');

                    let summary = $(this)
                        .find('p')
                        .text()
                        .trim();

                    if (title && link && summary) {
                        //create an object headline if all items exist;
                        title = title.replace(/(r\n|\n|\r|\t|\s+)/gm, '').trim();
                        summary = summary.replace(/(r\n|\n|\r|\t|\s+)/gm, '').trim();
                        
                        const headline = {title,link,summary};

                        //push to array if all items exist
                        headlines.push(headline)
                    }
                });
            cb(articles);
        });
}

module.exports = scrape;
