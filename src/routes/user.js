import express from 'express'
import UserController from '../controller/user.js'
let router = express.Router()

router.post("/createuser",UserController.createstudent)
router.post("/login",UserController.login)
router.post("/forgetpassword",UserController.forgetPasword)
router.get("/getuser/:id",UserController.getuser_by_id)
router.post("/checkpassword",UserController.checkpassword)
router.put("/changepassword",UserController.changepassword)
export default router