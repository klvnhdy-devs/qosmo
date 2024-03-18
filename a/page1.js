const page1 = a => {
	a.innerHTML = ''
	
	a = el({a:'div', b:a, d:{id:'p1'}})
	
	const c1 = el({a:'div', b:a, d:{class:'c1', style:'grid-area:1/1 /3/5;'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:1/5 /3/9;'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:3/3 /5/5;'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:3/5 /5/7;'}})
	el({a:'div', b:a, d:{class:'c1', style:'grid-area:3/7 /5/9;'}})
	
	const map = L.map(el({a:'div',b:c1, d:{style:'background:rgba(0,0,0,0); width:100%; height:100%;'}}), {center:[120, -2], zoom:6, zoomSnap:0, zoomControl:false })
	map.attributionControl.setPrefix('')
	fetch('map.json').then(a=>a.json()).then(a=>{
		const layer = L.geoJSON(a, {
			style: a => ({color: '#313131', weight: 1, opacity: 0.5, fillColor: '#'+Math.floor(Math.random()*16777215).toString(16), fillOpacity: 0.5})
		}).addTo(map)
		map.fitBounds(layer.getBounds(), {padding:[3,3]})
	})
	
	return a
	
}