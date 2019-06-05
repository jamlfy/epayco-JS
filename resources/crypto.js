const { enc, mode, pad, AES } = require('crypto-js');
const HEX = '0000000000000000';
const lenguaje = 'javascript';

module.exports = function setData(data={}, privateKey, public_key, test) {
	var set = { public_key, lenguaje, enpruebas : encrypt(test, privateKey) };

	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			set[key] = encrypt(data[key], privateKey);
		}
	}

	return Object.assign(set, encryptHex(privateKey));
};

/**
 * Encrypt text
 * @param  {string} value plain text
 * @param  {string} key   private key user
 * @return {string}       text encrypt
 */
function encrypt(value, userKey) {
	return AES.encrypt(value, enc.Hex.parse(userKey), {
		iv : enc.Hex.parse(HEX),
		mode: mode.CBC,
		padding: pad.Pkcs7
	}).ciphertext.toString(enc.Base64);
}

/**
 * Get bites petition secure
 * @param  {string} userKey private key user
 * @return {object}         bites from crypto-js
 */
function encryptHex(userKey) {
	return {
		i: enc.Hex.parse(HEX).toString(enc.Base64),
		p: enc.Hex.parse(userKey).toString(enc.Base64)
	}
}