//Requiring npm packages
const express = require("express");
const exphbs = require("express-handlebars")
const mongoose = require("mongoose");
const logger = require('morgan')
//creating app instance
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
app.engine('handlebars',exphbs({
        defaultLayout: "main"
    })
);
app.set('view engine', 'handlebars');

//mongoose database
const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadline'

//connecting to the database
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
//routes
require('./routes/routes')(app);

//Listening on the port
app.listen(PORT, function () {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
    );
});

module.exports = app;
