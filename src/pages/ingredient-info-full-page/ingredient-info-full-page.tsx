import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient-info.module.css';

function IngredientInfoFullPage() {
    const { id } = useParams<string>();
    // @ts-ignore
    const ingredient = useSelector(state => state.ingredients.ingredients.find(ingredient => ingredient._id === id));

    return (
        <div className={styles.ingredientInfoContainer}>
            {ingredient && <IngredientDetails {...ingredient} />}
        </div>
    );
}

export default IngredientInfoFullPage;