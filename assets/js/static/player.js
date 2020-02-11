var flag = false;

$(document).ready(function() {
    NowPlaying();
});

function NowPlaying(){
    $.get("titolo", function(data, status) {
    	$("#titolo").text(data);
  	});
};

function playPausa() {

    if(flag) {
    	$("#playpausa").removeClass("fa-pause-circle").addClass("fa-play-circle");
    	audio.pause();
    	flag = false;
    }
	else {
		$("#playpausa").removeClass("fa-play-circle").addClass("fa-pause-circle");
		audio.play();
		flag = true;
	}
};

function checkVideo() {
    $("#divVideo").collapse('toggle');
    $("#playpausa").removeClass("fa-pause-circle").addClass("fa-play-circle");
    audio.pause();
    flag = false;
};

setInterval(function(){
    NowPlaying();
}, 1000);