var day = new Date();
var days = ["#domenica", "#lunedi", "#martedi", "#mercoledi", "#giovedi", "#venerdi", "#sabato"];
var daysr = ["#domenica-r", "#lunedi-r", "#martedi-r", "#mercoledi-r", "#giovedi-r", "#venerdi-r", "#sabato-r"];
var time = day.getHours().toString().padStart(2, '0') + day.getMinutes().toString().padStart(2, '0');
var inonda = "Rotazione Musicale";
var updateInOnda = setInterval(inOnda, 300000);

$( document ).ready(function() {
    inOnda();
    $("#lunedi").removeClass('active');
    $("#lunedi-r").removeClass('active');
    $(days[day.getDay()]).addClass('active');
    $(daysr[day.getDay()]).addClass('active');
});

const shareData = {
  title: 'SestoNetwork',
  text: 'Ascolta SestoNetwork!',
  url: 'https://sestonetwork.cloud',
}

function condividi(){
    if (navigator.share) {
        navigator.share({
            title: 'SestoNetwork',
            text: 'Ascolta SestoNetwork!',
            url: 'https://sestonetwork.cloud/',
        })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
    }
};


function inOnda(){
    switch(day.getDay()) {
        case 0:
            break;
        case 1:
        	if(time >= 0000 && time <= 0100) {
                inonda = "Black-Xtasy";
            }
        	else if(time >= 1030 && time <= 1100) {
                inonda = "Logiche e Brioches";
            }
            else if(time >= 2000 && time <= 2100) {
                inonda = "Fracasso GeniAle";
            }
            /*
            else if(time >= 2230) {
                inonda = "La Siesta di Notte";
            }
            */
            break;
        case 2:
        	if(time >= 1030 && time < 1130) {
                inonda = "BiblioBoom";
            }
            break;
        case 3:
            if(time >= 1030 && time <= 1100) {
                inonda = "Logiche e Brioches";
            }
            else if(time >= 1500 && time <= 1600) {
                inonda = "Collezione di Pozzanghere";
            }
            /*
            else if(time >= 2100 && time <= 2200) {
                inonda = "Il Salotto del TBG";
            }
            */
            break;
        case 4:
        	if(time >= 1030 && time <= 1130) {
                inonda = "BiblioBoom";
            }
        	else if(time >= 1800 && time <= 1900) {
                inonda = "Talk'n'Shoot";
            }
            else if(time >= 1900 && time <= 2000) {
                inonda = "Karesansui";
            }
            else if(time >= 2100 && time <= 2200) {
                inonda = "Radiofonica Live Museum";
            }
            break;
        case 5:
        	if(time >= 0000 && time <= 0100) {
                inonda = "Black-Xtasy";
            }
            else if(time >= 1030 && time <= 1130) {
                inonda = "BiblioBoom";
            }
            else if(time >= 1900 && time <= 2000) {
                inonda = "Mazzate...e basta!";
            }
            else if(time >= 2000 && time <= 2100) {
                inonda = "Science Shots";
            }
            else if(time >= 2100 && time <= 2200) {
                inonda = "Notturno Poetilico";
            }
            break;
        case 6:
            break;
    }

    $( live ).text(inonda);
};

$( ".prog" ).each(function( index ) {
    var ora = $( this ).children(".ora").text();
    $( this ).children(".ora").remove();
    var modale = $( this ).children(".modale").text();
    $( this ).children(".modale").remove();
    var nome = $( this ).children(".nome").text();
    $( this ).children(".titolo").remove();
    var conduttore = $( this ).children(".conduttore").text();
    $( this ).children(".conduttore").remove();
    var final = "<div class='row' style='font-family: Amiko, sans-serif;padding-top: 10px;padding-bottom: 10px;'><div class='col align-self-center'><span style='font-family: Amiko, sans-serif;'><strong>" + ora + "</strong></span></div><div class='col align-self-center'><span class='programma' style='font-family: Amiko, sans-serif;' data-toggle='modal' data-target='#" + modale + "'>" + nome + "</span></div><div class='col align-self-center'><span style='font-family: Amiko, sans-serif;'>" + conduttore + "</span></div></div><hr style='margin-top: 8px;margin-bottom: 8px;'>";
    $( this ).replaceWith(final);
});

$( ".progmod" ).each(function( index ) {
    var modid = $( this ).children(".modid").text();
    $( this ).children(".modid").remove();
    var modtitolo = $( this ).children(".modtitolo").text();
    $( this ).children(".modale").remove();
    var modimm = $( this ).children(".modimm").text();
    $( this ).children(".modimm").remove();
    var moddescr = $( this ).children(".moddescr").text();
    $( this ).children(".moddescr").remove();
    var modfinal = '<div class="modal fade" role="dialog" tabindex="-1" id="' + modid + '"><div class="modal-dialog modal-lg modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header" style="font-family: Amiko, sans-serif;"><h4 class="modal-title" style="font-family: Amiko, sans-serif;">' + modtitolo + '</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><div class="row"><div class="col-md-5"><img style="max-width: 300px;" class="img-fluid" src="' + modimm + '" loading="lazy" /></div><div class="col-md-7 align-self-center"><p style="font-family: Amiko, sans-serif;"><br/>' + moddescr + '<br/><br/></p></div></div></div></div></div></div>';
    $( this ).replaceWith(modfinal);
});