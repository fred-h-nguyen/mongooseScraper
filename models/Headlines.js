const mongoose = require('mongoose');
// reference to schema constructor
const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({
    //headline of the article
    headline:{
        type:String,
        required:true
    },
    //link to article
    link:{
        type: String,
        required: true,
    },
    //summary of the article
    summary:{
        type: String,
        required:true,
    },
    note:{
        type: Schema.Types.ObjectId,
        ref : 'Note'
    }
});
//create the model based on the schema
const Headline = mongoose.model('Headline',HeadlineSchema);

//Export the headline model

module.exports = Headline;