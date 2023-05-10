const dayText = document.querySelector("#day-text"); 
const dateText = document.querySelector("#date-text"); 
const timeText = document.querySelector("#time-text"); 
const secText = document.querySelector("#sec-text");

function nullFix(int) {
  return (int < 10) ? "0" + int : int;
}

function getMonthNames(lang) {
  switch (lang) {
    case "en":
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    case "de":
      return ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    case "fr":
      return ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    default:
      return [];
  }
}

function getDayNames(lang) {
  switch (lang) {
    case "en":
      return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    case "de":
      return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    case "fr":
      return ["dimache", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    default:
      return [];
  }
}

// Zeit & Datum
setInterval(() => {
  const language = localStorage.getItem('language')
  const date = new Date();
  const monthNames = getMonthNames(language);
  const dayNames = getDayNames(language);
  dateText.textContent = `${dayNames[date.getDay()]} - ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  timeText.textContent = `${date.getHours()}:${nullFix(date.getMinutes())}`;
  secText.textContent = `${nullFix(date.getSeconds())}`;
}, 1000);


setInterval(function() {
  document.body.style.fontFamily = 'DS-Digital';
}, 5000);

// News API
const apiKey = '5c38cd27597c4b0db417109814070b7c';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=ch&apiKey=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));