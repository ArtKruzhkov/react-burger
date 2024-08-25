import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={`${styles.mainHeader} text text_type_main-default`}>
            <nav className={`${styles.navbarHeader}`}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.linkContainer} ${styles.linkContainerActive} text text_type_main-default`
                            : `${styles.linkContainer} text text_type_main-default text_color_inactive`
                    }
                >
                    <BurgerIcon />
                    Конструктор
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.linkContainer} ${styles.linkContainerActive} text text_type_main-default`
                            : `${styles.linkContainer} text text_type_main-default text_color_inactive`
                    }
                >
                    <ListIcon type="secondary" />
                    Лента заказов
                </NavLink>
            </nav>
            <Link to='/'><Logo /></Link>
            <nav className={`${styles.navbarHeader} ${styles.navbarHeaderPA}`}>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.linkContainer} ${styles.linkContainerActive} text text_type_main-default`
                            : `${styles.linkContainer} text text_type_main-default text_color_inactive`
                    }
                >
                    <ProfileIcon type="secondary" />
                    Личный кабинет
                </NavLink>
            </nav>
        </header>
    );
}

export default AppHeader;
