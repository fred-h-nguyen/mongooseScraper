//Requiring npm packages
var express = require("express");
var exphbs = require("express-handlebars")

//creating app instance
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars",exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//Listening on the port
app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports = app;
