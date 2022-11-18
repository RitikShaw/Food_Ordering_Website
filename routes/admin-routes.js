const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require("../controller/user-controller");
const request_param = multer();
const verifyToken = require("../middleware/verifytoken");
const verifyAuth = require("../middleware/verifyauth");



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

router.get('/login',userController.getLogin);

router.post('/user/login',request_param.any(),userController.userLogin);

router.get('/signup',verifyAuth, userController.getSignup);
router.post('/user/signup', uploadfiles.any(), userController.userSignup);

router.get('/desidhaba/menu',userController.getMenu);
router.post('/component/menu', request_param.any(), userController.userMenu);

router.get('/logout',verifyToken, userController.userLogout);

router.get('/cart', userController.getCart);

module.exports = {
    routes: router
};