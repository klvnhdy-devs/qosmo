const ticket1card7 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card7'} });
	el({ a: "div", b: a, c: "Befor & After Ticket", d:{class:"title"} });
	el({ a: "div", b: a, c: "99%", d:{class:"titleBody"} });

	(a => {
		const lines3 = el({a:'div', b:a})
		var options = {
          series: [44, 55],
          chart: {
          type: 'donut',
		  height: 120
        },
        };
  
		  var chart = new ApexCharts(lines3, options);
		  chart.render();


	})(el({a:'div', b:a, d:{} }))

}