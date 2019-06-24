function cookiesCleaner(req, res, next) {
    console.log('middleware func');
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
}

module.exports = {
    cookiesCleaner
}