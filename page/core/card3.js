const core1card3 = a => {
	a = el({a:'div', b:a, d:{id:'core1card3'} })
	el({a:'div', b:a, c:'EBR Not Achieve'});

	(a => {
		const gangguan = el({a:'div', b:a})
		var options = {
			series: [{
			name: 'series1',
			data: [31, 40, 28, 51, 42, 109, 100]
		  		}],
			chart: {
			height: 250,
			type: 'area'
		  },
		  dataLabels: {
			enabled: false
		  },
		  stroke: {
			curve: 'smooth'
		  },
		  xaxis: {
			type: 'datetime',
			categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
		  },
		  tooltip: {
			x: {
			  format: 'dd/MM/yy HH:mm'
			},
		  },
		  };
  
		  var chart = new ApexCharts(gangguan, options);
		  chart.render();


	})(el({a:'div', b:a, d:{} }))

}
