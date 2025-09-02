import React, { useState } from 'react';
import styles from './HomeFourteen.module.css';
import axios from '../../utilities/customAxios';
import { toast } from 'react-toastify';

export default function HomeFourteen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!email) {
      toast.warning('Please enter an email address.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);


    try {
      await axios.post('/disha/subscription-enquiry/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>Sign Up To Our Newsletter</h2>
          <p>Subscribe to our Newsletter & Event right now to be updates</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe Now →</button>
        </form>
        {/* {status && (
          <p
            className={`${styles.status} ${status.type === 'success' ? styles.success : styles.error
              }`}
          >
            {status.message}
          </p>
        )} */}
      </div>
    </section>
  );
}
