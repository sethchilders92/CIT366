var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {type: String, required: true},
  maxDocumentId: {type: String, required: true},
  maxMessageId: {type: String, required: true},
  maxContactsId: {type: String, required: true}
});

module.exports = mongoose.model('Sequence', schema);
