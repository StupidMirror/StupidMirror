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
const documentLanguage = doc(collectionSettings, 'language');
const documentUser = doc(collectionSettings, 'user');
const documentAlignment = doc(collectionSettings, "alignment");


const languageButtons = document.querySelectorAll(".language-button");
const title = document.getElementById("title");
const welcome = document.querySelectorAll(".welcome-text");
const finalProject = document.querySelectorAll("final-project");
const submitName = document.querySelector('.submit-name');
const module_text = document.querySelectorAll(".text-module");
const module_text_reminder = document.querySelector(".reminder-text");
const reminderDate = document.querySelector('.reminder-event');
const reminderTime = document.querySelector('.reminder-date');
const reminderSubmit = document.querySelector('.submit');
const inputText = document.querySelector('.input-text');
const inputDate = document.getElementById('input-date');
const inputTime = document.getElementById('input-time');
const errorText = document.querySelector('.error-text');
var container = document.getElementById('container');
const defaultLanguage = "en";


let language;
onSnapshot(documentLanguage, (doc) => {
  if (doc.exists()) {
    language = doc.data().language;
  } else {
    language = defaultLanguage;
  }
  updateLanguage()
});
let name;
onSnapshot(documentUser, (doc) => {
  if (doc.exists()) {
    name = doc.data().name;
  } else {
    name = "[NAME]"
  }
  updateLanguage()
});
onSnapshot(documentAlignment, (doc) => {
  if (doc.exists()) {
    const alignment = doc.data().alignment;
    if (alignment === "horizontal") {
      horizontalSquare.style.display = 'block';
      verticalSquare.style.display = 'none';
      horizontalButton.classList.add('active');
      verticalButton.classList.remove('active');
    } else if (alignment === "vertical") {
      horizontalSquare.style.display = 'none';
      verticalSquare.style.display = 'block';
      horizontalButton.classList.remove('active');
      verticalButton.classList.add('active');
    }
  }
});

function setLanguage(lang) {
  language = lang;
  updateDoc(documentLanguage, { language: `${language}` });
  updateLanguage();
}

function updateLanguage() {
  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === language);
  });

  switch (language) {
    case "en":
      setEnglish();
      break;
    case "de":
      setGerman();
      break;
    case "fr":
      setFrench();
      break;
    default:
      setEnglish();
  }
}

function setEnglish() {
  title.textContent = "Stupid Mirror Configuration";
  welcome[0].textContent = `Welcome, ${name}!`;
  welcome[1].textContent = "This is your home.";
  welcome[2].textContent = "From here you can change things!";
  finalProject.textContent = "Final Project Leon & Mateus";

  horizontalButton.textContent = "Horizontal";
  verticalButton.textContent = "Vertical";

  module_text[0].textContent = "Time & Date"
  module_text[1].textContent = "News"
  module_text[2].textContent = "Motto"
  module_text[3].textContent = "Weather"
  module_text_reminder.textContent = "Reminder"

  reminderDate.textContent = "Event"
  reminderTime.textContent = "Date"
  reminderSubmit.textContent = "Submit"
  errorText.textContent = "The event must have at least 5 letters";
  submitName.textContent = "Submit"
}

function setGerman() {
  title.textContent = "Stupid Mirror Einstellungen";
  welcome[0].textContent = `Willkommen, ${name}!`;
  welcome[1].textContent = "Hier ist dein Zuhause.";
  welcome[2].textContent = "Von hier aus kannst du vieles ändern!";
  finalProject.textContent = "Abschlussprojekt Leon & Mateus";

  horizontalButton.textContent = "Horizontal";
  verticalButton.textContent = "Vertikal";

  module_text[0].textContent = "Zeit & Datum"
  module_text[1].textContent = "Neuigkeiten"
  module_text[2].textContent = "Motto"
  module_text[3].textContent = "Wetter"
  module_text_reminder.textContent = "Erinnerungen"

  reminderDate.textContent = "Ereignis"
  reminderTime.textContent = "Datum"
  reminderSubmit.textContent = "Bestätigen"
  errorText.textContent = "Das Event muss mindestens 5 Buchstaben besitzen";
  submitName.textContent = "Bestätigen"
}

