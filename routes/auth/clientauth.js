const jwt = require("jsonwebtoken")
require("dotenv").config()

const VerifyToken = (req,res,next)=>{
    console.log(req.header('auth-token'))
    //const token = req.body.token || req.query.token || req.headers["x-access-token"].split(' ')[1];
    //token=req.header('auth-token')
    if (typeof token!=='undefined') {
        jwt.verify(token,process.env.TOKEN_KEY,(err,user)=>{
            if(err || req.user.role!='client') return res.status(403).send("Access denied")
            req.user=user
            next()
        })
        
    }
    
    return res.status(401).send('token required for authentication')
}
module.exports=VerifyToken