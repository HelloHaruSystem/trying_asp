const getTokenOnGameStart = async () => {
    let gameToken;
    try {
        const response = await fetch("/api/scores/generate-token");
        gameToken = await response.text();
    } catch (error) {
        console.error("Problem fetching token");
        return null;
    }   
    return gameToken;
};

const submitScore = async (playerName, score, gameToken) => {
    if (!gameToken) {
        throw new Error("Can't submit a score without playing :)");
    }
    const data = {
        playerName: playerName,
        score: score,
        timeOfScore: new Date().toISOString()
    };
    
    try {
        const response = await fetch("/api/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": gameToken 
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            alert("can't submit score try again later");
        }  else {
            alert("Score submitted successfully! see your score at the leaderboardpage");
        }
    } catch (error) {
        console.error("Error submitting your score try again later.");
    }
};

export { getTokenOnGameStart, submitScore };