const page1card3 = a => {
	a = el({a:'div', b:a, d:{id:'page1card3'} })

	el({a:'div', b:a, c:'Trend Latency End to End', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });
	
	// el({a:'div', b:a, c:'Trend Latency End to Ends', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });
	// el({a:'div', b:a, c:'Trend Latency End to End', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });
	// el({a:'div', b:a, c:'Trend Latency End to End', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });

	
	
	(a => {
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.p1.c3 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [
					{
						label: 'CX',
						data: [],
						fill: false,
						backgroundColor: '#FBC246',
						borderColor: '#FBC246',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},{
						label: 'Core',
						data: [],
						fill: false,
						backgroundColor: '#5788FE',
						borderColor: '#5788FE',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					{
						label: 'Access',
						data: [],
						fill: false,
						backgroundColor: '#8E3DFA',
						borderColor: '#8E3DFA',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					]
				},
				options: {
					plugins: {
						datalabels: {
							color: 'rgba(0,0,0,0)',
							//formatter: function (value) { return Math.round(value) + '%' },
							//font: {
							//	weight: 'bold',
							//	size: 16,
							//}
						},
						legend: {
							position: 'bottom',
							labels: {
								usePointStyle: true,
								color: '#000',
								font: { size: 9, }
							}
						}
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})

	})(el({a:'div', b:a, d:{style:'position:relative; width:43vw; height:25vh;'} }))

	fetch("api.php?cmd=overview-trend-latency").then((a) => a.json()).then((b) => {
		m.p1.c3.data.labels = b.data.map(a=>a.periode)
		m.p1.c3.data.datasets[1].data = b.data.map(a=>a.core?parseFloat(a.core.split('|')[1])||null:null)
		m.p1.c3.data.datasets[2].data = b.data.map(a=>a.access?parseFloat(a.access.split('|')[1])||null:null)
		m.p1.c3.data.datasets[0].data = b.data.map(a=>a.ce?parseFloat(a.ce.split('|')[1])||null:null)
		m.p1.c3.update()

		console.log(m.p1.c3.data.datasets[0])

	})
}

