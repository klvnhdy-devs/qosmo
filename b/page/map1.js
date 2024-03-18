const map1 = a => {
	a = el({a:'div', b:a, d:{id:'map1'}})
	
	m.map1 = L.map(el({a:'div', b:a}),
		{
			center: [120, -2],
			zoom: 6,
			zoomControl:false,
			zoomSnap: 0.001,
			boxZoom: false,
			doubleClickZoom: false,
			dragging: false,
			keyboard: false,
			scrollWheelZoom: false,
			tapHold: false,
			touchZoom: false
	});
	
	m.map1.attributionControl.setPrefix('')
	fetch('map.json').then(a=>a.json()).then(a => {
		
		m.layer1 = L.geoJSON(a, {
			style: a => ({color: '#313131', weight: 1, opacity: 0.5, fillColor: ['#999A9E', '#D3AF3D', '#D9D9D9', '#B28E65'][Math.floor(Math.random() * 3)], fillOpacity: 0.5}),
			bubblingMouseEvents: false,
			onEachFeature: (feature, layer) => {
				layer.on('mouseover', function () { this.setStyle({ opacity: 1 }) })
				layer.on('mouseout', function () { this.setStyle({ opacity: 0.5 }) })
				layer.on('click', function () {
					//window.location = feature.properties.url
				})
			}
		}).addTo(m.map1)
		m.map1.fitBounds(m.layer1.getBounds(), {padding:[0,0]})
		
	});
	
	//const b = el({a:'select', b:el({a:'div', b:a}) })
	//el({a:'option', b:b, c:'TREG'})
	//el({a:'option', b:b, c:'WITEL'})
	
	//legend
	(a => {
		el({a:'div', b:a})
		el({a:'div', b:a, c:'Platinum'})
		el({a:'div', b:a})
		el({a:'div', b:a, c:'Gold'})
		el({a:'div', b:a})
		el({a:'div', b:a, c:'Silver'})
		el({a:'div', b:a})
		el({a:'div', b:a, c:'Bronze'})
	})(el({a:'div', b:a }))
}
