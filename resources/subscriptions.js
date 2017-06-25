export default class Subscriptions {

	static URL = '/recurring/v1/subscription';

	constructor(epayco) {
		this._E = e;
	}
	/**
	 * Create Subscriptions
	 * @param {Object} options
	 * @api public
	 */
	create(options) {
		return this._E.__request('post', `${Subscriptions.URL}/create`, options, false);
	}
	/**
	 * Retrieve Subscriptions
	 *
	 * @param {String} uid
	 * @api public
	 */
	get(uid) {
		return this._E.__request('get', `${Subscriptions.URL}/${uid}/${this._E.__apiKey}/`, null, false);
	}
	/**
	 * List Subscriptions
	 * @api public
	 */
	list() {
		return this._E.__request('get', `${Subscriptions.URL}s/${this._E.__apiKey}/`, null, false);
	}
	/**
	 * Cancel Subscriptions
	 *
	 * @param {String} uid
	 * @api public
	 */
	cancel(id) {
		return this._E.__request('post', `${Subscriptions.URL}/cancel`, {
			id,
			public_key: this._E.__apiKey
		}, false);
	}
	/**
	 * Charge Subscriptions
	 *
	 * @param {String} uid
	 * @api public
	 */
	charge(options) {
		return this._E.__request('post', "/payment/v1/charge/subscription/create", options, false);
	}
}

util.inherits(subscriptions, Resource);
