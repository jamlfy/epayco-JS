module.exports = class Charge {

	constructor(e) {
		 this._E = e;
	}

	/**
	* Create Subscriptions
	* @param {Object} options
	* @api public
	*/
	create(options) {
		return this._E.__request('post', '/payment/v1/charge/create', options, false);
	}

	/**
	* Retrieve Subscriptions
	*
	* @param {String} uid
	* @api public
	*/
	get(ref_payco) {
		return this._E.__request('get', `/restpagos/transaction/response.json`, {
			ref_payco,
			public_key: this._E.__apiKey
		}, true);
	}
}