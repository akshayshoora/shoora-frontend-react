import React, { useState } from 'react';
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col } from 'reactstrap';
import { userLogin } from '../../Services/Service';
import Alert from '../Alert/Alert';
import Loader from '../../components/Loader/Loader';
import Cookies from 'js-cookie';

const Login = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alert, setAlert] = useState(null);
	const [loading, setLoading] = useState(false);
	const showAlert = (message, type) => {
		console.log('message is ' + message);
		setAlert({
			msg: message,
			type: type
		});
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};
	const handleLoginClick = (e) => {
		if (password == '' || email == '') {
			showAlert('All fields are mandatory', 'warning');
			e.preventDefault();
		} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			showAlert('Invalid email', 'warning');
			e.preventDefault();
		} else {
			setLoading(true);
			e.preventDefault();
			window.location.href = '/dashboard';
			// userLogin(email, password)
			// 	.then((response) => {
			// 		console.log('status', response.status);
			// 		if (response.status == 200) {
			// 			if (response.message == 'Success') {
			// 				setLoading(false);

			// 				showAlert('You are successfully logged in', 'success');

			// 				Cookies.set('userrole', response.data.roleinfo.name);
			// 				Cookies.set('username', response.data.name);
			// 				Cookies.set('roleId', response.data.roleinfo._id);
			// 				Cookies.set('usertoken', response.token);
			// 				Cookies.set('usercompany', response.data.company);
			// 				Cookies.set('usermobile', response.data.mobile);
			// 				Cookies.set('userId', response.data._id);
			// 				Cookies.set('companyId', response.data.company_id);
			// 				Cookies.set('useremail', response.data.email);
			// 				Cookies.set('roleAlias', response.data.roleinfo.alias);
			// 				Cookies.set('usercurrency', response.data.currency_name);
			// 				Cookies.set('usercountry', response.data.country);

			// 				if (response.data.roleinfo.alias === 'farmer') {
			// 					window.location.href = '/admin/farm';
			// 				} else {
			// 					window.location.href = '/admin/dashboard';
			// 				}
			// 			} else {
			// 				setLoading(false);

			// 				showAlert(response.message, 'danger');
			// 			}
			// 		} else {
			// 			setLoading(false);

			// 			showAlert(response.message, 'danger');
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		console.error(error);
			// 	});
		}
	};
	return (
		<>
			<Col lg="4" md="5">
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">
						{loading == true ? <Loader /> : ''}
						<Alert alert={alert} />
						<Form role="form" className="row">
							<FormGroup className="mb-3 display-flex col-12">
								<label>User ID/ Email Address:</label>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Enter Email/User ID"
										type="email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className="display-flex col-12">
								<label>Password:</label>
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Enter Password"
										type="password"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							{/* <div className="custom-control text-right custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
							<div className="joseralogin">
								<div className="col-6">
									<Button color="new-user" type="button">
										New here?<a onClick={props.handleLogin}>Register now</a>
									</Button>
								</div>
								<div className="col-6 text-right">
									<Button
										color="primary"
										type="button"
										onClick={(e) => {
											handleLoginClick(e);
										}}
									>
										<a
											className="text-white"
											//  href="/admin/dashboard"
										>
											Sign in
										</a>
									</Button>
								</div>
							</div>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</>
	);
};

export default Login;
