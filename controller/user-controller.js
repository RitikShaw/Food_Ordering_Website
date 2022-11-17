const mongoose = require('mongoose');
const userModel = require('../model/user-model');
const User = new userModel();
const jwt = require('jsonwebtoken');
var menu = {};

class userController{

    

    async redirectHome(req,res){

        try {
            res.redirect('/home')
        } catch (error) {
            throw error;
        }
    }

    async getSignup(req,res){
        try {
            await res.render('user/signup');
            
        } catch (error) {
            throw error;
        }
    }

    async userSignup(req,res){
        try {
            
            if(req.files.length > 0){

                req.body.profile_img = req.files[0].filename;
            }

            console.log(req.body,'==req.body==')

            req.body.password = User.generatehash(req.body.password);

            console.log(req.body,"==password==")

            let userdata = await new userModel(req.body);
            let saveuser = await userdata.save();

            console.log(userdata, '==saveUser==');

            if (saveuser != null) {
                res.redirect("/login");
            } else {
                res.redirect("/signup");
            }

            
        } catch (error) {
            throw error;
        }
    }

    async getLogin(req,res){
        try {
            
            res.render('user/login')
        } catch (err) {
            throw err;
        }
    }

    async userLogin(req,res){

        try {

            console.log(req.body, '===req.body===');
            
            let userData = await userModel.findOne({
                "email": req.body.email,
                "isdeleted": false
            });

            console.log(userData, '====userData====')

            if (userData!=null) {

                console.log(User.comparehash(req.body.password,userData.password),"==password check==")

                console.log(req.body.password,'==pasword==')
                if (User.comparehash(req.body.password,userData.password)== true) {

                    let session_time = "2h";

                    let payload = {
                        "_id": userData._id,
                        "email": userData.email 
                    };

                    let jwtToken = jwt.sign({ payload }, process.env.SECRET_KEY,
                        {expiresIn: session_time});

                    req.session.token = jwtToken;
                    req.session.user_info = userData;

                    console.log(jwtToken,"==jwt==")
                    // req.flash('success', 'Login Successfully ');
                    res.redirect("/home");
                } else {
                    console.log("Email or password is wrong!");
                    // req.flash('error', 'Email or password is wrong!');
                    res.redirect("/login");
                }                
            } else {
                console.log("No user found!");
                // req.flash('error', 'No user found in our database!');
                res.redirect("/login");
            }

        } catch (err) {
         throw err;   
        }
    }

    async gethome(req,res){

        try {
            res.render('user/home')
        } catch (error) {
            throw error;
        }
    }

    async getMenu(req,res){
        try {
            res.render('component/menu')
        } catch (error) {
            
        }
    }

    async userMenu(req,res){

        try {

            console.log(req.body,"==menu==")
            req.session.user_menu = req.body;

            res.redirect('/home')
            menu = req.body
            console.log(menu,"==usermenu==")
        } catch (error) {
            throw error
        }
    }

    async userLogout(req,res){
        try {
            req.session.destroy();
            res.redirect("/");
        } catch (err) {
            throw err;
        }
    }
};

module.exports = new userController();