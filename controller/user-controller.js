const mongoose = require('mongoose');
const userModel = require('../model/user-model');
const User = new userModel();
const foodmodel = require('../model/food-model');
const Food = new foodmodel();
const userCart = require('../model/usercart-model');
const UserCart = new userCart();
const jwt = require('jsonwebtoken');
var user_id;


let user_shoplist= {};

class userController{

    

    async redirectHome(req,res){

        try {
            res.redirect('/home')
        } catch (error) {
            throw error;
        }
    }

    async gethome(req,res){

        try {
            let url = req.url.split('/')
            console.log(url[1],"==url")
            res.render('user/home',{
                page_url: url[1]
            })
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
                    user_id= req.session.user_info = userData;
                    console.log("==ui==")
                    console.log(user_id,"==ui==")

                    console.log(jwtToken,"==jwt==")
                    
                    res.redirect("/home");
                } else {
                    console.log("Email or password is wrong!");
                    
                    res.redirect("/login");
                }                
            } else {
                console.log("No user found!");
                
                res.redirect("/login");
            }

        } catch (err) {
         throw err;   
        }
    }

    async getMenu(req,res){
        try {

            let url = req.url.split('/')

            let foodMenu = await foodmodel.find({
                "isdeleted" : false
            });

            let menu_length = await foodmodel.countDocuments({"isdeleted":false})          
            
            console.log(menu_length,"==length==")

            req.session.menu_info=foodMenu;
                    console.log("==menu==")
                    console.log(foodMenu,"==menu_info==")

            await res.render('component/menu',{
                page_url: url[1],
                item_length : menu_length
            })
        } catch (error) {
            
        }
    }

    async userMenu(req,res){

        try {            
            req.session.user_menu = req.body;
            
            let selected_items=req.body
            console.log(selected_items,"==usermenu==")

            Object.keys(selected_items).forEach(key => {
                if (selected_items[key] === '') {
                  delete selected_items[key];
                }
            });

            console.log(selected_items,"==cart==")

            let user_ids = user_id.name;          
            
            let user_cart_temp = {
                user_name : user_ids,
                products : selected_items
            }

            let user_cart = await new userCart(user_cart_temp)
            user_shoplist = await user_cart.save();

            console.log(user_shoplist,"==user_cart")
        
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
            let url = req.url.split('/')

            console.log(user_shoplist,"==user shoplist==")
            let items_count = Object.keys(user_shoplist.products).length;

            res.render('component/cart',{
                page_url: url[1],
                products: user_shoplist.products,
                product_count: items_count
            });
        } catch (err) {
            throw err;
        }
    }

    async getprofile(req,res){
        try {
            let url = req.url.split('/')
            res.render('user/userProfile',{
                page_url: url[1]
            })
        } catch (err) {
            throw err;
            
        }
    }
};

module.exports = new userController();