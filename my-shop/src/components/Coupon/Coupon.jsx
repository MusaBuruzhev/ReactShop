import { useState } from 'react';
import styles from './Coupon.module.css';

function Coupon() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: !name.trim() ? 'Please fill in the name' : '',
      phone: !phone.trim() ? 'Please fill in the phone number' : '',
      email: !email.trim() ? 'Please fill in the email' : '',
    };
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await fetch('http://localhost:3333/sale/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Coupon request sent successfully, status 200');
      } else {
        console.error('Failed to send coupon request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.coupon}>
      <div className={styles.png}></div>
      <h2>5% off on the first order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: '' });
            }}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({ ...errors, phone: '' });
            }}
            className={styles.input}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <button type="submit" className={styles.button} disabled={Object.values(errors).some(error => error) || !name.trim() || !phone.trim() || !email.trim()}>
          Get discount
        </button>
      </form>
    </div>
  );
}

export default Coupon;