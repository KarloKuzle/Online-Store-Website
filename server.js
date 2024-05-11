const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');


const home = require('./routes/home.routes');
const cart = require('./routes/cart.routes');

app.set('views', path.join(__dirname, "views"));
app.set('view engine', "ejs");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: "key",
        resave: false,
        saveUninitialized: true,
    })
);


app.use('/', home);
app.use('/home', home);
app.use('/cart', cart);

app.listen(3000);


// u klijentskoj skripti s fetch get ici na 
// endpointe /home/getCategories i /home/getProducts