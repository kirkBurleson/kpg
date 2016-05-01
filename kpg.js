var DEFAULT_SIZE = 10,
	MIN_SIZE = 8,
	MAX_SIZE = 300,
	LOWER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	UPPER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	SPECIAL = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '.', '?', '<', '>'],
	ALL = LOWER.concat(UPPER, NUMBERS, SPECIAL);

Array.prototype.shuffle = function() {
	var i, lng, pos, tmp, floor, rand;

	lng = this.length;
	floor = Math.floor;
	rand = Math.random;

	// Fisher-Yates algorithm : Durstenfeld's version
	for (i = 0; i < lng; i++, lng--) {
		pos = floor(rand() * (lng - 1));
		tmp = this[pos];
		this[pos] = this[lng - 1];
		this[lng-1] = tmp;
	}

	return this;
}

Array.prototype.pick = function() {
	return this[Math.floor(Math.random() * (this.length-1))];
}

function kpg(config) {
	var i,
		pw = [];

	switch (typeof config) {
		case 'function':
		case 'string':
		case 'undefined':
		case 'boolean':
		case 'null':
			config = {};
			break;
		case 'number':
			config = {sz:Math.floor(config)};
			break;
		default:
			config = config || {};
	}

	config.l = typeof config.l == 'number' ? Math.floor(config.l) : 0;
	config.u = typeof config.u == 'number' ? Math.floor(config.u) : 0;
	config.n = typeof config.n == 'number' ? Math.floor(config.n) : 0;
	config.s = typeof config.s == 'number' ? Math.floor(config.s) : 0;
	config.sz = typeof config.sz == 'number' ? Math.floor(config.sz) : DEFAULT_SIZE;

	// enforcements are greater than size
	if (config.l + config.u + config.n + config.s > config.sz)
		config.sz = (config.l + config.u + config.n + config.s);

	if (config.sz < MIN_SIZE || config.sz > MAX_SIZE)
		config.sz = DEFAULT_SIZE;

	

	// lower case
	for (i = 0; i < config.l; i++) {
		LOWER.shuffle();
		pw.unshift(LOWER.pick());
	}
	config.sz -= config.l;

	// upper case
	for (i = 0; i < config.u; i++) {
		UPPER.shuffle();
		pw.unshift(UPPER.pick());
	}
	config.sz -= config.u;

	// numbers
	for (i = 0; i < config.n; i++) {
		NUMBERS.shuffle();
		pw.unshift(NUMBERS.pick());
	}
	config.sz -= config.n;

	// special characters
	for (i = 0; i < config.s; i++) {
		SPECIAL.shuffle();
		pw.unshift(SPECIAL.pick());
	}
	config.sz -= config.s;

	// the rest
	if (config.sz > 0) {
		for (i = config.sz; i > 0; i--) {
			ALL.shuffle();
			pw.unshift(ALL.pick());
		}
	}


	return pw.shuffle().join('');
}

module.exports = kpg;