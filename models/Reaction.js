const { Schema, model } = require('mongoose');

// Schema for what makes up a comment
const reactionSchema = new Schema({
  text: String,
  username: String,
});

// Initialize the Comment model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
