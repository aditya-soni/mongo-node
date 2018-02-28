const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var password = 'imthebest';

var token = jwt.sign(password,'adityasoni');

console.log(token);

console.log(jwt.verify(token,'adityasonsi'))

// var text = "this is a text2";
// var text2 = "this is another text";

// var hash1 = '';
// bcrypt.hash(text,10).then(
//     (hash)=>(
//         bcrypt.compare(text2,hash).then(
//             res=>console.log(res),
//             err=>console.log(err)
//         )
//     ),
//     err=>{console.log(err)}   
// );

// var hash2=bcrypt.hash(text2,10).then(
//     (hash)=>console.log(JSON.stringify(hash)),
//     err=>{console.log(err)} 
// );

