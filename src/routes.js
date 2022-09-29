import React from 'react';
import Cookies from 'js-cookie';

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));

const AuthLayout = React.lazy(() => import('./components/layouts/Auth.js'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

var routes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard
	},

	{
		path: '*',
		name: 'Dashboard',
		component: Dashboard
	}
];

export default routes;
