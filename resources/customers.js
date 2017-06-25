class Customers {

	constructor(e) {
		this._E = e;
	}
	/**
	 * Create Customer
	 * @param {Object} options
	 * @api public
	 */
	create(options) {
		return this._E.__request('post', `${Customers.URL}/create`, options, false);
	}
	/**
	 * Retrieve Customer
	 *
	 * @param {String} uid
	 * @api public
	 */
	get(uid) {
		return this._E.__request('get', `${Customers.URL}/${this._E.__apiKey}/${uid}/`, null, false);
	}
	/**
	 * List Customer
	 * @api public
	 */
	list() {
		return this._E.__request('get', `${Customers.URL}s/${this._E.__apiKey}/`, null, false);
	}
	/**
	 * Update Customer
	 *
	 * @param {String} uid
	 * @api public
	 */
	update(uid, options) {
		return this._E.__request('post', `${Customers.URL}/edit/${this._E.__apiKey}/${uid}/`, options, false);
	}
}

Customers.URL = '/payment/v1/customer';
module.exports = Customers;
