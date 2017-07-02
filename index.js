const request = require('superagent');

const setData = require('./resources/crypto');
const Token = require('./resources/token');
const Customers = require('./resources/customers');
const Plans = require('./resources/plans');
const Subscriptions = require('./resources/subscriptions');
const Bank = require('./resources/bank');
const Cash = require('./resources/cash');
const Charge = require('./resources/charge');

class Epayco {

	/**
	 * [constructor description]
	 * @param  {String}  options.apiKey
	 * @param  {String}  options.privateKey
	 * @param  {Boolean} options.test
	 * @param  {Boolean} react
	 * @return {Object}
	 */
	constructor({ apiKey, privateKey, test }){
		if (!(this instanceof Epayco)) {
			return new Epayco({ apiKey, privateKey, test });
		}

		this.__apiKey = apiKey;
		this.__privateKey = privateKey;
		this.test = test ? 'TRUE' : 'FALSE';

		this.token = new Token(this);
		this.customers = new Customers(this);
		this.plans = new Plans(this);
		this.subscriptions = new Subscriptions(this);
		this.bank = new Bank(this);
		this.cash = new Cash(this);
		this.charge = new Charge(this);

		return this;
	}

	/**
	 * [__request description]
	 * @param  {String}  method
	 * @param  {String}  url
	 * @param  {Object}  data
	 * @param  {Boolean} sw
	 * @return {Promise}
	 */
	__request (method, url, data={}, sw) {
		if(this.ip){
			data['ip'] = this.ip;
		}

		if (sw) {
			data = setData(data, this.__privateKey, this.__apiKey, this.test);
			url = Epayco.BASE_URL_SECURE + url;
		} else {
			url = Epayco.BASE_URL + url;
		}

		 return new Promise((resolve, reject) => request(method, url)
				.auth(this.__apiKey, '')
				.set('type', 'sdk')
				.query(method === 'get' && data || {})
				.send(method !== 'get' && data || {})
				.end((res) => res.ok ? resolve(res.body) : reject(res.error)));
	}
};

Epayco.BASE_URL = 'https://api.secure.payco.co';
Epayco.BASE_URL_SECURE = 'https://secure.payco.co';

module.exports = Epayco;