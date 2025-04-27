export function api(endpoint, init = {}) {
	const url = `https://natureza365-3teb.onrender.com${endpoint}`;
  
	const token = JSON.parse(localStorage.getItem("@rotaverde365:user"))?.Token;
  
	const authHeaders = token
	  ? { Authorization: `Bearer ${token}` }
	  : {};
  
	const config = {
	  ...init,
	  headers: {
		"Content-Type": "application/json",
		...authHeaders,
		...init.headers, // Prioriza os headers que você passar manualmente
	  },
	};
  
	return fetch(url, config);
  }
  