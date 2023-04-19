import { proxyAddress, devAddress } from "./config";
import { getCookie } from "../data/cookieFunctions";

let serverHost = "";

if (process.env.NODE_ENV === "development") {
  serverHost = devAddress;
} else if (process.env.NODE_ENV === "production") {
  serverHost = proxyAddress; // URL of deployed server
}

// SURVEY FUNCTIONS

// GET /api/survey
export function retrieveSurveyConfig(id) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${id}`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}

// GET /api/surveys
export function loadAdminSurveys(index, count) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
  };

  var statusCode;
  return fetch(
    `${serverHost}/api/surveys?` +
      new URLSearchParams({ index: index, count: count }),
    options
  )
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
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
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      surveyData: surveyData,
    }),
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
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
    method: "DELETE",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
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
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
  };

  var statusCode;
  return fetch(
    `${serverHost}/api/survey/${surveyID}/response/${alias}`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
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
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}/responses`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
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
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      surveyID: surveyID,
      alias: alias,
      responseData: response,
      parentHash: window.sessionStorage.getItem("referer"),
    }),
  };

  var statusCode;
  return fetch(`${serverHost}/api/response`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}

// TODO: DELETE /api/response

// INCENTIVE FUNCTIONS

// POST /api/incentive
export function addHash(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      surveyID: surveyID,
    }),
  };

  var statusCode;
  return fetch(`${serverHost}/api/incentive`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}

/* DEPRECATED, WILL AUTOMATICALLY HANDLE WHEN SAVING COMPLETE RESPONSE
// POST /api/incentive
export function completeIncentive(surveyID, hash) {
  
}
*/

// GET /api/incentive
export function loadIncentiveInfo(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
  };

  var statusCode;
  return fetch(`${serverHost}/api/survey/${surveyID}/incentive`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}

/* TODO
// PUT /api/incentive
export async function updateIncentiveInfo(surveyID, hash, data) {
  
}
*/

// OTHER FUNCTIONS

// POST /api/alias
export function generateAlias(surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      surveyID: surveyID,
    }),
  };

  var statusCode;
  return fetch(`${serverHost}/api/alias`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}

// PATCH /api/user-remove
export function removeSurveyFromUser(userID, surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      surveyID: surveyID,
      userID: userID,
    }),
  };

  var statusCode;
  return fetch(`${serverHost}/api/user-remove`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}

// PATCH /spi/user-add
export function addSurveyToUser(userID, surveyID) {
  const token = "JWT " + getCookie("token");

  const options = {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      surveyID: surveyID,
      userID: userID,
    }),
  };

  var statusCode;
  return fetch(`${serverHost}/api/user-add`, options)
    .then((response) => {
      if (!response.ok) {
        console.error(new Error(response.statusText));
      }
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      data.statusCode = statusCode;
      console.log(data);
      return data;
    });
}
