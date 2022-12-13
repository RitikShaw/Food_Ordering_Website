const mongoose = require('mongoose');
const userModel = require('../model/user-model');
const User = new userModel();
const foodmodel = require('../model/food-model');
const Food = new foodmodel();
const userCart = require('../model/usercart-model');
const UserCart = new userCart();
const jwt = require('jsonwebtoken');
var user_id;
var product_info;

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

            // let foodMenu = await foodmodel.find({
            //     "isdeleted" : false
            // });

            // let menu_length = await foodmodel.countDocuments({"isdeleted":false})

            // req.session.item_length = menu_length;

            console.log(userData, '====userData====')
            // console.log(foodMenu,"==menu==")
            // console.log(menu_length,"==length==")

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
                    user_id= req.session.user_info = userData;
                    console.log("==ui==")
                    console.log(user_id,"==ui==")

                    // let fm=req.session.menu_info=foodMenu;
                    // console.log("==menu==")
                    // console.log(fm,"==menu==")

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

            let foodMenu = await foodmodel.find({
                "isdeleted" : false
            });

            let menu_length = await foodmodel.countDocuments({"isdeleted":false})

            req.session.item_length = menu_length;

            
            console.log(menu_length,"==length==")

            product_info=req.session.menu_info=foodMenu;
                    console.log("==menu==")
                    console.log(product_info,"==menu_info==")

            await res.render('component/menu')
        } catch (error) {
            
        }
    }

    async userMenu(req,res){

        try {

            
            req.session.user_menu = req.body;

            
            let selected_items=req.session.cart_info = req.body
            console.log(selected_items,"==usermenu==")

            Object.keys(selected_items).forEach(key => {
                if (selected_items[key] === '') {
                  delete selected_items[key];
                }
            });

            console.log(selected_items,"==cart==")

            let user_ids = user_id.name;

            let selected_items_keys = Object.keys(selected_items);
            // console.log(selected_items_keys,"==selected_items_keys==")
            // console.log(selected_items_keys.length,"==selected_items_keys length==")
            
            let user_cart_temp = {
                user_name : user_ids,
                products : selected_items
            }

            let user_cart = await new userCart(user_cart_temp)
            let save_cart = await user_cart.save();

            console.log(save_cart,"==user_cart")
            // let product_id = product_info.map(function (el){return el._id;});
            // console.log(product_id,"==product_id==")
            // console.log(user_ids,"==user_id==")

            req.session.users_cart= save_cart;
            let products = Object.keys(save_cart.products).length;
            console.log(products,"==length==")
            res.redirect('/cart')
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

    async getCart(req,res){
        try {
            res.render('component/cart')
        } catch (err) {
            throw err;
        }
    }

    async getprofile(req,res){
        try {
            res.render('user/userProfile')
        } catch (err) {
            throw err;
            
        }
    }
};

module.exports = new userController();