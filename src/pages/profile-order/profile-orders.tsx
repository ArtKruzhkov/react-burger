import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/types';
import { wsConnectionStart, wsConnectionClosed } from '../../services/reducers/orders-reducer';
import OrderList from '../../components/order-list/order-list';
import OrderInfoFullPage from '../order-info-full-page/order-info-full-page';
import OrderInfo from '../../components/order-info/order-info';
import Modal from '../../components/modals/modal/modal';
import styles from './profile-order.module.css';

const ProfileOrdersPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const accessToken = localStorage.getItem('accessToken')?.split(' ')[1];

    useEffect(() => {
        if (accessToken) {
            dispatch(wsConnectionStart(`wss://norma.nomoreparties.space/orders?token=${accessToken}`));
        }

        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch, accessToken]);

    const state = location.state as { backgroundLocation?: Location };
    const backgroundLocation = state?.backgroundLocation || location;

    const handleOrderClick = (number: number) => {
        navigate(`/profile/orders/${number}`, { state: { backgroundLocation: location } });
    };

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <div className='profileOrders'>
            <div className={styles.ordersScrollContainer}>
                <OrderList onOrderClick={handleOrderClick} />
            </div>

            <Routes location={backgroundLocation}>
                <Route path="/:number" element={<OrderInfoFullPage />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes location={location}>
                    <Route
                        path="/:number"
                        element={
                            <Modal onClose={closeModal}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default ProfileOrdersPage;
