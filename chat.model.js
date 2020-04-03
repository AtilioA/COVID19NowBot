const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChatSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  locale: { type: String, required: true },
});

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
