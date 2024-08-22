import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './forgot-password.module.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className={styles.forgotPasswordConstainer}>
            <h1 className={`${styles.forgotPasswordHeader} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={styles.formForgotPasswordContainer}>
                <EmailInput
                    onChange={handleEmailChange}
                    value={email}
                    isIcon={false}
                    placeholder={'Укажите e-mail'}
                />
                <div>
                    <Button htmlType="button" type="primary" size="large">
                        Восстановить
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