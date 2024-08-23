import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../../../services/actions/auth-actions';
import { useNavigate, Link } from 'react-router-dom';
import styles from './forgot-password.module.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.auth.loading);
    const passwordResetRequestSent = useSelector(state => state.auth.passwordResetRequestSent);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestPasswordReset(email));
    }

    useEffect(() => {
        if (passwordResetRequestSent) {
            navigate('/reset-password');
        }
    }, [passwordResetRequestSent, navigate]);

    return (
        <div className={styles.forgotPasswordConstainer}>
            <h1 className={`${styles.forgotPasswordHeader} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={styles.formForgotPasswordContainer} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={handleEmailChange}
                    value={email}
                    isIcon={false}
                    placeholder={'Укажите e-mail'}
                />
                <div>
                    <Button htmlType="submit" type="primary" size="large" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Восстановить'}
                    </Button>
                </div>
            </form>
            <p className={`${styles.textWrap} text text_type_main-default text_color_inactive`}>
                Вспомнили пароль? <Link to='/login' className={styles.linkLogin}>Войти</Link>
            </p>
        </div>
    );
}

export default ForgotPasswordPage;