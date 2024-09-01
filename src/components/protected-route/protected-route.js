import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../services/actions/auth-actions';

export default function ProtectedRoute({ children, anonymous = false }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((store) => store.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const from = location.state?.from || '/';

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(fetchUserData()).finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [dispatch, isLoggedIn]);

    if (isLoading) {
        return <div><p className="text text_type_main-default">Loading...</p></div>;
    }

    if (anonymous && isLoggedIn) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}