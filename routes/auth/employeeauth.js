const jwt = require("jsonwebtoken")
require("dotenv").config()

const VerifyToken = (req,res,next)=>{
   
    
    token = req.query.token
    if (typeof token!=='undefined') {
        jwt.verify(token,process.env.TOKEN_KEY,(err,user)=>{
            if(err || user.user_type!='employee') return res.status(403).send("Access denied")
            req.user=user
            next()
        })
        
    }
    
    else return res.status(401).send('token required for authentication')
}
module.exports=VerifyToken