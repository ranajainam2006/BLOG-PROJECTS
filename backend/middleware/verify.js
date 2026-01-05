
exports.verifyAuth = (req, res, next) => {

    console.log(req.session.user)


    const token = req.session.user;

    if(!token){
        return res.json({
            success : false,
            message : "You Are Unauthorized☠︎︎...."
        })
    }


    next()
    
}