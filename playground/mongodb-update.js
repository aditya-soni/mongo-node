const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    var db = client.db('TodoApp');
    if(err){console.log(err)};
    
    // db.collection('Todos').findOneAndUpdate(
    //     {_id : new ObjectID('5a92b260fabfc1167763146e')},
    //     {
    //         $set : {
    //             completed : true
    //         }
    //     },
    //     {
    //         returnOriginal : false
    //     }
    // ).then(result=>{console.log(result)})

    db.collection('Users').findOneAndUpdate(
        {_id : new ObjectID('5a92c594fabfc116776317a1')},
        {
            $set : {
                name : 'Aditya'
            },
            $inc : {
                age: 1
            }
        },
        {
            returnOriginal: false
        }
    ).then(result=>console.log(result))

    client.close();

})