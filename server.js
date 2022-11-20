var express = require('express');
var showdown = require('showdown');
var converter = new showdown.Converter();
var path = require('path');
var app = express();
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const posts = [{
    title: 'First post',
    date: new Date().toLocaleDateString(),
    description: 'Lorem ipsum is dummy text!',
    content: 'Lorem ipsum dolor sit amet, consectetur di adipiscing elit!',
    author: 'SamannoyB',
    postid: '12345'
}]

app.get('/', function(req, res) {
      res.render("index", {
        posts: posts
      })
});

app.get('/blogger.jpg', (req, res) => {
    res.sendFile(__dirname + '/assets/blogger.jpg');
});

app.get('/newpost', (req, res) => res.render("newpost"));

app.post('/createpost', (req, res) => {
    let uname = req.body.uname;
    let title = req.body.title;
    let desc = req.body.description;
    let content = req.body.content;
    let date = new Date().toLocaleDateString();
    let postid = require("shortid").generate();
    var html = converter.makeHtml(content);

    posts.push({title, date, desc, html, uname, postid});
    app.get(`/${postid}`, (req, res) => {
        res.send(`<html><h1>${title}</h1><span>${date}</span><br><span>${uname}</span><body>${html}</body></html>`);
    });

    res.redirect(`/${postid}`)
});

app.listen(3000, () => {
    console.log('Server listening!');
})