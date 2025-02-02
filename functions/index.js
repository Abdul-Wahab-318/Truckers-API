const express = require("express")
let app = express()
const http = require('http');
const functions =  require("firebase-functions")
const server = http.createServer(app);


// const io = new Server(server , {
//     cors: {
//       origin: ['http://localhost:3000', 'http://localhost:3001'],
//       methods: ['GET', 'POST' , 'PUT'],
//       credentials: true,
//     }
// });

const { socketConnection } = require("./config/socket-io")
socketConnection(server)

//CONNECT TO DATABASE
let connectDb = require("./config/connectDB")
connectDb()


//COOKIE PARSER
let cookieParser = require("cookie-parser")
app.use(cookieParser())

//USE CORS
let cors = require("cors")
app.use(cors({
    origin : ['https://truckers-awm.netlify.app'],
    credentials: true
}))

var bodyParser = require('body-parser')
app.use(bodyParser({limit : '20mb'}))

//JSON MIDDLEWARE
app.use(express.json())


//LISTEN AT PORT
const PORT = process.env.PORT || 8000
server.listen(PORT , console.log(`server running on ${PORT}`))

//USER ROUTE
let userRoute = require("./routes/userRoute")
app.use("/user" , userRoute )

let shipmentRoute = require("./routes/shipmentRoute")
app.use("/shipment" , shipmentRoute)

let vehicleRoute = require("./routes/VehicleRoute")
app.use("/vehicle" , vehicleRoute )

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

exports.app = functions.https.onRequest(app)
