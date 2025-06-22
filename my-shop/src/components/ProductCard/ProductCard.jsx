import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ id, title, price, discont_price, image }) {
  const [quantity, setQuantity] = useState(0);
  const discount = discont_price ? Math.round(((price - discont_price) / price) * 100) : 0;
  const finalPrice = discont_price || price;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ id, title, price: finalPrice, quantity: 1, image });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setQuantity(quantity + 1);

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <img src={`http://localhost:3333`+image} alt={title} className={styles.image} />
        {discount > 0 && <div className={styles.discount}>-{discount}%</div>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>
          ${finalPrice}
          {discont_price && <span className={styles.discountPrice}>${price}</span>}
        </p>
      </Link>
      <button className={styles.addToCart} onClick={(e) => {e.preventDefault();addToCart();}}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;