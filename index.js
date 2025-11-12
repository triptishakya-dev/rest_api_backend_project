import express from "express"
import userRoute from "./routes/userRoutes.js"


const app = express()

const PORT = 3000

app.use("/" , userRoute)

app.get("/test" , (req, res) => {
    res.send("hello word")
})

app.listen(PORT, ()=>{
    console.log("my server is listening")
})
 