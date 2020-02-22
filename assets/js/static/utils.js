var day = new Date();
var days = ["#lunedi", "#lunedi", "#martedi", "#mercoledi", "#giovedi", "#venerdi", "#lunedi"];
var time = day.getHours().toString().padStart(2, '0') + day.getMinutes().toString().padStart(2, '0');
var inonda = "Rotazione Musicale";
var updateInOnda = setInterval(inOnda, 300000);

$( document ).ready(function() {
    inOnda();
    if(day.getDay() > 1 || day.getDay() < 5) {
        $("#lunedi").removeClass('active');
        $(days[day.getDay()]).addClass('active');
    }
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
        	else if(time >= 1900 && time <= 2000) {
                inonda = "Prof's Strange Bag";
            }
            else if(time >= 2000 && time <= 2100) {
                inonda = "Fracasso GeniAle";
            }
            else if(time >= 2230) {
                inonda = "La Siesta di Notte";
            }
            break;
        case 2:
        	if(time >= 1000 && time < 1100) {
                inonda = "Buongiorno Vanessa";
            }
            break;
        case 3:
            if(time >= 1830 && time <= 1930) {
                inonda = "Talk'n'Shoot";
            }
            else if(time >= 2000 && time <= 2100) {
                inonda = "Diario delle Schiappe";
            }
            else if(time >= 2115 && time <= 2215) {
                inonda = "Il Salotto del TBG";
            }
            break;
        case 4:
        	if(time >= 1900 && time <= 2000) {
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
            else if(time >= 0000 && time <= 0100) {
                inonda = "Black-Xtasy";
            }
            else if(time >= 1900 && time <= 2000) {
                inonda = "Mazzate...e basta!";
            }
            else if(time >= 2000 && time <= 2100) {
                inonda = "Science Shots";
            }
            break;
        case 6:
            break;
    }

    $( live ).text(inonda);
};

