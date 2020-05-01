const express = require('express');
const app = express();
const http = require('http').createServer(app);
const titolo = require('http');
const io = require('socket.io')(http);
const lastfm = require('./assets/app/lastfm')
const axios = require("axios");
var utenti = [];

require('dotenv').config();

app.use(express.json());

app.use('/assets', express.static(__dirname +'/assets'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('*', function(req, res){
	res.status(404).sendFile(__dirname + '/notfound.html');
});

io.on('connection', function(socket) {
	//console.log('un utente si è connesso');

	socket.on('set_username', (data) => {
		socket.username = data.username;
		console.log('nuovo username: ' + socket.username);
		utenti.push(socket.username);
		io.emit('messaggio_server', socket.username + ' si è unito/a alla chat! ' + utenti.length + ' utenti in chat.');
		console.log(utenti);
	});

	socket.on('nome_libero', (data) => {
		if(data.username != ""){
			if(utenti.indexOf(data.username) == -1) {
				console.log(utenti.indexOf(data.username));
				socket.emit('libero');
			}
		}
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
		io.emit('messaggio', socket.username, msg);
	});
});

app.post('/title', async (req, res) => {

	try {
		const tt = await axios.get('http://sestonetwork.cloud:3012/currentsong?sid=1')
		const titolo = tt.data

        return res.json({
            titolo
        })

    } catch(e) {
        return res.status(500)
    }
});

app.post('/albumart', async (req, res) => {
    const { 
        artist, 
        track 
    } = req.body

    try {
        const info = await lastfm.getInfo(artist, track)
        const immagine = info.data.track.album.image[3]

        return res.json({
            immagine
        })

    } catch(e) {
        return res.status(500)
    }
});

http.listen(3000, function(){
	console.log('ascolto sulla porta 3000');
});