import { order } from './interfaces';


const devToken = process.env.REACT_APP_TREMENDOUS_BEARER_TOKEN;


export async function listFundingSources()   {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: devToken,
    }
  };


  return fetch('http://localhost:8080/api/v2/funding_sources', options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      return data.funding_sources;
    })
}

export async function createOrder(order) {
  const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: devToken
      },
      body: JSON.stringify({
        external_id: order.external_id, 
        payment: {funding_source_id: order.funding_source_id, channel: 'UI'},
        rewards: [
          {
            campaign_id: order.campaign_id, 
            products: order.products,
            value: {denomination: order.denomination, currency_code: 'USD'},
            recipient: {name: order.recipient_name, email: order.recipient_email, phone: order.recipient_phone},
            custom_fields: [{id: order.reward_id, value: order.reward_value}],
            delivery: {method: order.delivery_method}
          }
        ]
      })
    };

  return fetch('http://localhost:8080/api/v2/orders', options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      return data;
    })
}