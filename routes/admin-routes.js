const express = require('express');
const router = express.Router();

const userController = require("../controller/user-controller");


router.get('/', userController.redirectHome);

router.get('/home',userController.gethome);

router.get('/login', userController.getLogin);

router.get('/signup', userController.getSignup);

module.exports = {
    routes: router
};