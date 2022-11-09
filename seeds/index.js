const connection = require('../config/connection');
const { User, Thought } = require('../models');
const users = require('../seeds/user.json');
const thoughts = require('../seeds/thought.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    
    await User.deleteMany({});
    await User.collection.insertMany(users);

    await Thought.deleteMany({});
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);

    console.log('Seeding Complete!');
    process.exit(0);
})