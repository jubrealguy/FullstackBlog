const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const User = require('./models/user.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'gsgsgsgsgsgsg'

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())

mongoose.connect('mongodb+srv://jubrealguy:W5yqdHjikXIcEr57@cluster0.b1cxjrb.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const {username,password} = req.body;
    try {
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt),
        })
        res.json(userDoc);
    }
    catch(e) {
        res.status(404).json(e);
    }
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const userDoc = await User.findOne({username})
    const passOk = bcrypt.compareSync(password, 
        userDoc.password)
    if (passOk) {
        //loggedin
        jwt.sign({username,id:userDoc._id}, secret, {}, (err, token)=> {
            if (err) throw err;
            res.cookie('token', token).json({
                id:userDoc._id,
                username,
            })
        })
        //res.json()
    }
    else {
        res.status(400).json('wrong credentials')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(5000);

//W5yqdHjikXIcEr57
//mongodb+srv://jubrealguy:W5yqdHjikXIcEr57@cluster0.d8c5bvo.mongodb.net/?retryWrites=true&w=majority