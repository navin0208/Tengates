import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const { error } = await supabase.from('inquiries').insert([formData]);

    if (error) {
      console.error(error);
      setErrorMessage('Failed to send inquiry. Please try again.');
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successState}>
        <CheckCircle2 size={48} className={styles.successIcon} />
        <h3>Message Sent!</h3>
        <p>We've received your inquiry and will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {status === 'error' && <div className={styles.errorAlert}>{errorMessage}</div>}
      
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="message">Project Details</label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project requirements..."
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <Loader2 size={18} className={styles.spinner} /> Sending...
          </>
        ) : (
          'Send Inquiry'
        )}
      </button>
    </form>
  );
};

export default ContactForm;
