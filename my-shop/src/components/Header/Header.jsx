import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import card from '../../assets/Vector.svg';

function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount); 
    return () => window.removeEventListener('storage', updateCartCount); 
  }, []);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" /> 
      </Link>
      <nav>
        <Link to="/">Main Page</Link>
        <Link to="/all-categories">Categories</Link>
        <Link to="/all-products">All products</Link>
        <Link to="/all-sales">All sales</Link>
      </nav>
      <Link to="/cart" className={styles.cart}>
        <span className={styles.cartIcon}><img src={card} alt="" /></span>
        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
        
      </Link>
    </header>
  );
}

export default Header;