import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
let transporter = nodemailer.createTransport({
    service:"gmail",
   
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})

let sendemail = async (email,id)=>{
    let char  = "abcdefghijklmnopqrstuvwxyz"
    let number1 = (Math.floor(Math.random()*10+1))
    let number2 = (Math.floor(Math.random()*16+11))
    let substring = char.substring(number1,number2)
    let link = `https://password-fe-five.vercel.app/change/${id}/${substring}`
    let mailoptions = {
        from:process.env.EMAIL,
        to:email,
        subject:"password recovery email",
        html:` <h5>Dear user,</h5>
        &nbsp;&nbsp;You have requested for password recory email.click the following link and complete the form to reset your password. <br><br>
        link:<a href=${link} target="_blank">change_password</a><br><br>
    
        Thanks,<br>
        Management`
    }

    await transporter.sendMail(mailoptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return substring
}

export default {
    sendemail
}