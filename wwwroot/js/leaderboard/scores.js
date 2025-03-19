import { getScores } from "../objectAndFetch/fetchTokenAndScore.js";

// scorelist ol from leaderboard.html
const scoreList = document.getElementById("score-list");

// the number that list will start from
let playerNumber = 0;

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
        hour12: false,
    });
};

const addScores = (playerName, score, date) => {
    let element = document.createElement('li');
    let span = document.createElement('span');

    span.innerHTML = `Player: ${playerName} ->  Score: ${score} -> Time and date: ${date}`;
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

const displayScores = async () => {
    const sortedScores = await getAndSortScores();
    clearScores();
    let counter = 0;

    for (let score of sortedScores) {
        if (counter > 25) {
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

const searchScores = async (playerName) => {
    const sortedScores = await getAndSortScores();
    clearScores();
    let counter = 0;

    for (let score of sortedScores) {
        if (counter > 25) {
            break;
        }
        
        if (playerName.toLowerCase() === score.playerName.toLowerCase()) {
            let date = formattedDate(score.timeOfScore);

        addScores(score.playerName, score.score, date);
        counter++;
        }
    }
    if (counter === 0) {
        scoreNotFound();
    }
};

export { displayScores, searchScores };