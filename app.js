const express = require('express');
const app = express();
const dns = require('dns');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Body Parser Settings
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const Site = require('./models/site');

app.post('/new', (req, res) => {
  dns.lookup('google.com', err => {
    if(err) return res.send({'error': "invalid URL"});
    Site.create({url: req.body.url}, (err, site) => {
      if(err) return res.send({'error': err});
      else return res.send({'res': 'Short URL created successfully'});
    });
  })
})

app.get('/:id', (req, res) => {
  Site.findById(req.params.id, (err, site) => {
    if(err) return res.send({'error': err});
    else return res.redirect('https://www.' + site.url);
  })
})

app.listen(3000, () => {
})