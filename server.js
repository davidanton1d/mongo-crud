const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://<mongodb>', (err, database) => {
  if(err) return console.log(err);
  db = database;

  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({extended: true}));

  app.listen(3001, function(){
    console.log("Listening on port 3001");


    app.get('/', (req, res) => {
      db.collection("quotes").find().toArray((err, result) => {
        console.log(result.length);
        res.render('index.ejs', {quotes: result});
      });
    });


    app.post('/quotes', (req, res) => {
      console.log(req.body);

      db.collection('quotes').save(req.body, (err, result) => {

      if (err) return console.log(err);
        console.log('Saved to database');
        res.redirect('/');
      })
    });


  });

});
