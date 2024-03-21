const ticket1card9 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card9'} });
	el({ a: "div", b: a, c: "Ticket Order by Work Group", d:{class:"title"} });

	a = el({a:'table', b:a, d:{id:'tablePageTicket', style:'padding:2vh;width:100%;height: 30vh;'} });

	(a => {
		el({a:'th', b:a, c:'Work Group', d:{class:'tableTicket tableTicketBorder'}})
		el({a:'th', b:a, c:'TREG', d:{class:'tableTicket tableTicketBorder'}})
		el({a:'th', b:a, c:'Ticket Total', d:{class:'tableTicket tableTicketBorder'}})
		el({a:'th', b:a, c:'AVG TTR', d:{class:'tableTicket tableTicketBorder'}})
	})(el({a:'tr', b:a}));

	fetch("tmp.php?cmd=ticket-by-workgroup").then((a) => a.json()).then((b) => {

		(a => {
			b.data.forEach(dataWg => {
				const b = el({a:'tr', b:a})
				el({a:'td', b:b, c:dataWg.ownergroup, d:{class:'tableTicketBorder'} })
				el({a:'td', b:b,c:dataWg.treg, d:{class:'tableTicketBorder'} })
				el({a:'td', b:b,c:dataWg.ticket_total, d:{class:'tableTicketBorder'} })
				el({a:'td', b:b,c:dataWg.avg_ttr.toString().substring(0,5), d:{class:'tableTicketBorder'} })
			});
			})
		(a);
	});
	

}
