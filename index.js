import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AppRoutes from './src/routes/index.js'
dotenv.config()
let app = express()
let PORT = process.env.PORT
app.use(express.json())
app.use(cors())
app.use(AppRoutes)

app.listen(PORT,()=>{console.log(`App is listening to ${PORT}`)})