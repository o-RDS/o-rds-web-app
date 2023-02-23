import { proxyAddress } from './config';
let serverHost = "";

if (process.env.NODE_ENV == "development") {
  serverHost = 'http://localhost:8080';
}
else if (process.env.NODE_ENV == 'production') {
  serverHost = proxyAddress; // URL of deployed server
}

export function startVerification(phone) {

  phone = phone.toString();
  phone = "+1" + phone; 

  
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      to: phone
    }),
    redirect: 'follow'
  };
  
  return fetch(`${serverHost}/api/twilio/verification`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      return data;
    });
}

export function verificationCheck(phone, code) {

  phone = phone.toString();
  phone = "+1" + phone; // currently default to USA


  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      to: phone,
      code: code
    }),
    redirect: 'follow'
  };

  return fetch(`${serverHost}/api/twilio/verificationCheck`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      return data;
    });
}