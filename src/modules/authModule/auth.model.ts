import { Schema, model } from 'mongoose';

const userSchema =new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    wishList:{
        type:[],
        default:[]
    },
    saved:{
        type:[],
        default:[]
    }
})

export const User = model('user',userSchema)