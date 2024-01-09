import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Auth = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			return
		} else {
			navigate('/login');
		}
	}, []);
	return <Outlet />;
};

export default Auth;