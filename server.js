const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://<mongodb>', (err, database) => {
  if(err) return console.log(err);
  db = database;

  app.use(bodyParser.urlencoded({extended: true}));

  app.listen(3001, function(){
    console.log("Listening on port 3000");
    app.get('/', (req, res) => {
      var cursor = db.collection("quotes").find().toArray((err, results) => {
        console.log(results);
      });

      res.sendFile(__dirname + '/index.html');
      console.log("GET: " + __dirname);
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
