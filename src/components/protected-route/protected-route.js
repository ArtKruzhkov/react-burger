import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { fetchUserData } from '../../services/actions/auth-actions';

const ProtectedRouteElement = ({ element }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(fetchUserData())
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [dispatch, isAuthenticated]);

    if (isLoading) {
        return <div><p className="text text_type_main-default">Loading...</p></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (isAuthenticated) {
        return element
    }
};

export default ProtectedRouteElement;