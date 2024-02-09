import express from 'express'
import IndexController from '../controller/index.js'
import UserRoutes from "./user.js"
let router = express.Router()
router.get("/",IndexController.homePage)
router.use("/user",UserRoutes)
export default router