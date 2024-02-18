
const getJoke = document.getElementById("joke");
const refreshBtn = document.getElementById("btn");

const API_KEY = `https://v2.jokeapi.dev/joke/Any?type=single`;

generateJoke();

async function generateJoke() {
  const response = await fetch(API_KEY);
  const data = await response.json();

  getJoke.innerHTML = data.joke;

}

refreshBtn.addEventListener("click", generateJoke);;

