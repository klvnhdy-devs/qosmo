const sla2tabel6 = a => {
	//height = 41

	const gantiTabel = a => {

		if (a.target.textContent == 'PACKETLOSS BBC') {
			m.sla.tabel6UpdatePlBBC(m.sla.dataAch['PL BBC'])
		} else if (a.target.textContent == 'PACKETLOSS NON BBC') {
			m.sla.tabel6UpdatePlBBC(m.sla.dataAch['PL NON BBC'])
		} else if (a.target.textContent == 'LATENCY') {
			m.sla.tabel6UpdatePlBBC(m.sla.dataAch.LATENCY)
		} else {
			m.sla.tabel6UpdatePlBBC(m.sla.dataAch.JITTER)
		}
	}

	(a => {
		el({a:'div', b:a, c:'PACKETLOSS BBC', d:{style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
		el({a:'div', b:a, c:'PACKETLOSS NON BBC', d:{style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
		el({a:'div', b:a, c:'LATENCY', d:{style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
		el({a:'div', b:a, c:'JITTER', d:{style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
	})(el({a:'div', b:a, d:{style:'display:flex; gap: 1vw; align-items:center; height:3vh;'} }));
	
	(a => {
		m.sla.tabel6 = a
		el({a:'div', b:a, c:'Region'})
		el({a:'div', b:a, c:'Target'})
		el({a:'div', b:a, c:'Jan'})
		el({a:'div', b:a, c:'Feb'})
		el({a:'div', b:a, c:'Apr'})
		el({a:'div', b:a, c:'Mar'})

	})(el({a:'div', b:a, d:{style:'display:grid; grid-template-columns:repeat(6,auto); height:38vh;'} }))

	m.sla.tabel6UpdatePlBBC = a => {
		m.sla.tabel6.innerHTML = ''

		el({a:'div', b:m.sla.tabel6, c:'Region'})
		el({a:'div', b:m.sla.tabel6, c:'Target'})
		const b = a.reduce((a,b)=>a.find(a=>a==b.bulan)?a:[...a,b.bulan],[]).slice(-4)

		b.forEach(b => { el({a:'div', b:m.sla.tabel6, c:bulan[parseInt(b.slice(5,7))-1] }) })

		a.reduce((a,b)=>a.find(a=>a==b.region)?a:[...a,b.region],[]).forEach(c => {
			const d = a.filter(a=>a.region==c)
			const target = parseFloat(d[0].target_sla)
			el({a:'div', b:m.sla.tabel6, c:c})
			el({a:'div', b:m.sla.tabel6, c:d[0].target_sla})
			b.forEach(b => {
				const realisasi = d.find(a=>a.bulan==b)
				if (realisasi && realisasi.realisasi) {
					if (parseFloat(realisasi.realisasi)<target)
						el({a:'div', b:m.sla.tabel6, c:realisasi.realisasi, d:{style:'color:red;'} });
					else
						el({a:'div', b:m.sla.tabel6, c:realisasi.realisasi, d:{style:'color:green;'} });
				} else
					el({a:'div', b:m.sla.tabel6 });
			})
		})

	}

	
}