const page1card7 = a => {
	a = el({a:'div', b:a, d:{id:'page1card7'} })
	el({a:'div', b:a, c:'0', d:{style:'text-align: center; font-size:3vmin; font-weight:bold; margin-bottom:1vh;'} });
	el({a:'div', b:a, c:'GAMAS', d:{style:'text-align: center; font-size:4vmin; font-weight:bold; margin-bottom:1vh;'} });
	el({a:'div', b:a, c:'', d:{style:'text-align: center; font-size:1.5vmin; font-weight:bold; margin-bottom:5vh;'} });
	//el({a:'div', b:a, c:'Last Week : 300', d:{style:'text-align: center; font-size:1.5vmin; font-weight:bold; margin-bottom:5vh;'} });
	el({a:'div', b:a, c:'0', d:{style:'text-align: center; font-size:3vmin; font-weight:bold; margin-bottom:1vh;'} });
	el({a:'div', b:a, c:'Impacted', d:{style:'text-align: center; font-size:4vmin; font-weight:bold; margin-bottom:1vh;'} });
	el({a:'div', b:a, c:'Sites', d:{style:'text-align: center; font-size:3.5vmin; font-weight:bold; margin-bottom:1vh;'} });
	//el({a:'div', b:a, c:'Last Week : 600', d:{style:'text-align: center; font-size:1.5vmin; font-weight:bold; margin-bottom:1vh;'} });
	el({a:'div', b:a, c:'', d:{style:'text-align: center; font-size:1.5vmin; font-weight:bold; margin-bottom:1vh;'} });
	
	fetch('api.php?cmd=total-gamas-impacted').then(a=>a.json()).then(b=>{
		a.children[0].textContent = b.data.gamas
		a.children[3].textContent = b.data.impacted_sites
	})
}
