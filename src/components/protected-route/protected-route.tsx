// import { useEffect, useState } from 'react';
// import { useLocation, Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { useAppDispatch } from '../../services/types';
// import { fetchUserData } from '../../services/actions/auth-actions';

// interface IProtectedRouteProps {
//     anonymous?: boolean;
//     children: React.ReactNode;
// }

// export default function ProtectedRoute({ children, anonymous = false }: IProtectedRouteProps) {
//     const dispatch = useAppDispatch();
//     // @ts-ignore
//     const isLoggedIn = useSelector((store) => store.auth.isAuthenticated);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const location = useLocation();
//     const from = location.state?.from || '/';

//     useEffect(() => {
//         if (!isLoggedIn) {
//             // @ts-ignore
//             dispatch(fetchUserData()).finally(() => setIsLoading(false));
//         } else {
//             setIsLoading(false);
//         }
//     }, [dispatch, isLoggedIn]);

//     if (isLoading) {
//         return <div><p className="text text_type_main-default">Loading...</p></div>;
//     }

//     if (anonymous && isLoggedIn) {
//         return <Navigate to={from} />;
//     }

//     if (!anonymous && !isLoggedIn) {
//         return <Navigate to="/login" state={{ from: location }} />;
//     }

//     return <>{children}</>;
// }



import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../services/actions/auth-actions';

interface IProtectedRouteProps {
    anonymous?: boolean;
    children: React.ReactNode;
}

export default function ProtectedRoute({ children, anonymous = false }: IProtectedRouteProps) {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoggedIn = useSelector((store) => store.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();
    const from = location.state?.from || '/';

    useEffect(() => {
        if (!isLoggedIn) {
            console.log(isLoggedIn);
            // @ts-ignore
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

    return <>{children}</>;
}