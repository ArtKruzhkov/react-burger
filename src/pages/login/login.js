import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from "../../services/actions/auth-actions";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';

function LoginPage() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValues.email || !formValues.password) {
            setError('Заполните все поля');
            return;
        }
        dispatch(loginUser(formValues.email, formValues.password))
            .then((result) => {
                if (result.success) {
                    navigate('/');
                } else {
                    setError('Неправильный логин или пароль');
                }
            })
            .catch(() => {
                setError('Произошла ошибка при входе');
            });
    };

    return (
        <div className={styles.loginContainer}>
            <h1 className={`${styles.loginHeader} text text_type_main-medium`}>Вход</h1>
            <form className={styles.formLoginContainer} onSubmit={handleSubmit}>
                <EmailInput
                    onChange={handleChange}
                    value={formValues.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={formValues.password}
                    name={'password'}
                />
                {error && <p className="text text_type_main-default text_color_error">{error}</p>}
                <div>
                    <Button htmlType="submit" type="primary" size="large">
                        Войти
                    </Button>
                </div>
            </form>
            <div className={styles.loginTextContainer}>
                <p className={`${styles.textWrap} text text_type_main-default text_color_inactive`}>
                    Вы — новый пользователь? <Link to='/register' className={styles.linkLogin}>Зарегистрироваться</Link>
                </p>
                <p className={`${styles.textWrap} text text_type_main-default text_color_inactive`}>
                    Забыли пароль? <Link to='/forgot-password' className={styles.linkLogin}>Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
