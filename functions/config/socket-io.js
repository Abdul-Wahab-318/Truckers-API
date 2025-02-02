let io

exports.socketConnection = (server) => {
  io = require('socket.io')(server , {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  })
  io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('identify' , (userType , userID) => {
        console.log("identifying")
        socket.userID = userID 
        socket.userType = userType

        if ( socket.userType === 'admin' )
        {
            socket.join('admin')
        }
        
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      })

  })
}

exports.emitCancelShipmentEvent = (payload , message) => {
    io.emit("shipment-cancelled" , { data : payload , message })
}

exports.emitDeliverShipmentEvent = (payload , message) => {
    io.emit("shipment-delivered" , { data : payload , message })
}
