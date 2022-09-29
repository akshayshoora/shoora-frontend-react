import React, { Component, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js';
import { Card, CardBody, CardHeader, Col, Row, Container, NavLink, NavItem, Nav } from 'reactstrap';
import Cookies from 'js-cookie';

const roleAlias = Cookies.get('roleAlias');

function Dashboard() {
	return (
		<>
			<div>Dashboard</div>
		</>
	);
}

export default Dashboard;
