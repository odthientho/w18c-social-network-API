const connection = require('../config/connection');
const { User } = require('../models');
const users = require('../seeds/data.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await User.collection.insertMany(users);
    console.table(users);
    console.log('Seeding Complete!');
    process.exit(0);
})