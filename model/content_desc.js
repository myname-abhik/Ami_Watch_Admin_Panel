const mongoose = require('mongoose')
exports.Create_Schema = ()=>{
const UserSchema = new mongoose.Schema({
    Poster: {
        type: String,
        default: ''
    },
    Movie:{
        type: String,
        required: true
    },
    Features:{
        type: [String],
        default: []
    },
    Genres:{
        type: [String],
        default: []
    },
    Description:{
        type: String,
        default: ''
    },
    Dir:{
        type: String,
        default: ''
    },
    Cast:{
        type: [String],
        default: []
    },
    Language:{
        type: String,
        default: ''
    },
    Year:{
        type: String,
        default: ''
    },
    Rating:{
        type: String,
        default: ''
    },
    Age:{
        type: String,
        default: ''
    },
    Image:{
        type: String,
        default: ''
    },
    Video:{
        type: String,
        default: ''
    },
    
},{timestamps:true})
exports.Content = mongoose.model("Content",UserSchema)
// console.log("hello world");

}


