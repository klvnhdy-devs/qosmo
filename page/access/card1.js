const access1card1 = a => {
	a = el({a:'div', b:a, d:{id:'access1card1'} });
	
	(a => {
		el({a:'div', b:a, c:'Today', d:{class:'active'} })
		el({a:'div', b:a, c:'This Week'})
	})(el({a:'div', b:a}));
	
	(a => {
		
		(a => {
			el({a:'div', b:a, c:'Latency'})
			el({a:'div', b:a, c:'0.99'})
		})(el({a:'div', b:a}));
		
		(a => {
			el({a:'div', b:a, c:'Packet Loss'})
			el({a:'div', b:a, c:'0.75'})
		})(el({a:'div', b:a}));
		
		(a => {
			el({a:'div', b:a, c:'Jitter'})
			el({a:'div', b:a, c:'0.85'})
		})(el({a:'div', b:a}))
		
	})(el({a:'div', b:a}));
	
}
