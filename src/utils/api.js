/**
 * 
 * @param {string} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api( endpoint, init ) {
	const serverUrl = process.env.SERVER_URL
	const url = serverUrl + endpoint

	return fetch(url, init)
}