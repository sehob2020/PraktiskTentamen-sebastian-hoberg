/* Skriv din kod här */

const url = 'https://restcountries.eu/rest/v2/'

//Fetch för att hämta data från angiven API
fetch(url).then(
    function(response){
        if(response.status === 404){
            throw 'Hittades inte';
        }
        else{
            return response.json();
        }
    }
).then( //Then för att sedan behandla datan vi har hämtat
    function(data){
        let countries = [];

        let name = document.querySelectorAll('.name');
        let time = document.querySelectorAll('.time');
        let flag = document.querySelectorAll('.flag');

        //For loop som hämtar tre random länder
        for(let i=0; i<3; i++){
            let random = Math.floor(Math.random()* data.length);

            let NewCountry = new Country(data[random].name, data[random].timezones, data[random].flag);
            countries.push(NewCountry);
            NewCountry.display(name[i], time[i], flag[i]);
        }
    }
);


//Mallen för länder
function Country(name, timezones, flag){
    this.name = name;
    this.timezones = timezones;
    this.flag = flag;
}

//prototype metod
Country.prototype.display = function(name, time, flag){

    //Prototype metod för att räkna ut den lokala tiden. 
    let date = new Date();
    let dateToUTC = date.getUTCHours();
    let dateMinutes = date.getMinutes();
    let localUTCtime = this.timezones[0].substr(4,2);
    let localTime = null;
    
    if(this.timezones[0][3] === '+'){
        localTime = dateToUTC + Number(localUTCtime);
    }
    else if(this.timezones[0][3] === '-'){
        localTime = dateToUTC - Number(localUTCtime);
    }
    else{
        localTime = dateToUTC;
    }

    if(localTime > 24){
        localTime = localTime - 24;
    }
    else if(localTime < 0){
        localTime = 24 + localTime;
    }

    //If-statement så att om tiden är t.ex. 08:15 så kommer den skriva ut 08:15 istället för 8:15.
    if(localTime.toString().length === 1){
        localTime = `0${localTime}`;
    }
    //Samma sak här fast detta påverkar minuterna och den påverkar timmarna ovan.
    if(dateMinutes.toString().length === 1){
        dateMinutes = `0${dateMinutes}`;
    }

    name.innerText = this.name;
    time.innerText = `${localTime}:${dateMinutes}`;
    flag.src = this.flag;

}
