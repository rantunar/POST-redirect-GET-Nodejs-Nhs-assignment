const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

const app = express()
const port = 5000
let alert = undefined;

// Set Templating Enginge
app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Navigation
app.get('/', (req, res)=> {
    res.render('index', {
        alert
    });
    alert = undefined;
});

app.post('/add', urlencodedParser, [
    check('usertext', 'This usertext must me min 1 and max 10 characters long')
        .exists()
        .isLength({ max: 10 })
        .isLength({ min: 1 })
], (req, res)=> {
    console.log(req.body);
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        alert = errors.array()
        res.redirect('/');
    } else {
        res.redirect('/success');
    }
});

app.get('/success', (req,res) => {
    res.render('success');
});

app.listen(port, () => console.info(`App listening on port: ${port}`))