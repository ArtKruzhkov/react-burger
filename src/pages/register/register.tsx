import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../services/types";
import { registerUser } from "../../services/actions/auth-actions";
import { Link, useNavigate } from "react-router-dom";
import styles from './register.module.css';

interface IFormValues {
    name: string;
    email: string;
    password: string;
}

function RegisterPage() {
    const [formValues, setFormValues] = useState<IFormValues>({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formValues.name || !formValues.email || !formValues.password) {
            setError('Заполните все поля');
            return;
        }
        dispatch(registerUser(formValues.email, formValues.password, formValues.name))
            .then(() => {
                navigate('/login');
            });
        setFormValues({
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <main className={styles.mainRegisterContainer}>
            <h1 className={`${styles.registerHeader} text text_type_main-medium`}>Регистрация</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={formValues.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
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
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <p className={`${styles.textWrap} text text_type_main-default text_color_inactive`}>
                Уже зарегистрированы? <Link to='/login' className={styles.linkLogin}>Войти</Link>
            </p>
        </main>
    );
}

export default RegisterPage;