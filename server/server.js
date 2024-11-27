import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import userRoute from "./routes/UserRoute.js";
import 'dotenv/config'
import todosRoute from "./routes/TodosRoute.js";



const app = express();
const port = 4000;

app.use(express.json())
app.use(cors())
connectDB();

app.use("/api/user",userRoute)
app.use("/api/todos", todosRoute)


app.get("/",(req,res)=>{
    res.send("API Working")
})

//callback function ()=>
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})