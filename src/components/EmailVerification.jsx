import React from "react";

export function EmailVerification() {
	let name = 'name';
	let email = 'email';
	
	return (
		<>
			<label htmlFor="">Name: </label>
			<input name={name} type="text" />
			<label htmlFor="">Email: </label>
			<input name={email} type="email" />
		</>
	)
}