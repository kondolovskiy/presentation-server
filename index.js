var WebSocketServer = new require('ws');

var clients = {};

var webSocketServer = new WebSocketServer.Server({
	port: 3001
});
webSocketServer.on('connection', function(ws) {

	var id = Math.random();
	clients[id] = ws;
	console.log("new connection " + id);

	ws.on('message', function(message) {
		console.log('got message ' + message);

		for (var key in clients) {
			clients[key].send(message);
		}
	});

	ws.on('close', function() {
		console.log('connection is closed ' + id);
		delete clients[id];
	});

});