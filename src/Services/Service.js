import Cookies from 'js-cookie';
export const BASE_URL = process.env.REACT_APP_API_URL;
export const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_URL;
const token = Cookies.get('usertoken');
const userId = Cookies.get('userId');
const roleIds = Cookies.get('roleId');
const companyIds = Cookies.get('companyId') == 'undefined' ? null : Cookies.get('companyId');
const moduleName = 'users';
export function userLogin(email, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	};
	return fetch(BASE_URL + '/login', requestOptions)
		.then((response) => response.json())
		.then((response) => {
			return response;
		});
}

export function userRegister(email, password, dob, mobile, country, region, image, surname, company, name) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, dob, mobile, country, region, image, surname, company, name })
	};
	return fetch(BASE_URL + '/register', requestOptions)
		.then((response) => response.json())
		.then((response) => {
			return response;
		});
}
