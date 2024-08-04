const { Schema, model } = require('mongoose');
const assignmentSchema = require('./Assignment');

// Schema to create Student model
const personSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    age: {
      type: Number,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'person',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Person = model('person', personSchema);

module.exports = Person;

