const db = require('../models');

module.exports = {
    get: function (queryHeadline, cb) {
        db.Headline.findOne(queryHeadline)
            .populate('notes')
            .then(headline => {
                cb(headline)
            })
            .catch(err => {
                cb(err)
            })
    },
    save: function (note, headline, cb) {
        db.Note.create(note)
            .then(dbNote => {
                return db.Headline.findOneAndUpdate(headline, { note: dbNote._id }, { new: true });
            })
            .then(dbHeadline => {
                cb(dbHeadline);
            })
            .catch(err => {
                cb(err);
            });
    },
    delete: function (query, cb) {
        db.Note.findOneAndDelete(query)
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