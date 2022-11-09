const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            res.status(200).json(users);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            console.log(user);
            res.status(201).json(user);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');
            if (!user) res.status(404).json({ message: "No User Found" });
            else res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { 
                    runValidators: true, 
                    new: true
                },
            ).select('-__v');
            if (!user) res.status(404).json({ message: "No User Found" });
            else res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId }
            );
            user.thoughts.forEach(async thoughtId => {
                const thought = await Thought.findOneAndDelete({
                    _id: thoughtId
                });
            });
            if (!user) res.status(404).json({ message: "No User Found" });
            else res.status(200).json({ message: "User And Associated Thoughts Deleted."});
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            ).select('-__v');            
            if (!user) res.status(404).json({ message: "No User Found" });
            else res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            ).select('-__v');
            if (!user) res.status(404).json({ message: "No User Found" });
            else res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err.message);
        }
    }
}