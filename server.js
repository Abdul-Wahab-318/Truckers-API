const express = require("express")
let app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server , {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      methods: ['GET', 'POST' , 'PUT'],
      credentials: true,
    }
});

//CONNECT TO DATABASE
let connectDb = require("./config/connectDB")
connectDb()


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


io.on('connection', (socket) => {

    console.log('a user connected ' + socket.id);
    socket.on('identify' , (userType , userID) => {
        console.log("identifying")
        socket.userID = userID 
        socket.userType = userType

        if ( socket.userType === 'admin' )
        {
            console.log('dude is an admin')
            socket.join('admin')

        }
        
    })

    socket.emit('shipment-status-change' , {} )

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });

});

module.exports = io;

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