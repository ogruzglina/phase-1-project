
const url = "https://devbrewer-horoscope.p.rapidapi.com/month/short";   //"https://devbrewer-horoscope.p.rapidapi.com/month/short/taurus"
const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

function getFetchResponse (url, zodiacSignName) {
    return fetch(`${url}/${zodiacSignName}`, { //`https://devbrewer-horoscope.p.rapidapi.com/month/short/${zodiac}`
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com",
                "x-rapidapi-key": "b6ac9ea8dbmsh1782a5e37fac544p1630dbjsn09823fe93a7c"
            }
        })
        .then(resp => resp.json())
}

function showPrediction (zodiacName) {
    const zodiac = document.getElementById('zodiacName');
    zodiac.textContent = zodiacName.toUpperCase();

    getFetchResponse (url, zodiacName) 
    .then(data => {
        console.log(data);
        const month = document.getElementById('month');
        month.textContent = convertMonth(data.Month);

        createPredictionDetails(data, zodiacName);
    });
}

function convertMonth (number) {

    console.log(months[number])
    
    for (let month in months) {
        if (number === month) {
            return months[month];
        }
    }
}

function createPredictionDetails (predictionDetails, zodiacName) {
    const zodiacNameWithCapital = zodiacName[0].toUpperCase() + zodiacName.slice(1);
    const details = predictionDetails[zodiacNameWithCapital];

    const pPrediction = document.getElementById('prediction');
    pPrediction.textContent = details['This Month'];

    const pBest = document.getElementById('bestDays');
    pBest.textContent = details['Best Days'];

    const pWorst = document.getElementById('worstDays');
    pWorst.textContent = details['Worst Days'];
}
