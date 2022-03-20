const express = require("express")
var mysql = require('mysql');
const auth = require('./routes/auth/employeeauth')
require('dotenv').config()
path = require("path")
var cookieParser = require('cookie-parser')


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
app.use(cookieParser())
app.use(express.urlencoded({extended: true }))
app.use(express.json())
app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.use('/',require('./routes/login'));
app.use('/',require('./routes/client_register'));
app.use('/',require('./routes/employee_register'));
app.use('/',require('./routes/client'));
app.use('/',require('./routes/employee'));

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