const ticket1card10 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card10'} });
	el({ a: "div", b: a, c: "Total RCA", d:{class:"title"} });
	
	a = el({a:'table', b:a, d:{id:'tablePageTicket', style:'padding:2vh;width:100%;height: 30vh;'} });

	(a => {
		el({a:'th', b:a, c:'TITLE', d:{class:'tableTicket tableTicketBorder'}})
		el({a:'th', b:a, c:'VALUE', d:{class:'tableTicket tableTicketBorder'}})
		el({a:'th', b:a, c:'VALUE', d:{class:'tableTicket tableTicketBorder'}})
		el({a:'th', b:a, c:'VALUE', d:{class:'tableTicket tableTicketBorder'}})
	})(el({a:'tr', b:a}));

	(a => {
		for (var i=1; i<5; i++) {
			const b = el({a:'tr', b:a})
			el({a:'td', b:b, c:`Lorem Ipsum	` ,d:{class:'tableTicketBorder'} })
			el({a:'td', b:b  ,d:{class:'tableTicketBorder'} })
			el({a:'td', b:b  ,d:{class:'tableTicketBorder'} })
			el({a:'td', b:b  ,d:{class:'tableTicketBorder'} })
		}
	})(a);
	


}
