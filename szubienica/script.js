let phrase = "kochajmy się jak bracia liczmy się jak Żydzi";
phrase = phrase.toUpperCase();

let length = phrase.length;
let mistakeNumb = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

let phrase1 = "";

for (i=0; i<length; i++)
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
characters[33] = "Ż";
characters[34] = "Ź";

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
    else return this.substr(0, place) + sign + this.substr(place+1)
}

function check(numb)
{

    let hit = false;

    for(i=0; i<length; i++)
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
        
        document.getElementById(element).style.backgroundColor = "#030";
        document.getElementById(element).style.color = "#00C000";
        document.getElementById(element).style.border = "3px solid #00C000";
        document.getElementById(element).style.cursor = "default";

        writePhrase();
    }
    else
    {
        no.play();
        let element = "element" + numb;

        document.getElementById(element).style.backgroundColor = "#300";
        document.getElementById(element).style.color = "#C00000";
        document.getElementById(element).style.border = "3px solid #C00000";
        document.getElementById(element).style.cursor = "default";
        
        document.getElementById(element).setAttribute("onclick", ";");


        //mistake
        mistakeNumb++;
        let picture = "img/s" + mistakeNumb + ".jpg";
        document.querySelector('.hangman').innerHTML = '<img src="' + picture + '" alt="" />';

    }

    // win
    if(phrase == phrase1)
    document.querySelector('.alphabet').innerHTML = '<div class="">Tak jest! Podano prawidłowe hasło: <br/> <span class="win-result">' + phrase + '</span><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span></div>';
    
    // lose
    if(mistakeNumb >= 9)
    document.querySelector('.alphabet').innerHTML = '<div><span class="lose">HANGMAN! Przegrana...</span><br /><span class="reset" onclick="location.reload()">SPRÓBUJESZ JESZCZE RAZ?</span></div>';

}