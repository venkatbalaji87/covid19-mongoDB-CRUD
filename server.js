const dbConnect = require("./models/db");
const express = require("express");
const app = express();
const patientController = require("./controllers/patientController");
const path = require('path');
const expresshandlebars = require('express-handlebars');
const bodyparser = require("body-parser");


app.set('views',path.join(__dirname,'/views'));

app.engine('hbs', expresshandlebars( {
    extname: 'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname+ '/views/layout'
}));


app.set('view engine','hbs');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.use("/patient", patientController);

app.listen(3000, () => {
    console.log("Express server connected successfully!!" );
});

