import React from 'react';

function Alert(props) {
	return (
		props.alert && (
			<div
				className={`alert alert-${props.alert.type} alert-dismissible fade show mx-5 my-2`}
				style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999 }}
				role="alert"
			>
				<strong>{props.alert.msg}</strong>
				<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		)
	);
}

export default Alert;
