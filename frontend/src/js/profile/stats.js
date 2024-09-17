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
    try {
        
        const response = await fetch('http://localhost:8000/friends_statistics/', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            console.error('Failed loading friends statistics:', response.statusText);
            showAlert('Error occurred loading friends statistics. Try Again.', 'danger');
            return;
        }

        const data = await response.json();
        let winsTotal = 0;
        let lossesTotal = 0;

        
        data.friends.forEach(friend => {
            winsTotal += friend.wins;
            lossesTotal += friend.losses;
        });


		// const chartsHTML = `
		// 	<div class="container mt-5">
		// 			<div class="row">
		// 				<div class="col-md-12">
		// 					<h2>Line Chart 1</h2>
		// 					<canvas id="myChart"></canvas>
		// 				</div>
		// 			</div>
					
	
		// 		</div>

		// `;		
		const chartsHTML = `
			<div class="chart-container" style="width: 100%">
					<h2>Line Chart 1</h2>
					<canvas class="chart" id="myChart"></canvas>
			</div>		
			`;

		const contentElement = document.getElementById('content');
		if (contentElement)
		{
			
			contentElement.innerHTML = chartsHTML;
			
			let ctx = document.getElementById("myChart").getContext("2d");
			let myChart = new Chart(ctx, {
				type: "line",
				data: {
					labels: [
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday",
						"Sunday",
					],
					datasets: [
						{
							label: "work load",
							data: [2, 9, 3, 17, 6, 3, 7],
							backgroundColor: "rgba(153,205,1,0.6)",
						},
						{
							label: "free hours",
							data: [2, 2, 5, 5, 2, 1, 10],
							backgroundColor: "rgba(155,153,10,0.6)",
						},
					],
				},
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
    try {
        
        const response = await fetch('http://localhost:8000/friends_statistics/', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            console.error('Failed loading friends statistics:', response.statusText);
            showAlert('Error occurred loading friends statistics. Try Again.', 'danger');
            return;
        }

        const data = await response.json();
        let winsTotal = 0;
        let lossesTotal = 0;

        
        data.friends.forEach(friend => {
            winsTotal += friend.wins;
            lossesTotal += friend.losses;
        });


		// const chartsHTML = `
		// 	<div class="container mt-5">
		// 			<div class="row">
		// 				<div class="col-md-12">
		// 					<h2>Line Chart 1</h2>
		// 					<canvas id="myChart"></canvas>
		// 				</div>
		// 			</div>
					
	
		// 		</div>

		// `;		
		const chartsHTML = `
			<div class="chart-container" style="width: 100%">
				<canvas id="myChart" style="width: 100%; background-color: white"></canvas>
			</div>		
			`;

		const contentElement = document.getElementById('content');
		if (contentElement)
		{
			
			contentElement.innerHTML = chartsHTML;
			
			var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
			var yValues = [55, 49, 44, 24, 15];
			var barColors = [
			  "#b91d47",
			  "#00aba9",
			  "#2b5797",
			  "#e8c3b9",
			  "#1e7145"
			];
			
			new Chart("myChart", {
			  type: "doughnut",
			  data: {
				labels: xValues,
				datasets: [{
				  backgroundColor: barColors,
				  data: yValues
				}]
			  },
			  options: {
				title: {
				  display: true,
				  text: "World Wide Wine Production 2018"
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
		console.error('Error fetching chart:', error);
		showAlert('Error fetching chart. Try Again.', 'danger');
		loadContent('profile');
	}
}
