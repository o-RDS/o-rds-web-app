
// replace tokens here
const devToken = "Bearer TEST_2lm2pekxx--s_kiobii4fxfecyrk2yg1jbjqq-eryia";
// const prodToken = "Beaarer [TOKEN]"; 

export default async function listFundingSources() {

  const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: devToken,
      }
    };
  
  await fetch('api/v2/funding_sources', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
}

export function createOrder() {
  const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: devToken
      },
      body: JSON.stringify({
        external_id: 'Your-Individual-Identifier-for-This-Order',
        payment: {funding_source_id: 'SOMEIDSOMEID', channel: 'UI'},
        rewards: [
          {
            campaign_id: 'SOMEIDSOMEID',
            products: ['SOMEIDSOMEID'],
            value: {denomination: 50, currency_code: 'USD'},
            recipient: {name: 'John Doe Jr.', email: 'john.doe@example.com', phone: '123-456-7890'},
            custom_fields: [{id: 'SOMEIDSOMEID', value: 'Hufflepuff'}],
            delivery: {method: 'EMAIL'}
          }
        ]
      })
    };
    
  fetch('https://testflight.tremendous.com/api/v2/orders', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}