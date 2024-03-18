const sla2tabel5 = a => {
	
	el({a:'div', b:a, c:'KPI ZONA MERAH'});

	(a => {

		const total = []
		for (var i=0; i<11; i++) total[i] = 0

		fetch('api.php?cmd=wow-kpi-zona-merah').then(a=>a.json()).then(b => {
			a.innerHTML = ''

			el({a:'div', b:a, c:'PL', d:{style:'background:#2f78a7;color:white; padding-top:1vh; padding-left:2vh'} })
			b.data['pl bbc'].forEach(b => {
				el({a:'div', b:a, c:`W${b.week_num}`, d:{style:'background:#2f78a7;color:white; padding-top:1vh; padding-left:2vh'} })
			})

			el({a:'div', b:a, c:'PL BBC'})
			b.data['pl bbc'].forEach((b,c) => {
				total[c] += parseInt(b.region_not_clear)
				el({a:'div', b:a, c:b.region_not_clear})
			})

			el({a:'div', b:a, c:'PL N BBC'})
			b.data['pl nbbc'].forEach((b,c) => {
				total[c] += parseInt(b.region_not_clear)
				el({a:'div', b:a, c:b.region_not_clear})
			})

			el({a:'div', b:a, c:'Latency 4G'})
			b.data.latency.forEach((b,c) => {
				total[c] += parseInt(b.region_not_clear)
				el({a:'div', b:a, c:b.region_not_clear})
			})

			el({a:'div', b:a, c:'Jitter 4G'})
			b.data.jitter.forEach((b,c) => {
				total[c] += parseInt(b.region_not_clear)
				el({a:'div', b:a, c:b.region_not_clear})
			})

			el({a:'div', b:a, c:'Total', d:{style:'background:#2f78a7; padding-top:1vh; padding-left:2vh'}})
			total.forEach(b => {
				el({a:'div', b:a, c:`${b}`, d:{style:'background:#2f78a7; color:red;padding-top:1vh; padding-left:2vh'}})
			})

		})
		/*
		el({a:'div', b:a, c:'PI'})
		for (var i=1; i<12; i++) el({a:'div', b:a, c:`W${i}`})
		
		el({a:'div', b:a, c:'PL BBC'})
		for (var i=1; i<12; i++) el({a:'div', b:a, c:Math.floor(Math.random() * 21)})

		el({a:'div', b:a, c:'PL N BBC'})
		for (var i=1; i<12; i++) el({a:'div', b:a, c:Math.floor(Math.random() * 21)})

		el({a:'div', b:a, c:'Latency 4G'})
		for (var i=1; i<12; i++) el({a:'div', b:a, c:Math.floor(Math.random() * 21)})

		el({a:'div', b:a, c:'Jitter 4G'})
		for (var i=1; i<12; i++) el({a:'div', b:a, c:Math.floor(Math.random() * 21)})
		
		el({a:'div', b:a, c:'Total'})
		for (var i=1; i<12; i++) el({a:'div', b:a, c:Math.floor(Math.random() * 21)})
		*/
	})(el({a:'div', b:a, d:{class:'sla-tabel2'} }))
	
}