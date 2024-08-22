import { NavLink, Route, Routes } from "react-router-dom";
import styles from './profile.module.css';
import { useState, useRef } from "react";
import FormChange from "./form-change";

function ProfilePage() {
    const initialFormValues = {
        value1: 'Марк',
        value2: 'mail@stellar.burgers',
        value3: 'pasSword1'
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [originalValues] = useState(initialFormValues);
    const [isDisabled, setIsDisabled] = useState(true);
    const inputRef = useRef(null);

    const handleChange = (e) => {
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
        setFormValues(originalValues);  // Восстановление исходных значений
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
                                : `${styles.linkProfile} text text_type_main-medium text_color_inactive`
                        }
                    >
                        Профиль
                    </NavLink>
                    <NavLink
                        to="/profile/orders"
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.linkProfile} ${styles.linkProfileActive} text text_type_main-medium`
                                : `${styles.linkProfile} text text_type_main-medium text_color_inactive`
                        }
                    >
                        История заказов
                    </NavLink>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.linkProfile} ${styles.linkProfileActive} text text_type_main-medium`
                                : `${styles.linkProfile} text text_type_main-medium text_color_inactive`
                        }
                    >
                        Выход
                    </NavLink>
                </nav>
                <p className={`${styles.textInfoChange} text text_type_main-default text_color_inactive`}>
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


