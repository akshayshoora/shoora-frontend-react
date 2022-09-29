import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const AdminLayout = React.lazy(() => import('./components/layouts/Admin.js'));
const AuthLayout = React.lazy(() => import('./components/layouts/Auth.js'));

const App = (props) => {
	return (
		<BrowserRouter>
			<React.Suspense fallback={loading()}>
				<Route path="/dashboard" render={(props) => <AdminLayout {...props} />} />
				<Route exact path="/" render={(props) => <AuthLayout {...props} />} />
			</React.Suspense>
		</BrowserRouter>
	);
};

export default App;
