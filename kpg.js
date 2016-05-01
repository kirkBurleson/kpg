var DEFAULT_CHARS = 10,
	MIN_CHARS = 6,
	MAX_CHARS = 100;

function kpg() {
	var size = arguments[0];

	if (typeof size != 'number' || size < MIN_CHARS || size > MAX_CHARS)
		size = DEFAULT_CHARS;

	return createPW(size);
}

function createPW(size) {
	var i, pw = '';

	for (i = 0; i < size; i++) {
		chars = getCharPool();
		pw += chars[Math.floor(Math.random() * (chars.length - 1))];
	}

	return pw;
}

function getCharPool() {
	// returns shuffled pool of characters
	var i, lng, result, pos,
	pool = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
	'2', '3', '4', '5', '6', '7', '8', '9',
	'!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '?', '<', '>'];

	lng = pool.length;
	result = [];	
	
	// Fisher-Yates algorithm : Durstenfeld's version
	for (i = 0; i < lng; ++i, --lng) {
		pos = Math.floor(Math.random() * (lng - 1));
		result.unshift(pool[pos]);
		pool[pos] = pool[lng - 1];
	}

	return result;
}

module.exports = {
	get: kpg
};