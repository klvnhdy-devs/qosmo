const sla2chart3 = a => {
	a = el({a:'div', b:a });

	const warna = [ '#FBC246', '#5788FE', '#FD2D6C', '#FDA403', '#F7418F', '#891652', '#76ABAE', '#114232', '#7F27FF', '#FFF7F1', '#944E63', '#E8C872',];

	(a => {
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.sla.chart3 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Packetloss',
						data: [],
						fill: false,
						backgroundColor: warna[0],
						borderColor: warna[0],
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
						},
						title: {
							display: true,
							text: 'TREND ACH SLA CORE',
							font: { size: '11', },
						},
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

			m.sla.chart3.data.datasets.push({
				...m.sla.chart3.data.datasets[0],
				label: 'Latency',
				backgroundColor: warna[1],
				borderColor: warna[1],
			})
			m.sla.chart3.data.datasets.push({
				...m.sla.chart3.data.datasets[0],
				label: 'Jitter',
				backgroundColor: warna[2],
				borderColor: warna[2],
			})

			m.sla.chart3GantiData = (a,b) => {
				if (m.sla.chart3Data[a]) {
					if (a == 'nas') {
						m.sla.chart3.data.labels = m.sla.chart3Data[a].labels
						m.sla.chart3Data[a].datasets.forEach((a,b) => { m.sla.chart3.data.datasets[b].data = a })
					} else {
						m.sla.chart3.data.labels = m.sla.chart3Data[a][b].labels
						m.sla.chart3Data[a][b].datasets.forEach((a,b) => { m.sla.chart3.data.datasets[b].data = a })
					}
					m.sla.chart3.update()
				}
			}

            m.sla.tombolGantiChart3 = (a => {
                el({a:'button', b:a, c:'Nasional', e:{click: a => {
					a.target.parentElement.children[1].selectedIndex = -1
					a.target.parentElement.children[2].selectedIndex = -1
					m.sla.chart3GantiData('nas')
					//a.target.classList.toggle('active')
					//gantiChart
				}} });

				(a => { el({a:'option', b:a, c:'TREG'})
				})(el({a:'select', b:a, d:{style:'background: rgba(55,189,187,0.7); border:none; border-radius:7px;'}, e:{change: a => {
					a.target.parentElement.children[2].selectedIndex = -1
					m.sla.chart3GantiData('treg',a.target.value)
				}} }));

				(a => { el({a:'option', b:a, c:'REGION'})
				})(el({a:'select', b:a, d:{style:'background: rgba(55,189,187,0.7); border:none; border-radius:7px;'}, e:{change: a => {
					a.target.parentElement.children[1].selectedIndex = -1
					m.sla.chart3GantiData('tsel',a.target.value)
				}} }));

				return a

            })(el({a:'div', b:a, d:{style:'position:absolute; top:1vh; right:0.5vw; display:flex; gap:3px;'} }))

	})(el({a:'div', b:a, d:{style:'position:relative; width:56vw; height:38vh;'} }))

}