const {MongoClient, ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/'

MongoClient.connect(url,(err,client)=>{
    var db = client.db('TodoApp');
    if(err){
        return console.log('Could not connect');
    }
    console.log('Connected Succesfully');

    // db.collection('Todos').find().toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2))
    // },err=>console.log(err));

    // db.collection('Todos').find({completed: false}).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2))
    // },err=> console.log(err));

    // db.collection('Todos').find().count().then((count)=>{console.log(`Todos Count: ${count}`)},err=>console.log(err));

    // db.collection('Users').find({name : 'Aditya'}).toArray().then(
    //     docs => console.log(JSON.stringify(docs,undefined,2)),
    //     err => console.log(err)
    // );
    // db.collection('Users').find({name : 'Aditya'}).count().then(
    //     count => console.log(`Count : ${count}`),
    //     err=> console.log(err)
    // );

    db.collection('Users').remove({name : 'Aditya'});

    client.close();
})
