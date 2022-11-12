
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

    async gethome(req,res){

        try {
            res.render('user/home')
        } catch (error) {
            throw error;
        }
    }
};

module.exports = new userController();