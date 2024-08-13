export async function loadStats() {
    try 
    {
        console.log('Fetching stats...');

        const response = await fetch('http://localhost:8000/stats/');
        if (!response.ok) {
            throw new Error('Network response error');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        
        return `
        <h1>Stats</h1>
        <p>${data.data.key1}</p>`;
    } 
    catch (error) 
    {
        console.error('Problem with fetch', error);
        return `
        <h1>Stats</h1>
        <p>Error getting stats</p>`;
    };
}
