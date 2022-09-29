import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	FormGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	InputGroup,
	Navbar,
	Nav,
	Container,
	Media
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as router from 'react-router-dom';
import { AppBreadcrumb2 as AppBreadcrumb } from '@coreui/react';
import routes from '../../routes';
import Cookies from 'js-cookie';

const propTypes = {
	children: PropTypes.node
};

const defaultProps = {};

const DefaultHeader = (props) => {
	const userName = Cookies.get('username');
	const userRole = Cookies.get('userrole');
	const userCompany = Cookies.get('usercompany');
	const userMobile = Cookies.get('usermobile');
	// eslint-disable-next-line
	const { children, ...attributes } = props;

	return (
		<React.Fragment>
			<Navbar className="navbar-top navbar-dark position-relative" expand="md" id="navbar-main">
				<Container fluid>
					{/* <AppBreadcrumb appRoutes={routes} router={router} /> */}
					<Link className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" to="/admin/dashboard">
						{props.brandText}
					</Link>
					{/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
						<FormGroup className="mb-0">
							<InputGroup className="input-group-alternative">
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="fas fa-search" />
									</InputGroupText>
								</InputGroupAddon>
								<Input placeholder="Search" type="text" />
							</InputGroup>
						</FormGroup>
					</Form> */}
					<Nav className="align-items-center d-none d-md-flex" navbar>
						<UncontrolledDropdown nav>
							<DropdownToggle className="pr-0" nav>
								<Media className="align-items-center">
									<span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={require('./../../assets/images/user.png')} />
									</span>
									<Media className="ml-2 d-none d-lg-block">
										<span className="mb-0 text-sm font-weight-bold">{userName}</span>
									</Media>
								</Media>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h5 className="text-overflow m-0">
										Welcome! <b>{userName}</b>
									</h5>
								</DropdownItem>
								{/* <DropdownItem tag={Link}>
									<i className="ni ni-hat-3" />
									<span>{userRole == null ? 'Admin' : userRole}</span>
								</DropdownItem> */}
								{/* <DropdownItem to="/admin/settings/admin" tag={Link}>
									<i className="ni ni-settings-gear-65" />
									<span>Settings</span>
								</DropdownItem> */}
								<DropdownItem>
									<i class="fa fa-user" aria-hidden="true"></i>
									<span>Role: </span>
									<strong>{userRole == null ? 'Admin' : userRole}</strong>
								</DropdownItem>
								<DropdownItem>
									<i className="ni ni-building" />
									<span>Company: </span>
									<strong>{userCompany}</strong>
								</DropdownItem>
								<DropdownItem>
									<i class="fa fa-phone" aria-hidden="true"></i>
									<span>Mobile: </span>
									<strong>{userMobile}</strong>
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem
									href="/"
									onClick={(e) => {
										Cookies.remove('userrole');
										Cookies.remove('username');
										Cookies.remove('roleId');
										Cookies.remove('usertoken');
										Cookies.remove('usercompany');
										Cookies.remove('usermobile');
										Cookies.remove('userId');
										Cookies.remove('companyId');
										Cookies.remove('farmid');
										Cookies.remove('farmname');
									}}
								>
									<i className="ni ni-user-run" />
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Container>
			</Navbar>
			{/*<AppAsideToggler className="d-lg-none" mobile />*/}
		</React.Fragment>
	);
};

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
