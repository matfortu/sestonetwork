const express = require('express');
const app = express();
const http = require('http').createServer(app);
const titolo = require('http');
const io = require('socket.io')(http);
const lastfm = require('./assets/app/lastfm')
const axios = require("axios");
var compression = require('compression')
var helmet = require('helmet')
const nocache = require('nocache')
var utenti = [];


app.use(compression());

app.use(nocache());

//app.use(helmet());

app.use(express.json());

app.use('/assets', express.static(__dirname +'/assets'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/pwabuilder-sw.js', function(req, res){
	res.sendFile(__dirname + '/pwabuilder-sw.js');
});

app.get('/offline.html', function(req, res){
	res.sendFile(__dirname + '/offline.html');
});

app.get('*', function(req, res){
	res.status(404).sendFile(__dirname + '/notfound.html');
});

io.on('connection', function(socket) {

	socket.on('set_username', (data) => {
		socket.username = data.username;
		utenti.push(socket.username);
		io.emit('messaggio_server', socket.username + ' si è unito/a alla chat! ' + utenti.length + ' utenti in chat.');
	});

	socket.on('nome_libero', (data) => {
		if(data.username != ""){
			if(utenti.indexOf(data.username) == -1) {
				socket.emit('libero');
			}
		}
	});

	socket.on('disconnect', function(){
		if(socket.username != undefined) {
			io.emit('messaggio_server', socket.username + ' si è disconnesso');
			var pos = utenti.indexOf(socket.username);
			var rimosso = utenti.splice(pos, 1);
		}
	});

	socket.on('messaggio', function(msg) {
		io.emit('messaggio', socket.username, msg);
	});
});

app.post('/title', async (req, res) => {

	try {
		const tt = await axios.get('https://stream.sestonetwork.cloud:3012/status-json.xsl')
		const titolo = tt.data.icestats.source.title

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
        const album = info.data.track.album.title

        return res.json({
            immagine,
            album
        })

    } catch(e) {
        return res.status(500)
    }
});

http.listen(3000, function(){
	console.log('ascolto sulla porta 3000');
});
