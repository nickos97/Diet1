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

    var sql = 'SELECT * FROM users WHERE username=?'

    db.query(sql,[username],function(err,user){

        if(err) throw err;

        if(user){
            bcrypt.compare(password,user[0].password,(err,response)=>{
                if(response){
                    const user_data = {user_id:user[0].user_id,username: username,role:user[0].role}
                    const Token=jwt.sign(user_data,process.env.TOKEN_KEY)
                    res.header('auth-token',Token).send(`Successful login here is your token: ${Token}`)
                }
            })
        }
    })
    

    
})

module.exports=router