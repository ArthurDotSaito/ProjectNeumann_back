import axios from 'axios';

import { SubmitCodeData } from '@/protocols';

async function compileCode(submitCode: SubmitCodeData) {
	const result = await axios.post(`${process.env.RAPID_API_URL}`, submitCode);

	return result.data;
}

async function checkSubmitTokenStatus(token: string) {
	const response = await getTokenToCheck(token);
	const responseId = response.data.status?.id;

	if (responseId === 1 || responseId === 2) {
		setTimeout(() => {
			checkSubmitTokenStatus(token);
		}, 2000);
	} else {
		return response.data;
	}
}

async function getTokenToCheck(token: string) {
	const headers = {
		'content-type': 'application/json',
		'Content-Type': 'application/json',
		'X-RapidAPI-Host': process.env.RAPID_API_HOST,
		'X-RapidAPI-Key': process.env.RAPID_API_KEY,
	};

	const params = {
		base64_encoded: 'true',
		fields: '*',
	};

	const options = {
		headers,
		params,
	};

	const { data } = await axios.get(`${process.env.RAPID_API_URL}/${token}`, options);

	return data;
}

const submitServices = {
	compileCode,
	checkSubmitTokenStatus,
	getTokenToCheck,
};

export default submitServices;
