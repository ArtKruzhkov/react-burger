import { ChangeEvent, RefObject, useEffect, useState } from "react";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';

export interface IFormValues {
    value1: string;
    value2: string;
    value3: string;
}

export interface IErrorsValues {
    value1?: string;
    value2?: string;
    value3?: string;
}

interface IFormChangeProps {
    formValues: IFormValues;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onIconClick: () => void;
    isDisabled: boolean;
    handleBlur: () => void;
    inputRef: RefObject<HTMLInputElement>;
    handleCancel: () => void;
    handleSave: () => void;
    errors: IErrorsValues;
}

function FormChange({ formValues, handleChange, onIconClick, isDisabled, handleBlur, inputRef, handleCancel, handleSave, errors }: IFormChangeProps) {
    const [isChanging, setIsChanging] = useState<boolean>(false);

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            <div className={styles.inputGroup}>
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
                {errors.value1 && <p className="text text_type_main-default text_color_error">{errors.value1}</p>}
            </div>
            <div className={styles.inputGroup}>
                <EmailInput
                    onChange={handleFieldChange}
                    value={formValues.value2}
                    name={'value2'}
                    placeholder="Логин"
                    isIcon={true}
                />
                {errors.value2 && <p className="text text_type_main-default text_color_error">{errors.value2}</p>}
            </div>
            <div className={styles.inputGroup}>
                <PasswordInput
                    onChange={handleFieldChange}
                    value={formValues.value3}
                    name={'value3'}
                    icon="EditIcon"
                />
                {errors.value3 && <p className="text text_type_main-default text_color_error">{errors.value3}</p>}
            </div>

            {isChanging && (
                <div className={styles.buttonContainer}>
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