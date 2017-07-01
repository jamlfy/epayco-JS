class Cash {

	constructor(e){
		this._E = e;
	}
	/**
	 * [create description]
	 * @param  {String} type
	 * @param  {Object} opts
	 * @return {Promise}     
	 */
	create(type, opts){
		return this._E.__request('post', `${Cash.URL}pagos/efecties.json`, options, true);
	}

	/**
	 * [get description]
	 * @param  {String} ref_payco
	 * @return {Promise}
	 */
	get(ref_payco) {
		return this._E.__request('get', `${Cash.URL}transaction/response.json`, {
			ref_payco,
			public_key : this._E.__apiKey
		}, true);
	}
};

Cash.URL = '/restpagos/';
module.exports = Cash;
