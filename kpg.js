var DEFAULT_SIZE = 10,
	MIN_SIZE = 1,
	LOWER = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
	UPPER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
	NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
	SPECIAL = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '.', '?', '<', '>'],
	ALL = LOWER.concat(UPPER, NUMBERS, SPECIAL)
	floor = Math.floor,
	rand = Math.random;

function shuffle(arr) {
	var i, lng, pos, tmp;

	lng = arr.length;

	// Fisher-Yates algorithm : Durstenfeld's version
	for (i = 0; i < lng; i++, lng--) {
		pos = floor(rand() * (lng - 1));
		tmp = arr[pos];
		arr[pos] = arr[lng - 1];
		arr[lng-1] = tmp;
	}

	return arr;
}

function kpg(config) {
	var i, j, t, pw, cnt, lng, tmp, pos;

	t = typeof config;

	if (t == "number")
		config = {sz:config || {}}; // catches NaN

	else if (t == "string")
		config = {sz:+config || {}}; // catches NaN

	else if (t == "function" || t == "undefined" || t == "boolean" || t == "null")
		config = {};

	else
		config = config || {};

	config.l = typeof config.l == 'number' ? floor(config.l) : 0;
	config.u = typeof config.u == 'number' ? floor(config.u) : 0;
	config.n = typeof config.n == 'number' ? floor(config.n) : 0;
	config.s = typeof config.s == 'number' ? floor(config.s) : 0;
	config.sz = typeof config.sz == 'number' ? floor(config.sz) : DEFAULT_SIZE;

	// size grows to property sum
	if (config.l + config.u + config.n + config.s > config.sz)
		config.sz = (config.l + config.u + config.n + config.s);

	if (config.sz < MIN_SIZE)
		config.sz = DEFAULT_SIZE;

	pw = Array(config.sz);
	cnt = 0;

	// lower case
	for (i = 0; i < config.l; i++) {
		for (j = 0, lng = LOWER.length; j < lng; j++, lng--) {
			pos = floor(rand() * (lng-1));
			tmp = LOWER[pos];
			LOWER[pos] = LOWER[lng-1];
			LOWER[lng-1] = tmp;
		}
		pw[cnt++] = LOWER[floor(rand() * (LOWER.length-1))];
	}
	config.sz -= config.l;

	// upper case
	for (i = 0; i < config.u; i++) {
		for (j = 0, lng = UPPER.length; j < lng; j++, lng--) {
			pos = floor(rand() * (lng-1));
			tmp = UPPER[pos];
			UPPER[pos] = UPPER[lng-1];
			UPPER[lng-1] = tmp;
		}
		pw[cnt++] = UPPER[floor(rand() * (UPPER.length-1))];
	}
	config.sz -= config.u;

	// numbers
	for (i = 0; i < config.n; i++) {
		for (j = 0, lng = NUMBERS.length; j < lng; j++, lng--) {
			pos = floor(rand() * (lng-1));
			tmp = NUMBERS[pos];
			NUMBERS[pos] = NUMBERS[lng-1];
			NUMBERS[lng-1] = tmp;
		}
		pw[cnt++] = NUMBERS[floor(rand() * (NUMBERS.length-1))];
	}
	config.sz -= config.n;

	// special characters
	for (i = 0; i < config.s; i++) {
		for (j = 0, lng = SPECIAL.length; j < lng; j++, lng--) {
			pos = floor(rand() * (lng-1));
			tmp = SPECIAL[pos];
			SPECIAL[pos] = SPECIAL[lng-1];
			SPECIAL[lng-1] = tmp;
		}
		pw[cnt++] = SPECIAL[floor(rand() * (SPECIAL.length-1))];
	}
	config.sz -= config.s;

	// the rest
	if (config.sz > 0) {
		for (i = config.sz; i > 0; i--) {
			for (j = 0, lng = ALL.length; j < lng; j++, lng--) {
				pos = floor(rand() * (lng-1));
				tmp = ALL[pos];
				ALL[pos] = ALL[lng-1];
				ALL[lng-1] = tmp;
			}
			pw[cnt++] = ALL[floor(rand() * (ALL.length-1))];
		}
	}

	// final shuffle
	for (i = 0, lng = pw.length; i < lng; i++, lng--) {
		pos = floor(rand() * (lng-1));
		tmp = pw[pos];
		pw[pos] = pw[lng-1];
		pw[lng-1] = tmp;
	}


	return pw.join('');
}

module.exports = kpg;
