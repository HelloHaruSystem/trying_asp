import { getScores } from "../objectAndFetch/fetchTokenAndScore.js";

// scorelist ol from leaderboard.html
const scoreList = document.getElementById("score-list");


// TODO: find a way to sort the scores by highest score
const displayScores = async () => {

    const scores = await getScores();
    console.log(scores);
    for (let score of scores) {
        let element = document.createElement('li');
        let span = document.createElement('span');

        span.innerHTML = `Player: ${score.playerName} ->  Score: ${score.score} -> Date: ${score.timeOfScore}`;
        element.appendChild(span);
        scoreList.appendChild(element);
    }

};

const clearScores = () => {
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }
};

export { displayScores };