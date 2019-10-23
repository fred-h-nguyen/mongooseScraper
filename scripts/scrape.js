const axios = require('axios');
const cheerio = require('cheerio');

const scrape = cb => {
    //make axios to nytimes homepage
    axios.get("http://www.nytimes.com/section/science")
        .then(res => {
            //axios being loaded by cheerio
            const $ = cheerio.load(res.data);
            const headlines = [];

            $('#stream-panel div ol li').each(
                (i, element) => {
                    //array to store all valid elements

                    let headline = {}
                    let title = $(element)
                        .find('h2')
                        .text()
                        .trim();

                    //console.log(title)

                    let link = $(element)
                        .find('a')
                        .attr('href');

                    let summary = $(element)
                        .find('p')
                        .text()
                        .trim();

                    if (title && link && summary) {
                        //create an object headline if all items exist;
                        title = title.replace(/(r\n|\n|\r|\t|\s+)/gm, ' ').trim();
                        summary = summary.replace(/(r\n|\n|\r|\t|\s+)/gm, ' ').trim();


                        headline.title = title;
                        headline.link = link;
                        headline.summary = summary

                        //console.log(headline)
                        //push to array if all items exist
                        headlines.push(headline)
                    }
                });
            cb(headlines);
            //console.log(headlines)
        });
}

module.exports = scrape;
