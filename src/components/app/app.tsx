import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/types';
import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import MainPage from '../../pages/main/main';
import IngredientInfoFullPage from '../../pages/ingredient-info-full-page/ingredient-info-full-page';
import RegisterPage from '../../pages/register/register';
import LoginPage from '../../pages/login/login';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from '../modals/modal/modal';
import IngredientDetailsWrapper from '../ingredient-details/ingredient-details-wrapper';
import FeedPage from '../../pages/feed/feed-page';
import OrderInfo from '../order-info/order-info';
import OrderInfoFullPage from '../../pages/order-info-full-page/order-info-full-page';

function App() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as { backgroundLocation?: Location };
    const backgroundLocation = state?.backgroundLocation || location;

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={backgroundLocation}>
                <Route path="/" element={<MainPage />} />
                <Route path="/react-burger" element={<MainPage />} />
                <Route path="/ingredients/:id" element={<IngredientInfoFullPage />} />
                <Route path="/feed/*" element={<FeedPage />} />
                <Route path="/feed/:number" element={<OrderInfoFullPage />} />
                <Route path="/profile/*" element={<ProtectedRoute children={<ProfilePage />} />} />
                <Route path="/profile/orders/:number" element={<ProtectedRoute children={<OrderInfoFullPage />} />} />
                <Route path="/login" element={<ProtectedRoute anonymous={true} children={<LoginPage />} />} />
                <Route path="/register" element={<ProtectedRoute anonymous={true} children={<RegisterPage />} />} />
                <Route path="/forgot-password" element={<ProtectedRoute anonymous={true} children={<ForgotPasswordPage />} />} />
                <Route path="/reset-password" element={<ProtectedRoute anonymous={true} children={<ResetPasswordPage />} />} />
            </Routes>

            {state?.backgroundLocation && (
                <Routes location={location}>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal onClose={closeModal}>
                                <IngredientDetailsWrapper />
                            </Modal>
                        }
                    />
                    <Route
                        path="/feed/:number"
                        element={
                            <Modal onClose={closeModal}>
                                <OrderInfo />
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/orders/:number"
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
}

export default App;