const express = require('express');
const router = express.Router();

const userValidator = require('../validators/user.validator');

const userCtrl = require('../controllers/user.ctrl');


router.post('/register',userValidator, userCtrl.register);
router.post('/login',userCtrl.login)
router.post("/send-mail",userCtrl.sendEmail)
router.post("/update-password",userCtrl.updatePassword)

module.exports = router