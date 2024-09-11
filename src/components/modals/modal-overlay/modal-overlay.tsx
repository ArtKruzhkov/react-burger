import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }: { onClose: () => void }) {

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={handleOverlayClick} />,
        document.getElementById('react-modals') as HTMLElement
    );
}

export default ModalOverlay;