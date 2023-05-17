const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, updateDoc, getDoc, onSnapshot } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBlNYiHyqfC0mmeKtcoHbP1jw-7UxviNn4",
    authDomain: "stupidmirroros.firebaseapp.com",
    projectId: "stupidmirroros",
    storageBucket: "stupidmirroros.appspot.com",
    messagingSenderId: "130204464466",  
    appId: "1:130204464466:web:5709994752937a277e368b",
    measurementId: "G-KJXCEJ1RG7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const collectionSettings = collection(db, 'settings');

// Sprache
const documentLanguage = doc(collectionSettings, 'language');
let language;
onSnapshot(documentLanguage, (doc) => {
  if (doc.exists()) {
    language = doc.data().language;
    timeUpdate(language)
    mottoUpdate(language)
  } else {
    language = defaultLanguage;
  }
});

// Motto Module
const documentMotto = doc(collectionSettings, 'mottos');
let mottoActiv;
onSnapshot(documentMotto, (doc) => {
  if (doc.exists()) {
    mottoActiv = doc.data().boolean;
    mottoUpdate(language)
  } else {
    mottoActiv = false;
  }
});


// -------------------------------- //
// Zeit und Datum

const dateText = document.querySelector("#date-text"); 
const timeText = document.querySelector("#time-text"); 
const secText = document.querySelector("#sec-text");
const monthList = {
  "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "de": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
  "fr": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
}
const dayList = {
  "en": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  "de": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  "fr": ["dimache", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
}

function nullFix(int) {
  return (int < 10) ? "0" + int : int;
}

function timeUpdate(language) { 
  const date = new Date();
  const monthNames = monthList[language];
  const dayNames = dayList[language];
  dateText.textContent = `${dayNames[date.getDay()]} - ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  timeText.textContent = `${date.getHours()}:${nullFix(date.getMinutes())}`;
  secText.textContent = `${nullFix(date.getSeconds())}`;
}

setInterval(() => {
  timeUpdate(language)
}, 1000);


// -------------------------------- //
// Mottotexte

const mottoText = document.querySelector("#motto-text"); 
const listMotto = {
  'en': ['Carpe diem', 'Stay hungry, stay foolish', 'Think different'],
  'de': ['Lebe jeden Tag als wäre es dein letzter', 'Wer wagt, gewinnt', 'Träume nicht dein Leben, lebe deinen Traum'],
  'fr': ['La vie est belle', 'Tout est possible', 'Rien n\'est impossible']
}

function mottoUpdate(language) {
  if (mottoActiv === true) {
    mottoText.style.visibility = "visible";
    const motto = listMotto[language];
    const randomIndex = Math.floor(Math.random() * motto.length);
    mottoText.textContent = `${motto[randomIndex]}`
  } else {
    mottoText.style.visibility = "hidden";
  }
}

setInterval(() => {
  mottoUpdate(language)
}, 10000);


// -------------------------------- //
// News

const collectionNews = collection(db, 'news');
const apiKey = '5c38cd27597c4b0db417109814070b7c';
const apiUrl = `https://newsapi.org/v2/top-headlines?language=${language}&apiKey=${apiKey}`;

const newsTitle = []
const newsAuthor = []
function newsUpdate() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      data.articles.forEach(article => {
        const authorPart = ` - ${article.author}`;
        const modifiedTitle = article.title.replace(authorPart, "");
        newsAuthor.push(article.author)
        newsTitle.push(modifiedTitle)
      });
      console.log(newsAuthor)
    })
}