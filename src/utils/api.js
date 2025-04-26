/**
 * 
 * @param {string} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */
export function api(endpoint, init) {
	const serverUrl = import.meta.env.VITE_SERVER_URL; // Aqui é import.meta.env
	const url = serverUrl + endpoint;

	return fetch(url, init);
}
