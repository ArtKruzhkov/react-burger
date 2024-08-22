import IngredientDetails from "../../ingredient-details/ingredient-details";
import { useState } from "react";
import styles from './ingredient-info.module.css';

function IngredientInfoFullPage() {
    const [showIngredientDetails, setShowIngredientDetails] = useState({
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        name: "Краторная булка N-200i",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
    });
    return (
        <div className={styles.ingredientInfoContainer}>
            <IngredientDetails {...showIngredientDetails} />
        </div>
    );
}

export default IngredientInfoFullPage;
