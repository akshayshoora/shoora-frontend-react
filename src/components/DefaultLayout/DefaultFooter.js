import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Nav, NavItem, NavLink, Row } from 'reactstrap';

const propTypes = {
	children: PropTypes.node
};

const defaultProps = {};

const DefaultFooter = (props) => {
	// eslint-disable-next-line
	const { children, ...attributes } = props;

	return (
		<React.Fragment>
			<footer className="footer">
				<Row className="align-items-center justify-content-xl-between">
					<Col xl="6">
						<div className="copyright text-center text-xl-left text-muted">
							© 2022{' '}
							<a className="font-weight-bold ml-1" href="/">
								Josera
							</a>
						</div>
					</Col>

					<Col xl="6">
						<Nav className="nav-footer justify-content-center justify-content-xl-end">
							<NavItem>
								<NavLink
									href="https://www.josera-agriculture.com"
									// onClick={() => {
									// 	window.open('https://www.josera-agriculture.com');
									// }}
									target="_blank"
								>
									About Us
								</NavLink>
							</NavItem>

							{/* <NavItem>
								<NavLink href="#">Support</NavLink>
							</NavItem>

							<NavItem>
								<NavLink href="">Blog</NavLink>
							</NavItem> */}
						</Nav>
					</Col>
				</Row>
			</footer>
		</React.Fragment>
	);
};

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
