const http = require('http');
const abap = require('@abaplint/runtime');
const commands = require('./build/ztest_run.prog');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
	// Set a response type of plain text for the response
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	
	commands.write();

	// Send back a response and end the connection
	res.end(abap.Console.get());
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');
