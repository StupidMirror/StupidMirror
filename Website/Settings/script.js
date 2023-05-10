const languageButtons = document.querySelectorAll(".language-button");
const title = document.getElementById("title");
const welcome = document.querySelectorAll(".welcome-text");
const finalProject = document.getElementById("final-project");
const defaultLanguage = "en";
const name = "Leon";

let language = localStorage.getItem("language") || defaultLanguage;

function setLanguage(lang) {
  language = lang;
  localStorage.setItem("language", lang);
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
