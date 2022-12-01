export async function MakeThundyAPIRequest(path: string): Promise<Response> {
  let baseURL = '';
  if (process.env.REACT_APP_THUNDY_API_ENDPOINT) {
    baseURL = process.env.REACT_APP_THUNDY_API_ENDPOINT;
  } else {
    baseURL = 'http://localhost:3000';
  }

  const apiURL = baseURL + path;
  console.log('apiURL', apiURL);
  return fetch(apiURL, {
    headers: {
      'X-Thundy-API-Key': process.env.REACT_APP_THUNDY_API_KEY,
    },
  });
}
