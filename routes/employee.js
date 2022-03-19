const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const jwt = require("jsonwebtoken")
const mysql = require('mysql')
var bcrypt = require('bcrypt');
require('dotenv').config()

router.get('/employee',(req,res)=>{
    res.render("employee.ejs")
})




module.exports=router