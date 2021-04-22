---
title: Merchants
description: 'The Merchants endpoint in Commerce.js.'
category: Merchants
position: 6
---

This section of the documentation goes through merchants resource to access information about your merchant account,
e.g. business name, currency, support email etc.

---

## Retrieve merchant

The `about()` method uses `GET /v1/merchants/` to return information about the current authorized merchant.

Example request using Commerce.js:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('{your_public_key}');

commerce.merchants.about().then((merchant) => console.log(merchant.business_name));
```

Example request using cURL:

```bash
$ curl -X GET \
    -G "https://api.chec.io/v1/merchants" \
    -H "X-Authorization: {key}"
```


| Method | Description |
| -------------------- | ----------- |
| `about()`       | Gets information about the current authorized merchant |

<div class="highlight highlight--info">
<span>Info</span>
  <p>For more information, refer to <a href="/docs/api/?shell#get-merchant-details">the full response for retrieving the merchant details</a>.</p>
</div>

---
