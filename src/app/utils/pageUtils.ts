export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
}

export function checkLocalStorageTokens() {
  const access_token_local = localStorage.getItem('access_token');
  const refresh_token_local = localStorage.getItem('refresh_token');
  return access_token_local && refresh_token_local;
}

export function getCookieTokens() {
  const access_token_cookie = getCookie('access_token');
  const refresh_token_cookie = getCookie('refresh_token');
  return { access_token_cookie, refresh_token_cookie };
}

export function setTokensInLocalStorage(access_token: string, refresh_token: string) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

export function areTokensInCookies() {
  const { access_token_cookie, refresh_token_cookie } = getCookieTokens();
  return access_token_cookie && refresh_token_cookie;
}

export function storeTokensFromCookies() {
  const { access_token_cookie, refresh_token_cookie } = getCookieTokens();
  if (access_token_cookie && refresh_token_cookie) {
    setTokensInLocalStorage(access_token_cookie, refresh_token_cookie);
  }
}

export function getUrlTokens() {
  const { search } = window.location;
  const currentParams = new URLSearchParams(search);

  const access_token_url = currentParams.get('access_token');
  const refresh_token_url = currentParams.get('refresh_token');

  return { access_token_url, refresh_token_url, currentParams };
}

export function areTokensInUrl() {
  const { access_token_url, refresh_token_url } = getUrlTokens();
  return access_token_url && refresh_token_url;
}

export function storeTokensFromUrl() {
  const { access_token_url, refresh_token_url } = getUrlTokens();
  if (access_token_url && refresh_token_url) {
    setTokensInLocalStorage(access_token_url, refresh_token_url);
  }
}

export function clearTokensFromUrl() {
  const { currentParams } = getUrlTokens();
  currentParams.delete('access_token');
  currentParams.delete('refresh_token');
  const newUrl = window.location.pathname + '?' + currentParams.toString();
  window.history.replaceState({}, '', newUrl);
}
