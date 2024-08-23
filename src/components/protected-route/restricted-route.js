import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../services/actions/auth-actions";

function RestrictedRouteElement({ element }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

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

    if (isAuthenticated) {
        return <Navigate to='/' replace />
    }

    return element;
}

export default RestrictedRouteElement;