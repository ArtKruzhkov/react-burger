import styles from './ingredient-details.module.css';

interface IIngredientDetailsProps {
    image_large: string;
    name: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
}

function IngredientDetails({ image_large, name, calories, proteins, fat, carbohydrates }: IIngredientDetailsProps) {
    return (
        <div className={styles.ingredientDetailsWrap}>
            <h3 className={`${styles.ingredientDetailsWrapTitle} text text_type_main-large`}>Детали ингредиента</h3>
            <div className={styles.ingredientDetails}>
                <img src={image_large} alt={name} className={styles.ingredientImage} />
                <p className={`${styles.ingredientTitle} text text_type_main-medium`}>{name}</p>
                <div className={styles.nutrients}>
                    <div className={styles.nutrient}>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{calories}</p>
                    </div>
                    <div className={styles.nutrient}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{proteins}</p>
                    </div>
                    <div className={styles.nutrient}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{fat}</p>
                    </div>
                    <div className={styles.nutrient}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;