const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    scrape: cb => {
        //make axios to nytimes homepage
        axios.get("http://www.nytimes.com/")
            .then(res => {
                //axios being loaded by cheerio
                const $ = cheerio.load(res.data);
                const headlines = [];

                $('article div.assetwrapper div a').each(
                    (i, element) => {
                        //array to store all valid elements
                        
                        let title = $(this)
                            .children('div')
                            .children('h2')
                            .text()
                            .trim();

                        let link = $(this)
                            .attr('href');
                        
                        let summary = $(this)
                            .children('p')
                            .text()
                            .trim();

                        if (title && link && summary){
                            //create an object headline if all items exist;
                            const headline = {};
                            const titleNeat = title.replace(/(r\n|\n|\r|\t|\s+)/gm,'').trim();
                            const summaryNeat = summary.replace(/(r\n|\n|\r|\t|\s+)/gm,'').trim();
                            headline.title = titleNeat;
                            headline.link = link;
                            headline.summary = summaryNeat
                            
                            //push to array if all items exist
                            headlines.push(headline)
                        }
                    });
                    cb(articles);
            });
    }
};