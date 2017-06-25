class Plans {

	constructor(e) {
		this._E = e;
	}
	/**
	 * Create Plans
	 * @param {Object} options
	 * @api public
	 */
	create(options) {
		return this._E.__request('post', `${Plans.URL}/create`, options, false);
	}
	/**
	 * Retrieve Plan
	 *
	 * @param {String} uid
	 * @api public
	 */
	get(uid) {
		return this._E.__request('get', `${Plans.URL}/${this._E.__apiKey}/${uid}/`, null, false);
	}
	/**
	 * List Plans
	 * @api public
	 */
	list() {
		return this._E.__request('get', `${Plans.URL}s/${this._E.__apiKey}/`, null, false);
	}
	/**
	 * Remove Plan
	 *
	 * @param {String} uid
	 * @api public
	 */
	delete(uid) {
		return this._E.__request('post', `${Plans.URL}/remove/${this._E.__apiKey}/${uid}/`, null, false);
	}
};

Plans.URL = '/recurring/v1/plan';
module.exports = Plans;
