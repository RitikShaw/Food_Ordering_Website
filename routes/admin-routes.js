const express = require('express');
const router = express.Router();

const userController = require("../controller/user-controller");


router.get('/', userController.redirectHome);

router.get('/home',userController.gethome);

router.get('/login', function (req, res) {
    res.send("Welcome Node JS");
});

router.get('/signup', userController.getSignup);

module.exports = {
    routes: router
};