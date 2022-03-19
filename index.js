const express = require("express")
var mysql = require('mysql');
const auth = require('./routes/clientauth')
require('dotenv').config()
path = require("path")

const login = require('./routes/login')
const register = require('./routes/register')


const PORT = process.env.PORT || 3000;



var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : process.env.DB_PASS,
	database : 'diet1'
});

db.connect(function(err) {
    if(err) {
        throw err
    }
    console.log("database connected!!!");
});

app = express()
app.use(express.urlencoded({extended: true }))
app.use(express.json())
app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use('/',login);
app.use('/',register);

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server started on port ${PORT}`)
})





posts = [
    {
        username: 'Nikos',
        title:'post1'
    }
]

app.get('/posts', auth, (req,res)=>{
    console.log(req.user.username)
    res.json(posts.filter(post=>post.username===req.user.username))
})