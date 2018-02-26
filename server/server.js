const express= require('express');
var bodyParser = require('body-parser');
var {ObjectID}=require('mongodb');

var {mongoose} = require('./db/mongoose'),
    {Todo} = require('./model/todo'),
    {User} = require('./model/user');

var app = express();
const port = process.env.PORT || 3000;

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
});

app.get('/todos',(req,res)=>{
    Todo.find().then(
        todos=>res.send({todos}),
        err=>res.status(400).send('Something went wrong')
    );
});

app.get('/todo/:id',(req,res)=>{
    var id = req.params.id;

    if(ObjectID.isValid(id)){
        Todo.findById(id).then(
            todo=>{
                if(todo){
                    res.send(todo)
                }
                else{
                    res.status(404).send('Unable to find todo')
                }
            },
            err=>{res.status(400).send('Something went wrong')}
        )
    }
    else{res.status(400).send('ID NOT VALID')}

});

app.get('/user',(req,res)=>{
    User.find().then(
        users=>{res.send({users})},
        err=> res.status(400).send(err)
    )
})


app.listen(port,()=>{
    console.log(`Server is up and running on ${port}`)    
});

module.exports = {app}