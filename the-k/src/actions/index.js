export const logIn = () => {
	return {
		type: 'SIGN_IN'
	};
};

export const setID = (id) => {
	return {
		type: 'SET_ID',
		payload: id
	};
};
