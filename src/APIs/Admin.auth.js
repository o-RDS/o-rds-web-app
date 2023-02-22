import { proxyAddress } from './config';
let serverHost = "";

if (process.env.NODE_ENV == "development") {
  serverHost = 'http://localhost:8080';
}
else if (process.env.NODE_ENV == 'production') {
  serverHost = proxyAddress; // URL of deployed server
}

export function register(admin) {

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            fullname: admin.fullname,
            email: admin.email,
            role: admin.role,
            password: admin.password
        })
    }

    return fetch(`${serverHost}/register`, options)
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

export function login(admin) {

    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            fullname: admin.fullname,
            email: admin.email,
            role: admin.role,
            password: admin.password
        })
    }

    return fetch(`${serverHost}/login`, options)
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