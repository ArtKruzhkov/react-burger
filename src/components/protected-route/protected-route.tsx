import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/types';
import { fetchUserData } from '../../services/actions/auth-actions';

interface IProtectedRouteProps {
    anonymous?: boolean;
    children: React.ReactNode;
}

export default function ProtectedRoute({ children, anonymous = false }: IProtectedRouteProps) {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(store => store.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();

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
        return <Navigate to="/" />;
    }

    if (!anonymous && !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <>{children}</>;
}