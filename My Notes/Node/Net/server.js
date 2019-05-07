var net = require('net');
var server = net.createServer((connection) => {
    console.log("client connected");
    connection.on("end", function(){
        console.log("connection close");
    });
    connection.write("hello world \r\n")
    connection.pipe(connection);
});

server.listen(8080, () => {
    console.log("server running");
})

