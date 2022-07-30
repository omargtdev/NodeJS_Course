const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const handleRequests = (req, res) => {
	const { url, method } = req;

	if(method === 'GET'){
		let page = '';

		res.setHeader('Content-Type', 'text/html');

		switch(url) {
			case '/':
				page = `${pagesDir}/index.html`;
				break;
			case '/users':
				// Rendering users, it should be in the front, but
				// for now it's ok. I think XD
				return readUsers((err, users) => {
					if(err) return console.log(err);

					let usersParsed = '';
					users.forEach(({ userId, username })=> {
						usersParsed += `
						<li>ID: ${userId} - Username: ${username}</li>
						`;
					})

					/* BASI SINTAX HTML */
					res.write('<!DOCTYPE html>');
					res.write('<html lang="en">');
					res.write('<head>');
					res.write('<meta charset="UTF-8">');
					res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
					res.write('<title>Users</title>');
					res.write('</head>');
					res.write('<body>');
					res.write('<h1>Users</h1>');
					res.write('<ul>');
					res.write(usersParsed);
					res.write('</ul>');
					res.write('</body>');
					res.write('</html>');

					return res.end();
				});
			default:
				page = `${pagesDir}/404.html`;
		}

		// Render information
		return fs.readFile(page,  (err, data) => {
			if (err) return console.log(err);
			res.write(data);
			return res.end();
		});
	}

	if(method === 'POST'){
		switch(url){
			case '/create-user':
				const body = [];
				req.on('data', (chunk) => { // Get the data
					body.push(chunk);	
				});

				return req.on('end', () => {
					// Parse data to store in a json
					const newUser = parseToObject(Buffer.concat(body).toString());

					// Read json
					readUsers((err, users) => {
						if(err) return console.log(err);

						users.push(newUser);

						// Write data in to json
						fs.writeFile('users.json', JSON.stringify(users), (err) => {
							if(err) return console.log(err);
								
							res.writeHead(302, 'Nice username!', {
								'Location' : '/'
							})	
							return res.end();
						})
					})
				})
			default:
				return console.log('something was happen');
		}	
	}

}

function parseToObject(data){
	const obj = {}
	const values = data.split('&');
	values.forEach(value => {
		const splitValue = value.split("="); // prop=value
		if(splitValue[0] === 'userId'){
			obj[splitValue[0]] = parseInt(splitValue[1]);
			return;	
		}	
		obj[splitValue[0]] = splitValue[1]
	});	
	
	return obj;
}

function readUsers(callback){
	fs.readFile('users.json', { enconding: 'utf-8' }, (err, data) => {
		if(err) return callback(err, null);
		const users = JSON.parse(data);	
		return callback(null, users);
	});
}

module.exports = handleRequests;
