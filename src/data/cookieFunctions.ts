export function deleteCookie(name: string){
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

export function getCookie(name: string): string {
    let cookieArr: Array<string> = document.cookie.split(';');

    for(let i = 0; i < cookieArr.length; i++){
        let cookie: string = cookieArr[i];
        cookie = cookie.trim();
        if(cookie.startsWith(name + "=")){
            return cookie.substring(name.length + 1);
        }
    }
    return "Cookie doesn't exist";
}