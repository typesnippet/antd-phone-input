export const validationPatterns: any = {
	ac: /^(?:[01589]\d|[46])\d{4}$/,
	ad: /^(?:1|6\d)\d{7}|[135-9]\d{5}$/,
	ae: /^(?:[4-7]\d|9[0-689])\d{7}|800\d{2,9}|[2-4679]\d{7}$/,
	af: /^[2-7]\d{8}$/,
	ag: /^(?:268|[58]\d\d|900)\d{7}$/,
	ai: /^(?:264|[58]\d\d|900)\d{7}$/,
	al: /^(?:700\d\d|900)\d{3}|8\d{5,7}|(?:[2-5]|6\d)\d{7}$/,
	am: /^(?:[1-489]\d|55|60|77)\d{6}$/,
	ao: /^[29]\d{8}$/,
	ar: /^(?:11|[89]\d\d)\d{8}|[2368]\d{9}$/,
	as: /^(?:[58]\d\d|684|900)\d{7}$/,
	at: /^1\d{3,12}|2\d{6,12}|43(?:(?:0\d|5[02-9])\d{3,9}|2\d{4,5}|[3467]\d{4}|8\d{4,6}|9\d{4,7})|5\d{4,12}|8\d{7,12}|9\d{8,12}|(?:[367]\d|4[0-24-9])\d{4,11}$/,
	au: /^1(?:[0-79]\d{7}(?:\d(?:\d{2})?)?|8[0-24-9]\d{7})|[2-478]\d{8}|1\d{4,7}$/,
	aw: /^(?:[25-79]\d\d|800)\d{4}$/,
	ax: /^2\d{4,9}|35\d{4,5}|(?:60\d\d|800)\d{4,6}|7\d{5,11}|(?:[14]\d|3[0-46-9]|50)\d{4,8}$/,
	az: /^365\d{6}|(?:[124579]\d|60|88)\d{7}$/,
	ba: /^6\d{8}|(?:[35689]\d|49|70)\d{6}$/,
	bb: /^(?:246|[58]\d\d|900)\d{7}$/,
	bd: /^[1-469]\d{9}|8[0-79]\d{7,8}|[2-79]\d{8}|[2-9]\d{7}|[3-9]\d{6}|[57-9]\d{5}$/,
	be: /^4\d{8}|[1-9]\d{7}$/,
	bf: /^[025-7]\d{7}$/,
	bg: /^00800\d{7}|[2-7]\d{6,7}|[89]\d{6,8}|2\d{5}$/,
	bh: /^[136-9]\d{7}$/,
	bi: /^(?:[267]\d|31)\d{6}$/,
	bj: /^[24-689]\d{7}$/,
	bl: /^590\d{6}|(?:69|80|9\d)\d{7}$/,
	bm: /^(?:441|[58]\d\d|900)\d{7}$/,
	bn: /^[2-578]\d{6}$/,
	bo: /^(?:[2-467]\d\d|8001)\d{5}$/,
	bq: /^(?:[34]1|7\d)\d{5}$/,
	br: /^(?:[1-46-9]\d\d|5(?:[0-46-9]\d|5[0-46-9]))\d{8}|[1-9]\d{9}|[3589]\d{8}|[34]\d{7}$/,
	bs: /^(?:242|[58]\d\d|900)\d{7}$/,
	bt: /^[17]\d{7}|[2-8]\d{6}$/,
	bw: /^(?:0800|(?:[37]|800)\d)\d{6}|(?:[2-6]\d|90)\d{5}$/,
	by: /^(?:[12]\d|33|44|902)\d{7}|8(?:0[0-79]\d{5,7}|[1-7]\d{9})|8(?:1[0-489]|[5-79]\d)\d{7}|8[1-79]\d{6,7}|8[0-79]\d{5}|8\d{5}$/,
	bz: /^(?:0800\d|[2-8])\d{6}$/,
	ca: /^(?:[2-8]\d|90)\d{8}|3\d{6}$/,
	cc: /^1(?:[0-79]\d{8}(?:\d{2})?|8[0-24-9]\d{7})|[148]\d{8}|1\d{5,7}$/,
	cd: /^[189]\d{8}|[1-68]\d{6}$/,
	cf: /^(?:[27]\d{3}|8776)\d{4}$/,
	cg: /^222\d{6}|(?:0\d|80)\d{7}$/,
	ch: /^8\d{11}|[2-9]\d{8}$/,
	ci: /^[02]\d{9}$/,
	ck: /^[2-578]\d{4}$/,
	cl: /^12300\d{6}|6\d{9,10}|[2-9]\d{8}$/,
	cm: /^[26]\d{8}|88\d{6,7}$/,
	cn: /^1[127]\d{8,9}|2\d{9}(?:\d{2})?|[12]\d{6,7}|86\d{6}|(?:1[03-689]\d|6)\d{7,9}|(?:[3-579]\d|8[0-57-9])\d{6,9}$/,
	co: /^(?:60\d\d|9101)\d{6}|(?:1\d|3)\d{9}$/,
	cr: /^(?:8\d|90)\d{8}|(?:[24-8]\d{3}|3005)\d{4}$/,
	cu: /^[27]\d{6,7}|[34]\d{5,7}|63\d{6}|(?:5|8\d\d)\d{7}$/,
	cv: /^(?:[2-59]\d\d|800)\d{4}$/,
	cw: /^(?:[34]1|60|(?:7|9\d)\d)\d{5}$/,
	cx: /^1(?:[0-79]\d{8}(?:\d{2})?|8[0-24-9]\d{7})|[148]\d{8}|1\d{5,7}$/,
	cy: /^(?:[279]\d|[58]0)\d{6}$/,
	cz: /^(?:[2-578]\d|60)\d{7}|9\d{8,11}$/,
	de: /^[2579]\d{5,14}|49(?:[34]0|69|8\d)\d\d?|49(?:37|49|60|7[089]|9\d)\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\d{1,8}|(?:1|[368]\d|4[0-8])\d{3,13}|49(?:[015]\d|2[13]|31|[46][1-8])\d{1,9}$/,
	dj: /^(?:2\d|77)\d{6}$/,
	dk: /^[2-9]\d{7}$/,
	dm: /^(?:[58]\d\d|767|900)\d{7}$/,
	do: /^(?:[58]\d\d|900)\d{7}$/,
	dz: /^(?:[1-4]|[5-79]\d|80)\d{7}$/,
	ec: /^1\d{9,10}|(?:[2-7]|9\d)\d{7}$/,
	ee: /^8\d{9}|[4578]\d{7}|(?:[3-8]\d|90)\d{5}$/,
	eg: /^[189]\d{8,9}|[24-6]\d{8}|[135]\d{7}$/,
	eh: /^[5-8]\d{8}$/,
	er: /^[178]\d{6}$/,
	es: /^[5-9]\d{8}$/,
	et: /^(?:11|[2-579]\d)\d{7}$/,
	fi: /^[1-35689]\d{4}|7\d{10,11}|(?:[124-7]\d|3[0-46-9])\d{8}|[1-9]\d{5,8}$/,
	fj: /^45\d{5}|(?:0800\d|[235-9])\d{6}$/,
	fk: /^[2-7]\d{4}$/,
	fm: /^(?:[39]\d\d|820)\d{4}$/,
	fo: /^[2-9]\d{5}$/,
	fr: /^[1-9]\d{8}$/,
	ga: /^(?:[067]\d|11)\d{6}|[2-7]\d{6}$/,
	gb: /^[1-357-9]\d{9}|[18]\d{8}|8\d{6}$/,
	gd: /^(?:473|[58]\d\d|900)\d{7}$/,
	ge: /^(?:[3-57]\d\d|800)\d{6}$/,
	gf: /^[56]94\d{6}|(?:80|9\d)\d{7}$/,
	gg: /^(?:1481|[357-9]\d{3})\d{6}|8\d{6}(?:\d{2})?$/,
	gh: /^(?:[235]\d{3}|800)\d{5}$/,
	gi: /^(?:[25]\d|60)\d{6}$/,
	gl: /^(?:19|[2-689]\d|70)\d{4}$/,
	gm: /^[2-9]\d{6}$/,
	gn: /^722\d{6}|(?:3|6\d)\d{7}$/,
	gp: /^590\d{6}|(?:69|80|9\d)\d{7}$/,
	gq: /^222\d{6}|(?:3\d|55|[89]0)\d{7}$/,
	gr: /^5005000\d{3}|8\d{9,11}|(?:[269]\d|70)\d{8}$/,
	gt: /^(?:1\d{3}|[2-7])\d{7}$/,
	gu: /^(?:[58]\d\d|671|900)\d{7}$/,
	gw: /^[49]\d{8}|4\d{6}$/,
	gy: /^9008\d{3}|(?:[2-467]\d\d|510|862)\d{4}$/,
	hk: /^8[0-46-9]\d{6,7}|9\d{4,7}|(?:[2-7]|9\d{3})\d{7}$/,
	hn: /^8\d{10}|[237-9]\d{7}$/,
	hr: /^(?:[24-69]\d|3[0-79])\d{7}|80\d{5,7}|[1-79]\d{7}|6\d{5,6}$/,
	ht: /^(?:[2-489]\d|55)\d{6}$/,
	hu: /^[235-7]\d{8}|[1-9]\d{7}$/,
	id: /^(?:(?:00[1-9]|8\d)\d{4}|[1-36])\d{6}|00\d{10}|[1-9]\d{8,10}|[2-9]\d{7}$/,
	ie: /^(?:1\d|[2569])\d{6,8}|4\d{6,9}|7\d{8}|8\d{8,9}$/,
	il: /^1\d{6}(?:\d{3,5})?|[57]\d{8}|[1-489]\d{7}$/,
	im: /^1624\d{6}|(?:[3578]\d|90)\d{8}$/,
	in: /^(?:000800|[2-9]\d\d)\d{7}|1\d{7,12}$/,
	io: /^3\d{6}$/,
	iq: /^(?:1|7\d\d)\d{7}|[2-6]\d{7,8}$/,
	ir: /^[1-9]\d{9}|(?:[1-8]\d\d|9)\d{3,4}$/,
	is: /^(?:38\d|[4-9])\d{6}$/,
	it: /^0\d{5,10}|1\d{8,10}|3(?:[0-8]\d{7,10}|9\d{7,8})|(?:55|70)\d{8}|8\d{5}(?:\d{2,4})?$/,
	je: /^1534\d{6}|(?:[3578]\d|90)\d{8}$/,
	jm: /^(?:[58]\d\d|658|900)\d{7}$/,
	jo: /^(?:(?:[2689]|7\d)\d|32|53)\d{6}$/,
	jp: /^00[1-9]\d{6,14}|[257-9]\d{9}|(?:00|[1-9]\d\d)\d{6}$/,
	ke: /^(?:[17]\d\d|900)\d{6}|(?:2|80)0\d{6,7}|[4-6]\d{6,8}$/,
	kg: /^8\d{9}|[235-9]\d{8}$/,
	kh: /^1\d{9}|[1-9]\d{7,8}$/,
	ki: /^(?:[37]\d|6[0-79])\d{6}|(?:[2-48]\d|50)\d{3}$/,
	km: /^[3478]\d{6}$/,
	kn: /^(?:[58]\d\d|900)\d{7}$/,
	kp: /^85\d{6}|(?:19\d|[2-7])\d{7}$/,
	kr: /^00[1-9]\d{8,11}|(?:[12]|5\d{3})\d{7}|[13-6]\d{9}|(?:[1-6]\d|80)\d{7}|[3-6]\d{4,5}|(?:00|7)0\d{8}$/,
	kw: /^18\d{5}|(?:[2569]\d|41)\d{6}$/,
	ky: /^(?:345|[58]\d\d|900)\d{7}$/,
	kz: /^(?:33622|8\d{8})\d{5}|[78]\d{9}$/,
	la: /^[23]\d{9}|3\d{8}|(?:[235-8]\d|41)\d{6}$/,
	lb: /^[27-9]\d{7}|[13-9]\d{6}$/,
	lc: /^(?:[58]\d\d|758|900)\d{7}$/,
	li: /^[68]\d{8}|(?:[2378]\d|90)\d{5}$/,
	lk: /^[1-9]\d{8}$/,
	lr: /^(?:[25]\d|33|77|88)\d{7}|(?:2\d|[4-6])\d{6}$/,
	ls: /^(?:[256]\d\d|800)\d{5}$/,
	lt: /^(?:[3469]\d|52|[78]0)\d{6}$/,
	lu: /^35[013-9]\d{4,8}|6\d{8}|35\d{2,4}|(?:[2457-9]\d|3[0-46-9])\d{2,9}$/,
	lv: /^(?:[268]\d|90)\d{6}$/,
	ly: /^[2-9]\d{8}$/,
	ma: /^[5-8]\d{8}$/,
	mc: /^(?:[3489]|6\d)\d{7}$/,
	md: /^(?:[235-7]\d|[89]0)\d{6}$/,
	me: /^(?:20|[3-79]\d)\d{6}|80\d{6,7}$/,
	mf: /^590\d{6}|(?:69|80|9\d)\d{7}$/,
	mg: /^[23]\d{8}$/,
	mh: /^329\d{4}|(?:[256]\d|45)\d{5}$/,
	mk: /^[2-578]\d{7}$/,
	ml: /^[24-9]\d{7}$/,
	mm: /^1\d{5,7}|95\d{6}|(?:[4-7]|9[0-46-9])\d{6,8}|(?:2|8\d)\d{5,8}$/,
	mn: /^[12]\d{7,9}|[5-9]\d{7}$/,
	mo: /^0800\d{3}|(?:28|[68]\d)\d{6}$/,
	mp: /^[58]\d{9}|(?:67|90)0\d{7}$/,
	mq: /^596\d{6}|(?:69|80|9\d)\d{7}$/,
	mr: /^(?:[2-4]\d\d|800)\d{5}$/,
	ms: /^(?:[58]\d\d|664|900)\d{7}$/,
	mt: /^3550\d{4}|(?:[2579]\d\d|800)\d{5}$/,
	mu: /^(?:[57]|8\d\d)\d{7}|[2-468]\d{6}$/,
	mv: /^(?:800|9[0-57-9]\d)\d{7}|[34679]\d{6}$/,
	mw: /^(?:[1289]\d|31|77)\d{7}|1\d{6}$/,
	mx: /^1(?:(?:[27]2|44|87|99)[1-9]|65[0-689])\d{7}|(?:1(?:[01]\d|2[13-9]|[35][1-9]|4[0-35-9]|6[0-46-9]|7[013-9]|8[1-69]|9[1-8])|[2-9]\d)\d{8}$/,
	my: /^1\d{8,9}|(?:3\d|[4-9])\d{7}$/,
	mz: /^(?:2|8\d)\d{7}$/,
	na: /^[68]\d{7,8}$/,
	nc: /^(?:050|[2-57-9]\d\d)\d{3}$/,
	ne: /^[027-9]\d{7}$/,
	nf: /^[13]\d{5}$/,
	ng: /^(?:[124-7]|9\d{3})\d{6}|[1-9]\d{7}|[78]\d{9,13}$/,
	ni: /^(?:1800|[25-8]\d{3})\d{4}$/,
	nl: /^(?:[124-7]\d\d|3(?:[02-9]\d|1[0-8]))\d{6}|8\d{6,9}|9\d{6,10}|1\d{4,5}$/,
	no: /^(?:0|[2-9]\d{3})\d{4}$/,
	np: /^(?:1\d|9)\d{9}|[1-9]\d{7}$/,
	nr: /^(?:444|(?:55|8\d)\d|666)\d{4}$/,
	nu: /^(?:[47]|888\d)\d{3}$/,
	nz: /^[1289]\d{9}|50\d{5}(?:\d{2,3})?|[27-9]\d{7,8}|(?:[34]\d|6[0-35-9])\d{6}|8\d{4,6}$/,
	om: /^(?:1505|[279]\d{3}|500)\d{4}|800\d{5,6}$/,
	pa: /^(?:00800|8\d{3})\d{6}|[68]\d{7}|[1-57-9]\d{6}$/,
	pe: /^(?:[14-8]|9\d)\d{7}$/,
	pf: /^4\d{5}(?:\d{2})?|8\d{7,8}$/,
	pg: /^(?:180|[78]\d{3})\d{4}|(?:[2-589]\d|64)\d{5}$/,
	ph: /^(?:[2-7]|9\d)\d{8}|2\d{5}|(?:1800|8)\d{7,9}$/,
	pk: /^122\d{6}|[24-8]\d{10,11}|9(?:[013-9]\d{8,10}|2(?:[01]\d\d|2(?:[06-8]\d|1[01]))\d{7})|(?:[2-8]\d{3}|92(?:[0-7]\d|8[1-9]))\d{6}|[24-9]\d{8}|[89]\d{7}$/,
	pl: /^(?:6|8\d\d)\d{7}|[1-9]\d{6}(?:\d{2})?|[26]\d{5}$/,
	pm: /^[45]\d{5}|(?:708|80\d)\d{6}$/,
	pr: /^(?:[589]\d\d|787)\d{7}$/,
	ps: /^[2489]2\d{6}|(?:1\d|5)\d{8}$/,
	pt: /^1693\d{5}|(?:[26-9]\d|30)\d{7}$/,
	pw: /^(?:[24-8]\d\d|345|900)\d{4}$/,
	py: /^59\d{4,6}|9\d{5,10}|(?:[2-46-8]\d|5[0-8])\d{4,7}$/,
	qa: /^800\d{4}|(?:2|800)\d{6}|(?:0080|[3-7])\d{7}$/,
	re: /^(?:26|[689]\d)\d{7}$/,
	ro: /^(?:[2378]\d|90)\d{7}|[23]\d{5}$/,
	rs: /^38[02-9]\d{6,9}|6\d{7,9}|90\d{4,8}|38\d{5,6}|(?:7\d\d|800)\d{3,9}|(?:[12]\d|3[0-79])\d{5,10}$/,
	ru: /^8\d{13}|[347-9]\d{9}$/,
	rw: /^(?:06|[27]\d\d|[89]00)\d{6}$/,
	sa: /^92\d{7}|(?:[15]|8\d)\d{8}$/,
	sb: /^(?:[1-6]|[7-9]\d\d)\d{4}$/,
	sc: /^800\d{4}|(?:[249]\d|64)\d{5}$/,
	sd: /^[19]\d{8}$/,
	se: /^(?:[26]\d\d|9)\d{9}|[1-9]\d{8}|[1-689]\d{7}|[1-4689]\d{6}|2\d{5}$/,
	sg: /^(?:(?:1\d|8)\d\d|7000)\d{7}|[3689]\d{7}$/,
	sh: /^(?:[256]\d|8)\d{3}$/,
	si: /^[1-7]\d{7}|8\d{4,7}|90\d{4,6}$/,
	sj: /^0\d{4}|(?:[489]\d|79)\d{6}$/,
	sk: /^[2-689]\d{8}|[2-59]\d{6}|[2-5]\d{5}$/,
	sl: /^(?:[237-9]\d|66)\d{6}$/,
	sm: /^(?:0549|[5-7]\d)\d{6}$/,
	sn: /^(?:[378]\d|93)\d{7}$/,
	so: /^[346-9]\d{8}|[12679]\d{7}|[1-5]\d{6}|[1348]\d{5}$/,
	sr: /^(?:[2-5]|68|[78]\d)\d{5}$/,
	ss: /^[19]\d{8}$/,
	st: /^(?:22|9\d)\d{5}$/,
	sv: /^[267]\d{7}|[89]00\d{4}(?:\d{4})?$/,
	sx: /^7215\d{6}|(?:[58]\d\d|900)\d{7}$/,
	sy: /^[1-39]\d{8}|[1-5]\d{7}$/,
	sz: /^0800\d{4}|(?:[237]\d|900)\d{6}$/,
	ta: /^8\d{3}$/,
	tc: /^(?:[58]\d\d|649|900)\d{7}$/,
	td: /^(?:22|[69]\d|77)\d{6}$/,
	tg: /^[279]\d{7}$/,
	th: /^(?:001800|[2-57]|[689]\d)\d{7}|1\d{7,9}$/,
	tj: /^[0-57-9]\d{8}$/,
	tk: /^[2-47]\d{3,6}$/,
	tl: /^7\d{7}|(?:[2-47]\d|[89]0)\d{5}$/,
	tm: /^[1-6]\d{7}$/,
	tn: /^[2-57-9]\d{7}$/,
	to: /^(?:0800|(?:[5-8]\d\d|999)\d)\d{3}|[2-8]\d{4}$/,
	tr: /^4\d{6}|8\d{11,12}|(?:[2-58]\d\d|900)\d{7}$/,
	tt: /^(?:[58]\d\d|900)\d{7}$/,
	tv: /^(?:2|7\d\d|90)\d{4}$/,
	tw: /^[2-689]\d{8}|7\d{9,10}|[2-8]\d{7}|2\d{6}$/,
	tz: /^(?:[25-8]\d|41|90)\d{7}$/,
	ua: /^[89]\d{9}|[3-9]\d{8}$/,
	ug: /^800\d{6}|(?:[29]0|[347]\d)\d{7}$/,
	us: /^[2-9]\d{9}|3\d{6}$/,
	uy: /^0004\d{2,9}|[1249]\d{7}|(?:[49]\d|80)\d{5}$/,
	uz: /^200\d{6}|(?:33|[5-79]\d|88)\d{7}$/,
	va: /^0\d{5,10}|3[0-8]\d{7,10}|55\d{8}|8\d{5}(?:\d{2,4})?|(?:1\d|39)\d{7,8}$/,
	vc: /^(?:[58]\d\d|784|900)\d{7}$/,
	ve: /^[68]00\d{7}|(?:[24]\d|[59]0)\d{8}$/,
	vg: /^(?:284|[58]\d\d|900)\d{7}$/,
	vi: /^[58]\d{9}|(?:34|90)0\d{7}$/,
	vn: /^[12]\d{9}|[135-9]\d{8}|[16]\d{7}|[16-8]\d{6}$/,
	vu: /^[57-9]\d{6}|(?:[238]\d|48)\d{3}$/,
	wf: /^(?:40|72)\d{4}|8\d{5}(?:\d{3})?$/,
	ws: /^(?:[2-6]|8\d{5})\d{4}|[78]\d{6}|[68]\d{5}$/,
	xk: /^[23]\d{7,8}|(?:4\d\d|[89]00)\d{5}$/,
	ye: /^(?:1|7\d)\d{7}|[1-7]\d{6}$/,
	yt: /^(?:80|9\d)\d{7}|(?:26|63)9\d{6}$/,
	za: /^[1-79]\d{8}|8\d{4,9}$/,
	zm: /^800\d{6}|(?:21|63|[79]\d)\d{7}$/,
	zw: /^2(?:[0-57-9]\d{6,8}|6[0-24-9]\d{6,7})|[38]\d{9}|[35-8]\d{8}|[3-6]\d{7}|[1-689]\d{6}|[1-3569]\d{5}|[1356]\d{4}$/,
}