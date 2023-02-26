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
export async function retrieveSurveyConfig(id) {
  const token = "JWT " + getCookie("token");
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${id}`, options)
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
export async function loadAdminSurveys(index, limit) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }
  };

  var statusCode;

  const url = (
    `${serverHost}/api/surveys?` + new URLSearchParams({
      index: index,
      count: limit
    }).toString()
  )

  return fetch(url, options)
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
export async function saveSurveyConfig(surveyID, surveyData) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyData: surveyData
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}`, options)
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
export async function deleteSurveyConfig(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}`, options)
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
export async function loadResponse(surveyID, alias) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}/response/${alias}`, options)
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
export async function loadAllResponses(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}/responses`, options)
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

export async function deleteResponse(surveyID, responseID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({
      surveyID: surveyID,
      resposneID: responseID
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

// INCENTIVE FUNCTIONS

// POST /api/incentive
export async function completeIncentive(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'POST',
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
  return fetch(`${serverHost}/api/incentive`, options)
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

// GET /api/incentive
export async function loadIncentiveInfo(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}/incentive`, options)
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

// PUT /api/incentive
export async function updateIncentiveInfo(surveyID, hash, data) {
  // TODO at server
}

// OTHER FUNCTIONS

// POST /api/alias
export async function generateAlias(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'POST',
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
  return fetch(`${serverHost}/api/alias`, options)
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

// PATCH /api/user-remove
export async function removeSurveyFromUser(email, surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }, 
    body: JSON.stringify({
      surveyID: surveyID,
      email: email
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/user-remove`, options)
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

// PATCH /spi/user-add
export async function addSurveyToUser(email, surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: token
    }, 
    body: JSON.stringify({
      surveyID: surveyID,
      email: email
    })
  };

  var statusCode;
  return fetch(`${serverHost}/api/user-add`, options)
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

// POST /api/hash
export async function addHash(surveyID, hash) {
  
}