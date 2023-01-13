export default function setPhone(phoneNumber: string) {
  window.sessionStorage.setItem('phone', phoneNumber);
  window.sessionStorage.setItem('hash', hashGen(phoneNumber));
};

function hashGen(phoneNumber: string) {
  // TODO: Implement hashGen
  return phoneNumber;
}
