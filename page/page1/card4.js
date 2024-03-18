const page1card4 = a => {
	a = el({a:'div', b:a, d:{id:'page1card4'} })

	el({a:'div', b:a, c:'Site Profiling', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });

	(a => {
		const siteProf = el({a:'div', b:a,})

	const options = {
		//series: [{data:[0, 0, 0]}],
		series: [0, 0, 0],
		chart: {
		height: 230,
		type: 'radialBar',
	  },
	  plotOptions: {
		radialBar: {
		  offsetY: 0,
		  startAngle: 0,
		  endAngle: 270,
		  hollow: {
			margin: 5,
			size: '30%',
			background: 'transparent',
			image: undefined,
		  },
		  dataLabels: {
			name: {
			  show: false,
			},
			value: {
			  show: false,
			}
		  }
		}
	  },
	  colors: ['#FBC246', '#5788FE', '#FD2D6C'],
	  labels: ['Packetloss', 'Latency', 'Jitter'],
	  legend: {
		show: true,
		floating: true,
		fontSize: '9px',
		position: 'left',
		offsetX: 0,
		offsetY: 0,
		labels: {
		  useSeriesColors: true,
		},
		markers: {
		  size: 0
		},
		formatter: function(seriesName, opts) {
		  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
		},
		itemMargin: {
		  vertical: 3
		}
	  },
	  stroke: {
		lineCap: 'round'
	  },
	  responsive: [{
		breakpoint: 480,
		options: {
		  legend: {
			  show: false
		  }
		}
	  }]
	  };

	  m.p1.card4 = new ApexCharts(siteProf, options);
	  m.p1.card4.render();
	})(el({a:'div', b:a, d:{} }))
	
	fetch('api.php?cmd=site-profile').then(a=>a.json()).then(a => {
		console.log(a.data.pl)
		console.log(100 - parseFloat(a.data.pl[0].pct_not_clear), 100 - parseFloat(a.data.lat[0].pct_not_clear), 100 - parseFloat(a.data.jitt[0].pct_not_clear))
		m.p1.card4.updateSeries(
			[100 - parseFloat(a.data.pl[0].pct_not_clear), 100 - parseFloat(a.data.lat[0].pct_not_clear), 100 - parseFloat(a.data.jitt[0].pct_not_clear)]
		)
	})
	
}
