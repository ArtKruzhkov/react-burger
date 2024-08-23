import { useEffect, useState } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';

function FormChange({ formValues, handleChange, onIconClick, isDisabled, handleBlur, inputRef, handleCancel, handleSave }) {
    const [isChanging, setIsChanging] = useState(false);

    const handleFieldChange = (e) => {
        handleChange(e);
        setIsChanging(true);
    };

    const handleCancelAndReset = () => {
        handleCancel();
        setIsChanging(false);
    };

    const handleSaveForm = () => {
        handleSave();
        setIsChanging(false);
    };

    useEffect(() => {
        if (!isDisabled) {
            inputRef.current?.focus();
        }
    }, [isDisabled]);

    return (
        <form className={styles.formProfileContainer}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleFieldChange}
                icon={'EditIcon'}
                value={formValues.value1}
                name={'value1'}
                onIconClick={onIconClick}
                disabled={isDisabled}
                size={'default'}
                ref={inputRef}
                onBlur={handleBlur}
            />
            <EmailInput
                onChange={handleFieldChange}
                value={formValues.value2}
                name={'value2'}
                placeholder="Логин"
                isIcon={true}
            />
            <PasswordInput
                onChange={handleFieldChange}
                value={formValues.value3}
                name={'value3'}
                icon="EditIcon"
            />

            {isChanging && (
                <div>
                    <Button htmlType="button" type="secondary" size="medium" onClick={handleCancelAndReset}>
                        Отмена
                    </Button>
                    <Button htmlType="button" type="primary" size="medium" onClick={handleSaveForm}>
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    );
}

export default FormChange;
