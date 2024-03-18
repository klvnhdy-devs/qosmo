const page1card5 = a => {
	a = el({a:'div', b:a, d:{id:'page1card5'} })
	
	el({a:'div', b:a, c:'Summary Site Issue', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} })

	a = el({a:'table', b:a, d:{style:'width:100%;'} });

	(a => {
		el({a:'th', b:a, c:'TREG'})
		el({a:'th', b:a, c:'Pencapaian'})
		el({a:'th', b:a, c:'Total Sites Not Clear'})
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
		}

		a = el({a:'tr', b:a})
		el({a:'td', b:a, c:'Nationwide'})
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })
		el({a:'td', b:a })

	})(a);

	//site not clear
	fetch('api.php?cmd=site-issue-notclear').then(a=>a.json()).then(b => {
		a = [...a.querySelectorAll('tr>td:first-child')]
		var total = 0
		b.data.forEach(b => {
			const c = (a.find(a=>a.textContent == b.region.toUpperCase()) || {parentElement:null}).parentElement
			if (c) {
				c.children[2].textContent = b.site_not_clear
				total += parseInt(b.site_not_clear) || 0
			}
		})

		a[0].parentElement.parentElement.lastElementChild.children[2].textContent = total
	})
	
}
