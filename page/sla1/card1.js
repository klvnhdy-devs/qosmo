const sla2card1 = a => {
	
	el({a:'div', b:a, c:'Monthly Achivement SLA' });

	const changeActive = a => {
		a.target.parentElement.querySelector('.active2').classList.remove('active2')
		if (a.target.textContent == 'Access') {
			a.target.classList.add('active2')
		} else {
			a.target.classList.add('active2')
		}
	}

	(a => {
		el({a:'div', b:a, c:'Access', d:{class:'active2', style:'box-shadow:none;cursor: pointer;'}, e:{click:changeActive}})
		el({a:'div', b:a, c:'Core', d:{style:'box-shadow:none;cursor: pointer;'}, e:{click:changeActive} })
	})(el({a:'div', b:a}))
	
}
