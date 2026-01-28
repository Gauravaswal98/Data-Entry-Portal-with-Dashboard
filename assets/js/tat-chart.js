// ✅ Unique Plugin to show total counts
			const showTATATotalPlugin = {
				id: 'showTATATotalPlugin',
				afterDatasetsDraw(chart) {
					const { ctx, data } = chart;
					const [meta1, meta2] = [chart.getDatasetMeta(0), chart.getDatasetMeta(1)];

					ctx.save();
					data.labels.forEach((label, i) => {
						const bar1 = meta1.data[i];
						const bar2 = meta2.data[i];

						if (bar1 && bar2) {
							const total = data.datasets[0].data[i] + data.datasets[1].data[i];
							const x = bar1.x;
							const y = Math.min(bar1.y, bar2.y) - 10;

							ctx.font = "bold 12px sans-serif";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.fillText(total, x, y);
						}
					});
					ctx.restore();
				}
			};

			// ✅ Chart Initialization
			const tatCtx = document.getElementById("tatComplianceBarChart").getContext("2d");

			const tatComplianceBarChart = new Chart(tatCtx, {
				type: "bar",
				data: {
					labels: [
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
					],
					datasets: [
						{
							label: "Compliance",
							data: [12, 19, 3, 5, 8, 10, 6, 4, 7, 11, 5, 6, 9, 13],
							backgroundColor: 'rgba(111, 123, 247, 1)',
							barThickness: 15,
							borderSkipped: false
						},
						{
							label: "Non Compliance",
							data: [5, 3, 10, 2, 4, 1, 3, 6, 2, 7, 6, 3, 5, 2],
							backgroundColor: 'rgba(255, 93, 126, 1)',
							barThickness: 15,
							borderRadius: {
								topLeft: 5,
								topRight: 5
							},
							borderSkipped: false
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
								minRotation: 45
							}
						},
						y: {
							stacked: true,
							beginAtZero: true
						}
					},
					plugins: {
						legend: {
							display: true,
							position: 'top'
						},
						tooltip: {
							mode: 'index',
							intersect: false
						}
					}
				},
				plugins: [showTATATotalPlugin]
			});

			// 3. Filter Application (Trigger reload based on filter values)
			document.getElementById("tatapply").addEventListener("click", function () {
				const selectedPage = document.getElementById("tatPageFilter").value;
				const selectedAdvisor = document.getElementById("tatadvisorFilter").value;
				const startDate = document.getElementById("tatStartDate").value;
				const endDate = document.getElementById("tatEndDate").value;

				// Call a function to filter and update chart data
				updateTatComplianceChart(selectedPage, selectedAdvisor, startDate, endDate);
			});

			function updateTatComplianceChart(page, advisor, startDate, endDate) {
				// Dummy data - replace with actual filtered logic from backend or JS logic
				const newLabels = ["Call Back", "Call Complete"];
				const complianceData = [10, 7];
				const nonComplianceData = [3, 4];

				tatComplianceBarChart.data.labels = newLabels;
				tatComplianceBarChart.data.datasets[0].data = complianceData;
				tatComplianceBarChart.data.datasets[1].data = nonComplianceData;
				tatComplianceBarChart.update();
			}