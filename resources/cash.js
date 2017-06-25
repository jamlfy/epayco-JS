class Cash {

	constructor(e){
		this._E = e;
	}

	create(type, opts){
		return this._E.__request('post', `${Cash.URL}pagos/efecties.json`, options, true);
	}

	get(uid) {
		return this._E.__request('get', `${Cash.URL}transaction/response.json?ref_payco=${uid}&&public_key=${this._E.__apiKey}`, null, true);
	}
};

Cash.URL = '/restpagos/';
module.exports = Cash;
