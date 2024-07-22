import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoute.js'
import bakerRouter from './routes/bakerRoute.js'
import productRouter from './routes/productRoute.js'
import 'dotenv/config'


//app config
const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()

//api endpoints
// app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

// app.use("/api/cart",cartRouter)
app.use("/api/user",userRouter);
app.use("/api/baker",bakerRouter);
app.use("/api/product",productRouter);

app.get("/",(req,res)=>{
    res.send("API Working...!!!")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
