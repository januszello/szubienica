'use strict'

let categoryBox = document.querySelector('.category');
console.log(categoryBox);
const categoryBank = ["capitalCity", "proverb", "knownIndividuals", "marvelHero"];

const capitalCity = ["Londyn", "Warszawa", "Berlin", "Tokio", "Buenos Aires", "Canberra", "Paryż", "Rzym", "Budapeszt", "Madryt", "Waszyngton"];
const proverb = [
    "baba z wozu koniom lżej", 
    "nie taki diabeł straszny jak go malują", 
    "Co ma wisieć nie utonie",
    "Niedaleko pada jabłko od jabłoni",
    "Pierwsze koty za płoty",
    "Zapomniał wół jak cielęciem był",
    "Nie odnajdziesz spokoju unikając życia", "Najcenniejszych rzeczy w życiu nie nabywa się za pieniądze",
    "mądry przyjmie radę głupi nią wzgardzi", "kochajmy się jak bracia liczmy się jak Żydzi", "Nie chwal dnia przed zachodem słońca",
    "Apetyt rośnie w miarę jedzenia",];
const knownIndividuals = ["Friedrich Nietzsche", "Krzysztof Kolumb", "Albert Einstein", "Bill Gates", "Steve Jobs", "Ludovico Einaudi", "Mikołaj Kopernik", "Bolesław Wiktor Wicherkiewicz", "Franklin Delano Roosevelt", "Barack Obama", "Sergey Brin", "Larry Page", "Jeff Bezos", "Robert Lewandowski", "Oprah Winfrey", "Alan Rickman", "Heath Ledger", "Johnny Depp", "Jennifer Aniston", "Krystyna Feldman", "Emma Stone", "Christopher Nolan", "Frank Darabont", "Mel Gibson"];
const marvelHero = ["Iron Man", "Thor", "Spider Man", "Kapitan Ameryka", "Stan Lee", "Doktor Strange", "Czarna Wdowa", "Venom", "Groot", "Zimowy Żołnierz", "Rocket", "Hulk", "Star-Lord", "Nick Fury", "Kapitan marvel"];

let phrase = '';
let category = '';

function phraseDraw () {
    let categoryDraw = Math.floor(Math.random() * categoryBank.length);
    
    
    console.log(categoryDraw);

    if (categoryDraw == 0) {
        phrase = capitalCity[Math.floor(Math.random() * capitalCity.length)];
        category = 'Stolica Państwa';
    }
    else if (categoryDraw == 1) {
        phrase = proverb[Math.floor(Math.random() * proverb.length)];
        category = 'Przysłowie';
    }
    else if (categoryDraw == 2){
        phrase = knownIndividuals[Math.floor(Math.random() * knownIndividuals.length)];
        category = 'Znana osoba';
    }
    else {
        phrase = marvelHero[Math.floor(Math.random() * marvelHero.length)];
        category = 'Bohater Filmów Marvela';
    }

    categoryBox.innerHTML = category;
    console.log(category);// <- write in category HTML box
    
}

phraseDraw();


phrase = phrase.toUpperCase();

let phraseLength = phrase.length;
let mistakeNumb = 0;

console.log(phraseLength);

const yes = new Audio("yes.wav");
const no = new Audio("no.wav");
const winGame = new Audio("win.wav");
const loseGame = new Audio("lose.wav");

let phrase1 = "";

for (let i = 0; i < phraseLength; i++)
{
    if(phrase.charAt(i)==" ") phrase1 = phrase1 + " ";
    else phrase1 = phrase1 + "_";
}

function writePhrase() {
    document.querySelector('.board').innerHTML = phrase1;
}

window.onload = start;

const characters = ['A','Ą','B','C','Ć','D','E','Ę','F','G','H','I','J','K','L','Ł','M','N','Ń','O','Ó','P','Q','R','S','Ś','T','U','V','W','X','Y','Z','Ź','Ż'];

function start() 
{
    let divContent = "";


    for(let i=0; i<=34; i++)
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

    for(let i = 0; i < phraseLength; i++)
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
        
        document.querySelector('.alphabet').innerHTML = '<div class="end-win"><span class="win-txt">GRATULACJE!</span><br><span>świetna robota</span><span class="reset" onclick="location.reload()"><i class="fa-solid fa-arrow-rotate-left"></i> ZAGRAJ PONOWNIE</span></div>';
        document.querySelector('.board').classList.add('win-result');

        winGame.play();
    }
    
    if(phrase == phrase1) win();
    
    // lose
    
    function lose() {
        document.querySelector('.alphabet').innerHTML = '<div class="end-lose"><span class="lose">HANGMAN!</span><br><span>nie tym razem</span><br><br><span class="reset" onclick="location.reload()"><i class="fa-solid fa-arrow-rotate-left"></i> SPRÓBUJ PONOWNIE</span></div>';

        loseGame.play();
    }
    
    if(mistakeNumb >= 9) lose();
    
}