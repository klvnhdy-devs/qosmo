const page1card2 = (a) => {
	a = el({ a: "div", b: a, d: { id: "page1card2" } });
	
	el({ a: "div", b: a, c: "Overview SLA" });
	
	((a) => {
		el({ a: "div", b: a, d: { style: "width:calc(100% - 1px);" } })
		//el({ a: "div", b: a, d: { style: "width:calc(14.28% - 1px);" } })
		//el({ a: "div", b: a, d: { style: "width:calc(14.28% - 1px);" } })
		//el({ a: "div", b: a, d: { style: "width:calc(42.85% - 1px);" } })
	})(el({ a: "div", b: a }));
	
	((a) => {
		fetch("api.php?cmd=overview-sla").then((a) => a.json()).then((b) => {
			//console.log(b)
			b.data.forEach(b => {
				el({ a: "div", b: a, c: b.region, d: { class: "platinum" } })
				el({ a: "div", b: a, c: `PL: ${parseFloat(b.avg_pl).toFixed(2)}` })
				el({ a: "div", b: a, c: `LAT: ${parseFloat(b.avg_lat).toFixed(2)}` })
				el({ a: "div", b: a, c: `JIT: ${parseFloat(b.avg_jitt).toFixed(2)}` })
			})
		})
		
	})(el({ a: "div", b: a }));
	
	((a) => {
		el({ a: "div", b: a, c: "Bronze" })
		el({ a: "div", b: a, c: "Silver" })
		el({ a: "div", b: a, c: "Gold" })
		el({ a: "div", b: a, c: "Platinum" })
	})(el({ a: "div", b: a }));
}