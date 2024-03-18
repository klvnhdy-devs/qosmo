const sla2chart1 = a => {
    
    const gantiChart = a => {

        a.target.parentElement.children[0].textContent = a.target.textContent
        a = a.target.textContent
        
		const warna = [ '#FBC246', '#5788FE', '#FD2D6C', '#FDA403', '#F7418F', '#891652', '#76ABAE', '#114232', '#7F27FF', '#FFF7F1', '#944E63', '#E8C872',]

        fetch('api.php?cmd=wow-site-not-clear-chart').then(a=>a.json()).then(b => {
            const dt = m.sla.c1.data.datasets[0]
            m.sla.c1.data.datasets = []

            if (a == 'Nasional') {
                dt.label = 'Nasional'
				dt.backgroundColor = '#ffffff'
				dt.borderColor = '#ffffff'
				m.sla.c1.data.labels = b.data.national.map(a=>`${bulan[parseInt(a.tanggal.slice(5,7))-1]}-${a.tanggal.slice(2,4)}`)
                m.sla.c1.data.datasets.push({...dt})
                m.sla.c1.data.datasets[0].data = b.data.national.map(a=>a.site_not_clear)
            } else if (a == 'TREG') {
				m.sla.c1.data.labels = b.data.treg.reduce((a,b)=>a.find(a=>a==b.tanggal)?a:[...a,b.tanggal],[]).map(a=>`${bulan[parseInt(a.slice(5,7))-1]}-${a.slice(2,4)}`)
                b.data.treg.reduce((a,b)=>a.find(a=>a==b.region)?a:[...a,b.region],[]).forEach((c,d) => {
                    dt.label = c
					dt.backgroundColor = warna[d]
					dt.borderColor = warna[d]
                    dt.data = b.data.treg.filter(b=>b.region==c).map(b=>b.site_not_clear)
                    m.sla.c1.data.datasets.push({...dt})
                })
            } else {
				m.sla.c1.data.labels = b.data.region.reduce((a,b)=>a.find(a=>a==b.tanggal)?a:[...a,b.tanggal],[]).map(a=>`${bulan[parseInt(a.slice(5,7))-1]}-${a.slice(2,4)}`)
                b.data.region.reduce((a,b)=>a.find(a=>a==b.region)?a:[...a,b.region],[]).forEach((c,d) => {
                    dt.label = c
					dt.backgroundColor = warna[d]
					dt.borderColor = warna[d]
                    dt.data = b.data.region.filter(b=>b.region==c).map(b=>b.site_not_clear)
                    m.sla.c1.data.datasets.push({...dt})
                })
            }
            m.sla.c1.update()
        })

    }

	el({a:'div', b:a, c:'SITE NOT CLEAR'});

	(a => {
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.sla.c1 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Core',
						data: [],
						fill: false,
						backgroundColor: '#ffffff',
						borderColor: '#ffffff',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					{
						label: 'Access',
						data: [],
						fill: false,
						backgroundColor: '#ffffff',
						borderColor: '#ffffff',
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
	})(el({a:'div', b:a, d:{style:'position:relative; width:33vw; height:30vh; background:#4aa0d0'} }))

    el({a:'div', b:a, c:'WoW : 350 Site | MtD : 746 Site | YtD : 1025 Site' })

    fetch('api.php?cmd=wow-site-not-clear-chart').then(a=>a.json()).then(b => {
		m.sla.c1.data.labels = b.data.national.map(a=>`${bulan[parseInt(a.tanggal.slice(5,7))-1]}-${a.tanggal.slice(2,4)}`)
		m.sla.c1.data.datasets[0].data = b.data.national.map(a=>a.site_not_clear)
		m.sla.c1.update()
        
    })
}