const express=require("express")
// require("dotenv").config()
const {connection}=require("./db")
const { auth } = require("./middlewares/auth.middleware")
// const {auth}=require("./middlewares/auth.middleware")
const { postRouter } = require("./routes/post.routes")
const { userRouter } = require("./routes/users.routes")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)
app.listen(4500,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (err) {
        console.log(err)
    }
    console.log(`App is running at`)
})


// {
//     "name":"mustaq",
//     "email":"mustaq1@gmail.com",
//     "gender":"male",
//     "password":"mustaq",
//     "age":22,
//     "city":"nanded",
//     "is_married":false
// }

// {
//     "title":"mustaq4@gmail.com",
//     "body":"mustaq",
//     "device":"Tablet",
//     "no_of_comments":4

// }