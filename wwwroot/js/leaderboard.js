import { setLogoAndPochama } from "./style/pochama.js";
import { displayScores, searchScores } from "./leaderboard/scores.js";

// search for your score form
const searchForm = document.getElementById("search-score");

// run at startup Methods
setLogoAndPochama();
displayScores();

// event handlers
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents form from reloading the page

    // input value (name) from html form
    const playerName = document.getElementById('search-name').value;

    if (playerName === "") {
        displayScores();
    } else {
        searchScores(playerName);
    }
});