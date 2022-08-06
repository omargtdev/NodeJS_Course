const express = require("express");

const PORT = 3000;
const HOST = "localhost";


const pages = ['/', '/users'];

// Creating server
const app = express();

// Middlewares

app.use((req, res, next) => {
	console.log("Main middleware");
	const isExistPage = pages.includes(req.url);
	return isExistPage 
		? next() 
		: res.send('<h1>Page not found</h1>');
}); // Main middleware ('/')

app.use('/users', (req, res, next) => {
	console.log('users middleware');	
	res.send('<h1>Welcome to users page!</h1>')
}); // Users middleware ('/users')

app.use('/', (req, res, next) => {
	console.log('home middleware');	
	res.send('<h1>Welcome to main page</h1>');
}); // Home middleware ('/')


// Listen the server
app.listen(PORT, HOST, () =>
  console.log(`Server called ${HOST} listen on port ${PORT}`)
);
