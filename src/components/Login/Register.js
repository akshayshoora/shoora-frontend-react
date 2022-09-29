import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Select, Option, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from 'reactstrap';
import { userRegister } from '../../Services/Service';
import Alert from '../Alert/Alert';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const Register = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dob, setDob] = useState('');
	const [mobile, setMobile] = useState('');
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	const [surname, setSurname] = useState('');
	const [company, setCompany] = useState('');
	const [name, setName] = useState('');
	const [image, setImage] = useState('image');
	const [regionList, setRegionList] = useState([]);
	const [countryList, setCountryList] = useState([]);
	const [successfull, setSuccessfull] = useState(false);
	const [loading, setLoading] = useState(false);
	const [captcha, setCaptcha] = useState('');

	const [alert, setAlert] = useState(null);
	const showAlert = (message, type) => {
		window.scroll(0, 0);
		console.log('message is ' + message);
		setAlert({
			msg: message,
			type: type
		});
		setTimeout(() => {
			setAlert(null);
		}, 6000);
	};
	useEffect(() => {
		loadCaptchaEnginge(6);
	}, []);

	const handleRegisterClick = (e) => {
		if (name == '' || surname == '' || email == '' || password == '' || dob == '' || mobile == '' || country == '' || region == '' || company == '') {
			// alert('All fields are required');
			showAlert('All fields are mandatory', 'warning');
			e.preventDefault();
		} else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			showAlert('Invalid email', 'warning');
			e.preventDefault();
		} else if (validateCaptcha(captcha) == false) {
			showAlert('Captcha Does Not Match', 'warning');
		} else {
			e.preventDefault();
			setLoading(true);
			userRegister(email, password, dob, mobile, country, region, image, surname, company, name)
				.then((response) => {
					console.log('status', response);
					if (response.status == 201) {
						if (response.message == 'Success') {
							setLoading(false);
							// alert('Registered successfully');
							// showAlert('Registered Successfully', 'success');
							// props.handleLogin();
							setSuccessfull(true);
						} else {
							// alert(response.message);
							setLoading(false);
							showAlert(response.message, 'danger');
						}
					} else {
						// alert(response.message);
						setLoading(false);
						showAlert(response.message, 'danger');
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	function refreshPage() {
		window.location.reload(false);
	}
	return (
		<>
			<Col lg="5" md="6">
				<Card className="bg-secondary shadow border-0">
					{/* <CardHeader className="bg-transparent pb-1"> */}
					{/* <Alert alert={alert} />
						<div className="text-muted text-center mt-2 ">
							<small>Sign up </small>
						</div> */}
					{/* <div className="text-center">
							<Button className="btn-neutral btn-icon mr-4" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
								<span className="btn-inner--icon">
									<img alt="..." src={require('./../../assets/images/logo.png')} />
								</span>
								<span className="btn-inner--text">Github</span>
							</Button>
							<Button className="btn-neutral btn-icon" color="default" href="#pablo" onClick={(e) => e.preventDefault()}>
								<span className="btn-inner--icon">
									<img alt="..." src={require('./../../assets/images/logo.png')} />
								</span>
								<span className="btn-inner--text">Google</span>
							</Button>
						</div> */}
					{/* </CardHeader> */}
					<CardBody className="px-lg-5 py-lg-5">
						{/* <div className="text-center text-muted mb-4">
							<small>Or sign up with credentials</small>
						</div> */}
						<Alert alert={alert} />
						<Form role="form" className="row">
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-hat-3" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Name"
										type="text"
										value={name}
										onChange={(e) => {
											setName(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-hat-3" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Surname"
										type="text"
										value={surname}
										onChange={(e) => {
											setSurname(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-email-83" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Email"
										type="email"
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-lock-circle-open" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Password"
										type="password"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-circle-08" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="DOB"
										type="date"
										value={dob}
										onChange={(e) => {
											setDob(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-mobile-button" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Mobile"
										type="text"
										value={mobile}
										onChange={(e) => {
											setMobile(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>
							{/* <FormGroup>
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-basket" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Country"
										type="text"
										value={country}
										onChange={(e) => {
											setCountry(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup> */}
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-basket" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="select"
										className="form-select"
										name="select"
										id="country"
										value={country}
										onChange={(e) => {
											setCountry(e.target.value);
										}}
									>
										<option value="" selected>
											Country
										</option>
										{countryList.map((data) => {
											return <option value={data._id}>{data.name}</option>;
										})}
									</Input>
								</InputGroup>
							</FormGroup>
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-basket" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="select"
										className="form-select"
										name="select"
										id="region"
										disabled={country == ''}
										value={region}
										onChange={(e) => {
											setRegion(e.target.value);
										}}
									>
										<option value="" selected>
											Region
										</option>
										{regionList.map((data) => {
											return <option value={data.name}>{data.name}</option>;
										})}
									</Input>
								</InputGroup>
							</FormGroup>

							{/* <FormGroup>
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-air-baloon" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Region"
										type="text"
										value={region}
										onChange={(e) => {
											setRegion(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup> */}
							<FormGroup className="col-6">
								<InputGroup className="input-group-alternative mb-3">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="ni ni-box-2" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										placeholder="Company"
										type="text"
										value={company}
										onChange={(e) => {
											setCompany(e.target.value);
										}}
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className="col-6">
								<div>
									<LoadCanvasTemplate />
								</div>
								<FormGroup>
									<InputGroup className="input-group-alternative mb-3">
										<Input
											placeholder="Enter captch"
											type="text"
											value={captcha}
											onChange={(e) => {
												setCaptcha(e.target.value);
											}}
										/>
									</InputGroup>
								</FormGroup>
								{/* <div className="custom-control custom-control-alternative custom-checkbox">
										<input className="custom-control-input" id="customCheckRegister" type="checkbox" />
										<label className="custom-control-label" htmlFor="customCheckRegister">
											<span className="text-muted">
												I agree with the{' '}
												<a href="#pablo" onClick={(e) => e.preventDefault()}>
													Privacy Policy
												</a>
											</span>
										</label>
									</div> */}
							</FormGroup>
							<FormGroup className="col-6">
								<Button color="new-user" type="button">
									Already have account?<a onClick={props.handleLogin}>Login</a>
								</Button>
							</FormGroup>
							<Col xs="6">
								<div className="text-right">
									<Button
										className=""
										color="primary"
										type="button"
										onClick={(e) => {
											handleRegisterClick(e);
										}}
										disabled={loading}
									>
										{' '}
										{loading == true ? <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : ''}
										Create account
									</Button>
								</div>
							</Col>
						</Form>
					</CardBody>
				</Card>
			</Col>
			{successfull == true && (
				<div className="successful-conatiner">
					<div className="successful-conatiner-main">
						<p>
							Thank you for registering for Josera’s <br />
							ration calculation and customer
							<br /> administration tool!
							<br />
							We will contact you as soon as your
							<br /> application has been approved.
						</p>
						<button
							className="btn btn-primary backto-signin"
							onClick={(e) => {
								props.handleLogin();
							}}
						>
							Back to Sign In
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Register;
