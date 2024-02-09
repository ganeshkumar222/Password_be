import UserModel from "../model/user.js";
import dotenv from 'dotenv'
import AUTH from '../helper/Auth.js'
import Helper from  '../helper/mail.js'

dotenv.config()

let createstudent = async (req,res) =>{
    try {
        let student = await UserModel.findOne({email:req.body.email})
        if(!student){
            let password = await AUTH.Hashpassword(req.body.password)
            req.body.password = password
            await UserModel.create(req.body)
            res.status(200).send({
                message:"student created successfully"
            })
        }
        else{
            res.status(400).send({
                message:"user alreaxdy exists"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let login = async (req,res) =>{
    try {
        let student = await UserModel.findOne({email:req.body.email})
        if(student){
            if (await AUTH.compare(req.body.password,student.password)){
                let token = await AUTH.generatetoken({
                    name:student.name,
                    email:student.email
                })
                res.status(200).send({
                    message:"login success",
                    token,
                    name:student.name,
                    email:student.email,
                    id:student._id

                })
            }
            else{
                res.status(400).send({
                    message:"invalid password"
                })
            }
        }
        else{
            res.status(400).send({
                message:"Invalid mail id"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let forgetPasword = async (req,res) =>{
    try {
       
        let student = await UserModel.findOne({email:req.body.email})
        if(student){
              let temp = await Helper.sendemail(student.email,student._id)
              student.password = temp
              await student.save()
              res.status(200).send({
                message:"email has been sent successfully"
              })
        }
        else{
            res.status(400).send({
                message:"Invalid emailId"
            })
                }
        
    } catch (error) {
        res.status(500).send("internal server error")
    }
}
let getuser_by_id = async (req,res) =>{
    try {
        
        let id = req.params.id
        let data = await UserModel.findOne({_id:id})
        res.status(200).send({
            message:"user fetched successfully",
            data
        })
        
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
           
        
    }
}
let checkpassword = async (req,res) => {
    try {
        
        let student = await UserModel.findOne({_id:req.body.id})
        if(student.password===req.body.password){
            res.status(200).send({
                message:"passwords matched"
            })
        }
        else{
            res.status(400).send({
                message:"invalid matcher"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let changepassword = async (req,res)=> {
    try {
        let student = await UserModel.findOne({_id:req.body.id})
        let password = await  AUTH.Hashpassword(req.body.password)
        student.password = password
        await student.save()
        res.status(200).send({
            message:"password changed successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}

export default {
    createstudent,
    login,
    forgetPasword,
    getuser_by_id,
    checkpassword,
    changepassword
}