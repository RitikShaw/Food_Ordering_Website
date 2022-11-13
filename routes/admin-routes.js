const express = require('express');
const router = express.Router();

const userController = require("../controller/user-controller");


router.get('/', userController.redirectHome);

router.get('/home',userController.gethome);

router.get('/login', function (req, res) {
    res.render('user/login');
});

router.get('/signup', userController.getSignup);

module.exports = {
    routes: router
};