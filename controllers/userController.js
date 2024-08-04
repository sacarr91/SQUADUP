const { ObjectId } = require('mongoose').Types;
const { Person, thought } = require('../models');

// Aggregate function to get the number of students overall
const friendCount = async () => {
  const numberOfFriends = await Person.aggregate()
    .count('friendCount');
  return numberOfFriends;
}

// Aggregate function for getting the overall grade using $avg
const profile = async (personId) =>
  Person.aggregate([
    // only include the given student by using $match
    { $match: { _id: new ObjectId(personId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: new ObjectId(personId),
        // overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

module.exports = {
  // Get all friends
  async getFriendsList(req, res) {
    try {
      const friends = await Person.find();

      const friendObj = {
        friends,
        friendCount: await friendCount(),
      };

      res.json(friendObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSinglePerson(req, res) {
    try {
      const person = await Person.findOne({ _id: req.params.personId })
        .select('-__v');

      if (!person) {
        return res.status(404).json({ message: 'No person with that ID' })
      }

      res.json({
        person,
        profile: await profile(req.params.personId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createPerson(req, res) {
    try {
      const person = await Person.create(req.body);
      res.json(person);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a person and remove them from friends lists
  async deletePerson(req, res) {
    try {
      const person = await Person.findOneAndRemove({ _id: req.params.personId });

      if (!person) {
        return res.status(404).json({ message: 'No such person exists' });
      }

      // const course = await Course.findOneAndUpdate(
      //   { students: req.params.studentId },
      //   { $pull: { students: req.params.studentId } },
      //   { new: true }
      // );

      // if (!course) {
      //   return res.status(404).json({
      //     message: 'Student deleted, but no courses found',
      //   });
      // }

      res.json({ message: 'Student successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a student
  async addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);

    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  async removeAssignment(req, res) {
    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
