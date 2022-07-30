const http = require('http');
const handleRequests = require('./routes');

// Server information
const port = 3000;
const hostname = 'localhost';

// Creating the server
const server = http.createServer(handleRequests);

// Open the server
server.listen(port, hostname, () => {
	console.log(`Server listen in ${hostname} on ${port}`);
})
