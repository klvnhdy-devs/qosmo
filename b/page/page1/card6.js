const page1card6 = a => {
	a = el({a:'div', b:a, d:{id:'page1card6'} })

	el({a:'div', b:a, c:'Gangguan Impact To Quality', d:{style:'font-size:2.5vmin; font-weight:bold; margin-bottom:1vh;'} });

	(a => {
		const gangguan = el({a:'div', b:a})
		var options = {
			series: [{
			data: [400, 430, 448]
		  }],
			chart: {
			toolbar: { show: false },
			type: 'bar',
			height: 200
		  },
		  plotOptions: {
			bar: {
			  borderRadius: 4,
			  horizontal: true,
			  distributed: true,
			}
		  },
		  dataLabels: {
			enabled: false
		  },
		  colors: ['#FBC246', '#5788FE', '#FD2D6C'],
		  xaxis: {
			categories: ['Core', 'Telkomsel', 'Access',],
		  }
		  };
  
		  var chart = new ApexCharts(gangguan, options);
		  chart.render();


	})(el({a:'div', b:a, d:{} }))

}
