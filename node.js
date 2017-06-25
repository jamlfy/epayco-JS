import { enc, mode, pad, AES } from 'crypto-js';
import request from 'superagent';
import IP from 'ip';

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

	constructor({ apiKey, privateKey, test }){
		if (!(this instanceof Epayco)) {
			return new Epayco({ apiKey, privateKey test });
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
	}

	__request (method, url, data={}, sw) {
		//Set ip
		data['ip'] = IP.address();

		if (sw) {
			data = setData(data, this.__privateKey, this.__apiKey, this.test);
			url = Epayco.BASE_URL_SECURE + url;
		} else {
			url = Epayco.BASE_URL + url;
		}

		 return new Promise((resolve, reject) => {
			request(method, url)
				.auth(this.__apiKey, '')
				.set('type', 'sdk')
				.query(method === 'get' && data || {})
				.send(method !== 'get' && data || {})
				.end(function(res) {
					if (res.ok) {
						return resolve(res.body);
					} else {
						return reject(res.error);
					}
				});
		});
	}
}

function setData(data, privateKey, publicKey, test) {
	return Object.assign({ public_key, lenguaje,
		enpruebas : encrypt('TRUE', privateKey)
	}, encryptHex(privateKey));
}

/**
 * Encrypt text
 * @param  {string} value plain text
 * @param  {string} key   private key user
 * @return {string}       text encrypt
 */
function encrypt(value, userKey) {
	return AES.encrypt(value, enc.Hex.parse(userKey), {
		iv : enc.Hex.parse('0000000000000000'),
		mode: mode.CBC,
		padding: pad.Pkcs7
	}).ciphertext.toString(enc.Base64);
}

/**
 * Get bites petition secure
 * @param  {string} userKey private key user
 * @return {object}         bites from crypto-js
 */
function encryptHex(userKey) {
	return {
		i: enc.Hex.parse('0000000000000000').toString(enc.Base64),
		p: enc.Hex.parse(userKey).toString(enc.Base64)
	}
}

