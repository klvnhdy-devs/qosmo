const access1 = a => {
	a.innerHTML = ''
	
	map1(a)
	document.querySelector('#map1').children[0].classList.add('access1')
	access1card1(a)
	access1card2(a)
	access1card3(a)
	access1card4(a)
	access1card5(a)
	access1card6(a)
}