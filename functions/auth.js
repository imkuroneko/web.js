module.exports = {
    checkAuthentication: (req, res, next) => {
        if (req.session.fingerprint) {
            return next();
        } else {
            return res.redirect('/login');
        }
    },
}