import mongoose from "mongoose";


const { Schema , model , models } = mongoose;


const UserSchema = new Schema({

    name : {
        type : String , 
    },
    username : {
        type : String , 
        required : true
    },

    email : {
        type : String , 
        required : true
    },
    profilepic: {type : String } ,
    coverpic: {type : String } , 
    createdAt : {type : Date , default : Date.now},
    updatedAt : {type : Date , default : Date.now},
    razorpayid :{
        type : String,
        // required:true
    },
    razorpaysecret :{
        type : String
    }


})


export default models.User || model('User' , UserSchema);