import Sha256 from "./Sha256";

export function setPhone(phoneNumber: string) {
  window.sessionStorage.setItem('phone', phoneNumber);
  window.sessionStorage.setItem('hash', Sha256.hash(phoneNumber));
  console.log('Phone number set to: ' + phoneNumber);
  console.log('Hash set to: ' + Sha256.hash(phoneNumber));
};

export function setChainInfo(parent: string, depth: number) {
  window.sessionStorage.setItem('parent', parent);
  window.sessionStorage.setItem('depth', depth.toString());
  console.log('Parent set to: ' + parent);
  console.log('Depth set to: ' + depth);
}
