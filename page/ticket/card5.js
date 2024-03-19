const ticket1card5 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card5'} });
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

		  fetch("tmp.php?cmd=ticket-monthly-open-close").then((a) => a.json()).then((b) => { 
			var dataClose = [];
			var dataOpen = [];
			var dataLable = [];
			b.data.forEach(opc => {
				dataClose.push(opc.ticked_closed)
				dataOpen.push(opc.ticket_total - opc.ticked_closed)
				dataLable.push(opc.periode)
			});

			console.log(dataClose)
			chart.updateSeries([
				{
				name: 'Open',
				data: dataOpen
				},
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
