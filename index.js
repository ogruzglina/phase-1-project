
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
const zodiacSignsRange = {
    'aries': '(March 21 - April 19)',
    'taurus': '(April 20 - May 20)',
    'gemini': '(May 21 - June 20)',
    'cancer': '(June 21 - July 22)',
    'leo': '(July 23 - August 22)',
    'virgo': '(August 23 - September 22)',
    'libra': '(September 23 - October 22)',
    'scorpio': '(October 23 - November 21)',
    'sagittarius': '(November 22 - December 21)',
    'capricorn': '(December 22 - January 19)',
    'aquarius': '(January 20 - February 18)',
    'pisces': '(February 19 - March 20)',
}

document.addEventListener('DOMContentLoaded', getChosenZodiacSign);


function getChosenZodiacSign (e) {
    console.log(e);
    const arrayOfClickableAreas = document.getElementsByTagName('area');

    for (let area of arrayOfClickableAreas) {
        area.addEventListener('click', showPrediction);
    }
}

function getFetchResponse (url, zodiacSignName) {
    return fetch(`${url}/${zodiacSignName}`, { 
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "devbrewer-horoscope.p.rapidapi.com",
                "x-rapidapi-key": "b6ac9ea8dbmsh1782a5e37fac544p1630dbjsn09823fe93a7c"
            }
        })
        .then(resp => resp.json())
}

function showPrediction (e) {
    zodiacName = e.target.alt;

    const zodiac = document.getElementById('zodiacName');
    zodiac.textContent = zodiacName.toUpperCase();

    const zodiacRange = document.getElementById('zodiacRange');
    zodiacRange.textContent = zodiacSignsRange[zodiacName];

    getFetchResponse (url, zodiacName) 
    .then(data => {
        const month = document.getElementById('month');
        month.textContent = months[data.Month];

        createPredictionDetails(data, zodiacName);
    });
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
