

const accountSid = 'AC055a4ac886088ae80960da21644de4e0';
const authToken = '9e19e000d6c1506bf92ff8d7d5043b42';

const serviceSid = 'VAf04a776258bab3e2c11286dc4152cf3d';

export function startVerification(phone) {
  var myHeaders = new Headers();

  // TODO: btoa depricated, but Buffer.from does not work
  myHeaders.append('Authorization', 'Basic ' + btoa(accountSid + ":" + authToken));

  var formdata = new FormData();
  phone = "+1" + phone;
  formdata.append("To", phone);
  formdata.append("Channel", "sms");
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:8080/v2/Services/${serviceSid}/Verifications`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export function verificationCheck(phone, code) {
  var myHeaders = new Headers();
  
  // TODO: btoa depricated, but Buffer.from does not work
  myHeaders.append('Authorization', 'Basic ' + btoa(accountSid + ":" + authToken));

  var formdata = new FormData();
  phone = "+1" + phone;
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
  fetch(`http://localhost:8080/v2/Services/${serviceSid}/VerificationCheck`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}