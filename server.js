const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;


app.set('view engine', 'hbl');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    var now = new Date();
    var log = `${now}, ${req.method} , ${req.url}`

    console.log(log);

    fs.appendFile('serve.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to log data.');
        }
    });
    next()
});

// app.use((req, res, next) => {
//     res.render('maintanace.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
});

hbs.registerHelper('scremIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        titleText: 'Home Page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        titleText: 'About Page'
    });
});

app.get('/error', (req, res) => {
    res.send({
        errorMessage: 'Unable to load data.'
    });
});

app.listen(port, () => {
    console.log(`Server up on on port ${port}`);
});
