const sla2card1 = a => {
	
	el({a:'div', b:a, c:'Monthly Achivement SLA' });

	(a => {
		el({a:'div', b:a, c:'Access', d:{class:'active2', style:'box-shadow:none;cursor: pointer;'}, e:{click:a=> {
			a.target.parentElement.querySelector('.active2').classList.remove('active2')
			a.target.classList.add('active2')
			m.sla.tombolGantiTabel6.parent.innerHTML = ''
			m.sla.tombolGantiTabel6.akses.forEach(a=>{ m.sla.tombolGantiTabel6.parent.appendChild(a) } )
			m.sla.tombolGantiTabel6.parent.querySelector('.activeMenu').click()
		}} })
		el({a:'div', b:a, c:'Core', d:{style:'box-shadow:none;cursor: pointer;'}, e:{click:a=> {
			a.target.parentElement.querySelector('.active2').classList.remove('active2')
			a.target.classList.add('active2')
			m.sla.tombolGantiTabel6.parent.innerHTML = ''
			m.sla.tombolGantiTabel6.core.forEach(a=>{ m.sla.tombolGantiTabel6.parent.appendChild(a) } )
			m.sla.tombolGantiTabel6.parent.querySelector('.activeMenu').click()
		}} })
	})(el({a:'div', b:a}))
}
