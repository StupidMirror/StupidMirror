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
const documentLanguage = doc(collectionSettings, 'language');
const documentUser = doc(collectionSettings, 'user');


const languageButtons = document.querySelectorAll(".language-button");
const title = document.getElementById("title");
const welcome = document.querySelectorAll(".welcome-text");
const finalProject = document.getElementById("final-project");
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
    console.log(name)
  } else {
    name = "[NAME]"
  }
  updateLanguage()
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
}

function setGerman() {
  title.textContent = "Stupid Mirror Einstellungen";
  welcome[0].textContent = `Willkommen, ${name}!`;
  welcome[1].textContent = "Hier ist dein Zuhause.";
  welcome[2].textContent = "Von hier aus kannst du vieles ändern!";
  finalProject.textContent = "Abschlussprojekt Leon & Mateus";
}

function setFrench() {
  title.textContent = "Stupid Mirror Paramètres";
  welcome[0].textContent = `Bienvenue, ${name}!`;
  welcome[1].textContent = "Ici, c'est chez toi.";
  welcome[2].textContent = "À partir d'ici, tu peux changer beaucoup de choses !";
  finalProject.textContent = "Projet de fin d'études Leon & Mateus";
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

updateLanguage();