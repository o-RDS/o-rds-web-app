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

// SURVEY FUNCTIONS

// GET /api/survey
export function retrieveSurveyConfig(id) {
  const token = "JWT " + getCookie("token");
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: id
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// GET /api/surveys
export function loadAdminSurveys(index, limit) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      index: index,
      limit: limit
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/surveys`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// POST /api/survey
export function saveSurveyConfig(surveyID, surveyData) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: surveyID,
      surveyData: surveyData
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// DELETE /api/survey
export function deleteSurveyConfig(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: surveyID
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// RESPONSE FUNCTIONS

// GET /api/response
export function loadResponse(surveyID, alias) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: surveyID,
      alias: alias
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/response`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// GET /api/responses
export function loadAllResponses(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: surveyID
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/responses`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// POST /api/response
export async function writeSurveyResponse(surveyID, alias, response) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: surveyID,
      alias: alias,
      responseData: response
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/response`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    statusCode = response.status;
    return response.json()
  })
  .then((data) => {
    data.statusCode = statusCode;
    console.log(data);
    return data;
  });
}

// TODO: DELETE /api/response 

// INCENTIVE FUNCTIONS

// POST /api/hash
export function addHash(surveyID, hash) {
  
}

// POST /api/incentive
export function completeIncentive(surveyID, hash) {
  
}

// GET /api/incentive
export function loadIncentiveInfo(surveyID, hash) {
  
}

// PUT /api/incentive
export async function updateIncentiveInfo(surveyID, hash, data) {
  
}

// OTHER FUNCTIONS

// POST /api/alias
export function generateAlias(surveyID) {
  
}

// PATCH /api/user-remove
export function removeSurveyFromUser(userId, surveyID) {
  
}

// PATCH /spi/user-add
export function addSurveyToUser(userID, surveyID) {
  
}