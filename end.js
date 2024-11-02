const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore'); // Removed '#' in key
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 10;

finalScore.innerText = mostRecentScore;

// Enable the save button only if there's input in the username field
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};

// Clear highscores function
const clearHighscores = () => {
    localStorage.removeItem('highScores');
    alert('Highscores cleared!');
    window.location.reload(); // Refresh page to reflect changes
};

// Event listener for the clear button
document.getElementById('clearScoresBtn').addEventListener('click', clearHighscores);
