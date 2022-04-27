export const fetchWithToken = (url, data, method = 'GET') => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`
  };

  const body = method !== 'GET' ? JSON.stringify({ data }) : null;

  return fetch(`${process.env.REACT_APP_API_URL}/${url}`, {
    method,
    headers,
    ...(body ? { body } : {})
  });
};
