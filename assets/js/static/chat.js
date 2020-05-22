$(function () {
	var socket = io();
	var mess = $('#mess');
	var messaggio = $('#messaggio');
	var user = $('#user');
	var chat = $('#chat');
	var chatbox = $('#chatbox');
	var unisciti = $('#unisciti');
	var formunisciti = $('#formunisciti');
	var nome = "";
	
	$('[data-toggle="popover"]').popover();

	function scrollaInBasso(){
		var element = document.getElementById("box");
		element.scrollTop = element.scrollHeight;
	};

	unisciti.on("click", function(e){
		e.preventDefault();
		if(user.val() == "") socket.emit('occupato');
		else socket.emit('nome_libero', {username : user.val()});
	});

	socket.on('libero', function(e){
		socket.emit('set_username', {username : user.val()});
		nome = user.val();
		formunisciti.collapse('hide');
		chatbox.collapse('show');
		unisciti.popover('dispose');
	});

	mess.submit(function(e){
		e.preventDefault();		//evita il reload della pagina dopo il submit
  		socket.emit('messaggio', messaggio.val());
  		messaggio.val('');
		return false;
	});

	socket.on('messaggio', function(user, msg){
		if(user == nome) {
			chat.append('<div class="messaggio"><strong class="nomeutente" style="float: right;">Tu</strong><br>', $('<div class="text-wrap bubble io">').text(msg),'</div><div style="clear:both"></div>');
		}
		else {
			chat.append('<div class="messaggio"><strong class="nomeutente altri">' + user + '</strong><br>', $('<div class="text-wrap bubble altri">').text(msg),'</div><div style="clear:both"></div>');
		}
		scrollaInBasso();
	});

  	socket.on('messaggio_server', function(msg){
    	chat.append($('<span class="text-muted"><br>').text(msg.toUpperCase()), '<br>');
    	scrollaInBasso();
  	});

  	/*
  	$(document).ready(function() {
    	socket.emit('update_title');
	});

  	setInterval(function(){
    	socket.emit('update_title');
	}, 1000);
	*/
});