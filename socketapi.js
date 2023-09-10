const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var liveusersids = [];
var liveusersnames = [];

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected" );
    liveusersids.push(socket.id)

    socket.on("sendname",function(data){
        liveusersnames.push(data)
        io.emit("sendname",liveusersnames)
    })

    socket.on("msg",function(data){
        socket.broadcast.emit("msg",data)
    })
    io.emit("live",liveusersids.length)

    
    socket.on("disconnect",function(data){
        liveusersids.splice(liveusersids.indexOf(socket.id))
        io.emit("non-live",liveusersids.length)
    })
});

module.exports = socketapi;