# Epayco

Node/ReactNative/Web wrapper for Epayco API

## Description

API to interact with Epayco <https://epayco.co/docs/api/>

## Installation

As usual, you can install it using npm.

```
$ npm install epayco
```

## Usage

```javascript
var epayco = require('epayco-js')({
    apiKey: 'PUBLIC_KEY',
    privateKey: 'PRIVATE_KEY',
    test: true | false
}, isReact);
```

### Create Token

```javascript
epayco.token.create({
    "card[number]": "4575623182290326",
    "card[exp_year]": "2017",
    "card[exp_month]": "07",
    "card[cvc]": "123"
}).then((token) => {
        console.log(token);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

### Customers

#### Create

```javascript
epayco.customers.create({
    token_card: "toke_id",
    name: "Joe Doe",
    email: "joe@payco.co",
    phone: "3005234321",
    default: true
})
    .then((customer) => {
        console.log(customer);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Retrieve

```javascript
epayco.customers.get("id_customer")
    .then((customer) => {
        console.log(customer);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### List

```javascript
epayco.customers.list()
    .then((customers) => {
        console.log(customers);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Update

```javascript
epayco.customers.update("id_customer", {
    name: "Alex"
}).then((customer) => {
        console.log(customer);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

### Plans

#### Create

```javascript
epayco.plans.create({
    id_plan: "coursereact",
    name: "Course react js",
    description: "Course react and redux",
    amount: 30000,
    currency: "cop",
    interval: "month",
    interval_count: 1,
    trial_days: 30
})
    .then((plan) => {
        console.log(plan);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Retrieve

```javascript
epayco.plans.get("id_plan")
    .then((plan) => {
        console.log(plan);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### List

```javascript
epayco.plans.list()
    .then((plans) => {
        console.log(plans);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Remove

```javascript
epayco.plans.delete("id_plan")
    .then((plan) => {
        console.log(plan);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

### Subscriptions

#### Create

```javascript
epayco.subscriptions.create({
    id_plan: "-id_plan",
    customer: "id_customer",
    token_card: "id_token",
    doc_type: "CC",
    doc_number: "5234567"
})
    .then((subscription) => {
        console.log(subscription);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Retrieve

```javascript
epayco.subscriptions.get("id_subscription")
    .then((subscription) => {
        console.log(subscription);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### List

```javascript
epayco.subscriptions.list()
    .then((subscriptions) => {
        console.log(subscriptions);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Cancel

```javascript
epayco.subscriptions.cancel("id_subscription")
    .then((subscription) => {
        console.log(subscription);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Pay Subscription

```javascript
epayco.subscriptions.charge({
    id_plan: "-id_plan",
    customer: "id_customer",
    token_card: "id_token",
    doc_type: "CC",
    doc_number: "5234567"
})
    .then((subscription) => {
        console.log(subscription);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

### PSE

#### Create

```javascript
epayco.bank.create({
    bank: "1022",
    invoice: "1472050778",
    description: "pay test",
    value: "10000",
    tax: "0",
    tax_base: "0",
    currency: "COP",
    type_person: "0",
    doc_type: "CC",
    doc_number: "10358519",
    name: "testing",
    last_name: "PAYCO",
    email: "no-responder@payco.co",
    country: "CO",
    cell_phone: "3010000001",
    url_response: "https:/secure.payco.co/restpagos/testRest/endpagopse.php",
    url_confirmation: "https:/secure.payco.co/restpagos/testRest/endpagopse.php",
    method_confirmation: "GET",
})
    .then((bank) => {
        console.log(bank);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Retrieve

```javascript
epayco.bank.get("transaction_id")
    .then((bank) => {
        console.log(bank);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

### Cash

#### Create

```javascript
epayco.cash.create("efecty", {
    invoice: "1472050778",
    description: "pay test",
    value: "20000",
    tax: "0",
    tax_base: "0",
    currency: "COP",
    type_person: "0",
    doc_type: "CC",
    doc_number: "10358519",
    name: "testing",
    last_name: "PAYCO",
    email: "test@mailinator.com",
    cell_phone: "3010000001",
    end_date: "2017-12-05",
    url_response: "https:/secure.payco.co/restpagos/testRest/endpagopse.php",
    url_confirmation: "https:/secure.payco.co/restpagos/testRest/endpagopse.php",
    method_confirmation: "GET",
})
    .then((cash) => {
        console.log(cash);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Retrieve

```javascript
epayco.cash.get("transaction_id")
    .then((cash) => {
        console.log(cash);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

### Payment

#### Create

```javascript
epayco.charge.create({
    token_card: "token_id",
    customer_id: "customer_id",
    doc_type: "CC",
    doc_number: "1035851980",
    name: "John",
    last_name: "Doe",
    email: "example@email.com",
    bill: "OR-1234",
    description: "Test Payment",
    value: "116000",
    tax: "16000",
    tax_base: "100000",
    currency: "COP",
    dues: "12"
})
    .then((charge) => {
        console.log(charge);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```

#### Retrieve

```javascript
epayco.charge.get("transaction_id")
    .then((charge) => {
        console.log(charge);
    })
    .catch((err) => {
        console.log("err: " + err);
    });
```
