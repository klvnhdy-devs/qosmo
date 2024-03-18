const sla2tabel6 = a => {
	//height = 41

	const gantiTabel = a => {

		a.target.parentElement.querySelector('.activeMenu').classList.remove('activeMenu')

		if (a.target.textContent == 'PACKETLOSS BBC') {
			a.target.classList.add('activeMenu')
			m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['4g']['pl-bbc'])
		} else if (a.target.textContent == 'PACKETLOSS NON BBC') {
			a.target.classList.add('activeMenu')
			m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['4g']['pl-nbbc'])
		} else if (a.target.textContent == 'LATENCY') {
			a.target.classList.add('activeMenu')
			m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['4g']['lat'])
		} else {
			a.target.classList.add('activeMenu')
			m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['4g']['jitt'])
		}
	}

	m.sla.tombolGantiTabel6 = (a => {
		el({a:'div', b:a, c:'PACKETLOSS BBC', d:{class:'activeMenu', style:'font-size:1.7vmin;font-weight:bold;cursor: pointer;'}, e:{click:gantiTabel} })
		el({a:'div', b:a, c:'PACKETLOSS NON BBC', d:{style:'cursor:pointer; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
		el({a:'div', b:a, c:'LATENCY', d:{style:'cursor:pointer; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
		el({a:'div', b:a, c:'JITTER', d:{style:'cursor:pointer; font-size:1.7vmin; font-weight:bold;'}, e:{click:gantiTabel} })
		return a
	})(el({a:'div', b:a, d:{style:'display:flex; gap: 1vw; align-items:center; height:3vh;'} }));
	
	m.sla.tombolGantiTabel6 = {
		parent: m.sla.tombolGantiTabel6,
		akses: [...m.sla.tombolGantiTabel6.children],
		core: [
			el({a:'div', c:'PACKETLOSS', d:{class:'activeMenu',style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:a=>{
				a.target.parentElement.querySelector('.activeMenu').classList.remove('activeMenu')
				a.target.classList.add('activeMenu')
				m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['cti']['pl'])
			}} }),
			el({a:'div', c:'LATENCY', d:{style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:a=>{
				a.target.parentElement.querySelector('.activeMenu').classList.remove('activeMenu')
				a.target.classList.add('activeMenu')
				m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['cti']['lat'])
			}} }),
			el({a:'div', c:'JITTER', d:{style:'cursor:default; font-size:1.7vmin; font-weight:bold;'}, e:{click:a=>{
				a.target.parentElement.querySelector('.activeMenu').classList.remove('activeMenu')
				a.target.classList.add('activeMenu')
				m.sla.tabel6UpdatePlBBC(m.sla.tabel6Data['cti']['jitt'])
			}} }),
		]
	};

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
		const b = a.reduce((a,b)=>a.find(a=>a==b.periode)?a:[...a,b.periode],[]).slice(-4)

		b.forEach(b => { el({a:'div', b:m.sla.tabel6, c:bulan[parseInt(b.slice(5,7))-1] }) })
		for (var i=b.length; i<4; i++) el({a:'div', b:m.sla.tabel6})

		a.reduce((a,b)=>a.find(a=>a==b.region_tsel)?a:[...a,b.region_tsel],[]).forEach(c => {
			const d = a.filter(a=>a.region_tsel==c)
			const target = parseFloat(d[0].target_sla)
			el({a:'div', b:m.sla.tabel6, c:c})
			el({a:'div', b:m.sla.tabel6, c:d[0].target_sla})
			b.forEach(b => {
				const realisasi = d.find(a=>a.periode==b)
				if (realisasi && realisasi.realisasi) {
					if (parseFloat(realisasi.realisasi)<target)
						el({a:'div', b:m.sla.tabel6, c:realisasi.realisasi, d:{style:'color:red;'} });
					else
						el({a:'div', b:m.sla.tabel6, c:realisasi.realisasi, d:{style:'color:green;'} });
				} else
					el({a:'div', b:m.sla.tabel6 });
			})
			
			for (var i=b.length; i<4; i++) el({a:'div', b:m.sla.tabel6})
		})

	}

	
}