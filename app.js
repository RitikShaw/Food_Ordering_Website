const http = require('http');
const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin-routes');
const path= require('path');
const flash = require('connect-flash');
const session = require('express-session');


dotenv.config();
const PORT = process.env.PORT;

const app = express();

require('./config/database')();

app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({"extended":true}));
app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    
}));

app.use((req,res,next)=>{
    res.locals.token = req.session.token;
    res.locals.user_info = req.session.user_info;
    res.locals.user_menu = req.session.user_menu;
    // res.locals.messages = req.flash();
    next();
})

var server = http.createServer(app);

app.use(adminRoutes.routes);

// app.use(flash());

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log('Server running on port : ' + PORT);
});