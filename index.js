
const url = "https://devbrewer-horoscope.p.rapidapi.com/month/short";   
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

const signsRange = [
    {
        signName: 'aries',
        start: [2, 21], 
        end: [3, 19],
    },
    {
        signName: 'taurus',
        start: [3, 20], 
        end: [4, 20],
    },
    {
        signName: 'gemini',
        start: [4, 21], 
        end: [5, 20],
    },
    {
        signName: 'cancer',
        start: [5, 21], 
        end: [6, 22],
    },
    {
        signName: 'leo',
        start: [6, 23], 
        end: [7, 22],
    },
    {
        signName: 'virgo',
        start: [7, 23], 
        end: [8, 22],
    },
    {
        signName: 'libra',
        start: [8, 23], 
        end: [9, 22],
    },
    {
        signName: 'scorpio',
        start: [9, 23], 
        end: [10, 21],
    },
    {
        signName: 'sagittarius',
        start: [10, 22], 
        end: [11, 21],
    },
    {
        signName: 'capricorn',
        start: [11, 22], 
        end: [0, 19],
        yearOfSet: isDecember(),
    },
    {
        signName: 'aquarius',
        start: [0, 20], 
        end: [1, 18],
    },
    {
        signName: 'pisces',
        start: [1, 19], 
        end: [2, 20],
    },
]
let isDefault = true;

document.addEventListener('DOMContentLoaded', () => {
    showPrediction (); // show prediction for default sign (areis)
    getChosenZodiacSign ();
    openSubscriptionForm ();
    closeSubscriptionForm ();
    subscribe ();
});

function isDecember () {
    let todayMonth = new Date().getMonth();

    return 11 === todayMonth ?  false : true
}

function getChosenZodiacSign () {
    const arrayOfClickableAreas = [...document.getElementsByTagName('area')];

    arrayOfClickableAreas.forEach(area => 
        area.addEventListener('click', showPrediction));
}

function showPrediction (e) {
    let zodiacName;

    if (!isDefault) { 
        zodiacName = e.target.alt;
    } else {
        zodiacName = actualZodiacSign();
        isDefault = false;
    }

    const zodiac = document.getElementById('zodiacName');
    zodiac.textContent = zodiacName.toUpperCase();

    const zodiacRange = document.getElementById('zodiacRange');
    zodiacRange.textContent = zodiacSignsRange[zodiacName];

    getFetchResponse (url, zodiacName) 
        .then(predictionData => {
            const month = document.getElementById('month');
            month.textContent = `Your prediction for ${months[predictionData.Month]}`;

            createPredictionDetails(predictionData, zodiacName);
        });
}

function actualZodiacSign () {
    let today = new Date();
    let yearStartDate;
    let yearEndDate;

    for(let signRange of signsRange) {

        if (signRange.yearOfSet) {
            yearStartDate = today.getFullYear() - 1 
            yearEndDate = today.getFullYear();
        } else {
            if (signRange.signName === 'capricorn') {
                yearStartDate = today.getFullYear();
                yearEndDate = today.getFullYear() + 1;
            } else {
                yearStartDate = today.getFullYear();
                yearEndDate = today.getFullYear();
            }
        }

        const signStartDate = new Date(yearStartDate, signRange.start[0], signRange.start[1]);
        const signEndDate = new Date(yearEndDate, signRange.end[0], signRange.end[1]);

        if (signStartDate <= today && today <= signEndDate) {
            return signRange.signName; 
        }
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

function createPredictionDetails (predictionDetails, zodiacName) {
    const zodiacNameWithCapital = zodiacName[0].toUpperCase() + zodiacName.slice(1);
    const details = predictionDetails[zodiacNameWithCapital];

    const pPrediction = document.getElementById('prediction');
    pPrediction.textContent = details['This Month'];

    const pBest = document.getElementById('bestDays');
    pBest.textContent = `Best dates of this month: ${details['Best Days']}`;

    const pWorst = document.getElementById('worstDays');
    pWorst.textContent = `Worst dates of this month: ${details['Worst Days']}`;
}

function openSubscriptionForm () {
    const form = document.getElementById("myForm");
    const openSubscriptionFormBtn = document.getElementById("openSubscriptionFormBtn");

    openSubscriptionFormBtn.addEventListener('click', () => form.style.display = "block");
}
      
function closeSubscriptionForm () {
    const form = document.getElementById("myForm");
    const closeSubscriptionFormBtn = document.querySelector(".btn.cancel");

    closeSubscriptionFormBtn.addEventListener('click', () => form.style.display = "none");
}

function subscribe () {
    const form = document.getElementById("myForm");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userInfo = getInputDataFromForm (e);

        saveUserInfoToJsonFile (userInfo);
        alert(`${userInfo.name}, thank you for subscribing!`);

        const form = document.getElementById("myForm");
        form.style.display = "none";
    });
}

function getInputDataFromForm (e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const dateOfBirth = e.target.date.value;
    const userInfo = { 
        name, 
        email, 
        dateOfBirth
    };

    e.target.reset();
    return userInfo;
}

function saveUserInfoToJsonFile (userInfo) {
    return fetch('http://localhost:3000/subscribedUsers', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => console.log(data));
}