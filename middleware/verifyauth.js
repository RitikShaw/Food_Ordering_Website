module.exports = (req, res, next) => {
    const token = req.session.token;
    if (token != null) {
        return res.redirect("/home");
    } else {
        return next();
    }
};