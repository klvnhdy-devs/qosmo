const page1card2 = (a) => {
	a = el({ a: "div", b: a, d: { id: "page1card2" } });
	
	el({ a: "div", b: a, c: "Overview SLA" });
	
	((a) => {
		//el({ a: "div", b: a, d: { style: "width:50%;" } })
		//el({ a: "div", b: a, d: { style: "width:25%;" } })
		//el({ a: "div", b: a, d: { style: "width:25%;" } })
		//el({ a: "div", b: a, d: { style: "width:calc(42.85% - 1px);" } })
	})(el({ a: "div", b: a }));
	
	((a) => {
		
		fetch("api.php?cmd=overview-sla").then((a) => a.json()).then((b) => {
			const status = { Platinum: 0, Gold:0, Silver:0, Bronze:0, total:0}
			b.data.forEach(b => {
				try { status[b.status]++ } catch(a) {}
				status.total++
				el({ a: "div", b: a, c: b.region, d: { class: b.status } })
				el({ a: "div", b: a, c: `PL: ${parseFloat(b.avg_pl).toFixed(2)}` })
				el({ a: "div", b: a, c: `LAT: ${parseFloat(b.avg_lat).toFixed(2)}` })
				el({ a: "div", b: a, c: `JIT: ${parseFloat(b.avg_jitt).toFixed(2)}` })
			})
			
			a = a.previousElementSibling
			a.innerHTML = ''
			status.Platinum > 0 && el({ a: "div", b:a, d: { style: `width:${(100*status.Platinum/status.total).toFixed(2)}%; background:#8E3DFA;` } })
			status.Gold > 0 && el({ a: "div", b:a, d: { style: `width:${(100*status.Gold/status.total).toFixed(2)}%; background:#FBC246;` } })
			status.Silver > 0 && el({ a: "div", b:a, d: { style: `width:${(100*status.Silver/status.total).toFixed(2)}%; background:#5788FE;` } })
			status.Bronze > 0 && el({ a: "div", b:a, d: { style: `width:${(100*status.Bronze/status.total).toFixed(2)}%; background:#FD2D6C;` } })
			
		})
		
	})(el({ a: "div", b: a }));
	
	((a) => {
		el({ a: "div", b: a, c: "Bronze" })
		el({ a: "div", b: a, c: "Silver" })
		el({ a: "div", b: a, c: "Gold" })
		el({ a: "div", b: a, c: "Platinum" })
	})(el({ a: "div", b: a }));
}