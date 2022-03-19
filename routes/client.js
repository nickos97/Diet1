const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const jwt = require("jsonwebtoken")
const mysql = require('mysql')
var bcrypt = require('bcrypt');
require('dotenv').config()

router.get('/client',(req,res)=>{
    res.render("client.ejs")
})




module.exports=router