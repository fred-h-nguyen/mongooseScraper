//require dependecies and database models
const scrape = require('../scripts/scrape')
const db = require('../models');

module.exports = {
    scrape: function (cb) {
        scrape(response => {
            let headlines = response;
            const updatedHeadlines = headlines.map(headline => {
                headline.saved = false;
                return headline;
            })
            db.Headline.insertMany(updatedHeadlines, { ordered: false }, (err, docs) => {
                cb(err, docs)
            })
        })
    },
    delete: function (idObject, cb) {
        db.Headline.deleteOne(idObject)
            .then(
                docs => {
                    cb(docs)
                })
            .catch(
                err => {
                    cb(err)
                })
    },
    get: function (query, cb) {
        db.Headline.find(query)
            .then(
                docs => {
                    cb(docs)
                })
            .catch(
                err => {
                    cb(err)
                })
    },
    update: function (query, cb) {
        db.Headline.findOneAndUpdate(query)
            .then(
                docs => {
                    cb(docs)
                })
            .catch(
                err => {
                    cb(err)
                })
    }
}