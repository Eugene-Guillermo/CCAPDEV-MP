const dotenv = require(`dotenv`);
const express = require(`express`);
var cookieParser = require('cookie-parser');
const session = require("express-session");
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const hbs = require('hbs');

const path = require('path')
const connect = require('./models/db.js');

const app = express();

dotenv.config();
port = process.env.PORT || 3000;
hostname = '127.0.0.1';

app.set('view engine', 'hbs');

app.use(cookieParser());
// From the slides
app.use(session({
    secret: "very super secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*60*24*30,
        httpOnly: false
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(express.static(__dirname + '/public'));
app.use('/', routes);



app.listen(port, hostname, async function() {
    console.log(`Server running at: `);
    console.log(`http://` + hostname + `:` + port);
    try {
        await connect();
        console.log(`Now connected to MongoDB`);
    } catch (err) {
        console.log('Connection to MongoDB failed: ');
        console.error(err);
    }
});
