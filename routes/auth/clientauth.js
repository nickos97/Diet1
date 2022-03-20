const jwt = require("jsonwebtoken")
require("dotenv").config()

const VerifyToken = (req,res,next)=>{
    
    //token=req.header('authorization')
    //token=req.cookies.jwtToken
    
    token=req.query.token
    //const token = req.body.token || req.query.token || req.headers["x-access-token"].split(' ')[1];
    //token=req.header('auth-token')
    if (typeof token!=='undefined') {
        jwt.verify(token,process.env.TOKEN_KEY,(err,user)=>{
            
            if(err || user.user_type!='client') return res.status(403).send("Access denied")
            req.user=user
            console.log(req.user.user_type)
            next()
        })
        
    }
    else return res.status(401).send('token required for authentication')
}
module.exports=VerifyToken