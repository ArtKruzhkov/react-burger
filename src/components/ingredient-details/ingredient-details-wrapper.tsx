import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/types';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredientDetailsWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const ingredient = useAppSelector(state =>
        state.ingredients.ingredients.find((item) => item._id === id)
    );

    if (!ingredient) {
        return <p>Ингредиент не найден</p>;
    }

    return (
        <div>
            <IngredientDetails
                image_large={ingredient.image_large}
                name={ingredient.name}
                calories={ingredient.calories}
                proteins={ingredient.proteins}
                fat={ingredient.fat}
                carbohydrates={ingredient.carbohydrates}
            />
        </div>
    );
};

export default IngredientDetailsWrapper;
