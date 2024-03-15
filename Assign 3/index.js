const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const productRouter = require("./router/products.router")

const userRouter = require("./router/user.router")

app.get('/', (req, res) => {
    res.status(200)
    res.send({
        status: 'Welcome to App'
    })
})
app.use(express.static("uploads"))
app.use(bodyParser.json())

app.use("/api/products", productRouter)

app.use("/api/users",userRouter)


app.listen(5001, () => { console.log('Server is upon port No:5001') })

mongoose.connect("mongodb+srv://tejaswinidev0:Teju%402003@cluster0.myd2ihb.mongodb.net/Ecom").then((res) => {
    console.log("connected to the database")
}).catch((error) => {
    console.log("unable to connect to the database")
})