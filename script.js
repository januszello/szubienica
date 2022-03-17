const phrases = ["baba z wozu koniom lżej", "nie taki diabeł straszny jak go malują", "mowa jest srebrem a milczenie złotem", "Co ma wisieć nie utonie", "mądry przyjmie radę głupi nią wzgardzi", "kochajmy się jak bracia liczmy się jak Żydzi", "Bhutan", "Thimphu", "Burundi", "Gitega", "Gruzja", "Tbilisi", "Kambodża", "Phnom Penh", "Korea Północna", "Pjongjang", "czerwony", "niebieski", "eucharystia", "zielony", "Russian warship go fuck yourself", "Nowy Jork", "Warszawa", "Kijów", "Krzysztof Kolumb", "Mikołaj Kopernik", "Bolesław Wiktor Wicherkiewicz", "taksonomia blooma", "Franklin Delano Roosevelt", "Londyn", "Koziołki z Poznania", "Poznań miasto doznań", "instagram", "wielki post", "pascha", "Bill Gates", "Steve Jobs", "Ludovico Einaudi", "Bez pracy nie ma kołaczy", "Fortuna kołem się toczy", "Nie chwal dnia przed zachodem słońca", "Apetyt rośnie w miarę jedzenia", "Nie odnajdziesz spokoju unikając życia", "Najcenniejszych rzeczy w życiu nie nabywa się za pieniądze", "Albert Einstein", "Winston Churchill", "To co nas nie zabije uczyni nas silniejszymi", "Friedrich Nietzsche"];

let phrase = phrases[Math.floor(Math.random() * phrases.length)];


phrase = phrase.toUpperCase();

let phraseLength = phrase.length;
let mistakeNumb = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
const winGame = new Audio("win.wav");
const loseGame = new Audio("lose.wav");

let phrase1 = "";

for (i = 0; i < phraseLength; i++)
{
    if(phrase.charAt(i)==" ") phrase1 = phrase1 + " ";
    else phrase1 = phrase1 + "_";
}

function writePhrase() {
    document.querySelector('.board').innerHTML = phrase1;
}

window.onload = start;

var characters = new Array(35);

characters[0] = "A";
characters[1] = "Ą";
characters[2] = "B";
characters[3] = "C";
characters[4] = "Ć";
characters[5] = "D";
characters[6] = "E";
characters[7] = "Ę";
characters[8] = "F";
characters[9] = "G";
characters[10] = "H";
characters[11] = "I";
characters[12] = "J";
characters[13] = "K";
characters[14] = "L";
characters[15] = "Ł";
characters[16] = "M";
characters[17] = "N";
characters[18] = "Ń";
characters[19] = "O";
characters[20] = "Ó";
characters[21] = "P";
characters[22] = "Q";
characters[23] = "R";
characters[24] = "S";
characters[25] = "Ś";
characters[26] = "T";
characters[27] = "U";
characters[28] = "V";
characters[29] = "W";
characters[30] = "X";
characters[31] = "Y";
characters[32] = "Z";
characters[33] = "Ź";
characters[34] = "Ż";

function start() 
{
    let divContent = "";


    for(i=0; i<=34; i++)
    {
        let element = "element" + i;
        divContent = divContent + '<div class="char" onclick="check(' + i + ')" id="' + element + '">' + characters[i] + '</div>';
    }

    document.querySelector('.alphabet').innerHTML = divContent;

    writePhrase();
}

String.prototype.setTheMark = function(place, sign)
{
    if(place > this.length - 1) return this.toString();
    else return this.substr(0, place) + sign + this.substr(place+1);
}

function check(numb)
{
    let hit = false;

    for(i = 0; i < phraseLength; i++)
    {
        if(phrase.charAt(i) == characters[numb])
        {
            phrase1 = phrase1.setTheMark(i,characters[numb]);
            hit = true;
        }
    }

    if(hit == true)
    {
        yes.play();
        let element = "element" + numb;
        
        document.getElementById(element).style.backgroundColor = "#C7FFC7";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.boxShadow = "0 3px 0 #00C000";
        document.getElementById(element).style.cursor = "default";

        writePhrase();
    }
    else
    {
        no.play();
        let element = "element" + numb;

        document.getElementById(element).style.backgroundColor = "#FFBBBB";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "2px solid #C00000";
        document.getElementById(element).style.boxShadow = "0 3px 0 #C00000";
        document.getElementById(element).style.cursor = "default";
        
        document.getElementById(element).setAttribute("onclick", ";");


        //mistake
        mistakeNumb++;
        let picture = "img/s" + mistakeNumb + ".png";
        document.querySelector('.hangman').innerHTML = '<img src="' + picture + '" alt="" />';

    }

    // win
    
    function win() {
        
        document.querySelector('.alphabet').innerHTML = '<div class="end-win"><span class="win-txt">GRATULACJE!</span><br />świetna robota<span class="reset" onclick="location.reload()"><i class="fa-solid fa-arrow-rotate-left"></i> ZAGRAJ PONOWNIE</span></div>';
        document.querySelector('.board').classList.add('win-result');

        winGame.play();
    }
    
    if(phrase == phrase1) win();
    
    // lose
    
    function lose() {
        document.querySelector('.alphabet').innerHTML = '<div class="end-lose"><span class="lose">HANGMAN!</span><br>nie tym razem<br><br><span class="reset" onclick="location.reload()"><i class="fa-solid fa-arrow-rotate-left"></i> SPRÓBUJ PONOWNIE</span></div>';

        loseGame.play();
    }
    
    if(mistakeNumb >= 9) lose();
    

}