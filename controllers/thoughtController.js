const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.status(200).json(thoughts);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $push: { thoughts: thought._id } }
            );
            res.status(201).json(thought);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) res.status(404).json({ message: "No Thought Found"});
            else res.status(200).json(thought);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    // Only update on thoughtText
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { "thoughtText": req.body.thoughtText },
                { new: true }
            ).select('-__v');
            if (!thought) res.status(404).json({ message: "No Thought Found" });
            else res.status(200).json(thought);
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            );
            if (!thought) res.status(404).json({ message: "No Thought Found"});
            else res.status(200).json({ message: "Thought Deleted" });
        } catch(err) {
            res.status(500).json(err.message);
        }
    },
    async addReactions(req, res) {
        try {
            console.log(req.body);
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId } ,
                { $addToSet: { reactions: req.body } },
                { new: true }
            ).select('-__v');
            if (!thought) res.status(404).json({ message: "No Thought Found."});
            else res.status(200).json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId } ,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            ).select('-__v');
            if (!thought) res.status(404).json({ message: "No Thought Found."});
            else res.status(200).json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}