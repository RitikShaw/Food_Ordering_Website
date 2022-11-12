const http = require('http');
const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin-routes');


dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.set("views", __dirname + '/views');
app.set("view engine", "ejs");

app.use(express.urlencoded({"extended":true}));
app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());

var server = http.createServer(app);

app.use(adminRoutes.routes);

server.listen(PORT, function (err) {
    if (err) throw err;
    console.log('Server running on port : ' + PORT);
});