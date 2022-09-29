import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';

import { AppSidebar, AppSidebarNav2 as AppSidebarNav } from '@coreui/react';
// reactstrap components
import { Container } from 'reactstrap';
import { MDBNavbarToggler, MDBCollapse } from 'mdbreact';
// core components
import { navAdmin, navJosera, navJde, navJdeew, navFarmer } from '../Nav/_nav';

// routes config
import routes from '../../routes';
import Cookies from 'js-cookie';
const DefaultHeader = React.lazy(() => import('./../DefaultLayout/DefaultHeader'));
const DefaultFooter = React.lazy(() => import('./../DefaultLayout/DefaultFooter'));

const Admin = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [navItem, setNavItem] = useState();
	const mainContent = useRef(null);
	const userRole = Cookies.get('userrole');
	React.useEffect(() => {
		const tokenId = Cookies.get('usertoken');
		if (tokenId == undefined) {
			// window.location.replace('/');
		}
	}, []);
	useEffect(() => {
		if (userRole == 'Admin') {
			setNavItem(navAdmin);
		} else if (userRole == 'Josera') {
			setNavItem(navJosera);
		} else if (userRole == 'JDE') {
			setNavItem(navJde);
		} else if (userRole == 'Farmer') {
			setNavItem(navFarmer);
		} else {
			setNavItem(navJdeew);
		}
	}, []);
	const toggleCollapse = () => {
		setIsOpen(!isOpen);
	};
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	});

	return (
		<>
			<AppSidebar fixed display="lg">
				<Suspense>
					<div className="row">
						<div className="logo col-10">
							<a href="/dashboard">
								<img alt="Josera" src={require('./../../assets/images/logo.svg')} />{' '}
							</a>{' '}
						</div>
						<div className="mobile-view">
							<DefaultHeader appRoutes={routes} router={router} />
						</div>
						<div className="col-2 menu-btn">
							<MDBNavbarToggler onClick={toggleCollapse} />
						</div>
					</div>

					<MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
						<AppSidebarNav navConfig={navItem} {...props} router={router} />
					</MDBCollapse>
				</Suspense>
			</AppSidebar>
			<div className="main-content" ref={mainContent}>
				<div className="desktop-view">
					<DefaultHeader appRoutes={routes} router={router} />
				</div>
				<div className="mt--7 main-body" fluid>
					<Switch>
						{routes.map((route, idx) => {
							return route.component ? <Route key={idx} exact path={route.path} name={route.name} render={(props) => <route.component {...props} />} /> : null;
						})}
					</Switch>
					<Container fluid>
						<DefaultFooter />
					</Container>
				</div>
			</div>
		</>
	);
};

export default Admin;
