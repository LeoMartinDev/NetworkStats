const BASE_URL = 'http://localhost:3000/api';

async function request({ path }) {
  const fetchResult = await fetch(`${BASE_URL}/${path}`);
  const response = await fetchResult.json();

  if (fetchResult.ok) {
    return response;
  }

  throw response;
}

export function getStats() {
  return request({ path: 'stats'});
}
