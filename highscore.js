const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Display high scores
highScoresList.innerHTML = highScores
    .map(score => `<li class="high-score">${score.name} - ${score.score}</li>`)
    .join('');

// Clear high scores
function clearHighScores() {
    localStorage.removeItem('highScores'); // Remove from localStorage
    highScoresList.innerHTML = ''; // Clear displayed list

    // Show a temporary message indicating scores were cleared
    const message = document.createElement('p');
    message.textContent = "Highscores cleared!";
    message.style.color = "green";
    message.style.fontSize = "1.2rem";
    message.style.marginTop = "1rem";
    document.querySelector('.container').appendChild(message);

    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

document.querySelector('#clearScoresBtn').addEventListener('click', clearHighScores);
