const express = require('express');
const router = express.Router();

const userController = require("../controller/user-controller");


router.get('/', userController.redirectHome);

router.get('/home',userController.gethome);

router.get('/login', userController.getLogin);

router.get('/signup', userController.getSignup);

router.get('/menu', userController.getMenu);

module.exports = {
    routes: router
};