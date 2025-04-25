/**
 * 
 * @param {string} endpoint 
 * @param {RequestInit} init 
 * @returns 
 */

export function api( endpoint, init ) {
	const url = `https://natureza365-3teb.onrender.com` + endpoint

	return fetch(url, init)
}