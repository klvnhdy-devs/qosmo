const sla2chart2 = a => {
	a = el({a:'div', b:a });

	const warna = [ '#FBC246', '#5788FE', '#FD2D6C', '#FDA403', '#F7418F', '#891652', '#76ABAE', '#114232', '#7F27FF', '#FFF7F1', '#944E63', '#E8C872',];

	(a => {
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.sla.chart2 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Packetloss BBC',
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
							text: 'TREND ACH SLA ACCESS',
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
			
			m.sla.chart2.data.datasets.push({
				...m.sla.chart2.data.datasets[0],
				label: 'Packetloss NON BBC',
				backgroundColor: warna[4],
				borderColor: warna[4],
			})
			m.sla.chart2.data.datasets.push({
				...m.sla.chart2.data.datasets[0],
				label: 'Latency',
				backgroundColor: warna[1],
				borderColor: warna[1],
			})
			m.sla.chart2.data.datasets.push({
				...m.sla.chart2.data.datasets[0],
				label: 'Jitter',
				backgroundColor: warna[2],
				borderColor: warna[2],
			})


			m.sla.chart2GantiData = (a,b) => {
				if (m.sla.chart2Data[a]) {
					if (a == 'nas') {
						m.sla.chart2.data.labels = m.sla.chart2Data[a].labels
						m.sla.chart2Data[a].datasets.forEach((a,b) => { m.sla.chart2.data.datasets[b].data = a })
					} else {
						m.sla.chart2.data.labels = m.sla.chart2Data[a][b].labels
						m.sla.chart2Data[a][b].datasets.forEach((a,b) => { m.sla.chart2.data.datasets[b].data = a })
					}
					m.sla.chart2.update()
				}
			}

            m.sla.tombolGantiChart2 = (a => {
                el({a:'button', b:a, c:'Nasional', e:{click: a => {
					a.target.parentElement.children[1].selectedIndex = -1
					a.target.parentElement.children[2].selectedIndex = -1
					m.sla.chart2GantiData('nas')
					//a.target.classList.toggle('active')
					//gantiChart
				}} });

				(a => { el({a:'option', b:a, c:'TREG'})
				})(el({a:'select', b:a, d:{style:'background: rgba(55,189,187,0.7); border:none; border-radius:7px;'}, e:{change: a => {
					a.target.parentElement.children[2].selectedIndex = -1
					m.sla.chart2GantiData('treg',a.target.value)
				}} }));

				(a => { el({a:'option', b:a, c:'REGION'})
				})(el({a:'select', b:a, d:{style:'background: rgba(55,189,187,0.7); border:none; border-radius:7px;'}, e:{change: a => {
					a.target.parentElement.children[1].selectedIndex = -1
					m.sla.chart2GantiData('tsel',a.target.value)
				}} }));

				return a

            })(el({a:'div', b:a, d:{style:'position:absolute; top:1vh; right:0.5vw; display:flex; gap:3px;'} }))

	})(el({a:'div', b:a, d:{style:'position:relative; width:56vw; height:38vh;'} }))

	m.sla.dataAch = {}
	m.sla.chart2Data = {}
	m.sla.chart3Data = {}

	//console.log(m.sla.tombolGantiChart2.children[1])
	
	//fetch('api.php?cmd=sla-performance&backinterval=12').then(a=>a.json()).then(b => {
	fetch('data/sla-performance1.json').then(a=>a.json()).then(b => {
		/*
		el({
			a:'a',
			b:document.body,
			d: {
				download:'sla-performance1.json',
				href:URL.createObjectURL(new Blob([JSON.stringify(b)], {type: 'application/json'}))
			},
			e: {click: a => {
				a.target.parentElement.removeChild(a.target)
			}}
		}).click()
		*/
		const label4G = Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
		m.sla.chart2Data.nas = {
			labels: label4G,
			datasets: [
				label4G.map(a=>(b.data['4g']['pl-bbc'].find(b=>b.periode==a)||{realisasi:null}).realisasi),
				label4G.map(a=>(b.data['4g']['pl-nbbc'].find(b=>b.periode==a)||{realisasi:null}).realisasi),
				label4G.map(a=>(b.data['4g'].lat.find(b=>b.periode==a)||{realisasi:null}).realisasi),
				label4G.map(a=>(b.data['4g'].jitt.find(b=>b.periode==a)||{realisasi:null}).realisasi),
			]
		}

		m.sla.chart2GantiData('nas')

		const labelCti = Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
		m.sla.chart3Data.nas = {
			labels: labelCti,
			datasets: [
				labelCti.map(a=>(b.data.cti.pl.find(b=>b.periode==a)||{realisasi:null}).realisasi),
				labelCti.map(a=>(b.data.cti.lat.find(b=>b.periode==a)||{realisasi:null}).realisasi),
				labelCti.map(a=>(b.data.cti.jitt.find(b=>b.periode==a)||{realisasi:null}).realisasi),
			]
		}
		m.sla.chart3 && m.sla.chart3GantiData('nas')
	})
	
	
	//fetch('api.php?cmd=sla-performance-treg&backinterval=12').then(a=>a.json()).then(b => {
	fetch('data/sla-performance-treg1.json').then(a=>a.json()).then(b => {
		(a => {
			a.innerHTML = ''
			Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a]
			.map(a=>a.region)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
			.sort().forEach(b => {
				el({a:'option', b:a, c:b, d:{value:b} })
			})
		})(m.sla.tombolGantiChart2.children[1])

		m.sla.chart2Data.treg = {}
		Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].map(a=>a.region)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
		.sort().forEach(c => {
			const label4G = Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].filter(a=>a.region==c).map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
			m.sla.chart2Data.treg[c] = {
				labels: label4G,
				datasets: [
					label4G.map(a=>(b.data['4g']['pl-bbc'].find(b=>b.periode==a&&b.region==c)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g']['pl-nbbc'].find(b=>b.periode==a&&b.region==c)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g'].lat.find(b=>b.periode==a&&b.region==c)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g'].jitt.find(b=>b.periode==a&&b.region==c)||{realisasi:null}).realisasi),
				]
			}
		});

		(a => {
			a.innerHTML = ''
			Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.treg))
			.reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort().forEach(b => {
				el({a:'option', b:a, c:b, d:{value:b} })
			})
		})(m.sla.tombolGantiChart3.children[1])

		m.sla.chart3Data.treg = {}
		const labelCti = Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
		Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.treg)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
		.sort().forEach(c => {
			const labelCti = Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].filter(a=>a.treg==c).map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
			m.sla.chart3Data.treg[c] = {
				labels: labelCti,
				datasets: [
					labelCti.map(a=>(b.data.cti.pl.find(b=>b.periode==a&&b.treg==c)||{realisasi:null}).realisasi),
					labelCti.map(a=>(b.data.cti.lat.find(b=>b.periode==a&&b.treg==c)||{realisasi:null}).realisasi),
					labelCti.map(a=>(b.data.cti.jitt.find(b=>b.periode==a&&b.treg==c)||{realisasi:null}).realisasi),
				]
			}
		})
		
	})
	
	//fetch('api.php?cmd=sla-performance-region&backinterval=12').then(a=>a.json()).then(b => {
	fetch('data/sla-performance-tsel1.json').then(a=>a.json()).then(b => {
		
		(a => {
			a.innerHTML = ''
			Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].map(a=>a.region_tsel)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
			.sort().forEach(b => {
				el({a:'option', b:a, c:b, d:{value:b} })
			})
		})(m.sla.tombolGantiChart2.children[2])
		
		m.sla.chart2Data.tsel = {}
		Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].map(a=>a.region_tsel)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
		.sort().forEach(c => {
			const label4G = Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].filter(a=>a.region_tsel==c).map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
			m.sla.chart2Data.tsel[c] = {
				labels: label4G,
				datasets: [
					label4G.map(a=>(b.data['4g']['pl-bbc'].find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g']['pl-nbbc'].find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g'].lat.find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g'].jitt.find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
				]
			}
		});

		(a => {
			a.innerHTML = ''
			Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.region_tsel)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
			.sort().forEach(b => {
				el({a:'option', b:a, c:b, d:{value:b} })
			})
		})(m.sla.tombolGantiChart3.children[2])
		
		m.sla.chart3Data.tsel = {}
		Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.region_tsel)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[])
		.sort().forEach(c => {
			const labelCti = Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].filter(a=>a.region_tsel==c).map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
			m.sla.chart3Data.tsel[c] = {
				labels: labelCti,
				datasets: [
					labelCti.map(a=>(b.data.cti.pl.find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
					labelCti.map(a=>(b.data.cti.lat.find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
					labelCti.map(a=>(b.data.cti.jitt.find(b=>b.periode==a&&b.region_tsel==c)||{realisasi:null}).realisasi),
				]
			}
		})

		//tabel6
		//console.log(b.data['4g'].lat.map(a=>a.periode).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort().slice(-4))
		m.sla.tabel6Data = b.data

		if (m.sla.tabel6UpdatePlBBC) m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['4g']['pl-bbc']);
		else { setTimeout(()=>{m.sla.tabel6UpdatePlBBC('PACKETLOSS BBC')},3000) }

	})
	
	/*
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
	*/
	//fetch('api.php?cmd=monthly-ach-sla-pl-bbc&backinterval=12').then(a=>a.json()).then(b => { console.log(b);m.sla.dataAch['PL BBC'] = b.data; updateChart(); m.sla.tabel6UpdatePlBBC(b.data) })
	//fetch('api.php?cmd=monthly-ach-sla-pl-nbbc&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch['PL NON BBC'] = b.data; updateChart() })
	//fetch('api.php?cmd=monthly-ach-sla-latency&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch.LATENCY = b.data; updateChart() })
	//fetch('api.php?cmd=monthly-ach-sla-jitter&backinterval=12').then(a=>a.json()).then(b => { m.sla.dataAch.JITTER = b.data; updateChart() })
	

}