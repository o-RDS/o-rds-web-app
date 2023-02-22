import { order } from './interfaces';
import { proxyAddress } from './config';

let serverHost = "";

if (process.env.NODE_ENV == "development") {
  serverHost = 'http://localhost:8080';
}
else if (process.env.NODE_ENV == "production") {
  serverHost = proxyAddress; // URL of deployed server
}

export async function listCampaigns(JWT)   {

  const token = "JWT " + JWT;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    }
  };


  return fetch(`${serverHost}/tremendous/listCampaigns`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      return data.campaigns;
    })
}

export async function listFundingSources(JWT)   {

  const token = "JWT " + JWT;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token, 
    }
  };


  return fetch(`${serverHost}/tremendous/listFundingSources`, options)
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


export async function sendPayment(order, JWT) {

  const token = "JWT " + JWT;

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      external_id: order.external_id,
      funding_source_id: order.funding_source_id,
      campaign_id: order.campaign_id,
      products: order.products,
      denomination: order.denomination,
      recipient: {
        name: order.recipient_name,
        email: order.recipient_email,
        phone: order.recipient_phone
      },
      method: order.delivery_method,
      to: order.recipient_phone
    })
  };


  return fetch(`${serverHost}/tremendous/sendPayment`, options)
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