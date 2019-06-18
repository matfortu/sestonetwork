$(function () {
	var socket = io();
	var mess = $('#mess');
	var messaggio = $('#messaggio');

	mess.submit(function(e){
		e.preventDefault();		//evita il reload della pagina
  	socket.emit('messaggio', messaggio.val());
  	messaggio.val('');
		return false;
	});

	socket.on('messaggio', function(msg){
		$('#chat').append($('<li>').text(msg));
		var element = document.getElementById("box");
		element.scrollIntoView(false);		//tiene la chat allineata all'ultimo messaggio
	});

  socket.on('messaggio_server', function(msg){
    $('#chat').append($('<li class="server">').text(msg));
    var element = document.getElementById("box");
    element.scrollIntoView(false);    //tiene la chat allineata all'ultimo messaggio
  });

	socket.on('anonimo', function(e){
		var nome = prompt("Scegli uno username per iniziare a chattare!");
    socket.emit('cambio_username', {username : nome});
	});

  socket.on('username_occupato', function(e){
    var nome = prompt("Lo username scelto è già in uso, sceglierne un altro.");
    socket.emit('cambio_username', {username : nome});
  });

});