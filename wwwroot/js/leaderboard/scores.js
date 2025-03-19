import { getScores } from "../objectAndFetch/fetchTokenAndScore.js";

// scorelist ol from leaderboard.html
const scoreList = document.getElementById("score-list");

// currentPage of Score
let pageNumber = 0;

const getAndSortScores = async () => {
    const scores = await getScores();

    if (!Array.isArray(scores)) {
        console.error("Error: expected array");
        return;
    }

    return scores.sort((a, b) => b.score - a.score); // Sort by highest score
};

const formattedDate = (date) => {
    return new Date(date).toLocaleString("en-DK", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit", uncomment to dispaly seconds aswell
        hour12: false, // 24 hour clock not am and pm
    });
};

const addScores = (playerName, score, date) => {
    let element = document.createElement('li');
    let span = document.createElement('span');

    span.innerHTML = `Player: <strong>${playerName.padEnd(25)}</strong> ->  Score: <strong>${String(score).padEnd(4)}</strong> -> Time and date: <strong>${date}</strong>`;
    element.appendChild(span);
    scoreList.appendChild(element);
};

const clearScores = () => {
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }
};

const scoreNotFound = () => {
    let element = document.createElement('li');
    let span = document.createElement('span');

    span.innerHTML = `No players found`;
    element.appendChild(span);
    scoreList.appendChild(element);
};

const displayScores = async (playerName = null) => {
    const sortedScores = await getAndSortScores();
    clearScores();
    let counter = 0;

    const filteredScores = playerName
        ? sortedScores.filter(scoreOwner => scoreOwner.playerName.toLowerCase() === playerName.toLowerCase()) // if null filter by name
        : sortedScores;                                                                                      // else filteredScores = sortedScores

    for (let score of filteredScores) {
        if (counter >= 25) {
            break;
        }
        
        let date = formattedDate(score.timeOfScore);

        addScores(score.playerName, score.score, date);
        counter++;
    }
    if (counter === 0) {
        scoreNotFound();
    }
};

export { displayScores };