import { getScores } from "../objectAndFetch/fetchTokenAndScore.js";

// scorelist ol from leaderboard.html
const scoreList = document.getElementById("score-list");

const sortScores = (scores) => {
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

const displayScores = async () => {
    const scores = await getScores();

    if (!Array.isArray(scores)) {
        console.error("Error: expected array");
        return;
    }
    const sortedScores = sortScores(scores);
    let counter = 0;

    for (let score of sortedScores) {
        if (counter > 25) {
            break;
        }

        let element = document.createElement('li');
        let span = document.createElement('span');
        let date = formattedDate(score.timeOfScore);

        span.innerHTML = `Player: ${score.playerName} ->  Score: ${score.score} -> Date: ${date}`;
        element.appendChild(span);
        scoreList.appendChild(element);
        
        counter++;
    }

};

const clearScores = () => {
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }
};

export { displayScores };