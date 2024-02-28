let express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const UserController = require('../controllers/user-controller');
const validationMiddleware = require('../middlewares/validation-middleware')
const {loginValidation, registerValidation} = require('../utils/validations/user-validations');
const  verifyToken  = require("../middlewares/authentication-middleware");
const { addFriendValidation } = require("../utils/validations/friend-validations");
const FriendController = require("../controllers/friend-controller");

router.post('/api/signup', validationMiddleware(registerValidation, 'body'), UserController.signUp)
router.post('/api/login', validationMiddleware(loginValidation, 'body'), UserController.login)
router.post('/api/add-friend', validationMiddleware(addFriendValidation, 'body'), FriendController.addFriend)
router.get('/api/get-friends',[verifyToken], FriendController.getFriends)
router.delete('/api/delete-friend/:friend_id',[verifyToken], FriendController.deleteFriend)
router.post('/api/restore-archived-friend',[verifyToken], FriendController.archivedOrRestoreFriend)
router.put('/api/update-friend',[verifyToken], FriendController.updateFriend)


module.exports = router;
