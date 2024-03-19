const ticket1card12 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card12'} });
	el({ a: "div", b: a, c: "Ticket Still Open > SLA", d:{class:"title"} });

	(a => {
		const b = el({a:'canvas', b:a})
		
		b.width = parseInt(b.parentElement.getBoundingClientRect().width)
		b.height = parseInt(b.parentElement.getBoundingClientRect().height)
		
		m.p1.c3 = new Chart(b, {
			type: 'doughnut',
  			data: {
				labels: ['Overall Yay', 'Overall Nay', 'Group A Yay', 'Group A Nay'],
				datasets: [
				  {
					backgroundColor: ['hsl(0, 100%, 60%)','hsl(0, 100%, 60%)','hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
					data: [10,10,10, 70]
				  },
				  {
					backgroundColor: ['hsl(0, 100%, 60%)', 'hsl(0, 100%, 35%)'],
					data: [30, 70]
				  },
				]
			},
			options: {
				responsive: true,
				
				plugins: {
					legend: {
						display: false,
					},
				  tooltip: {
					callbacks: {
					  label: function(context) {
						const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
						return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue;
					  }
					}
				  }
				}
			  },
			
		})

})(el({a:'div', b:a, d:{style:'position:relative; width:22vw; height:30vh; top:3vh; left:0.5vw;'} }))

}
