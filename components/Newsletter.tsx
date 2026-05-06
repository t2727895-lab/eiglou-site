'use client';

import { useState, FormEvent } from 'react';

export default function Newsletter() {
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res  = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You\'re subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <section className="newsletter-one">
      <div className="container">
        <div className="newsletter-one__inner">
          <div className="newsletter-one__left">
            <h2 className="newsletter-one__title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-one__text">
              Get the latest SEO tips and software insights straight to your inbox.
            </p>
          </div>
          <div className="newsletter-one__right">
            {status === 'success' ? (
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 16, padding: '16px 0' }}>
                ✓ {message}
              </div>
            ) : (
              <form className="newsletter-one__form" onSubmit={handleSubmit}>
                <div className="newsletter-one__input">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <button
                  type="submit"
                  className="thm-btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe Now'}
                  {status !== 'loading' && <span className="fas fa-arrow-right"></span>}
                </button>
                <div className="checked-box">
                  <input type="checkbox" name="privacy" id="privacy" defaultChecked />
                  <label htmlFor="privacy">
                    <span></span>by Subscribing, you accept our Privacy Policy
                  </label>
                </div>
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{message}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      <div id="particles-js-two"></div>
    </section>
  );
}
