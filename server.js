const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
  console.log("Listening on port 3000");
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    console.log("GET: " + __dirname);
    // Note: __dirname is the path to your current working directory. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
  });

  app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooooooooo!')
  })
});
