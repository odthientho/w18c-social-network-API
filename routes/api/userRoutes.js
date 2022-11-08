const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController.js');

// Routes: /api/users
router.route('/').get(getUsers).post(createUser);

// Routes: /api/users/:studentId
router.route('/:studentId').get(getSingleUser).post(updateUser).delete(deleteUser);

// Routes: /api/users/:userId/friends/:friendId
router.route('/:studentId/friends').post(addFriend);

// Routes: /api/users/:userId/friends/:friendId
router.route('/:studentId/friends/:friendId').delete(deleteFriend);

module.exports = router;
