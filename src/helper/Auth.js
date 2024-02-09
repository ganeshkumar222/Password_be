import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
let SALT = 10

let Hashpassword = async (data)=>{
    let salt = await bcrypt.genSalt(SALT)
    let hash = await bcrypt.hash(data,salt)
    return hash
}
let compare = async (data1,data2)=>{
    return await bcrypt.compare(data1,data2)
}
let generatetoken = async (payload)=>{
    let token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
    return token
}
export default {
    Hashpassword,
    compare,
    generatetoken
}