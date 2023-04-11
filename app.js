const express = require("express");
const ejs = require("ejs");
require('https').globalAgent.options.rejectUnauthorized = false;
const authRoutes = require("./config/github");
const passport = require('passport');


const app = express();
app.set('view engine', 'ejs')

app.use('/auth', authRoutes);


// home route 
app.get("/", function (req, res) {
    res.render('home', { user: req.user });
});

app.listen(3000, function () {
    console.log(" listen on port 3000");


});

