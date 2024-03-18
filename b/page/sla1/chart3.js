const sla2chart3 = a => {
	a = el({a:'div', b:a })
	
	const warna = [ '#FBC246', '#5788FE', '#FD2D6C', '#FDA403', '#F7418F', '#891652', '#76ABAE', '#114232', '#7F27FF', '#FFF7F1', '#944E63', '#E8C872',]

	const gantiChart = a => {}
	
	(a => {
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.sla.c3 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Core',
						data: [],
						fill: false,
						backgroundColor: '#FBC246',
						borderColor: '#FBC246',
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
						legend: { display: false, }
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
			});

            (a => {
                el({a:'div', b:a, c:'Nasional'})
                el({a:'div', b:a, c:'Nasional', e:{click:gantiChart} })
                el({a:'div', b:a, c:'TREG', e:{click:gantiChart}})
                el({a:'div', b:a, c:'Region', e:{click:gantiChart}})
            })(el({a:'div', b:a, d:{style:'position:absolute; top:2vh; right:1.5vw;', class:'sla-dropdown1'} }))

	})(el({a:'div', b:a, d:{style:'position:relative; width:56vw; height:38vh;'} }))

}