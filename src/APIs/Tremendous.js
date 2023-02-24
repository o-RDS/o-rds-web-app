import { order } from './interfaces';
import { proxyAddress } from './config';

let serverHost = "";

if (process.env.NODE_ENV == "development") {
  serverHost = 'http://localhost:8080';
}
else if (process.env.NODE_ENV == "production") {
  serverHost = proxyAddress; // URL of deployed server
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function listCampaigns()   {

  const token = "JWT " + getCookie("token");
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    }
  };


  return fetch(`${serverHost}/api/tremendous/listCampaigns`, options)
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

export async function listFundingSources()   {

  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token, 
    }
  };


  return fetch(`${serverHost}/api/tremendous/listFundingSources`, options)
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


export async function sendPayment(order) {

  const token = "JWT " + getCookie("token");

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
      method: order.delivery_method
    })
  };


  return fetch(`${serverHost}/api/tremendous/sendPayment`, options)
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