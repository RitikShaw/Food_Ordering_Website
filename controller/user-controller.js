const mongoose = require('mongoose');
const userModel = require('../model/user-model');
const User = new userModel();


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
            res.render('user/signup')
            res.send("Welcome signup")
        } catch (error) {
            throw error
        }
    }

    async getLogin(req,res){

        try {

            res.render('user/login')

            console.log(req.body, '===req.body===');
            
            let userData = await userModel.findOne({
                "email": req.body.email,
                "isdeleted": false
            });

            console.log(userData, '====userData====')

            if (userData!=null) {

                console.log(req.body.password,'==pasword==')
                if (req.body.password==userData.password) {
                    
                    res.redirect("user/home");
                } else {
                    console.log("Email or password is wrong!");
                    req.flash('error', 'Email or password is wrong!');
                    res.redirect("/login");
                }                
            } else {
                console.log("No user found!");
                req.flash('error', 'No user found in our database!');
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
};

module.exports = new userController();