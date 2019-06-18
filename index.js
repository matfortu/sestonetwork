var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var utenti = ['anon'];


app.use('/static', express.static(__dirname +'/static'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('un utente si è connesso');
	socket.username = "anon";

	socket.on('cambio_username', (data) => {
		if(data.username != null){
			if(utenti.indexOf(data.username) == -1) {
				socket.username = data.username;
				console.log('nuovo username: ' + socket.username);
				utenti.push(socket.username);
				io.emit('messaggio_server', socket.username + ' si è unito/a alla chat!');
			}
			else socket.emit('username_occupato');
		}
	});

	socket.on('disconnect', function(){
		console.log(socket.username + ' si è disconnesso');
		io.emit('messaggio_server', socket.username + ' si è disconnesso');
		var pos = utenti.indexOf(socket.username);
		var rimosso = utenti.splice(pos, 1);
	});

	socket.on('messaggio', function(msg) {
		if(socket.username != 'anon' && socket.username != null) {
			console.log(socket.username + ' : ' + msg);
			io.emit('messaggio', socket.username + ' : ' + msg);
		}
		else {
			console.log('un utente anonimo sta provando a scrivere in chat');
			socket.emit('anonimo');
		}
	});
});

http.listen(3000, function(){
	console.log('ascolto sulla porta 3000');
});