const el = a=>{
	a.g = [
		document,
		Object,
		'addEventListener',
		'appendChild',
		'createElement',
		'forEach',
		'keys',
		'setAttribute',
		'textContent'
	]
	a.f = a.g[0][a.g[4]](a.a)
	a.c && (a.f[a.g[8]] = a.c)
	a.d && a.g[1][a.g[6]](a.d) [a.g[5]](d=>{
		a.f[a.g[7]](d, a.d[d])
	})
	a.e && a.g[1][a.g[6]](a.e) [a.g[5]](e=>{
		a.f[a.g[2]](e, a.e[e])
	})
	a.b && a.b[a.g[3]](a.f)
	return a.f
}
const dlg = a=>{
	a = [
		a ? a.left || 32 : 32,
		a ? a.top || 16 : 16,
		b=>{
			a[7][a[14]][a[29]] != a[6] && a[7][a[14]][a[12]](a[6])
		},
		b=>{
			b = b || a[8][a[24]]
			b[a[49]]()
			b[a[40]]()
			a[0] = b[a[19]]
			a[1] = b[a[20]]
			a[2]()
			a[7][a[10]](a[33], a[5])
			a[7][a[10]](a[32], a[4])
		},
		b=>{
			b = b || a[8][a[24]]
			b[a[49]]()
			a[6][a[50]][a[30]] = (a[6][a[34]] - a[0] + b[a[19]]) + a[41]
			a[6][a[50]][a[53]] = (a[6][a[35]] - a[1] + b[a[20]]) + a[41]
			a[0] = b[a[19]]
			a[1] = b[a[20]]
		},
		b=>{
			a[7][a[44]](a[32], a[4])
			a[7][a[44]](a[33], a[5])
		},,
		document,
		window,
		'absolute',
		'addEventListener',
		'align',
		'appendChild',
		'background',
		'body',
		'both',
		'box',
		'border',
		'center',
		'clientX',
		'clientY',
		'cursor',
		'default',
		'div',
		'event',
		'fixed',
		'font',
		'grab',
		'height',
		'lastElementChild',
		'left',
		'margin',
		'mousemove',
		'mouseup',
		'offsetLeft',
		'offsetTop',
		'overflow',
		'padding',
		'parentElement',
		'position',
		'preventDefault',
		'px',
		'radius',
		'removeChild',
		'removeEventListener',
		'resize',
		'rgba',
		'scroll',
		'shadow',
		'stopPropagation',
		'style',
		'target',
		'text',
		'top',
		'weight',
		'width',
		a ? a.title || 'title' : 'title',
		a ? a.width || 300 : 300,
		a ? a.height || 200 : 200
	]
	a[6] = el({
		a: a[23],
		b: a[7][a[14]],
		d: {
			style: `${ a[53] }:${ a[1] + a[41] };${ a[30] }:${ a[0] + a[41] };${ a[13] }:${ a[46] }(255,255,255,.6);${ a[17] }-${ a[42] }:8${ a[41] };${ a[16] }-${ a[48] }:0 0 6${ a[41] } 2${ a[41] } ${ a[46] }(0,0,0,.1);${ a[39] }:${ a[25] };${ a[37] }:12${ a[41] } 16${ a[41] } 16${ a[41] } 16${ a[41] };`
		},
		e: {
			mousedown: e=>{
				e[a[49]]()
				a[2]()
			}
		}
	})
	return el({
		a: a[23],
		b:
		el({
			a: a[23],
			b:
			el({
				a: a[23],
				b: a[6],
				c: a[56],
				d: {
					style:`${ a[13] }:${ a[46] }(0,0,0,.8);${ a[17] }-${ a[42] }:6${ a[41] };color:${ a[46] }(255,255,255,.8);${ a[21] }:${ a[27] };${ a[31] }:0 0 8${ a[41] } 0;${ a[37] }:8${ a[41] } 48${ a[41] } 8${ a[41] } 32${ a[41] };${ a[52] }-${ a[11] }:${ a[18] };`
				},
				e: { mousedown: a[3] }
			}) [a[38]],
		c: 'x',
		d: {
			style: `${ a[13] }:${ a[46] }(255,255,255,.8);${ a[17] }-${ a[42] }:4${ a[41] };${ a[21] }:${ a[22] };${ a[26] }-${ a[54] }:bold;${ a[37] }:4${ a[41] };${ a[39] }:${ a[9] };${ a[52] }-${ a[11] }:${ a[18] };${ a[53] }:16${ a[41] };right:22${ a[41] };`
		},
		e: {
			click: e=>{
				e[a[49]]()
				a[7][a[14]][a[43]](a[6])
			}
		}
		}) [a[38]],
		d: {
			style: `${ a[55] }:${ a[57] }${ a[41] };${ a[28] }:${ a[58] }${ a[41] };${ a[13] }:${ a[46] }(255,255,255,.8);${ a[17] }:1${ a[41] } solid ${ a[46] }(0,0,0,.1);${ a[17] }-${ a[42] }:8${ a[41] };${ a[37] }:8${ a[41] };min-${ a[55] }:80${ a[41] };min-${ a[28] }:48${ a[41] };${ a[45] }:${ a[15] };${ a[36] }:${ a[47] };`
		}
	})
}