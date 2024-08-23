import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import MainPage from '../pages/main/main';
import IngredientInfoFullPage from '../pages/ingredient-info-full-page/ingredient-info-full-page';
import RegisterPage from '../pages/register/register';
import LoginPage from '../pages/login/login';
import ForgotPasswordPage from '../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../pages/reset-password/reset-password';
import ProfilePage from '../pages/profile/profile';
import ProtectedRouteElement from '../protected-route/protected-route';
import RestrictedRouteElement from '../protected-route/restricted-route';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ingredients/:id" element={<IngredientInfoFullPage />} />
          <Route path="/profile/*" element={<ProtectedRouteElement element={<ProfilePage />} />} />
          <Route path="/login" element={<RestrictedRouteElement element={<LoginPage />} />} />
          <Route path="/register" element={<RestrictedRouteElement element={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<RestrictedRouteElement element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<RestrictedRouteElement element={<ResetPasswordPage />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
