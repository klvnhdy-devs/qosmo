const core1card2 = a => {
	a = el({a:'div', b:a, d:{id:'core1card2'} })
	
	el({a:'div', b:a, c:'EBR Not Achieve'});
	
	(a => {
		el({a:'div', b:a, d:{style:'width:calc(42.85% - 1px);'}})
		el({a:'div', b:a, d:{style:'width:calc(51.15% - 1px);'}})
	})(el({a:'div', b:a}));
	
	(a => {
		for (var i=1; i<4; i++) {
			el({a:'div', b:a, c:`TREG-${i}`, d:{class:'bronze'} })
			el({a:'div', b:a, c:'PL: 0.85' })
			el({a:'div', b:a, c:'LAT: 0.70' })
			el({a:'div', b:a, c:'JIT: 0.50' })
		}
		
	})(el({a:'div', b:a}));
	/*
	(a => {
		el({a:'div', b:a, c:'Bronze' })
		el({a:'div', b:a, c:'Silver' })
		el({a:'div', b:a, c:'Gold' })
		el({a:'div', b:a, c:'Platinum' })
	})(el({a:'div', b:a}));
	*/
}
