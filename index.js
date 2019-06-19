var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var utenti = [];


app.use('/static', express.static(__dirname +'/static'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('un utente si è connesso');
	//socket.username = "anon";

	socket.on('set_username', (data) => {
		socket.username = data.username;
		console.log('nuovo username: ' + socket.username);
		utenti.push(socket.username);
		io.emit('messaggio_server', socket.username + ' si è unito/a alla chat!');
		console.log(utenti);
	});

	socket.on('nome_libero', (data) => {
		if(data.username != ""){
			if(utenti.indexOf(data.username) == -1) {
				console.log(utenti.indexOf(data.username));
				socket.emit('libero');
			}
		}
		else socket.emit('occupato');
	});

	socket.on('disconnect', function(){
		if(socket.username != undefined) {
			console.log(socket.username + ' si è disconnesso');
			io.emit('messaggio_server', socket.username + ' si è disconnesso');
			var pos = utenti.indexOf(socket.username);
			var rimosso = utenti.splice(pos, 1);
		}
	});

	socket.on('messaggio', function(msg) {
		console.log(socket.username + ' : ' + msg);
		io.emit('messaggio', socket.username + ' : ' + msg);
	});
});

http.listen(3000, function(){
	console.log('ascolto sulla porta 3000');
});