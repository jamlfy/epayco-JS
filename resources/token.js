module.exports = class token {

	constructor(e) {
		this._E = e;
	}
	/**
	 * Create Token
	 * @param {Object} options
	 * @api public
	 */
	create(options) {
		return this._E.__request('post', '/v1/tokens', options, false);
	}
}
