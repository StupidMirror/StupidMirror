const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, updateDoc, getDoc, getDocs, onSnapshot, query, where, getCountFromServer } = require('firebase/firestore');

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
    eventLanguage(language)
    reminderUpdate()
  } else {
    language = defaultLanguage;
  }
});

// Time Module
const documentTime = doc(collectionSettings, 'time');
onSnapshot(documentTime, (doc) => {
  if (doc.exists()) {
    if (doc.data().boolean === true) {
      dateText.style.visibility = "visible";
      timeText.style.visibility = "visible";
      secText.style.visibility = "visible";
    } else {
      dateText.style.visibility = "hidden";
      timeText.style.visibility = "hidden";
      secText.style.visibility = "hidden";
    }
  } else {
    dateText.style.visibility = "hidden";
    timeText.style.visibility = "hidden";
    secText.style.visibility = "hidden";
  }
});
// Motto Module
const documentMotto = doc(collectionSettings, 'motto');
onSnapshot(documentMotto, (doc) => {
  if (doc.exists()) {
    if (doc.data().boolean === true) {
      mottoText.style.visibility = "visible";
    } else {
      mottoText.style.visibility = "hidden";
    }
    mottoUpdate(language)
  } else {
    mottoText.style.visibility = "hidden";
  }
});
// Reminder Module
const eventModule = document.querySelector(".module-event")
const documentReminder = doc(collectionSettings, 'reminder');
onSnapshot(documentReminder, (doc) => {
  if (doc.exists()) {
    if (doc.data().boolean === true) {
      eventModule.style.visibility = "visible";
    } else {
      eventModule.style.visibility = "hidden";
    }
    mottoUpdate(language)
  } else {
    eventModule.style.visibility = "hidden";
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
    const motto = listMotto[language];
    const randomIndex = Math.floor(Math.random() * motto.length);
    mottoText.textContent = `${motto[randomIndex]}`
}

setInterval(() => {
  mottoUpdate(language)
}, 10000);


// -------------------------------- //
// Reminders



function eventLanguage(language) {
  const eventModuleText = document.getElementById("event-text");
  
  if (language === "en") {
    eventModuleText.textContent = "Upcoming Events";
  } else if (language === "de") {
    eventModuleText.textContent = "Bevorstehende Events";
  } else if (language === "fr") {
    eventModuleText.textContent = "Événements à venir";
  } else {
    eventModuleText.textContent = "Upcoming Events";
  }
}
function ifToday(dateString) {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var today = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;

  if (today === dateString) {
    if (language === "en") {
      return "Today"
    } else if (language === "de") {
      return "Heute"
    } else {
      return "Aujourd'hui"
    }
  } else {
    return dateString;
  }
}
function reminderUpdate() {
  const collectionReminder = collection(db, "reminder");
  const q = query(collectionReminder, where("check", "==", "a"));
  getDocs(q)
    .then(snapshot => {
      const currentDate = new Date();

      const sortedDocs = snapshot.docs
        .filter(doc => {
          const date = doc.data().date;
          const time = doc.data().time;
          const dateTime = new Date(`${date} ${time}`);
          return dateTime > currentDate;
        })
        .sort((doc1, doc2) => {
          const date1 = doc1.data().date;
          const time1 = doc1.data().time;
          const date2 = doc2.data().date;
          const time2 = doc2.data().time;

          const dateComparison = new Date(date1) - new Date(date2);
          if (dateComparison !== 0) {
            return dateComparison;
          }

          return time1.localeCompare(time2);
        });

      const timeArray = [];
      const dateArray = [];
      const textArray = [];

      sortedDocs.forEach(doc => {
        const { time, date, text } = doc.data();

        const dateParts = date.split("-");
        const day = dateParts[2];
        const month = dateParts[1];
        const formattedDate = `${day}.${month}`;

          timeArray.push(time);
          dateArray.push(formattedDate);
          textArray.push(text);
      });

      const events = document.querySelectorAll(".events");
      events[0].textContent = `${ifToday(dateArray[0])} - ${timeArray[0]} | ${textArray[0]}`
      events[1].textContent = `${ifToday(dateArray[1])} - ${timeArray[1]} | ${textArray[1]}`
      events[2].textContent = `${ifToday(dateArray[2])} - ${timeArray[2]} | ${textArray[2]}`
      events[3].textContent = `${ifToday(dateArray[3])} - ${timeArray[3]} | ${textArray[3]}`
      events[4].textContent = `${ifToday(dateArray[4])} - ${timeArray[4]} | ${textArray[4]}`
    })
  .catch(error => {
    console.error('Error:', error);
  });
}
setInterval(() => {
  reminderUpdate()
}, 60000); 



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