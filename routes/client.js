const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const jwt = require("jsonwebtoken")
const mysql = require('mysql')
var bcrypt = require('bcrypt');
require('dotenv').config()
const client_auth = require('./auth/clientauth')

router.get('/client',client_auth,(req,res)=>{
    
    if(req.user.user_type!='client') res.send("access denied")
    res.render("client.ejs",{token:req.cookies.jwtToken})
})




module.exports=router