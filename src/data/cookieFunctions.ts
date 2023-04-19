export function deleteCookie(name: string) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

export function setCookie(name: string, value: string, days: number) {
  let date: Date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  let expires: string = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name: string) {
  let nameEQ: string = name + "=";
  let ca: string[] = document.cookie.split(";");
  for (let i: number = 0; i < ca.length; i++) {
    let c: string = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      console.log(c.substring(nameEQ.length, c.length));
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

export function getJWTPayload() {
  let token: string | null = getCookie("token");
  if (token) {
    let payload: string = token.split(".")[1];
    console.log(JSON.parse(atob(payload)));
    return JSON.parse(atob(payload));
  }
  return null;
}
