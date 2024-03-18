const sla2chart4 = a => {

    el({a:'div', b:a, c:'Service Credit Quality turun sebesar xx% sejak Januari 2024.'})

    a = el({a:'div', b:a, d:{style:'display:flex; justify-content:space-between;'}});

    (a => {

        const options = {
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
                categories: ['Packetloss', 'Latency', 'Jitter',],
            }
        };

        m.sla.chart4 = new ApexCharts(a, options);
        m.sla.chart4.render();

    })(el({a:'div', b:a, d:{style:'width:18vw; height:30vh;'}}));

	(a => {
		const options = {
			series: [{
			name: 'series1',
			data: [31, 40, 28, 51, 42, 109, 100]
		  		}],
			chart: {
			height: 150,
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
  
		  m.sla.chart5 = new ApexCharts(a, options);
		  m.sla.chart5.render();


	})(el({a:'div', b:a, d:{} }))

    //fetch('')

}