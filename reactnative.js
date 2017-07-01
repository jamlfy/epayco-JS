import { stringify } from 'query-string';

import setData from './resources/crypto';
import Token from './resources/token';
import Customers from './resources/customers';
import Plans from './resources/plans';
import Subscriptions from './resources/subscriptions';
import Bank from './resources/bank';
import Cash from './resources/cash';
import Charge from './resources/charge';

const lenguaje = 'javascript';

export default class Epayco {

	static BASE_URL = 'https://api.secure.payco.co';
	static BASE_URL_SECURE = 'https://secure.payco.co';
	static HEADERS = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'type' : 'sdk'
	};

	/**
	 * [constructor description]
	 * @param  {String} options.apiKey
	 * @param  {String} options.privateKey
	 * @param  {Boolean} options.test
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
	 * [updateIp description]
	 * @param  {String} ip
	 */
	updateIp (ip){
		this.ip = ip;
	}

	/**
	 * [__request description]
	 * @param  {String} method
	 * @param  {String} url
	 * @param  {Object} data
	 * @param  {Boolean} sw
	 * @return {Promise}
	 */
	__request (method, url, data={}, sw) {
		var body;
		var header = Object.assign({
			'Authorization': 'Basic '+ btoa( this.__apiKey + ':')
		}, Epayco.HEADERS);

		if(this.ip){
			data['ip'] = this.ip;
		}

		if (sw) {
			data = setData(data, this.__privateKey, this.__apiKey, this.test);
			url = Epayco.BASE_URL_SECURE + url;
		} else {
			url = Epayco.BASE_URL + url;
		}

		if( method === 'get' ){
			url +=  '?' + stringify(data);
		} else {
			body = JSON.stringify(data);
		}
		
		return fetch(url, { method, header, body});
	}
}
