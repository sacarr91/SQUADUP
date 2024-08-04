const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    // format**

      },
    username: {
      type: String,
      required: true,
      ref: 'Person'
    },
    reactions: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'reaction' 
      }],

  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
