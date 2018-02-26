const {ObjectID}=require('mongodb');

const {mongoose}=require('../server/db/mongoose');
const {Todo}=require('../server/model/todo');
const {User}=require('../server/model/user');

var id = '5a94484301a55d5b8a5329b21';

if(!ObjectID.isValid(id)){
   return console.log('ID not valid')
}

// Todo.findById(id)
//     .then(
//         todo=>{console.log(todo)}
//     )
//     .catch(
//         err=>console.log(err)
//     );

User.findById(id).then(
    user=>console.log(user),
    err => console.log(err)
)