import express from "express"
import userRoute from "./routes/userRoutes.js"


const app = express()

// Middleware to parse JSON request bodies
app.use(express.json())

const PORT = 3000

// Register routes BEFORE app.listen()
app.use("/" , userRoute)

app.get("/test" , (req, res) => {
    res.send("hello word")
})

app.listen(PORT, ()=>{
    console.log("my server is listening")
})