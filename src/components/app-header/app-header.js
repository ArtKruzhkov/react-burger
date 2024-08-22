import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';


function AppHeader() {
    return (
        <header className={`${styles.mainHeader} text text_type_main-default`}>
            <nav className={`${styles.navbarHeader}`}>
                <a href="#">
                    <div
                        style={{ color: 'white' }}
                        className={`${styles.linkContainer} pl-5 pr-5 pb-5 pt-5`}
                    >
                        <BurgerIcon />
                        Конструктор
                    </div>
                </a>
                <a href="#">
                    <div
                        style={{ color: 'white' }}
                        className={`${styles.linkContainer} pl-5 pr-5 pb-5 pt-5`}
                    >
                        <ListIcon type="secondary" />
                        Лента заказов
                    </div>
                </a>
            </nav>
            <Logo />
            <nav className={`${styles.navbarHeader} ${styles.navbarHeaderPA}`}>
                <a href="#">
                    <div
                        style={{ color: 'white' }}
                        className={`${styles.linkContainer} pl-5 pr-5 pb-5 pt-5`}
                    >
                        <ProfileIcon type="secondary" />
                        Личный кабинет
                    </div>
                </a>
            </nav>
        </header>
    );
}

export default AppHeader;
