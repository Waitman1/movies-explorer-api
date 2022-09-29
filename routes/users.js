const router = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { userUpdateValidate } = require('../middleware/validate');

router.get('/me', getUserInfo);

router.patch('/me', userUpdateValidate, updateUser);

module.exports = router;
