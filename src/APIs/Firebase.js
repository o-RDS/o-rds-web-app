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

export function retrieveSurveyConfig(id) {
  // GET /api/survey
}

export function loadAdminSurveys(index, limit) {
  // GET /api/surveys
}

export function saveSurveyConfig(surveyID, surveyData) {
  // POST /api/survey
}

export function deleteSurveyConfig(surveyID) {
  // DELETE /api/survey
}

// RESPONSE ROUTES

export function loadResponse(surveyID, alias) {
  // GET /api/response
}

export function loadAllResponses(surveyID) {
  // GET /api/responses
}

export async function writeSurveyResponse(surveyID, alias, response) {
  // POST /api/response
}

// INCENTIVE ROUTES

export function addHash(surveyID, hash) {
  // POST /api/hash
}

export function completeIncentive(surveyID, hash) {
  // POST /api/incentive
}

export function loadIncentiveInfo(surveyID, hash) {
  // GET /api/incentive
}

export async function updateIncentiveInfo(surveyID, hash, data) {
  // PUT /api/incentive
}

// OTHER ROUTES

export function generateAlias(surveyID) {
  // POST /api/alias
}

export function removeSurveyFromUser(userId, surveyID) {
  // PATCH /api/user-remove
}

export function addSurveyToUser(userID, surveyID) {
  // PATCH /spi/user-add
}