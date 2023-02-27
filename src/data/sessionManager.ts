import crypto from "crypto";

export function setPhone(phoneNumber: string) {
  window.sessionStorage.setItem('phone', phoneNumber);
  window.sessionStorage.setItem('hash', crypto.createHash('sha256').update(phoneNumber).digest('base64').replaceAll('\\', 'x').replaceAll('/', 'y'));
  console.log('Phone number set to: ' + phoneNumber);
  console.log('Hash set to: ' + crypto.createHash('sha256').update(phoneNumber).digest('base64').replaceAll('\\', 'x').replaceAll('/', 'y'));
};

export function setChainInfo(parent: string, referer: string, depth: number) {
  window.sessionStorage.setItem('parent', parent);
  window.sessionStorage.setItem('referer', referer);
  window.sessionStorage.setItem('depth', depth.toString());
  console.log('Parent set to: ' + parent);
  console.log('Referer set to: ' + referer);
  console.log('Depth set to: ' + depth);
}
