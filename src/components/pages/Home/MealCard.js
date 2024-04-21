import { faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './MealCard.css';
import pages from '../../../utils/pages';

const MealCard = ({ meal, imageUrl, displayAddToCart, handleAddToCart }) => {
  const addToCartHandler = () => {
    // Wywołanie funkcji handleAddToCart, przekazując posiłek
    handleAddToCart(meal);
  };
  
  return (
    <article className="meal-card">
      <div className="meal-card-image">
        <img src={imageUrl} alt={meal.name} />
      </div>
      <div className="meal-card-header">
        <h3>{meal.name}</h3>
        <span>{meal.price}</span>
      </div>
      <div className="meal-card-body-footer">
        <p>{meal.description}</p>
        {displayAddToCart ? (
        <button onClick={addToCartHandler}>Add to cart</button>
        ): (
        <Link to={pages.get('orderOnline').path}>
          Order a delivery <FontAwesomeIcon icon={faMotorcycle} />
        </Link>
        )}
        </div>
    </article>
  );
};

export default MealCard;
