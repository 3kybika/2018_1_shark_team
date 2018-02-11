const fs = require('fs');
const path = require('path');
const http = require('http');

const routes = [
    '/',
    '/signin.html',
    '/signup.html',
    '/game.html',
    '/about.html',
    '/score.html',
	'/nopage.html'
];

const server = http.createServer((request, res) => {

	console.log("Url: " + request.url);
	console.log("Тип запроса: " + request.method);
	console.log("User-Agent: " + request.headers["user-agent"]);
	console.log("Все заголовки");
	console.log(request.headers);
	
	const filename = request.url === '/' ? 'index.html' : request.url;
	
	console.log(routes.indexOf(filename));
	
	/*if (routes.indexOf(filename) < 0){
		res.writeHead(404);
		filename = '/nopage';
	}*/
	
	console.log(filename);
	
	fs.readFile(path.join(__dirname, 'static', filename ), (err, data) => {
	if (err) {
		res.writeHead(404);
		res.end();
		return;
	}
	
	res.write(data);
	res.end();
	});
});

const port = process.env.PORT || 8081;

server.listen(port);
console.log(`Server start on port ${port}`);