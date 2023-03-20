import { order } from './interfaces';
import { proxyAddress, devAddress } from './config';
import { v4 as uuidv4 } from 'uuid';

let serverHost = "";

if (process.env.NODE_ENV === "development") {
  serverHost = devAddress;
}
else if (process.env.NODE_ENV === "production") {
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

  var statusCode;
  return fetch(`${serverHost}/api/tremendous/listCampaigns`, options)
    .then(response => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json()
    })
    .then((data) => {
      data.statusCode = statusCode;
      return data;
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

  var statusCode;
  return fetch(`${serverHost}/api/tremendous/listFundingSources`, options)
    .then(response => { 
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      return data;
    })
}


export async function sendPayment(order, surveyID, mode) {

  const token = "JWT " + getCookie("token");

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      funding_source_id: order.funding_source_id,
      campaign_id: order.campaign_id,
      denomination: order.denomination,
      recipient: {
        name: order.recipient_name,
        email: order.recipient_email,
      },
      method: order.delivery_method
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}/sendPayment/${mode}`, options)
    .then(response => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json()
    })
    .then((data) => {
      data.statusCode = statusCode;
      return data;
    })
}