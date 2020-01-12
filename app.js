// Installed modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const parser = require('body-parser');

// Constants
const PORT = 8080;
const ADDRESS = 'localhost';

const app = express();

app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join("public")));

app.get('/index', (req, res) => {
  let doc = fs.readFileSync("./public/html/index.html", "utf-8");
  res.send(doc);
});

app.get('/map', (req, res) => {
  let doc = fs.readFileSync("./public/html/maps.html", "utf-8");
  res.send(doc);
});

app.get('/', (req, res) => {
  let doc = fs.readFileSync("./public/html/brian_index.html", "utf-8");
  res.send(doc);
});

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening on ${ADDRESS}:${PORT}`);
})