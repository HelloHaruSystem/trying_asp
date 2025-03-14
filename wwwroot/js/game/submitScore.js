import { getTokenOnGameStart, submitScore } from "../objectAndFetch/fetchTokenAndScore.js";

let gameToken = null;
let playerName = null;
let score = null;

// get token
gameToken = await getTokenOnGameStart(gameToken);
// get name and score
throw new Error("Not yet implemented");
// submit score
await submitScore(playerName, score, gameToken);