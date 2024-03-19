const page1card5 = a => {
	a = el({a:'div', b:a, d:{id:'page1card5'} })
	
	el({a:'div', b:a, c:'Summary Site Issue', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} })

	a = el({a:'table', b:a, d:{id:'tablePage1', style:'width:100%;height: 40vh;'} });

	(a => {
		el({a:'th', b:a, c:'TREG'})
		el({a:'th', b:a, c:'Pencapaian'})
		el({a:'th', b:a, c:'Total Sites'})
		el({a:'th', b:a, c:'Sites Not Clear'})
		el({a:'th', b:a, c:'On Order'})
		el({a:'th', b:a, c:'On Ticket'})
		el({a:'th', b:a, c:'No Plan'})
	})(el({a:'tr', b:a}));

	(a => {
		for (var i=1; i<8; i++) {
			const b = el({a:'tr', b:a})
			el({a:'td', b:b, c:`TREG-${i}`})
			el({a:'td', b:b })
			el({a:'td', b:b })
			el({a:'td', b:b })
			el({a:'td', b:b })
			el({a:'td', b:b })
			el({a:'td', b:b })
		}

		a = el({a:'tr', b:a})
		el({a:'td', b:a, c:'Nationwide'})
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })

	})(a);

	//site not clear
	fetch('api.php?cmd=site-issue-notclear').then(a=>a.json()).then(b => {
		console.log(b)
		const total = {
			sites:0,
			not_clear:0,
			onorder:0,
			onticket:0,
			noplan:0
		}
		const ln = a.children.length -1
		for (var i=1; i<ln; i++) {
			const c = b.data.find(b=>b.region.toUpperCase() == a.children[i].children[0].textContent.toUpperCase())
			const d = [parseInt(c.total_sites) || 0 , parseInt(c.site_not_clear || 0)]

			a.children[i].children[1].textContent = (100*(d[0] - d[1])/d[0]).toFixed(2)
			a.children[i].children[2].textContent = c.total_sites
			a.children[i].children[2].textContent = c.total_sites
			a.children[i].children[3].textContent = c.site_not_clear
			a.children[i].children[4].textContent = c.on_order
			a.children[i].children[5].textContent = c.on_ticket
			a.children[i].children[6].textContent = c.no_plan
			total.sites += d[0]
			total.not_clear += d[1]
			total.onorder += parseInt(c.on_order) || 0
			total.onticket += parseInt(c.on_ticket) || 0
			total.noplan += parseInt(c.no_plan) || 0
		}
		a.children[ln].children[1].textContent = (100*(total.sites - total.not_clear)/total.sites).toFixed(2)
		a.children[ln].children[2].textContent = total.sites
		a.children[ln].children[3].textContent = total.not_clear
		a.children[ln].children[4].textContent = total.onorder
		a.children[ln].children[5].textContent = total.onticket
		a.children[ln].children[6].textContent = total.noplan
	
	})
}
