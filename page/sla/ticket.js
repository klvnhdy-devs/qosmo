const ticket1 = a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:a, d:{id:'ticket1card0'} })
	
	ticket1card1(a)
	ticket1card2(a)
	ticket1card3(a)
	ticket1card4(a)
	ticket1card5(a)
	ticket1card6(a)
	
	for (var i=7; i<13; i++) el({a:'div', b:a, d:{id:`ticket1card${i}`} })
}