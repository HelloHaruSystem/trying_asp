import { createPochama } from "./objectAndFetch/pokefactory.js";
import { startGameLoop } from "./game/game.js";

// logo and title
// TODO: move to a ui class at some points
const pochama = document.getElementById("pochama");
const logo = document.getElementById("logo");

// gameStart button
const ranButton = document.getElementsByClassName("random-button")[0];

// set logo
const setLogoAndPochama = async () => {
  const data = await createPochama();

  pochama.src = data[0];
  logo.href = data[1];
};

// run at startup Methods
setLogoAndPochama();

// event handlers
ranButton.addEventListener("click", async () => {
  await startGameLoop();
});