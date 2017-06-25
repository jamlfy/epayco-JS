class Bank {

	constructor(e){
		this._E = e;
	}

	create(opts){
		return this._E.__request('post', `${Bank.URL}pagos/debitos.json`, options, true);
	}

	get(uid) {
		return this._E.__request('get', `${Bank.URL}pse/transactioninfomation.json?transactionID=${uid}&&public_key=${this._E.__apiKey}`, null, true);
	}
};

Bank.URL = '/restpagos/';
module.exports = Bank;
