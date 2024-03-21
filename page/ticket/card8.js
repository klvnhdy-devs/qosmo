const ticket1card8 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card8'} });
	el({ a: "div", b: a, c: "Total Ticket Monthly (Open VC Close)", d:{class:"title"} });
	el({ a: "div", b: a, c: "99%", d:{class:"titleBody"} });

	(a => {
		const lines2 = el({a:'div', b:a})
		var options = {
			series: [],
			chart: {
				toolbar: {
					show: false
				  },
			height: 150,
			type: 'area'
		  },
		  legend: {
			show: false
		  },
		  dataLabels: {
			enabled: false
		  },
		  stroke: {
			curve: 'smooth'
		  },
		  
		 
		  };
  
		  var chart = new ApexCharts(lines2, options);
		  chart.render();

		  fetch("tmp.php?cmd=avgttr-ticket-monthly").then((a) => a.json()).then((b) => { 
			var dataClose = [];
			var dataOpen = [];
			var dataLable = [];
			b.data.forEach(opc => {
				dataClose.push(opc.avg_ttr)
				dataLable.push(opc.periode)
			});

			console.log(dataClose)
			chart.updateSeries([
				{
				name: 'Close',
				data: dataClose
				}, 
			]);
	
				chart.updateOptions({
				xaxis: {
					categories: dataLable
				}
				});
		  })

		  
		 

	})(el({a:'div', b:a, d:{style:"margin-bottom:2vh"} }))
	
	
}
