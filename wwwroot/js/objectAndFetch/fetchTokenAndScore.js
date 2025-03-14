const getTokenOnGameStart = async (gameToken) => {
    try {
        const response = await fetch("/api/scores/generate-token");
        gameToken = await response.text();
    } catch (error) {
        console.error("Problem fetching token");
    }   
};

const submitScore = async (palyerName, score, gameToken) => {
    if (!gameToken) {
        throw new Error("Can't submit a score without playing :)");
    }

    const data = {
        playerName: playername,
        score: score,
        timeOfScore: new Date().now.toISOString()
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
            alert("Score submitted successfully! see you score at the leaderboardpage");
        }
    } catch (error) {
        console.error("Error submitting your score try again later.");
    }
};

export { getTokenOnGameStart, submitScore };