const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const jwt = require("jsonwebtoken")
const mysql = require('mysql')
var bcrypt = require('bcrypt');
require('dotenv').config()
const employeeauth = require('./auth/employeeauth')


router.get('/employee',employeeauth,(req,res)=>{
    if(req.user.user_type!='employee') res.send("access denied")
    res.render("employee.ejs")
})




module.exports=router