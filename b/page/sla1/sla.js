const sla2 = a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:a, d:{id:'sla2card0'} });
	
	(a => {
		el({a:'div', b:a, c:'WEEKLY MONITORING SLA'})
		a = el({a:'div', b:a})
		sla2tabel1(a)
		sla2tabel2(a)
		sla2tabel3(a)
		sla2tabel4(a)
	})(el({a:'div', b:a, d:{id:'sla2card1' }}));
	
	(a => {
		el({a:'div', b:a, c:'SLA WEEK ON WEEK'})
		sla2tabel5(el({a:'div', b:a}))
		sla2chart1(el({a:'div', b:a, d:{class:'sla2card2-chart1'} }))
	})(el({a:'div', b:a, d:{id:'sla2card2' }}));
	
	(a => {
		el({a:'div', b:a, c:'SLA PERFORMANCE'})
		sla2chart2(a)
		sla2chart3(a)
	})(el({a:'div', b:a, d:{id:'sla2card3' }}));
	
	(a => {
		sla2card1(el({a:'div', b:a}))
		sla2tabel6(el({a:'div', b:a}))
		el({a:'div', b:a, c:'Service Credit' })
		el({a:'div', b:a})
	})(el({a:'div', b:a, d:{id:'sla2card4' }}))
	
}