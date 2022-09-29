import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import * as router from 'react-router-dom';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import AuthFooter from './../DefaultLayout/DefaultFooter';
import Login from './../Login/Login';
import Register from './../Login/Register';

import routes from './../../routes.js';

const Auth = () => {
	const [login, setLogin] = useState(true);
	useEffect(() => {
		document.body.classList.add('bg-default');
	}, []);

	const handleLogin = () => {
		setLogin(!login);
	};

	return (
		<>
			<div className="main-content auth-main-content">
				<div className="header bg-gradient-info py-7 py-lg-5">
					<Container>
						<div className="logo logo-admin">
							<img alt="Josera" src={require('./../../assets/images/logo.svg')} />{' '}
						</div>
						<div className="header-body text-center mb-7">
							<Row className="justify-content-center">
								<Col lg="5" md="6">
									<h2 className="text-black">Welcome to Josera’s</h2>
									<p>Ration Calculation and Customer Administration Tool</p>
									<p className="text-lead text-light"></p>
								</Col>
							</Row>
						</div>
					</Container>
					<div className="separator separator-bottom separator-skew zindex-100">
						<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
							<polygon className="fill-default" points="2560 0 2560 100 0 100" />
						</svg>
					</div>
				</div>
				{/* Page content */}
				<Container className="mt--8 pb-5">
					<Row className="justify-content-center">
						{login == true ? (
							<Login appRoutes={routes} router={router} handleLogin={handleLogin} />
						) : (
							<Register appRoutes={routes} router={router} handleLogin={handleLogin} />
						)}
					</Row>
				</Container>
			</div>
			<AuthFooter />
		</>
	);
};

export default Auth;
