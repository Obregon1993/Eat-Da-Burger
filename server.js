const express        = require("express");
const exphbs         = require("express-handlebars");
const path           = require("path");
const methodOverride = require("method-override");
const bodyParser     = require("body-parser");

const app  = express();
const PORT = process.env.PORT || 3000;

const directory_public = path.join(__dirname, "public");
app.use(express.static(directory_public));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({"extended": false}));


app.engine("handlebars", exphbs({"defaultLayout": "main"}));
app.set("view engine", "handlebars");


app.use(methodOverride("_method"));

const directory_controllers = path.join(__dirname, "controllers");

app.use("/", require(
    path.join(directory_controllers, "burger_controller.js"))
);


app.listen(PORT, function(){
    console.log(`App listening on ${PORT}.`)
});