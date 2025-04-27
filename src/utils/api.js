export function api(endpoint, init = {}) {
  const url = `https://natureza365-3teb.onrender.com${endpoint}`;
  console.log(`API URL: ${url}`); // Log the full API URL

  const token = JSON.parse(localStorage.getItem("@rotaverde365:user"))?.Token;
  console.log(`Token: ${token ? "Token found" : "No token found"}`); // Log whether a token is present

  const authHeaders = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  console.log("Auth Headers:", authHeaders); // Log the authorization headers

  const config = {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...init.headers, // Prioritize manually passed headers
    },
  };
  console.log("Request Config:", config); // Log the full request configuration

  return fetch(url, config)
    .then(response => {
      console.log(`Response Status: ${response.status}`); // Log the response status
      return response;
    })
    .catch(error => {
      console.error("Fetch Error:", error); // Log any fetch errors
      throw error;
    });
}
