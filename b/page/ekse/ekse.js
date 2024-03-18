const executive1 = a => {
	
	a = el({a:'div', b:a, d:{style:'display:flex; flex-wrap:wrap; padding:0; position:fixed; left:0; top:9vh;'} })

	el({a:'div', b:a, c:'Network Performance', d:{class:'title1'}});
	
	//card1
	(a => {
		a = el({a:'div', b:a, d:{id:'ekse1card1'}})
		
		m.ekse.map = L.map(el({a:'div',b:a, d:{style:'background:rgba(0,0,0,0); width: 44vw; height: 40vh; '}}),
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
		
		//legend
		(a => {
			el({a:'div', b:a})
			el({a:'div', b:a, c:'Excellence'})
			el({a:'div', b:a})
			el({a:'div', b:a, c:'Good'})
			el({a:'div', b:a})
			el({a:'div', b:a, c:'Fair'})
			el({a:'div', b:a})
			el({a:'div', b:a, c:'Poor/Bad'})
		})(el({a:'div', b:a }))
		
		const mapColor = {excellence:'#999A9E', Good:'#D3AF3D', Fair:'#D9D9D9', Poor:'#B28E65'}

		m.ekse.map.attributionControl.setPrefix('')
		fetch('map1.json').then(a=>a.json()).then(a=>{
			m.ekse.layer = L.geoJSON(a, {
				//style: a => ({color: '#313131', weight: 1, opacity: 0.5, fillColor: ['#999A9E', '#D3AF3D', '#D9D9D9', '#B28E65'][Math.floor(Math.random() * 3)], fillOpacity: 0.5}),
				style: a => ({color: '#313131', weight: 1, opacity: 0.7, fillColor: '#999A9E', fillOpacity: 0.5}),
				bubblingMouseEvents: false,
				onEachFeature: (feature, layer) => {
					layer.on('mouseover', a => {
						layer.setStyle({ opacity: 1 })
						m.ekse.mapPopup.innerHTML = JSON.stringify(layer.feature.properties, null, 2)
						m.ekse.mapPopup.style.top = (a.originalEvent.clientY-10) + 'px'
						m.ekse.mapPopup.style.left = a.originalEvent.clientX + 'px'
						!m.ekse.mapPopup.parentElement && document.body.appendChild(m.ekse.mapPopup)
						console.log(a.originalEvent.clientY+'  '+a.originalEvent.clientX)
					})
					layer.on('mouseout', a => {
						layer.setStyle({ opacity: 0.7 })
						m.ekse.mapPopup.parentElement && document.body.removeChild(m.ekse.mapPopup)
					})
					layer.on('click', function () {
						//window.location = feature.properties.url
					})
				}
			}).addTo(m.ekse.map)
			m.ekse.map.fitBounds(m.ekse.layer.getBounds(), {padding:[0,0]})

			fetch('api.php?cmd=network-performance').then(a=>a.json()).then(a=>{
				console.log(a)
				m.ekse.layer.eachLayer(layer => {
					const prop = a.data.detail.find(a=>a.region==layer.feature.properties.nama)
					layer.feature.properties = {
						...layer.feature.properties,
						...prop,
						color: mapColor[prop.status]
					}
					layer.setStyle({fillColor:mapColor[prop.status]})
				})

				m.ekse.mapSummary.children[0].textContent = a.data.summary.total_sites.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + ' Sites'
				m.ekse.mapSummary.children[1].textContent = (a.data.summary.total_sites-a.data.summary.site_not_clear).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + ' Clear'
				m.ekse.mapSummary.children[3].textContent = a.data.summary.site_not_clear.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + ' Not Clear'
			})
			
		})
		
		m.ekse.mapSummary = el({a:'div', b:a})
		el({a:'div', b:m.ekse.mapSummary, c:'Sites'})
		el({a:'div', b:m.ekse.mapSummary, c:'Clear'})
		el({a:'div', b:m.ekse.mapSummary })
		el({a:'div', b:m.ekse.mapSummary, c:'Not Clear'})
		m.ekse.mapPopup = el({a:'div', d:{style:'position:fixed; background:white; padding:1vw;'} })
	})(a);
	
	//card2
	(a => {
		a = el({a:'div', b:a, d:{id:'ekse1card2'}})
		
		el({a:'div', b:a, c:'Trend Latency End to End', d:{class:'title2'}})
		
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0; padding:0 0.5vw; width:24vw; height:38.5vh; display:flex; align-items:center; justify-content:center;'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		m.chart1 = new Chart(b, {
			type: 'line',
			data: {
				labels: [],
				datasets: [
					{
						label: 'CX',
						data: [],
						fill: false,
						backgroundColor: '#FBC246',
						borderColor: '#FBC246',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},{
						label: 'Core',
						data: [],
						fill: false,
						backgroundColor: '#5788FE',
						borderColor: '#5788FE',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					{
						label: 'Access',
						data: [],
						fill: false,
						backgroundColor: '#8E3DFA',
						borderColor: '#8E3DFA',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
				]
			},
			options: {
				plugins: {
					datalabels: {
						color: 'rgba(0,0,0,0)',
						//formatter: function (value) { return Math.round(value) + '%' },
						//font: {
						//	weight: 'bold',
						//	size: 16,
						//}
					},
					legend: {
						position: 'bottom',
						labels: {
							usePointStyle: true,
							color: '#000',
							font: { size: 9, }
						}
					}
				},
				scales: {
					y: {
						ticks: {
							color: "#000",
							font: { size: 9, },
							//stepSize: 1,
							beginAtZero: true
						}
					},
					x: {
						ticks: {
							color: "#000",
							font: { size: 9, },
							//stepSize: 1,
							//beginAtZero: true
						}
					}
				},
			}
		})
		
		//pasang loading
		el({a:'span', b:el({a:'div', b:a, d:{id:'loadingEkseCard2', style:'position:absolute; margin-top:-35vh; margin-left:1vw; height:30vh; width:20vw; background:rgba(0,0,0,0.1); border-radius:9px; display:flex;align-items:center;justify-content:center;'}}), d:{class:'loader'} })
		
		fetch("api.php?cmd=overview-trend-latency").then((a) => a.json()).then((b) => {
			
			//buang loading
			(a => { a.parentElement.removeChild(a) })(document.getElementById('loadingEkseCard2'))
			
			m.p1.c3.data.labels = b.data.map(a=>a.periode)
			m.p1.c3.data.datasets[1].data = b.data.map(a=>a.core?parseFloat(a.core.split('|')[1])||null:null)
			m.p1.c3.data.datasets[2].data = b.data.map(a=>a.access?parseFloat(a.access.split('|')[1])||null:null)
			m.p1.c3.data.datasets[0].data = b.data.map(a=>a.ce?parseFloat(a.ce.split('|')[1])||null:null)
			m.p1.c3.update()
		})
		
	})(a);
	
	//card3
	(a => {
		a = el({a:'div', b:a, d:{id:'ekse1card3'}})
		
		el({a:'div', b:a, c:'SLA Performance', d:{class:'title2'}});
		
		(a => {
			a = el({a:'table', b:a, d:{class:'sla-tabel'}});
			(a => {
				el({a:'td', b:a, c:'4G'})

				const b = el({a:'div', b:el({a:'td', b:a}) })
				m.ekse.PL4gBackground = b.style.background = 'green'
				el({a:'div', b:b, c:'PacketLoss'});
				m.ekse.targetPL4g = el({a:'div', b:b, c:'T : -'})
				m.ekse.realisasiPL4g = el({a:'div', b:b, c:'R : -'})

				const c = el({a:'div', b:el({a:'td', b:a}) })
				c.style.background = 'green'
				el({a:'div', b:c, c:'Latency'})
				m.ekse.targetLat4g  = el({a:'div', b:c, c:'T : -'})
				m.ekse.realisasiLat4g  = el({a:'div', b:c, c:'R : -'})

				const d = el({a:'div', b:el({a:'td', b:a}) })
				d.style.background = 'red'
				el({a:'div', b:d, c:'Jitter'})
				m.ekse.targetJitt4g  = el({a:'div', b:d, c:'T : -'})
				m.ekse.realisasiJitt4g  = el({a:'div', b:d, c:'R : -'})
				
			})(el({a:'tr', b:a}));
			
			(a => {
				el({a:'td', b:a, c:'CTI'})
				
				const b = el({a:'div', b:el({a:'td', b:a}) })
				b.style.background = 'green'
				el({a:'div', b:b, c:'PacketLoss'})
				m.ekse.targetPLCTI = el({a:'div', b:b, c:'T : -'})
				m.ekse.realisasiPLCTI = el({a:'div', b:b, c:'R : -'})
				const c = el({a:'div', b:el({a:'td', b:a}) })
				c.style.background = 'green'
				el({a:'div', b:c, c:'Latency'})
				m.ekse.targetLatCTI = el({a:'div', b:c, c:'T : -'})
				m.ekse.realisasiLatCTI = el({a:'div', b:c, c:'R : -'})
				const d = el({a:'div', b:el({a:'td', b:a}) })
				d.style.background = 'green'
				el({a:'div', b:d, c:'Jitter'})
				m.ekse.targetJittCTI = el({a:'div', b:d, c:'T : -'})
				m.ekse.realisasiJittCTI = el({a:'div', b:d, c:'R : -'})
				
			})(el({a:'tr', b:a}))
			
		})(el({a:'div', b:a, d:{style:'height:11.5vh;'}}));
		
		(a => {
			
			const b = el({a:'canvas', b:a})
			
			b.width = parseInt(b.parentElement.getBoundingClientRect().width)
			b.height = parseInt(b.parentElement.getBoundingClientRect().height)
			
			m.chart2 = new Chart(b, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Packetloss',
						data: [],
						fill: false,
						backgroundColor: '#999A9E',
						borderColor: '#999A9E',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					{
						label: 'Latency',
						data: [],
						fill: false,
						backgroundColor: '#D3AF3D',
						borderColor: '#D3AF3D',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					{
						label: 'Jitter',
						data: [],
						fill: false,
						backgroundColor: '#D9D9D9',
						borderColor: '#D9D9D9',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},
					]
				},
				options: {
					plugins: {
						datalabels: {
							color: 'rgba(0,0,0,0)',
							//formatter: function (value) { return Math.round(value) + '%' },
							//font: {
							//	weight: 'bold',
							//	size: 16,
							//}
						},
						legend: {
							position: 'bottom',
							labels: {
								usePointStyle: true,
								color: '#000',
								font: { size: 9, }
							}
						}
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})

		})(el({a:'div', b:a, d:{style:'position:relative; margin:0; padding:0.5vh 1vw 0 2vw; width:29vw; height:27vh; display:flex; align-items:center; justify-content:center;'}}));
		
		m.ekse.chart2GantiData = a => {
			if (m.ekse.card3Data) {
				m.chart2.data.labels = m.ekse.card3Data[a].labels
				m.ekse.card3Data[a].datasets.forEach((a,b) => { m.chart2.data.datasets[b].data = a })
				m.chart2.update()
			}
		}
		//slider
		(a => {
			
			el({a:'input', b:a, d:{type:'checkbox', class:'slider-checkbox', style:'margin-top:-1.5vh'}, e:{change:a=>{
				m.ekse.chart2GantiData(a.target.checked ? 'cti' : '4g')
			}}})
			el({a:'div', b:el({a:'div', b:el({a:'div', b:a, d:{class:'slider1'}}), c:'4G'}).parentElement, c:'CTI'})
			
		})(el({a:'label', b:a, d:{id:'slider1'}}))
		
	})(a)
	
	el({a:'div', b:a, c:'CX & Experience', d:{class:'title1'}});
	
	//card4
	(a => {
		a = el({a:'div', b:el({a:'div', b:a, d:{id:'ekse1card4'}}) })
		
		const b = ['', 'Packetloss', 'Latency', 'Jitter', 'Game Score', 'Video Score', 'Signal Strength']
		
		b.forEach(b => { el({a:'div', b:a, c:b}) })
		b.shift();
		
		['Telkomsel', '3', 'XL', 'Indosat', 'Smartfren'].forEach(c => {
			el({a:'div', b:a, c:c, d:{style:'justify-content:flex-end;'} })
			b.forEach(b => { el({a:'div', b:a, d:{style:'background:rgba(50,50,50,0.1);'} }) })
		});
		a.children[8].style.borderRadius = '7px 0 0 0'
		a.children[13].style.borderRadius = '0 7px 0 0'
		a.children[36].style.borderRadius = '0 0 0 7px'
		a.children[41].style.borderRadius = '0 0 7px 0'
		
		el({a:'div', b:el({a:'div', b:a.children[8]}), c:'Winner'})
		el({a:'div', b:el({a:'div', b:a.children[11]}), c:'Winner'})
		el({a:'div', b:el({a:'div', b:a.children[12]}), c:'Winner'})
		el({a:'div', b:el({a:'div', b:a.children[23]}), c:'Winner'})
		el({a:'div', b:el({a:'div', b:a.children[24]}), c:'Winner'})
		el({a:'div', b:el({a:'div', b:a.children[34]}), c:'Winner'});

		[...a.children].forEach(a => {
			if (a.children.length>0) {
				if (a.children[0].tagName.toUpperCase() == 'DIV') a.removeChild(a.children[0])
			}
		})

		const operator = {
			'Telkomsel' : 8,
			'3' : 15,
			'XL' : 22,
			'Indosat Ooredoo' : 29,
			'Smartfren': 36
		}
		
		fetch('api.php?cmd=cx-experience').then(a=>a.json()).then(b => {
			if (b.data.pl) {
				el({a:'div', b:el({a:'div', b:a.children[operator[b.data.pl]] }), c:'Winner'})
			}
			if (b.data.latency) {
				el({a:'div', b:el({a:'div', b:a.children[operator[b.data.latency]+1] }), c:'Winner'})
			}
			if (b.data.jitter) {
				el({a:'div', b:el({a:'div', b:a.children[operator[b.data.jitter]+2] }), c:'Winner'})
			}
			if (b.data.gamescore) {
				el({a:'div', b:el({a:'div', b:a.children[operator[b.data.gamescore]+3] }), c:'Winner'})
			}
			if (b.data.videoscore) {
				el({a:'div', b:el({a:'div', b:a.children[operator[b.data.videoscore]+4] }), c:'Winner'})
			}
			if (b.data.signalstrength) {
				el({a:'div', b:el({a:'div', b:a.children[operator[b.data.signalstrength]+5] }), c:'Winner'})
			}
		})
		
	})(a);
	
	//card5
	(a => {
		a = el({a:'div', b:a, d:{id:'ekse1card5'}})
		el({a:'div', b:a, c:'Global Vs CDN Experience', d:{class:'title2'}});
		
		const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; margin:0; padding:2vh 0.5vw; width:24vw; height:38.5vh; display:flex; align-items:center; justify-content:center;'}})})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		const ilogo = ['img/yt.svg', 'img/fb.svg', 'img/ml.svg', 'img/tt.svg'].map(a => {
			const image = new Image()
			image.src = a
			return image
		})
		
		m.chart3 = new Chart(b, {
			type: 'bar',
			plugins: [{
				afterDraw: a => {
					const ctx = a.ctx
					const xAxis = a.scales.x
					const yAxis = a.scales.y
					yAxis.ticks.forEach((value, index) => {
						ctx.drawImage(ilogo[index], xAxis.left - (ilogo[index].width + 5), yAxis.getPixelForTick(index) - 9)
					})
				}
			}],
			data: {
				labels: ['Youtube', 'facebook', 'Mobile Legends', 'Titok'],
				datasets: [{
					label: 'Global',
					data: [-100, -90, -80, -70, -60],
					fill: false,
					backgroundColor: '#477F9F',
					borderColor: '#477F9F',
				},{
					data: [-0, -10, -20, -30, -40],
					fill: false,
					backgroundColor: '#D9D9D9',
					borderColor: '#D9D9D9',
				},
				{
					label: 'CDN',
					data: [100, 90, 80, 70, 60],
					fill: false,
					backgroundColor: '#B28E65',
					borderColor: '#B28E65',
				},{
					data: [0, 10, 20, 30, 40],
					fill: false,
					backgroundColor: '#D9D9D9',
					borderColor: '#D9D9D9',
				},
				]
			},
			options: {
				indexAxis: 'y',
				responsive: true,
				plugins: {
					datalabels: {
						color: 'rgba(0,0,0,0)',
						//formatter: function (value) { return Math.round(value) + '%' },
						//font: {
						//	weight: 'bold',
						//	size: 16,
						//}
					},
					legend: { display: false, },
				},
				scales: {
					y: {
						stacked: true,
						grid: {
							color: 'rgba(0,0,0,0)',
						},
						ticks: {
							color: 'rgba(0,0,0,0)',
						},
					},
					x: {
						stacked: true,
						ticks: { callback: value => Math.abs(value) }
					}
				},
				/*
				tooltips: {
					callbacks: {
						label: (tooltipItem, data) => {
							console.log('a')
							const ds = data.datasets[tooltipItem.datasetIndex];
							return ds.label + ': ' + Math.abs( ds.data[tooltipItem.index]);
						}
					}
				},*/
			}
		});
		
	})(a);
	
	//card6
	(a => {
		a = el({a:'div', b:a, d:{id:'ekse1card6'}})
		el({a:'div', b:a, c:'City Lose Performance', d:{class:'title2'}});
		
		(a => {
			
			const b = el({a:'canvas', b:el({a:'div', b:a, d:{style:'position:relative; width:33vw; height:33vh; display:flex; align-items:center; justify-content:center;'}})})
			//b.width = parseInt(a.getBoundingClientRect().width)
			//b.height = parseInt(a.getBoundingClientRect().height)
			
			m.chart4 = new Chart(b, {
				type: 'doughnut',
				data: {
					labels: ['Platinum', 'Gold', 'Silver', 'Bronze'],
					datasets: [{
						data: [],
						borderWidth: 0,
						backgroundColor: [
							'#999A9E',
							'#D3AF3D',
							'#D9D9D9',
							'#B28E65',
						],
						labels: ['Platinum', 'Gold', 'Silver', 'Bronze'],
					}]
				},
				options: {
					responsive: true,
					plugins: {
						datalabels: {
							color: '#000',
							//formatter: (a, b) => `${b.dataset.labels[b.dataIndex]}\n${parseInt(a).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
							//formatter: function (value) { return Math.round(value) + '%' },
							//font: {
							//	weight: 'bold',
							//	size: 16,
							//}
						},
						legend: { position: 'right', },
    				},
 				},
			})
			
		//{style:' width:24vw; height:38.5vh;'}})})
		})(el({a:'div', b:a, d:{style:'margin:0; padding:0; width:28vw; height:21vh; display:flex; align-items:center; justify-content:center;'}}));
		
		(a => {
			const b = el({a:'div', b:a, d:{style:'width:8.5vw; height:15vh;'}})
			
			const b1 = el({a:'canvas', b:b})
			
			b1.width = parseInt(b.getBoundingClientRect().width)
			b1.height = parseInt(b.getBoundingClientRect().height)
			
			m.chart5 = new Chart(b1, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'packetloss',
						data: [],
						fill: false,
						backgroundColor: '#477F9F',
						borderColor: '#477F9F',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},]
				},
				options: {
					plugins: {
						title: { text: 'Packetloss' },
						datalabels: { color: 'rgba(0,0,0,0)', },
						legend: { display: false, }
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})
			
			
			const c = el({a:'div', b:a, d:{style:'width:8.5vw; height:15vh;'}})
			
			const c1 = el({a:'canvas', b:c})
			
			c1.width = parseInt(c.getBoundingClientRect().width)
			c1.height = parseInt(c.getBoundingClientRect().height)
			
			m.chart6 = new Chart(c1, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Jitter',
						data: [],
						fill: false,
						backgroundColor: '#477F9F',
						borderColor: '#477F9F',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},]
				},
				options: {
					plugins: {
						title: { text: 'Latency' },
						datalabels: { color: 'rgba(0,0,0,0)', },
						legend: { display: false, }
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								//stepSize: 1,
								//beginAtZero: true
							}
						}
					},
				}
			})
			
			
			const d = el({a:'div', b:a, d:{style:'width:8.5vw; height:15vh;'}})
			
			const d1 = el({a:'canvas', b:d})
			
			d1.width = parseInt(d.getBoundingClientRect().width)
			d1.height = parseInt(d.getBoundingClientRect().height)
			
			m.chart7 = new Chart(d1, {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Paket Lost',
						data: [],
						fill: false,
						backgroundColor: '#477F9F',
						borderColor: '#477F9F',
						borderWidth: 1,
						radius: 1.5,
						tension: 0.3,
					},]
				},
				options: {
					plugins: {
						title: { text: 'Jitter' },
						datalabels: { color: 'rgba(0,0,0,0)', },
						legend: { display: false, }
					},
					scales: {
						y: {
							ticks: {
								color: "#000",
								font: { size: 9, },
								beginAtZero: true
							}
						},
						x: {
							ticks: {
								color: "#000",
								font: { size: 9, },
							}
						}
					},
				}
			})
		})(el({a:'div', b:a, d:{style:'height:17vh; display:flex; gap:0.1vw; align-items:center; justify-content:space-around;'}}));

		m.ekse.chart4GantiData = a => {
			if (m.ekse.card6Data) {
				m.chart4.data.labels = []
				m.chart4.data.datasets[0].data = []
				m.ekse.card6Data[a].forEach(b => {
					m.chart4.data.labels.push(b.status)
					m.chart4.data.datasets[0].data.push(parseInt(b.count))
				});
				m.chart4.update()
			}
		} 

		/*
		(a => {
			el({a:'div', b:a, c:'Packetloss'})
			el({a:'div', b:a, c:'Latency'})
			el({a:'div', b:a, c:'Jitter'})
		})(el({a:'div', b:a, d:{style:'position:absolute; margin-top:-35vh; display:flex; flex-direction:column; gap:3px;'} }))
		*/
		(a => {
			el({a:'option', b:a, c:'Packetloss', d:{value:'pl'} })
			el({a:'option', b:a, c:'Latency', d:{value:'latency'} })
			el({a:'option', b:a, c:'Jitter', d:{value:'jitter'} })
		})(el({a:'select', b:a, d:{style:'position:absolute; margin-top:-40vh; margin-left:20vw;'}, e:{change:a=>{ m.ekse.chart4GantiData(a.target.value) }} }))

	})(a)
	
	
	//isi data
	m.chart1.data.labels = []
	fetch("api.php?cmd=overview-trend-latency").then((a) => a.json()).then((b) => {
		m.chart1.data.labels = b.data.map(a=>a.periode)
		m.chart1.data.datasets[1].data = b.data.map(a=>a.core?parseFloat(a.core.split('|')[1])||null:null)
		m.chart1.data.datasets[2].data = b.data.map(a=>a.access?parseFloat(a.access.split('|')[1])||null:null)
		m.chart1.data.datasets[0].data = b.data.map(a=>a.ce?parseFloat(a.ce.split('|')[1])||null:null)
		m.chart1.update()
	})
	
	m.chart3.data.labels.forEach((_,a) => {
		const b = Math.round(Math.random() * 100)
		m.chart3.data.datasets[0].data[a] = b - 100
		m.chart3.data.datasets[1].data[a] = -1 * b
		m.chart3.data.datasets[2].data[a] = b
		m.chart3.data.datasets[3].data[a] = 100 - b
	})
	m.chart3.update()
	
	fetch("api.php?cmd=city-lose-performance-line").then((a) => a.json()).then((b) => {
			
		b.data.latency.slice(-5).forEach((lat) => {
			m.chart5.data.labels.push(lat['yearweek'])
			m.chart5.data.datasets[0].data.push(parseFloat(lat['avg_val']).toFixed(2))
		});

		b.data.jitter.slice(-5).forEach((jit)=>{
			m.chart6.data.labels.push(jit['yearweek'])
			m.chart6.data.datasets[0].data.push(parseFloat(jit['avg_val']).toFixed(2))
		});

		b.data.pl.slice(-5).forEach((pl)=>{
			m.chart7.data.labels.push(pl['yearweek'])
			m.chart7.data.datasets[0].data.push(parseFloat(pl['avg_val']).toFixed(2))
		});
		
		m.chart5.update()
		m.chart6.update()
		m.chart7.update()
	})

	fetch("api.php?cmd=city-lose-performance-donut").then((a) => a.json()).then((b) => {
		m.ekse.card6Data = b.data
		m.ekse.chart4GantiData('pl')
	})

	fetch("api.php?cmd=sla-performance").then((a) => a.json()).then((b) => {
		const label4G = Object.keys(b.data['4g']).flatMap(a=>b.data['4g'][a].map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
		const labelCti = Object.keys(b.data.cti).flatMap(a=>b.data.cti[a].map(a=>a.periode)).reduce((a,b)=>a.find(a=>a==b)?a:[...a,b],[]).sort()
		m.ekse.card3Data = {
			'4g' : {
				labels : label4G,
				datasets: [
					label4G.map(a=>(b.data['4g'].pl.find(b=>b.periode==a)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g'].lat.find(b=>b.periode==a)||{realisasi:null}).realisasi),
					label4G.map(a=>(b.data['4g'].jitt.find(b=>b.periode==a)||{realisasi:null}).realisasi),
				]
			},
			cti: {
				labels : labelCti,
				datasets: [
					labelCti.map(a=>(b.data.cti.pl.find(b=>b.periode==a)||{realisasi:null}).realisasi),
					labelCti.map(a=>(b.data.cti.lat.find(b=>b.periode==a)||{realisasi:null}).realisasi),
					labelCti.map(a=>(b.data.cti.jitt.find(b=>b.periode==a)||{realisasi:null}).realisasi),
				]
			}
		}
		console.log(m.ekse.card3Data)
		m.ekse.chart2GantiData('4g')//cti

		m.ekse.targetPL4g.innerHTML = "T: "+b.data['4g'].pl.slice(-1)[0]['target_sla'].substring(0,5)+"%";
		m.ekse.realisasiPL4g.innerHTML = "R: "+b.data['4g'].pl.slice(-1)[0]['realisasi'].substring(0,5)+"%";

		m.ekse.targetLat4g.innerHTML = "T: "+b.data['4g'].lat.slice(-1)[0]['target_sla'].substring(0,5)+"%";
		m.ekse.realisasiLat4g.innerHTML = "R: "+b.data['4g'].lat.slice(-1)[0]['realisasi'].substring(0,5)+"%";

		m.ekse.targetJitt4g.innerHTML = "T: "+b.data['4g'].jitt.slice(-1)[0]['target_sla'].substring(0,5)+"%";
		m.ekse.realisasiJitt4g.innerHTML = "R: "+b.data['4g'].jitt.slice(-1)[0]['realisasi'].substring(0,5)+"%";


		m.ekse.targetPLCTI.innerHTML = "T: "+b.data['cti'].pl.slice(-1)[0]['target_sla'].substring(0,5)+"%";
		m.ekse.realisasiPLCTI.innerHTML = "R: "+b.data['cti'].pl.slice(-1)[0]['realisasi'].substring(0,5)+"%";

		m.ekse.targetLatCTI.innerHTML = "T: "+b.data['cti'].lat.slice(-1)[0]['target_sla'].substring(0,5)+"%";
		m.ekse.realisasiLatCTI.innerHTML = "R: "+b.data['cti'].lat.slice(-1)[0]['realisasi'].substring(0,5)+"%";

		m.ekse.targetJittCTI.innerHTML = "T: "+b.data['cti'].jitt.slice(-1)[0]['target_sla'].substring(0,5)+"%";
		m.ekse.realisasiJittCTI.innerHTML = "R: "+b.data['cti'].jitt.slice(-1)[0]['realisasi'].substring(0,5)+"%";
		
	})
	
}