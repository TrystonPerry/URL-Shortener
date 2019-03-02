const mongoose = require('mongoose');

let siteSchema = new mongoose.Schema({
  url: {
    type: 'String',
    required: true
  }
})

module.exports = mongoose.model('Site', siteSchema);