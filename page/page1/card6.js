const page1card6 = a => {
	a = el({a:'div', b:a, d:{id:'page1card6'} })

	el({a:'div', b:a, c:'Gamas per Treg', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });

	(a => {
		const gangguan = el({a:'div', b:a})
		const options = {
			series: [{name:'', data: [0, 0, 0, 0, 0, 0, 0]}],
			chart: {
				toolbar: { show: false },
				type: 'bar',
				height: 250
			},
			plotOptions: {
				bar: {
					borderRadius: 3,
					//horizontal: true,
					//distributed: true,
				}
			},
			dataLabels: {
				enabled: false
			},
			colors: ['#5788FE', ],
			xaxis: {
				categories: [],
			}
		};

		m.p1.card6 = new ApexCharts(gangguan, options)
		m.p1.card6.render()

		fetch('api.php?cmd=total-gamas-treg').then(a=>a.json()).then(a => {
			m.p1.card6.updateOptions({
				series: [{
					name: 'gamas',
					data: a.data.map(a=>parseInt(a.site_not_clear))
				}],
				xaxis: {
					categories: a.data.map(a=>a.region)
				}
			})
		})

	})(el({a:'div', b:a, d:{} }))

}
