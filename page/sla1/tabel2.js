const sla2tabel2 = a => {
	
	(a => {
		el({a:'div', b:a, c:'SLA PACKET LOSS 4G NON BBC W04'})
		
		a = el({a:'table', b:a, d:{class:'sla-tabel1'} });
		
		const addHeader = a => {
			(a => {
			el({a:'th', b:a, c:'REGION', d:{rowspan:2} })
			el({a:'th', b:a, c:'TARGET SLA PL 4G', d:{rowspan:2} })
			el({a:'th', b:a, c:'REALISASI SLA W04', d:{rowspan:2} })
			el({a:'th', b:a, c:'TOTAL SITES', d:{rowspan:2} })
			el({a:'th', b:a, c:'NOT CLEAR W04', d:{rowspan:2} })
			el({a:'th', b:a, c:'TOLERANSI SITE NOT CLEAR', d:{colspan:3} })
			el({a:'th', b:a, c:'GAP TO HIJAU ZONE', d:{rowspan:2} })

			a = el({a:'tr', b:a.parentElement})
			el({a:'th', b:a, c:'HIJAU' })
			el({a:'th', b:a, c:'KUNING' })
			el({a:'th', b:a, c:'MERAH' })

			})(el({a:'tr', b:a}))
		}
		addHeader(a)
		
		fetch("api.php?cmd=weekly-sla-pl-nbbc").then((a) => a.json()).then((b) => {

			a.innerHTML = ''
			addHeader(a)

			const week_num = (b => (b < 10 ? '0' : '' ) + b)(parseInt(b.data[0].week_num) || 0)

			a.previousElementSibling.textContent = `SLA PACKET LOSS 4G NON BBC W${week_num}`
			a.children[0].children[4].textContent = `NOT CLEAR W${week_num}`
			

			b.data.forEach(b => {
				const c = el({a:'tr', b:a})
				const d = (parseInt(b.site_not_clear) || 0 ) - (parseInt(b.toleransi_site_not_clear_hijau.slice(1)) || 0)
				const merah = {style:'background:rgba(255,0,0,0.3);'}
				el({a:'td', b:c, c:b.region})
				el({a:'td', b:c, c:b.target_sla})
				el({a:'td', b:c, c:b.realisasi})
				el({a:'td', b:c, c:b.total_sites})
				el({a:'td', b:c, c:b.site_not_clear})
				el({a:'td', b:c, c:b.toleransi_site_not_clear_hijau})
				el({a:'td', b:c, c:b.toleransi_site_not_clear_kuning})
				el({a:'td', b:c, c:b.toleransi_site_not_clear_merah})
				el({a:'td', b:c, c:d, d:d>0?merah:{} })
			})
		})

	})(el({a:'div', b:a }))
	
}