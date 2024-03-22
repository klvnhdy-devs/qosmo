const ticket1card1 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card1'} });
	el({ a: "div", b: a, c: "SLA Achievments", d:{class:"title"} });
	el({ a: "div", b: a, c: "99%", d:{class:"titleBody"} });
}

const ticket1card2 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card2'} });
	el({ a: "div", b: a, c: "AVG MTTR", d:{class:"title"} });
	m.ticket.mttr = el({ a: "div", b: a, c: "", d:{class:"titleBody"} });
}

const ticket1card3 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card3'} });
	el({ a: "div", b: a, c: "Total Ticket SLA", d:{class:"title"} });
	m.ticket.totalTicket = el({ a: "div", b: a, c: "", d:{class:"titleBody"} });
}

const ticket1card4 = a => {
	a = el({a:'div', b:a, d:{id:'ticket1card4'} });
	el({ a: "div", b: a, c: "Resolved Ticket with SLA", d:{class:"title"} });
	m.ticket.Resolved = el({ a: "div", b: a, c: "", d:{class:"titleBody"} });
}
/*
fetch("https://10.62.175.157/qosmo2/tmp.php?cmd=avg-ticket-monthly").then((a) => a.json()).then((b) => {
	
	m.ticket.mttr.innerHTML = b.data[0]['avg_mttr'].toString().substring(0,5);
	m.ticket.totalTicket.innerHTML = b.data[1]['ticketsla'].toString().substring(0,5)

	m.ticket.Resolved.innerHTML = (( b.data[2]['ttr_closed'] / b.data[2]['jumlah_ttr'] ) * 100 ).toString().substring(0,5) + "%";

})
*/
