import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from "../../services/actions/auth-actions";
import styles from './reset-password.module.css';

function ResetPasswordPage() {
    const [formValues, setFormValues] = useState({
        password: '',
        token: ''
    });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(state => state.auth.loading);
    const passwordResetSuccess = useSelector(state => state.auth.passwordResetSuccess);
    const resetRequestSent = useSelector(state => state.auth.passwordResetRequestSent);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValues.password || !formValues.token) {
            setError('Заполните все поля');
            return;
        }
        dispatch(resetPassword(formValues.password, formValues.token));
        setFormValues({
            password: '',
            token: ''
        });
    };

    useEffect(() => {
        if (!resetRequestSent) {
            navigate('/forgot-password');
        }
    }, [navigate]);

    useEffect(() => {
        if (passwordResetSuccess) {
            navigate('/login');
        }
    }, [passwordResetSuccess, navigate]);

    return (
        <div className={styles.resetPasswordConstainer}>
            <h1 className={`${styles.resetPasswordHeader} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={styles.formResetPasswordContainer} onSubmit={handleSubmit}>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={handleChange}
                    value={formValues.password}
                    name={'password'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={formValues.token}
                    name={'token'}
                    size={'default'}
                />
                {error && <p className="text text_type_main-default text_color_error">{error}</p>}
                <div>
                    <Button htmlType="submit" type="primary" size="large" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Сохранить'}
                    </Button>
                </div>
            </form>
            <p className={`${styles.textWrap} text text_type_main-default text_color_inactive`}>
                Вспомнили пароль? <Link to='/login' className={styles.linkLogin}>Войти</Link>
            </p>
        </div>
    );
}

export default ResetPasswordPage;