function setFrench() {
  title.textContent = "Stupid Mirror Paramètres";
  welcome[0].textContent = `Bienvenue, ${name}!`;
  welcome[1].textContent = "Ici, c'est chez toi.";
  welcome[2].textContent = "À partir d'ici, tu peux changer beaucoup de choses !";
  finalProject.textContent = "Projet de fin d'études Leon & Mateus";

  horizontalButton.textContent = "Horizontale";
  verticalButton.textContent = "Vertical";

  module_text[0].textContent = "Heure & date"
  module_text[1].textContent = "Actualités"
  module_text[2].textContent = "Devise"
  module_text[3].textContent = "Météo"
  module_text_reminder.textContent = "Rappel"

  reminderDate.textContent = "Événement"
  reminderTime.textContent = "Date"
  reminderSubmit.textContent = "Envoyer"
  errorText.textContent = "L'événement doit comporter au moins 5 lettres";
  submitName.textContent = "Envoyer"
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

// ---------- //

const horizontalButton = document.querySelector('.horizontal');
const verticalButton = document.querySelector('.vertical');
const horizontalSquare = document.querySelector(".square-horizontal")
const verticalSquare = document.querySelector(".square-vertical")

horizontalButton.addEventListener('click', () => {
  setDoc(documentAlignment, { alignment: 'horizontal' })
  horizontalSquare.style.display = 'block';
  verticalSquare.style.display = 'none';
  horizontalButton.classList.add('active');
  verticalButton.classList.remove('active');
});
verticalButton.addEventListener('click', () => {
  setDoc(documentAlignment, { alignment: 'vertical' })
  horizontalSquare.style.display = 'none';
  verticalSquare.style.display = 'block';
  horizontalButton.classList.remove('active');
  verticalButton.classList.add('active');
});

welcome[0].addEventListener("click", () => {
  var nameUpdate = document.querySelector(".nameUpdate");
  var computedStyle = window.getComputedStyle(nameUpdate);
  var displayValue = computedStyle.getPropertyValue("display");
  if (displayValue === "none") {
    nameUpdate.style.display = 'block'
  } else {
    nameUpdate.style.display = 'none'
  }
})

function setName() {
  var textInput = document.querySelector(".input-name").value;
  updateDoc(documentUser, { name: `${textInput}` });
  document.querySelector(".nameUpdate").style.display = 'none';
}
submitName.addEventListener("click", setName);


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const time = currentDate.getHours();

inputDate.value = `${year}-${month}-${day}`;
inputTime.value = `${time}:00`


function createNewDok() {
  const randomTitle = Math.random().toString(36).substring(7);

  const textInput = document.querySelector('.input-text').value;
  const dateInput = document.querySelector('.input-date').value;
  const timeInput = document.querySelector('.input-time').value;

  if (textInput.length < 5) {
    errorText.style.display = "block";
    return;
  }

  setDoc(doc(db, "reminder", randomTitle), {
    text: textInput,
    date: dateInput,
    time: timeInput,
    check: 'a'
  });

  const moduleReminder = document.querySelector('.module-reminder');
  moduleReminder.style.border = '3px solid #4c956c';

  setTimeout(() => {
    moduleReminder.style.border = '3px solid white';
  }, 500);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const time = currentDate.getHours();

  inputDate.value = `${year}-${month}-${day}`;
  inputTime.value = `${time}:00`
  inputText.value = '';
  errorText.style.display = "none";
  clearContainer()
  populateReminders();
}

reminderSubmit.addEventListener("click", createNewDok);


const deleteReminderBtn = document.querySelector('.deleteReminder');
container.style.display = "none";
deleteReminderBtn.addEventListener('click', function() {
  if (container.style.display === "none") {
    clearContainer();
    populateReminders();
    container.style.display = "block";
    deleteReminderBtn.classList.add('active');
  } else {
    container.style.display = "none";
    deleteReminderBtn.classList.remove('active');
  }
});




function toggleSwitch(element, documentRef) {
  const checked = element.checked;
  const value = { boolean: checked };

  try {
    updateDoc(documentRef, value);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Dokuments:', error);
  }
}
const documentTime = doc(collectionSettings, 'time');
const documentNews = doc(collectionSettings, 'news');
const documentMotto = doc(collectionSettings, 'motto');
const documentWeather = doc(collectionSettings, 'weather');
const documentReminder = doc(collectionSettings, 'reminder');
var switchElementTime = document.querySelector('.module-time .switch input');
switchElementTime.addEventListener('click', () => {
  toggleSwitch(switchElementTime, documentTime);
});
var switchElementNews = document.querySelector('.module-news .switch input');
switchElementNews.addEventListener('click', () => {
  toggleSwitch(switchElementNews, documentNews);
});
var switchElementMotto = document.querySelector('.module-motto .switch input');
switchElementMotto.addEventListener('click', () => {
  toggleSwitch(switchElementMotto, documentMotto);
});
var switchElementWeather = document.querySelector('.module-weather .switch input');
switchElementWeather.addEventListener('click', () => {
  toggleSwitch(switchElementWeather, documentWeather);
});
var switchElementReminder = document.querySelector('.module-reminder .switch input');
switchElementReminder.addEventListener('click', () => {
  toggleSwitch(switchElementReminder, documentReminder);
});
function setSwitchCheckedState(switchElement, documentRef) {
  onSnapshot(documentRef, (doc) => {
    if (doc.exists()) {
      switchElement.checked = doc.data().boolean;
    }
  });
}

setSwitchCheckedState(switchElementTime, documentTime);
setSwitchCheckedState(switchElementNews, documentNews);
setSwitchCheckedState(switchElementMotto, documentMotto);
setSwitchCheckedState(switchElementWeather, documentWeather);
setSwitchCheckedState(switchElementReminder, documentReminder);

const collectionReminder = collection(db, "reminder")
function deleteReminderDoc() {
  var parentDiv = this.parentNode;
  var text = parentDiv.querySelector('p').textContent;
  var splitArray = text.split(" - "); 

  var date = splitArray[0];
  var time = splitArray[1].split(" | ")[0];
  var reminderText = splitArray[1].split(" | ")[1];
  
  const q = query(collectionReminder, where("time", "==", time), where("text", "==", reminderText));
  
  getDocs(q)
    .then(snapshot => {
      if (snapshot.docs.length > 0) {
        const docRef = snapshot.docs[0].ref;
        updateDoc(docRef, { check: "b" } )
      }
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Dokumente:', error);
    });

  parentDiv.remove();
}

function reminderUpdate() {
  const q = query(collectionReminder, where("check", "==", "a"));

  return getDocs(q)
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

      return { timeArray, dateArray, textArray };
    })
    .catch(error => {
      console.error('Error:', error);
      return { timeArray: [], dateArray: [], textArray: [] };
    });
}

function populateReminders() {
  reminderUpdate().then(data => {
    const { timeArray, dateArray, textArray } = data;

    for (var i = 0; i < timeArray.length; i++) {
      var div = document.createElement('div'); 

      var dateParagraph = document.createElement('p');
      dateParagraph.textContent = `${dateArray[i]} - ${timeArray[i]} | ${textArray[i]}`;
      div.appendChild(dateParagraph);
      container.appendChild(div);

      var button = document.createElement('button');
      button.textContent = 'Löschen';
      button.addEventListener('click', deleteReminderDoc);
      div.appendChild(button);
    }
  });
}
function clearContainer() {
  var container = document.getElementById('container');
  container.innerHTML = '';
}


updateLanguage()