export function getLocalStorageTokens() {
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  return { access_token, refresh_token }
}

export function setTokensInLocalStorage(access_token: string, refresh_token: string) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

export const deleteTokensInLocalStorage = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

export function getUrlCode() {
  const { search } = window.location;
  const currentParams = new URLSearchParams(search);
  const code = currentParams.get('code');
  return { code, currentParams };
}

export function clearCodeFromUrl(currentParams: URLSearchParams) {
  currentParams.delete('code');
  const newUrl = window.location.pathname + '?' + currentParams.toString();
  window.history.replaceState({}, '', newUrl);
}

export function isAccessTokenExpired(access_token: string): boolean {
  const payload = JSON.parse(atob(access_token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

