export function api(endpoint, init = {}) {
  const url = `https://natureza365-3teb.onrender.com${endpoint}`;
  console.log(`API URL: ${url}`);

  const token = JSON.parse(localStorage.getItem("@rotaverde365:user"))?.token;
  console.log(`token: ${token ? "Token found" : "No token found"}`);

  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  console.log("Auth Headers:", authHeaders);

  const config = {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...init.headers,
    },
  };
  console.log("Request Config:", config);

  return fetch(url, config)
    .then(response => {
      console.log(`Response Status: ${response.status}`);
      return response;
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      throw error;
    });
}
