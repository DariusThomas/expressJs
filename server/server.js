const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
/*
app.get('/',(req,res)=>{
    res.send("Hello from the web server side...");
})
*/
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', (req, res, next) => {
    console.log(req.url);
    next();
})

app.post('/contact-form', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name);
    res.send('Thank you for submitting contact');
    fs.writeFile(path.join(__dirname, '../formPost.json'), JSON.stringify({
        email: req.body.email,
        name: req.body.name
    }), err => { console.log(err) })
})

app.get('/formSubmision', (req, res, next) => {
    fs.readFile(path.join(__dirname, '../formPost.json'), { encoding: 'UTF-8' }, (err, data) => {
        if(err) console.log(err)
        res.send(`Email: ${JSON.parse(data).email} \n Name: ${JSON.parse(data).name}`)
    })
})
app.use(express.static(path.join(__dirname, '../public')))
app.listen(3000);