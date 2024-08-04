const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create Student model
const personSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim
    },
    email: {
      type: String,
      required: true,
      unique: true,
      vaildate: {
        isEmail: true,
      },
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Person'
    }]
  }
);

personSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const Person = model('person', personSchema);

module.exports = Person;

