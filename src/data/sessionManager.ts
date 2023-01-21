export function setPhone(phoneNumber: string) {
  window.sessionStorage.setItem('phone', phoneNumber);
  window.sessionStorage.setItem('hash', hashGen(phoneNumber));
};

export function setSurveyID(surveyID: string) {
  window.sessionStorage.setItem('surveyID', surveyID);
};

function hashGen(phoneNumber: string) {
  // TODO: Implement hashGen
  return phoneNumber;
}
