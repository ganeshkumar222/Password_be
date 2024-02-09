import mongoose from "./index.js"
import dotenv from 'dotenv'
dotenv.config()

let student_schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"name is required"]
    },
    password:{
        type:String,
        required:[true,"name is required"]
    }
},{
    versionKey:false
})

let UserModel = mongoose.model("students",student_schema)

export default UserModel