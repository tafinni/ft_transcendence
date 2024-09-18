import { showAlert } from "../index.js";
import { updateContent } from "../i18n";
import { loadContent } from "../router.js";
import { backButtonListener } from "./profile.js";

export async function matchHistory () {
	try
	{
		const response = await fetch('http://localhost:8000/match_history/', {
			method: 'GET',
			credentials: 'include'
		});
		if (!response.ok)
		{
			console.error('Failed loading match history:', response.statusText);
			showAlert('Error occurred loading match history. Try again.', 'danger');
			return ;
		}

		const data = await response.json();
		const matches = data.matches;

		console.log('matchHistory called', data);

		const matchHistoryHTML = `
			<div class="container mt-5">
				<div class="row">
					<div class="col-md-12">
						<div class="card">
							<div class="card-body">
								<h5 class="card-title">
									<span translate="match history"></span>
								</h5>

								<table class="table table-striped">
									<thead>
										<tr>
											<th translate="date"></th>
											<th translate="opponent"></th>
											<th translate="result"></th>
										</tr>
									</thead>
									<tbody>
                            			${matches.map(matchData => {
                                        	const localDate = new Date(matchData.date).toLocaleString(); 
                                        	return `
                                            	<tr>
                                            	    <td>${localDate}</td>
                                            	    <td>${matchData.opponent}</td>
                                            	    <td>${matchData.result}</td>
                                            	</tr>
                                            	`;
                                        }).join('')}
									</tbody>
								</table>
								<button type="button" id="back-button" class="btn btn-primary" translate="back"></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;

		const contentElement = document.getElementById('content');
		if (contentElement)
		{
			contentElement.innerHTML = matchHistoryHTML;			
			updateContent();
			backButtonListener();
		}
		else
		{
			console.error('Content element not found');
		}
	}
	catch (error)
	{
		console.error('Error fetching match history:', error);
		showAlert('Error fetching match history. Try Again.', 'danger');
		loadContent('profile');
	}
}

export async function loadChartOne() {
	try
	{
		const response = await fetch('http://localhost:8000/friends_statistics/', {
			method: 'GET',
			credentials: 'include'
		});

		if (!response.ok)
		{
			console.error('Failed loading friends statistics:', response.statusText);
			showAlert('Error occurred loading friends statistics. Try Again.', 'danger');
			return;
		}

		const data = await response.json();
		
		const chartLabels = data.friends.map(friend => friend.friend_name);
		const winPercentages = data.friends.map(friend => {
			const totalGames = friend.wins + friend.losses;
			return totalGames > 0 ? (friend.wins / totalGames) * 100 : 0;
		});

		const chartsHTML = `
			<div class="chart-container" style="width: 100%">
				<canvas class="chart" id="myChart"></canvas>
				<div id="profile-card" style="text-align: center; padding: 50px; font-size: 1.2em; font-weight: bold; background-color: white">
					<button type="button" id="back-button" class="btn btn-primary float-right" translate="back"></button>
				</div>
			</div>		
		`;

		const contentElement = document.getElementById('content');
		if (contentElement)
		{
			contentElement.innerHTML = chartsHTML;

			const ctx = document.getElementById("myChart").getContext("2d");

			const myChart = new Chart(ctx, {
				type: "bar",
				data: {
					labels: chartLabels,
					datasets: [{
						label: 'Win Percentage',
						data: winPercentages,
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						xAxes: [{
							ticks: {
								fontSize: 16,
								fontColor: '#333',
								fontStyle: 'bold',
							},
							scaleLabel: {
								display: true,
								labelString: 'Friends\' Names',
								fontSize: 15,
								fontColor: '#333'
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true,
								callback: function(value) {
									return value + '%';
								}
							},
							scaleLabel: {
								display: true,
								labelString: 'Win Percentage (%)'
							}
						}]
					},
					tooltips: {
						callbacks: {
							label: function(tooltipItem, data) {
								const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
								return 'Win Percentage: ' + value.toFixed(2) + '%';
							}
						}
					},
					title: {
						display: true,
						text: "Win Percentages of Friends"
					},
					legend: {
						display: false
					}
				}
			});

			updateContent();
			backButtonListener();

		}
		else
		{
			console.error('Content element not found');
		}
	}
	catch (error)
	{
		console.error('Error fetching match history:', error);
		showAlert('Error fetching match history. Try Again.', 'danger');
		loadContent('profile');
	}
}
	

export async function loadChartTwo() {
    try 
	{
        const response = await fetch('http://localhost:8000/friends_statistics/', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok)
		{
            console.error('Failed loading friends statistics:', response.statusText);
            showAlert('Error occurred loading friends statistics. Try Again.', 'danger');
            return;
        }

        const data = await response.json();

        const reply = await fetch('http://localhost:8000/profile/', {
            method: 'GET',
            credentials: 'include'
        });

        if (!reply.ok)
		{
            console.error('Failed loading profile statistics:', response.statusText);
            showAlert('Error occurred loading profile statistics. Try Again.', 'danger');
            return;
        }
        const ownData = await reply.json();

        const chartNames = data.friends.map(friend => friend.friend_name);
        const wins = data.friends.map(friend => friend.wins);
        const losses = data.friends.map(friend => friend.losses);
        
        chartNames.push(ownData.username);
        wins.push(ownData.wins);
        losses.push(ownData.losses); 

        const totalWins = wins.reduce((count, win) => count + win, 0);
		const totalLosses = losses.reduce((count, loss) => count + loss, 0);
		const totalGames = totalWins + totalLosses;

        const chartColors = ["#36a2eb", "#ff6384"];

        const chartsHTML = `
            <div class="chart-container" style="width: 100%">
                <canvas id="myChart" style="width: 100%; background-color: white"></canvas>
				<div id="profile-card" style="text-align: center; padding: 20px; font-size: 1.2em; font-weight: bold; background-color: white">
               		Total Games Played: ${totalGames}
					<button type="button" id="back-button" class="btn btn-primary float-right" translate="back"></button>
            	</div>
            </div>
        `;

        const contentElement = document.getElementById('content');
        if (contentElement)
		{
            contentElement.innerHTML = chartsHTML;

            new Chart("myChart", {
                type: "doughnut",
                data: {
                    labels: ['Wins', 'Losses'],
                    datasets: [{
                        label: 'Overall Stats',
                        backgroundColor: chartColors,
                        data: [totalWins, totalLosses]
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Overall Wins & Losses with friends"
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                const dataset = data.datasets[tooltipItem.datasetIndex];
                                const total = dataset.data.reduce((sum, value) => sum + value, 0);
                                const currentValue = dataset.data[tooltipItem.index];
                                const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                                const statType = data.labels[tooltipItem.index];
                                return statType + ': ' + currentValue + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            });

            updateContent();
            backButtonListener();
        } 
		else
		{
            console.error('Content element not found');
			showAlert('Error occured loading graph. Try Again', 'danger');
			loadContent('profile');
        }
    }
	catch (error)
	{
        console.error('Error fetching chart:', error);
        showAlert('Error fetching chart. Try Again.', 'danger');
        loadContent('profile');
    }
}
