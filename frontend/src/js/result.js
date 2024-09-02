export function loadResult(scoreLeft, scoreRight) {
    if (scoreLeft > scoreRight)
    {
        return `
        <h1>Home</h1>
            <p>Left player wins!</p>
            <p>Final score is ${scoreLeft} - ${scoreRight}!</p>
        `;
    }
    else
    {
        return `
        <h1>Home</h1>
            <p>Right player wins!<p>
            <p>Final score is ${scoreLeft} - ${scoreRight}!</p>
        `;
    }
}