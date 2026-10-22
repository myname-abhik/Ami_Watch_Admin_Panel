const mongoose = require('mongoose')
exports.Create_Schema = ()=>{
const UserSchema = new mongoose.Schema({
    Movie_poster: {
        type: String,
        default: ''
    },
    Movie_title:{
        type: String,
        required: true
    },
    Movie_feature:{
        type: String,
        default: ''
    },
   
    
},{timestamps:true})
exports.Movie_pickup = mongoose.model("Movie_pickup",UserSchema)
// console.log("hello world");

}


