const path = require("path");
const fs = require("fs");

const pagesDir = path.join(__dirname, 'pages');

const requestHandler = (req, res) => {
	const { url, method } = req;
	
	if(method === 'GET'){
		// Send a respond
		res.setHeader("Content-Type", "text/html");
		return getPageToShow(req.url, result => {
			fs.readFile(`${pagesDir}/${result}`, { encoding : 'utf-8' }, (err, data) => {
				if(err) return err;
				res.write(data);
				return res.end();
			});
		}); 
	}

	if(method === 'POST' && url === '/say-hi'){
		const body = [];
		req.on('data', chunk => {
			// Get all data (chunks)
			body.push(chunk);
		})

		return req.on('end', () => {
			// When all data is ready, we can convert and work with them
			const parsedBody = Buffer.concat(body).toString('utf-8');
			const values = parseToObject(parsedBody.split('&'));
			values.time = new Date().toDateString();
			// Save message in a file
			fs.writeFile('messages.txt', parseToMessage(values), { flag : 'a' }, (err) => {
				if(err) return err;

				res.writeHead(302, {
					'Location' : '/' // Set the location to redirect when post is completed
				})
				return res.end();
			});
		});
	}
}

function getPageToShow(url, cb){
	if(url === '/'){
		return cb('index.html');
	}

	let pageSelected = url.substring(1);
	fs.readdir(pagesDir, (err, files) => {
		if(err) return err;
		let pageFound = files.find(file => file.substring(0, file.lastIndexOf('.')) === pageSelected);	
		
		if(pageFound){
			pageSelected = pageFound;
		}else{
			pageSelected = '404.html';
		}

		return cb(pageSelected);
	});
}

function parseToObject(values){
	const obj = {}
	values.forEach(value => {
		const splitValue = value.split("="); // prop=value
		obj[splitValue[0]] = splitValue[1]
	});	
	
	return obj;
}

function parseToMessage(obj){
	let message = '\n';
	for(let prop in obj){
		message += `${prop} : ${obj[prop]}\n`
	}

	return message;
}

module.exports = requestHandler;

