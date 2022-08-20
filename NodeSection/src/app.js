const http = require("http");
const requestHandler = require("./routes");

const PORT = 3000;
const HOSTNAME = "localhost";

// Creating the server
const server = http.createServer(requestHandler);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Listening in ${HOSTNAME} on port ${PORT}`);
});


