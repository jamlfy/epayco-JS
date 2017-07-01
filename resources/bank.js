class Bank {

	constructor(e){
		this._E = e;
	}
	/**
	 * [create description]
	 * @param  {Object} opts 
	 * @return {Promise}
	 */
	create(opts={}){
		return this._E.__request('post', `${Bank.URL}pagos/debitos.json`, opts, true);
	}

	/**
	 * [get description]
	 * @param  {String} transactionID 
	 * @return {Promise}
	 */
	get(transactionID) {
		return this._E.__request('get', `${Bank.URL}pse/transactioninfomation.json`, {
			transactionID, 
			public_key : this._E.__apiKey
		}, true);
	}
};

Bank.URL = '/restpagos/';
module.exports = Bank;
