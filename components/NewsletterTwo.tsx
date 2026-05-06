'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterTwo() {
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
    <section className="newsletter-two">
      <div className="container">
        <div className="newsletter-two__inner">
          <div
            className="newsletter-two__shape-1"
            style={{ backgroundImage: 'url(/assets/images/shapes/newsletter-two-shape-1.png)' }}
          ></div>
          <div className="newsletter-two__img-1">
            <img src="/assets/images/resources/newsletter-two-img-1.png" alt="" />
          </div>
          <div className="newsletter-two__left">
            <h2 className="newsletter-two__title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-two__text">
              Get the latest SEO tips and software insights straight to your inbox.
            </p>
          </div>
          <div className="newsletter-two__right">
            {status === 'success' ? (
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: 16, padding: '12px 0' }}>
                ✓ {message}
              </div>
            ) : (
              <form className="newsletter-two__form" onSubmit={handleSubmit}>
                <div className="newsletter-two__input">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    name="email"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                <button type="submit" className="thm-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe Now'}
                  {status !== 'loading' && <span className="fas fa-arrow-right"></span>}
                </button>
                {status === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{message}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
