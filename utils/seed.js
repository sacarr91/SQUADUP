const connection = require('../config/connection');
const { Thought, Person } = require('../models');
const { getRandomName, getRandomArrItem } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let courseCheck = await connection.db.listCollections({ name: 'courses' }).toArray();
  if (courseCheck.length) {
    await connection.dropCollection('courses');
  }

  let studentsCheck = await connection.db.listCollections({ name: 'students' }).toArray();
  if (studentsCheck.length) {
    await connection.dropCollection('students');
  }


  // Create empty array to hold the students
  const people = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = `${username}@email.com`;

    people.push({
      username, 
      email
    });
  }

  // Add students to the collection and await the results
  const studentData = await Person.create(people);

  // Add courses to the collection and await the results
  await Thought.create({
    thoughtText: 'hmmmm........',
    username: getRandomArrItem(people),
    reactions: [""],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(studentData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
