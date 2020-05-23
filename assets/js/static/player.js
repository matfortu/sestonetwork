var flag = false;
let titoloCorrente = "";
var disco = "";

$(document).ready(function() {
    $.post("title", function(data, status) {
        titoloCorrente = data.titolo;
        $("#titolo").text(titoloCorrente);
        getAlbumArt(titoloCorrente);
    });
});

function NowPlaying(){
    let titoloNuovo = "";
    $.post("title", function(data, status) {
        titoloNuovo = data.titolo;
        if(titoloCorrente != titoloNuovo) {
            console.log(titoloCorrente + " -> " + titoloNuovo);
            titoloCorrente = titoloNuovo;
            getAlbumArt(titoloCorrente);
            $("#titolo").text(titoloCorrente);
        }
    });
    setMetadata(titoloNuovo);
};

function getAlbumArt(titolo){
    var dati = titolo.split(" - ");
    if(dati[0] == 'SestoNetwork') {
        setMetadata(dati[0], dati[1], "assets/img/static/logo_np.jpg", "", "image/jpg")
    }
    else {
        $.ajax({
            type: "POST",
            url: "albumart",
            data: JSON.stringify({artist: dati[0], track: dati[1]}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.immagine["#text"] == '') {
                    $( "#cover" ).attr( "src", "assets/img/static/disc.png" );
                    setMetadata(dati[0], dati[1], "assets/img/static/disc.jpg", disco, "image/jpg");
                }
                else {
                	disco = data.album;
                    $( "#cover" ).attr( "src", data.immagine["#text"]);
                    setMetadata(dati[0], dati[1], data.immagine["#text"], disco, "image/png");
                }
            },
            failure: function(errMsg) {
                console.log("error");
                $( "#cover" ).attr( "src", "assets/img/static/disc.jpg", "image/jpg");
            }
        });
    }
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

function setMetadata(artista, brano, immagine, disco, tipo) {
	if ("mediaSession" in navigator) {
		try {
			navigator.mediaSession.metadata = new MediaMetadata({
			    title: brano,
			    artist: artista,
			    album: disco,
			    artwork: [{ src: immagine, sizes: "300x300", type: tipo}]
			});
		}
		catch(err) {
		}
	}
}

function SetVolume(val) {
    audio.volume = val / 100;
};

function checkVideo() {
	var options = {width: 854, height: 480, channel: "sestonetwork", layout: "video"};
	var embed = new Twitch.Embed("twitch", options);
    $("#divVideo").collapse('toggle');
    $("#playpausa").removeClass("fa-pause-circle").addClass("fa-play-circle");
    audio.pause();
    flag = false;
};

setInterval(function(){
    NowPlaying();
}, 5000);
