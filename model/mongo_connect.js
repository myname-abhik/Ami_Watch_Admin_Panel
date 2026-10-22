const mongoose = require('mongoose');
exports.mongo_connect =()=>{
    mongoose.connect(`${process.env.MONGODB_}`)
    .then(()=>{
        console.log('MongoDB Connected...');
    })
    .catch(err=>console.log(err));
}
// console.log("hello world");
