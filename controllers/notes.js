const db = require('../models');

module.exports = {
    get: function (queryHeadline, cb) {
        db.Headline.findOne(queryHeadline)
            .populate('note')
            .then(headline => {
                cb(headline)
            })
            .catch(err => {
                cb(err)
            })
    },
    save: function (note, headline, cb) {
        const newNote = {
            body: note
        }
        db.Note.create(newNote)
            .then(dbNote => {
                return db.Headline.findOneAndUpdate(headline, { not: dbNote._id }, { new: true });
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