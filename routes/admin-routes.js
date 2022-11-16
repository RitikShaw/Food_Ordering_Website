const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require("../controller/user-controller");
const request_param = multer();



const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null,'./public/uploads/user')
    },
    filename:  (req,file,callback) => {
        callback(null,file.fieldname +" "+ Date.now()+ file.originalname.replace(/\s/g,'_'))
    }
});

const uploadfiles= multer({storage:storage})

router.get('/', userController.redirectHome);

router.get('/home',userController.gethome);

router.get('/login', userController.getLogin);

router.post('/user/login',request_param.any(),userController.userLogin);

router.get('/signup', userController.getSignup);
router.post('/user/signup', uploadfiles.any(), userController.userSignup);

module.exports = {
    routes: router
};