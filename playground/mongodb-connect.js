const {MongoClient, ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/'

MongoClient.connect(url,(err,client)=>{
    var db = client.db('TodoApp');
    if(err){
        return console.log('Could not connect');
    }
    console.log('Connected Succesfully');

    // var result = db.collection('Users').find();
    // console.log(result)

    // db.collection('Todos').insert({
    //     text : 'Call hagrid'
    // },(err,result)=>{
    //     if(err){return console.log('Something went wrong',err)}
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insert({
    //     name : 'Aditya',
    //     age : 21,
    //     location : 'Jaipur'
    // },(err,result)=>{
    //     if (err) {
    //        return console.log(err)
    //     }
    //     console.log(JSON.stringify(result.ops ,undefined,3))
    // })

    client.close();
})
