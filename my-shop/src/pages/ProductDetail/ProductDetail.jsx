import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../store/productsSlice';
import Header from '../../components/Header/Header';
import styles from './ProductDetail.module.css';
import Contacts from '../../components/Contacts/Contacts';

function ProductDetail() {
  const dispatch = useDispatch();
  const { items: products, status: prodStatus } = useSelector((state) => state.products);
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (prodStatus === 'idle') dispatch(fetchProducts());
  }, [dispatch, prodStatus]);

  if (prodStatus === 'loading') return <div>Loading...</div>;
  if (prodStatus === 'failed') return <div>Error loading data</div>;
  if (!product) return <div>Product not found. Check ID: {id}</div>;

  const discount = product.discont_price ? Math.round(((product.price - product.discont_price) / product.price) * 100) : 0;
  const finalPrice = product.discont_price || product.price;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += quantity;
    } else {
      cart.push({ id: product.id, title: product.title, price: finalPrice, quantity, image: product.image });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div>
    <Header/>
      <div className={styles.container}>
          <div>

            <img src={`http://localhost:3333${product.image}`} alt={product.title} className={styles.image} />
          </div>
          <div>
            <div className={styles.priceSection}>
              <h2 className={styles.title}>{product.title}</h2>
              <p className={styles.price}>${finalPrice}{product.discont_price && <span className={styles.discountPrice}>${product.price}</span>}</p>
              {product.discont_price && <span className={styles.discount}>-{discount}%</span>}
            </div>
            <div className={styles.quantityControl}>
              <button className={styles.quantityButton} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className={styles.quantity}>{quantity}</span>
              <button className={styles.quantityButton} onClick={() => setQuantity(quantity + 1)}>+</button>
              <button className={styles.addToCart} onClick={addToCart}>Add to cart</button>
            </div>
            <h1>Description: </h1>
          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
      <Contacts/>
    </div>

  );
}

export default ProductDetail;