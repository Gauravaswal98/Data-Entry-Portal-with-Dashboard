const allLabels = [
				"Call Back",
				"Call Complete",
				"Call disconnected by customer",
				"Complaint status",
				"NCT",
				"Partial Success",
				"Service Complaint Status",
				"Service Lead status",
				"Warranty related",
				"Transfer To Warranty Helpline",
				"Transfer To Helpline AOD",
				"Transfer To Webchat AOD",
				"Transfer To Helpline",
				"Transfer To Smartcare"
			];

			const allData = [
				{ label: "Call Back", advisor: "Advisor B", date: "2025-07-24", pending: 3, completed: 6 },
				{ label: "Call Complete", advisor: "Advisor C", date: "2025-07-24", pending: 1, completed: 8 },
				{ label: "Call disconnected by customer", advisor: "Advisor A", date: "2025-07-24", pending: 2, completed: 5 },
				{ label: "Complaint status", advisor: "Advisor A", date: "2025-07-24", pending: 5, completed: 8 },
				{ label: "NCT", advisor: "Advisor A", date: "2025-07-24", pending: 2, completed: 4 },
				{ label: "Partial Success", advisor: "Advisor B", date: "2025-07-24", pending: 3, completed: 7 },
				{ label: "Service Complaint Status", advisor: "Advisor C", date: "2025-07-24", pending: 4, completed: 9 },
				{ label: "Service Lead status", advisor: "Advisor A", date: "2025-07-24", pending: 1, completed: 6 },
				{ label: "Warranty related", advisor: "Advisor B", date: "2025-07-24", pending: 2, completed: 8 },
				{ label: "Transfer To Warranty Helpline", advisor: "Advisor A", date: "2025-07-24", pending: 5, completed: 12 },
				{ label: "Transfer To Helpline AOD", advisor: "Advisor B", date: "2025-07-24", pending: 4, completed: 10 },
				{ label: "Transfer To Webchat AOD", advisor: "Advisor C", date: "2025-07-24", pending: 3, completed: 9 },
				{ label: "Transfer To Helpline", advisor: "Advisor A", date: "2025-07-24", pending: 2, completed: 7 },
				{ label: "Transfer To Smartcare", advisor: "Advisor B", date: "2025-07-24", pending: 6, completed: 11 }
			];

			// Prepare data arrays
			const pendingData = [];
			const completedData = [];

			allLabels.forEach(label => {
				const item = allData.find(d => d.label === label);
				if (item) {
					pendingData.push(item.pending);
					completedData.push(item.completed);
				} else {
					pendingData.push(0);
					completedData.push(0);
				}
			});

			const ctx = document.getElementById('dispositionBarChart').getContext('2d');

			const dispositionChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: allLabels,
					datasets: [
						{
							label: 'Pending',
							data: pendingData,
							backgroundColor: 'rgba(111, 123, 247, 1)',
							stack: 'combined',
							barThickness: 15
						},
						{
							label: 'Completed',
							data: completedData,
							backgroundColor: 'rgba(255, 93, 126, 1)',
							stack: 'combined',
							barThickness: 15,
							borderRadius: {
								topLeft: 5,
								topRight: 5
							}
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					layout: {
						padding: {
							left: 20,
							right: 20
						}
					},
					scales: {
						x: {
							stacked: true,
							ticks: {
								maxRotation: 45,
								minRotation: 0
							}
						},
						y: {
							stacked: true,
							beginAtZero: true
						}
					},
					plugins: {
						legend: {
							position: 'top'
						},
						tooltip: {
							mode: 'index',
							intersect: false
						},
						datalabels: {
							display: true,
							color: '#000',
							anchor: 'end',
							align: 'start',
							formatter: function (value, context) {
								const index = context.dataIndex;
								if (context.datasetIndex === 1) {
									const total = pendingData[index] + completedData[index];
									return `${total}`;
								}
								return '';
							}
						}
					},
					interaction: {
						mode: 'index',
						intersect: false
					}
				},
				plugins: [ChartDataLabels]
			});


			function updateChart() {
				const selectedDisposition = document.getElementById("pcdata").value;
				const selectedAdvisor = document.getElementById("pcadvisorFilter").value;
				const startDate = document.getElementById("pcStartDate").value;
				const endDate = document.getElementById("pcEndDate").value;

				// Filter based on selected options
				const filtered = allData.filter(item => {
					const dispositionMatch = selectedDisposition === "all" || item.label === selectedDisposition;
					const advisorMatch = selectedAdvisor === "all" || item.advisor === selectedAdvisor;
					const dateMatch = (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate);
					return dispositionMatch && advisorMatch && dateMatch;
				});

				// Initialize empty values
				const pendingData = {};
				const completedData = {};
				allLabels.forEach(label => {
					pendingData[label] = 0;
					completedData[label] = 0;
				});

				// Sum up filtered data
				filtered.forEach(item => {
					pendingData[item.label] += item.pending;
					completedData[item.label] += item.completed;
				});

				// Update chart data
				dispositionChart.data.datasets[0].data = allLabels.map(label => pendingData[label]);
				dispositionChart.data.datasets[1].data = allLabels.map(label => completedData[label]);
				dispositionChart.update();
			}

			// Default run on page load — today's date
			window.addEventListener("DOMContentLoaded", () => {
				const today = new Date().toISOString().split("T")[0];
				document.getElementById("pcStartDate").value = today;
				document.getElementById("pcEndDate").value = today;
				updateChart();
			});

			// On Apply click
			document.getElementById("pcapply").addEventListener("click", updateChart);

			document.getElementById("pcDownloadBtn").addEventListener("click", function () {
				const selectedDisposition = document.getElementById("pcdata").value;
				const selectedAdvisor = document.getElementById("pcadvisorFilter").value;
				const startDate = document.getElementById("pcStartDate").value;
				const endDate = document.getElementById("pcEndDate").value;

				const filteredData = allData.filter(item => {
					const matchDisposition = selectedDisposition === "Select Here" || item.label === selectedDisposition;
					const matchAdvisor = selectedAdvisor === "all" || item.advisor === selectedAdvisor;
					const matchDate = (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate);
					return matchDisposition && matchAdvisor && matchDate;
				});

				if (filteredData.length === 0) {
					alert("No data available for selected filters.");
					return;
				}

				// Group and summarize data
				const summary = {};
				filteredData.forEach(item => {
					if (!summary[item.label]) {
						summary[item.label] = { pending: 0, completed: 0 };
					}
					summary[item.label].pending += item.pending;
					summary[item.label].completed += item.completed;
				});

				const exportData = Object.entries(summary).map(([label, values]) => ({
					"Disposition": label,
					"Pending": values.pending,
					"Completed": values.completed,
					"Total": values.pending + values.completed
				}));

				// Convert to worksheet & Excel file
				const worksheet = XLSX.utils.json_to_sheet(exportData);
				const workbook = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(workbook, worksheet, "Disposition Data");

				XLSX.writeFile(workbook, "disposition_data.xlsx");
			});


			// Default chart on load
			window.addEventListener("DOMContentLoaded", () => {
				updateChart();
			});