const { Schema, Types } = require('mongoose');

const interactionSchema = new Schema(
  {
    reactions: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    comments: {
      type: String,
      maxlength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = interactionSchema;