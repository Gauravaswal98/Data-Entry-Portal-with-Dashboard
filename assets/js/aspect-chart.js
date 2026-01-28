let tatadataChart;

			const tatadataRawData = {
				"Bhagyashree Krishna Yel": { "Total Agent Calls": 517, "Login Target": 72, "Login Hours": 69.24, "Deficit": 9334, "Not Ready %": 12, "Utilization %": 88, "Occupancy %": 78, "AHT": 415 },
				"Sajida Ansari": { "Total Agent Calls": 598, "Login Target": 72, "Login Hours": 68.03, "Deficit": 14161, "Not Ready %": 10, "Utilization %": 90, "Occupancy %": 81, "AHT": 430 },
				"Chhaya Digambar Narkar": { "Total Agent Calls": 603, "Login Target": 81, "Login Hours": 80.55, "Deficit": 276, "Not Ready %": 10, "Utilization %": 90, "Occupancy %": 83, "AHT": 390 },
				"Zeeshan Salim Glasswala": { "Total Agent Calls": 187, "Login Target": 72, "Login Hours": 72.11, "Deficit": 0, "Not Ready %": 10, "Utilization %": 90, "Occupancy %": 66, "AHT": 465 },
				"Santosh Nirmal": { "Total Agent Calls": 43, "Login Target": 72, "Login Hours": 74.2, "Deficit": 0, "Not Ready %": 5, "Utilization %": 82, "Occupancy %": 89, "AHT": 365 },
				"Akshaya Dixit": { "Total Agent Calls": 335, "Login Target": 81, "Login Hours": 82.49, "Deficit": 0, "Not Ready %": 8, "Utilization %": 92, "Occupancy %": 39, "AHT": 440 },
				"Harshita Ghind": { "Total Agent Calls": 54, "Login Target": 54, "Login Hours": 50.54, "Deficit": 11156, "Not Ready %": 9, "Utilization %": 91, "Occupancy %": 26, "AHT": 410 }
			};

			function convertSecondsToHMS(sec) {
				const h = Math.floor(sec / 3600).toString().padStart(2, '0');
				const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
				const s = Math.floor(sec % 60).toString().padStart(2, '0');
				return `${h}:${m}:${s}`;
			}

			function convertSecToMinSec(sec) {
				const m = Math.floor(sec / 60).toString().padStart(2, '0');
				const s = Math.floor(sec % 60).toString().padStart(2, '0');
				return `${m}:${s}`;
			}

			function getTotalData(data) {
				const total = {
					"Total Agent Calls": 0,
					"Login Target": 0,
					"Login Hours": 0,
					"Deficit": 0,
					"Not Ready %": 0,
					"Utilization %": 0,
					"Occupancy %": 0,
					"AHT": 0
				};
				const keys = Object.keys(data);
				keys.forEach(emp => {
					const empData = data[emp];
					Object.keys(total).forEach(key => {
						total[key] += empData[key];
					});
				});
				// For average-type fields
				total["Not Ready %"] = (total["Not Ready %"] / keys.length).toFixed(1);
				total["Utilization %"] = (total["Utilization %"] / keys.length).toFixed(1);
				total["Occupancy %"] = (total["Occupancy %"] / keys.length).toFixed(1);
				total["AHT"] = (total["AHT"] / keys.length).toFixed(0);
				return total;
			}

			function renderTatadataChart(data) {
				const labels = Object.keys(data);
				const values = Object.values(data);
				const backgroundColors = [
					'#FF6384', '#36A2EB', '#FFCE56',
					'#4BC0C0', '#9966FF', '#FF9F40',
					'#00B894', '#D63031'
				];
				const displayLabels = labels.map((label, i) => {
					if (label === 'Deficit') return convertSecondsToHMS(values[i]);
					if (label === 'AHT') return convertSecToMinSec(values[i]);
					return values[i].toString();
				});

				if (tatadataChart) tatadataChart.destroy();

				const ctx = document.getElementById("tatadataChartCanvas").getContext("2d");
				tatadataChart = new Chart(ctx, {
					type: "bar",
					data: {
						labels: labels,
						datasets: [{
							label: "Tatadata Metrics",
							data: values,
							backgroundColor: backgroundColors,
							barThickness: 15,
							borderRadius: {
								topLeft: 5,
								topRight: 5
							},
						}]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: { display: false },
							tooltip: {
								callbacks: {
									label: function (context) {
										const label = labels[context.dataIndex];
										const val = values[context.dataIndex];
										if (label === "Deficit") return `Deficit: ${convertSecondsToHMS(val)}`;
										if (label === "AHT") return `AHT: ${convertSecToMinSec(val)}`;
										return `${label}: ${val}`;
									}
								}
							},
							datalabels: {
								color: '#000',
								anchor: 'end',
								align: 'top',
								formatter: function (value, ctx) {
									const label = labels[ctx.dataIndex];
									if (label === "Deficit") return convertSecondsToHMS(value);
									if (label === "AHT") return convertSecToMinSec(value);
									return value;
								}
							}
						},
						scales: {
							y: {
								beginAtZero: true
							}
						}
					},
					plugins: [ChartDataLabels]
				});
			}

			document.getElementById("acpectapply").addEventListener("click", function () {
				const viewType = document.getElementById("acpectemp").value;
				const selectedEmp = document.getElementById("employeeFilterChart").value;

				let finalData;
				if (viewType === "employee") {
					finalData = tatadataRawData[selectedEmp];
				} else {
					finalData = getTotalData(tatadataRawData);
				}

				renderTatadataChart(finalData);
			});

			document.getElementById("acpectemp").addEventListener("change", function () {
				const type = this.value;
				const empDropdown = document.getElementById("employeeFilterChart");
				empDropdown.style.display = type === "employee" ? "inline-block" : "none";
			});

			window.addEventListener("load", () => {
				const defaultData = getTotalData(tatadataRawData);
				renderTatadataChart(defaultData);
			});