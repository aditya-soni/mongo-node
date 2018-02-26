const express= require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'),
    {Todo} = require('./model/todo'),
    {User} = require('./model/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then(
        doc => res.send(doc),
        err => { res.status(400).send('Something went wrong') }        
    )
});

app.post('/user',(req,res)=>{
    var user = new User({
        email : req.body.email,
        password : req.body.password
    });

    user.save().then(
        doc=> res.send(doc),
        err=> res.status(400).send(err)
    );
})


app.listen(3000,()=>{
    console.log('Listening on 3000')    
})
