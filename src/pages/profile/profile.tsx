import { useEffect, useState, useRef, ChangeEvent } from "react";
import { NavLink, Route, Routes, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import FormChange from "./form-change";
import { logoutUser, fetchUserData, updateUserData } from "../../services/actions/auth-actions";
import { IFormValues, IErrorsValues } from "./form-change";


function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);

    const [formValues, setFormValues] = useState<IFormValues>({
        value1: user?.name || '',
        value2: user?.email || '',
        value3: ''
    });

    const [originalValues, setOriginalValues] = useState<IFormValues>(formValues);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [errors, setErrors] = useState<IErrorsValues>({});
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!user) {
            // @ts-ignore
            dispatch(fetchUserData());
        }
    }, [dispatch, user]);

    useEffect(() => {
        setFormValues({
            value1: user?.name || '',
            value2: user?.email || '',
            value3: ''
        });
        setOriginalValues({
            value1: user?.name || '',
            value2: user?.email || '',
            value3: ''
        });
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const onIconClick = () => {
        setIsDisabled(false);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleBlur = () => {
        setIsDisabled(true);
    };

    const handleCancel = () => {
        setFormValues(originalValues);
    };

    const validateForm = () => {
        const newErrors: IErrorsValues = {};
        if (!formValues.value1) newErrors.value1 = 'Имя обязательно для заполнения';
        if (!formValues.value2) newErrors.value2 = 'Email обязательно для заполнения';
        if (!formValues.value3) newErrors.value3 = 'Пароль обязательно для заполнения';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            // @ts-ignore
            dispatch(updateUserData(formValues.value2, formValues.value1));
            setOriginalValues(formValues);
            setErrors({});
        }
    };

    const handleLogout = async () => {
        await logoutUser(dispatch);
        navigate('/login');
    };

    return (
        <main className={styles.mainProfileContainer}>
            <div className={styles.userContainer}>
                <nav className={styles.navContainer}>
                    <NavLink
                        to="/profile"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.linkProfile} ${styles.linkProfileActive} text text_type_main-medium`
                                : `${styles.linkProfile} text text_type_main-medium text_color_inactive}`
                        }
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to="/profile/orders"
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.linkProfile} ${styles.linkProfileActive} text text_type_main-medium`
                                : `${styles.linkProfile} text text_type_main-medium text_color_inactive}`
                        }
                    >
                        История заказов
                    </NavLink>
                    <Link
                        to="#"
                        onClick={handleLogout}
                        className={`${styles.linkProfile} text text_type_main-medium text_color_inactive}`}
                    >
                        Выход
                    </Link>
                </nav>
                <p className={`${styles.textInfoChange} text text_type_main-default text_color_inactive}`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            <div>
                <Routes>
                    <Route
                        path=""
                        element={
                            <FormChange
                                formValues={formValues}
                                handleChange={handleChange}
                                onIconClick={onIconClick}
                                isDisabled={isDisabled}
                                handleBlur={handleBlur}
                                inputRef={inputRef}
                                handleCancel={handleCancel}
                                handleSave={handleSave}
                                errors={errors}
                            />
                        }
                    />
                    <Route
                        path="orders"
                        element={<p className="text text_type_main-large">История заказов</p>}
                    />
                </Routes>
            </div>
        </main>
    );
}

export default ProfilePage;
