const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const serviceSid = process.env.REACT_APP_TWILIO_SERVICE_ID;
let serverHost = "";

if (process.env.NODE_ENV == "development") {
  serverHost = 'http://localhost:8080';
}
else if (process.env.NODE_ENV == 'production') {
  serverHost = ''; // URL of deployed server
}

export function startVerification(phone) {
  var myHeaders = new Headers();

  // TODO: btoa depricated, but Buffer.from does not work
  myHeaders.append('Authorization', 'Basic ' + btoa(accountSid + ":" + authToken));

  var formdata = new FormData();
  
  phone = "+1" + phone; // default to USA

  formdata.append("To", phone);
  formdata.append("Channel", "sms");
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  return fetch(`${serverHost}/v2/Services/${serviceSid}/Verifications`, requestOptions)
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
  var myHeaders = new Headers();
  
  // TODO: btoa depricated, but Buffer.from does not work
  myHeaders.append('Authorization', 'Basic ' + btoa(accountSid + ":" + authToken));

  var formdata = new FormData();

  phone = "+1" + phone; // currently default to USA

  formdata.append("To", phone);
  formdata.append("Code", code);
  formdata.append("Channel", "sms");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  // ERROR: This is returning a 404 NOT FOUND 
  // It isn't getting to server.js for some reason 
  return fetch(`${serverHost}/v2/Services/${serviceSid}/VerificationCheck`, requestOptions)
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