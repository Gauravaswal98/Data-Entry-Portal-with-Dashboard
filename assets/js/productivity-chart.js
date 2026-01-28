			const chartLabels = [
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

			const chartDataMap = {
				Total: [
					"30 (12 Minutes)", "32 (12 Minutes)", "27 (12 Minutes)", "30 (12 Minutes)", "24 (11 Minutes)",
					"29 (11 Minutes)", "42 (11 Minutes)", "28 (10 Minutes)", "32 (13 Minutes)", "23 (12 Minutes)",
					"25 (11 Minutes)", "19 (12 Minutes)", "24 (13 Minutes)", "25 (12 Minutes)"
				],
				Gaurav: [
					"10 (14 Minutes)", "12 (13 Minutes)", "9 (12 Minutes)", "11 (13 Minutes)", "8 (11 Minutes)",
					"10 (12 Minutes)", "15 (11 Minutes)", "10 (10 Minutes)", "12 (14 Minutes)", "8 (12 Minutes)",
					"9 (11 Minutes)", "6 (13 Minutes)", "10 (14 Minutes)", "10 (13 Minutes)"
				],
				Singh: [
					"11 (12 Minutes)", "10 (11 Minutes)", "10 (13 Minutes)", "10 (14 Minutes)", "9 (12 Minutes)",
					"9 (10 Minutes)", "14 (10 Minutes)", "9 (11 Minutes)", "10 (14 Minutes)", "8 (12 Minutes)",
					"8 (13 Minutes)", "7 (11 Minutes)", "7 (12 Minutes)", "8 (13 Minutes)"
				],
				Aswal: [
					"9 (11 Minutes)", "10 (12 Minutes)", "8 (11 Minutes)", "9 (10 Minutes)", "7 (12 Minutes)",
					"10 (11 Minutes)", "13 (12 Minutes)", "9 (10 Minutes)", "10 (13 Minutes)", "7 (12 Minutes)",
					"8 (11 Minutes)", "6 (13 Minutes)", "7 (14 Minutes)", "7 (12 Minutes)"
				]
			};

			const empTransferCtx = document.getElementById("employeeTransferChart").getContext("2d");
			let empTransferChartInstance;

			function updateChart(type = "total", emp = "Total", labelFilter = "all") {
				let selectedData = chartDataMap[emp];
				let selectedLabels = [...chartLabels];

				if (labelFilter !== "all") {
					const index = selectedLabels.indexOf(labelFilter);
					selectedLabels = [selectedLabels[index]];
					selectedData = [selectedData[index]];
				}

				const numericData = selectedData.map(item => parseInt(item));

				if (empTransferChartInstance) empTransferChartInstance.destroy();

				empTransferChartInstance = new Chart(empTransferCtx, {
					type: "bar",
					data: {
						labels: selectedLabels,
						datasets: [{
							label: "Data (Count + Time)",
							data: numericData,
							backgroundColor: 'rgba(111, 123, 247, 1)',
							borderWidth: 1,
							barThickness: 15,
							borderRadius: {
								topLeft: 5,
								topRight: 5
							},
						}]
					},
					options: {
						plugins: {
							legend: { display: false },
							tooltip: {
								callbacks: {
									label: function (context) {
										return selectedData[context.dataIndex];
									}
								}
							},
							datalabels: {
								anchor: 'end',
								align: 'top',
								formatter: function (value, context) {
									return value;
								},
								font: {
									weight: 'bold'
								}
							}
						},
						scales: {
							y: {
								beginAtZero: true
							}
						},
						responsive: true,
						maintainAspectRatio: false
					},
					plugins: [ChartDataLabels]
				});
			}

			document.addEventListener("DOMContentLoaded", function () {
				updateChart();

				document.querySelector("#updata").addEventListener("change", function () {
					const filter = this.value;
					const empType = document.querySelector("#allemp").value;
					const emp = empType === "oneemp" ? document.querySelector("#upemp").value : "Total";
					updateChart(empType, emp, filter);
				});

				document.querySelector("#allemp").addEventListener("change", function () {
					const value = this.value;
					document.querySelector("#upemp").style.display = value === "oneemp" ? "inline-block" : "none";
					const labelFilter = document.querySelector("#updata").value;
					const emp = value === "oneemp" ? document.querySelector("#upemp").value : "Total";
					updateChart(value, emp, labelFilter);
				});

				document.querySelector("#upemp").addEventListener("change", function () {
					const emp = this.value;
					const labelFilter = document.querySelector("#updata").value;
					updateChart("oneemp", emp, labelFilter);
				});
			});