const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const jwt = require("jsonwebtoken")
var bcrypt = require('bcrypt');
const mysql=require('mysql')
const { check, validationResult } = require('express-validator');
require('dotenv').config()

var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : process.env.DB_PASS,
	database : 'diet1'
});

router.get("/emp_register",(req,res)=>{
    res.render("employee_register.ejs")
})

router.post('/emp_register', [
    check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,)
  ] ,(req,res)=>{

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var repass = req.body.rep_password;
	role = 'employee' //static
    const errors = validationResult(req)    

    if(errors.isEmpty() && repass==password) {
        db.query("select username from users where username=?",[username],function(error,results){
            if(results.length>0){
                res.send("This username already exists");
            }
        
            else {
            var sql1="INSERT INTO users (username, pass,email, user_type) VALUES (?,?,?,?)";
            bcrypt.hash(password,10,(err, hash)=> {
                db.query(sql1,[username,hash,email,role],function(error, results){
                    if(error) throw error;  
					
						console.log("1 record inserted");
                    	res.redirect('/login');
                
                    })
            });
            }
        })
            
    }
    else if(repass!=password){
        
        res.send("Please insert the same password");
    }
	else res.send("Not secure password!!")
    })

module.exports=router