export interface User {
	id?: number;
	name: string;
	avatar: string;
	email: string;
	dob: string;
}

export interface DialogUserData {
	existing: boolean,
	user: {
		id?: number,
		name: string,
		avatar: string,
		email: string,
		dob: string,
	}
}