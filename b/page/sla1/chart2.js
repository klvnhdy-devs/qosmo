const sla2chart2 = a => {
	a = el({a:'div', b:a });

	const warna = [ '#FBC246', '#5788FE', '#FD2D6C', '#FDA403', '#F7418F', '#891652', '#76ABAE', '#114232', '#7F27FF', '#FFF7F1', '#944E63', '#E8C872',]

	const gantiChart = a => {}
	
	(a => {
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.sla.c2 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: '',
						data: [],
						fill: false,
						backgroundColor: '#fff',
						borderColor: '#fff',
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
			});

            (a => {
                el({a:'div', b:a, c:'Nasional'})
                el({a:'div', b:a, c:'Nasional', e:{click:gantiChart} })
                el({a:'div', b:a, c:'TREG', e:{click:gantiChart}})
                el({a:'div', b:a, c:'Region', e:{click:gantiChart}})
            })(el({a:'div', b:a, d:{style:'position:absolute; top:2vh; right:1.5vw;', class:'sla-dropdown1'} }))

	})(el({a:'div', b:a, d:{style:'position:relative; width:56vw; height:38vh;'} }))

	m.sla.dataAch = {}
	const updateChart = () => {
		if (Object.keys(m.sla.dataAch).length > 3) {
			const region = m.sla.dataAch['PL BBC'][0].region

            const dt = m.sla.c2.data.datasets[0]
            m.sla.c2.data.datasets = []

			m.sla.c2.data.labels = m.sla.dataAch['PL BBC'].reduce((a,b)=>a.find(a=>a==b.bulan)?a:[...a,b.bulan],[]).map(a=>`${bulan[parseInt(a.slice(5,7))-1]}-${a.slice(2,4)}`)
			Object.keys(m.sla.dataAch).forEach((a,b) => {
                dt.label = a
				dt.backgroundColor = warna[b+1]
				dt.borderColor = warna[b+1]
				dt.data = m.sla.dataAch[a].filter(a=>a.region==region).map(a=>a.achv)
                m.sla.c2.data.datasets.push({...dt})
			})
			m.sla.c2.update()
		}
	}
	fetch('api.php?cmd=monthly-ach-sla-pl-bbc&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch['PL BBC'] = b.data; updateChart(); m.sla.tabel6UpdatePlBBC(b.data) })
	fetch('api.php?cmd=monthly-ach-sla-pl-nbbc&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch['PL NON BBC'] = b.data; updateChart() })
	fetch('api.php?cmd=monthly-ach-sla-latency&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch.LATENCY = b.data; updateChart() })
	fetch('api.php?cmd=monthly-ach-sla-jitter&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch.JITTER = b.data; updateChart() })
	

}