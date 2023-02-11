const serviceSid = process.env.REACT_APP_TWILIO_SERVICE_ID;
let serverHost = "";

if (process.env.NODE_ENV == "development") {
  serverHost = 'http://localhost:8080';
}
else if (process.env.NODE_ENV == 'production') {
  serverHost = ''; // URL of deployed server
}

export function startVerification(phone) {

  // Auth now done at serter
  // myHeaders.append('Authorization', 'Basic ' + btoa(accountSid + ":" + authToken));

  var formdata = new FormData();
  
  phone = "+1" + phone; // default to USA

  formdata.append("To", phone);
  formdata.append("Channel", "sms");
  
  var requestOptions = {
    method: 'POST',
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

  // Auth now done at serter
  // myHeaders.append('Authorization', 'Basic ' + btoa(accountSid + ":" + authToken));

  var formdata = new FormData();

  phone = "+1" + phone; // currently default to USA

  formdata.append("To", phone);
  formdata.append("Code", code);
  formdata.append("Channel", "sms");

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

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