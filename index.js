
fetch("https://devbrewer-horoscope.p.rapidapi.com/month/short/taurus", { //`https://devbrewer-horoscope.p.rapidapi.com/month/short/${zodiac}`
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com",
		"x-rapidapi-key": "b6ac9ea8dbmsh1782a5e37fac544p1630dbjsn09823fe93a7c"
	}
})
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    });


function showPrediction (zodiacName) {
    console.log("hi");
    console.log(zodiacName);
}


