const express = require("express")
let app = express()

//CONNECT TO DATABASE
let connectDb = require("./config/connectDB")
connectDb()

//CLOUDINARY CONFIG 
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'lorem', 
    api_key: 'lorem', 
    api_secret: 'lorem' 
  });

//COOKIE PARSER
let cookieParser = require("cookie-parser")
app.use(cookieParser())

//USE CORS
let cors = require("cors")
app.use(cors({
    origin:['http://localhost:3001' , 'http://localhost:3000' ] ,
    credentials: true
}))

var bodyParser = require('body-parser')
app.use(bodyParser({limit : '20mb'}))

//JSON MIDDLEWARE
app.use(express.json())

//LISTEN AT PORT
const PORT = process.env.PORT || 8000
app.listen(PORT , console.log(`server running on ${PORT}`))


//USER ROUTE
let userRoute = require("./routes/userRoute")
app.use("/user" , userRoute )

let shipmentRoute = require("./routes/shipmentRoute")
app.use("/shipment" , shipmentRoute)