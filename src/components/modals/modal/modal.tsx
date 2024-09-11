import { ReactNode, useEffect } from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal.module.css';

interface IModalProps {
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<IModalProps> = ({ onClose, children }) => {

    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);


    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    <CloseIcon type="primary" />
                </button>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('react-modals') as HTMLElement
    );
}

export default Modal;