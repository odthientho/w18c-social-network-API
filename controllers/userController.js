const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            console.log(users);
            return res.status(200).json(users);
        } catch(err) {
            return res.status(500).json(err);
        }
    },
}