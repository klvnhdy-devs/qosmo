const sla2card1 = a => {
	
	el({a:'div', b:a, c:'Monthly Achivement SLA' });

	(a => {
		el({a:'div', b:a, c:'Access'})
		el({a:'div', b:a, c:'Core'})
	})(el({a:'div', b:a}))
	
}
