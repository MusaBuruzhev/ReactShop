import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from './ShoppingCart.module.css';
import Contacts from '../../components/Contacts/Contacts';

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateQuantity = (id, change) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch('http://localhost:3333/order/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Order sent successfully, status 200');
        localStorage.removeItem('cart');
        setCart([]);
      } else {
        console.error('Failed to send order');
        alert('Failed to send order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Header className={styles.header} />
      <div className={styles.container}>
        <h2 className={styles.title}>Shopping cart</h2>
        <div className={styles.cartItems}>
          <div className={styles.imageDetails}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <div className={styles.itemPrice}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                    ${item.price}{' '}
                    <span className={styles.SPPANN}>${(item.price * 1.5).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className={styles.orderDetails}>
            <h3 className={styles.orderTitle}>Order details</h3>
            <div className={styles.orderInfo}>
              {cart.length} items Total
              <span className={styles.total}> ${total.toFixed(2)}</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
            <button
              onClick={handleOrder}
              className={styles.orderButton}
              disabled={!name.trim() || !phone.trim() || !email.trim()}
            >
              Order
            </button>
          </div>
        </div>
      </div>
      <Contacts />
    </div>
  );
}

export default ShoppingCart;