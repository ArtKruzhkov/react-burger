import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>

      <AppHeader />
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/profile/*' element={<ProfilePage />} />
          <Route path='/ingredients/:id' element={<IngredientInfoFullPage />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;




