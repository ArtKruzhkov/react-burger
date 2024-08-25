import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeModal = () => {
    navigate(state?.background?.pathname || '/');
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients/:id" element={<IngredientInfoFullPage />} />
        <Route path="/profile/*" element={<ProtectedRoute children={<ProfilePage />} />} />
        <Route path="/login" element={<ProtectedRoute anonymous={true} children={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRoute anonymous={true} children={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRoute anonymous={true} children={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRoute anonymous={true} children={<ResetPasswordPage />} />} />
      </Routes>

      {state?.modal && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModal}>
                <IngredientDetails {...state.ingredient} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
