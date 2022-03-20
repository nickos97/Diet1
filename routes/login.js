const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const jwt = require("jsonwebtoken")
const mysql = require('mysql')
var bcrypt = require('bcrypt');
require('dotenv').config()


var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : process.env.DB_PASS,
	database : 'diet1'
});


router.get('/login',(req,res)=>{
    res.render("login.ejs")
})

router.post('/login',(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    console.log(username)
    var sql = 'SELECT * FROM users WHERE username=?'

    db.query(sql,[username],function(err,user){

        if(err) throw err;
    
        if(user){
            bcrypt.compare(password,user[0].pass,(err,response)=>{
                if(response){
                    const user_data = {user_id:user[0].user_id,username: username,user_type:user[0].user_type}
                    const token=jwt.sign(user_data,process.env.TOKEN_KEY)
                    
                    if(user_data.user_type=='client'){
                        
                        res.redirect(`/client?token=${token}`);
                        //res.cookie('jwtToken', token, { maxAge: 1000, httpOnly: true }).redirect('/client')
                    }
                    else if (user_data.user_type=='employee')
                   
                        res.redirect(`/employee?token=${token}`)
                        //res.cookie('jwtToken', token, { maxAge: 1000, httpOnly: true }).redirect('/employee')
                        
                    //res.header('auth-token',token).send(`Successful login here is your token: ${token}`)
                }
                else res.send("wrong password")
            })
        }
    })
    

    
})

module.exports=router