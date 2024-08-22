import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './reset-password.module.css';

function ResetPasswordPage() {
    const [formValues, setFormValues] = useState({
        value1: '',
        value2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    return (
        <div className={styles.resetPasswordConstainer}>
            <h1 className={`${styles.resetPasswordHeader} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={styles.formResetPasswordContainer}>
                <PasswordInput
                    placeholder={'Введите новый пароль'}
                    onChange={handleChange}
                    value={formValues.value1}
                    name={'value1'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={formValues.value2}
                    name={'value2'}
                    size={'default'}
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

export default ResetPasswordPage;