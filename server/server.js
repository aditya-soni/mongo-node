const express= require('express');
const bodyParser = require('body-parser');
const {ObjectID}=require('mongodb');
const _ = require('lodash')

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
});

app.delete('/todo/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID is not valid')
    }

    Todo.findByIdAndRemove(id).then(
        todo=>{
            if(!todo){
                return res.status(404).send('No todo found')
            }
            console.log(todo);res.send('Removed');
        },
        err=> console.log(err)
    );

});

app.patch('/todos/:id',(req,res)=>{
    var id  = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(400).send('ID is not valid')
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completed_On = new Date().getTime();

    }else{
        body.completed_On = null;
        body.completed = false
    };

    Todo.findByIdAndUpdate(id,{$set : body},{new: true}).then(
        todo=>{
            if(!todo){
                return res.status(404).send('Unable to find todo')
            }
            console.log(todo)
        },
        err=>{console.log(err)}
    )

})


app.listen(port,()=>{
    console.log(`Server is up and running on ${port}`)    
});

module.exports = {app}