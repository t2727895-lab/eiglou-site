'use client';

import { useState, FormEvent } from 'react';

export default function ContactPageForm() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedback(data.message || "We'll reach out to you soon!");
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setFeedback(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again.');
    }
  };

  return (
    <section className="contact-page">
      <div className="container">
        <div className="contact-page__inner">
          <div
            className="contact-page__bg-shape"
            style={{ backgroundImage: 'url(/assets/images/shapes/contact-page-bg-shape.png)' }}
          ></div>
          <div className="row">

            {/* Map */}
            <div className="col-xl-6">
              <div className="contact-page__left">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.493978500184!2d73.1091522!3d30.676374699999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b7a10a147841%3A0x775cb63e884ea409!2sEiglou!5e0!3m2!1sen!2s!4v1777973397267!5m2!1sen!2s"
                  className="google-map__one"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Form */}
            <div className="col-xl-6">
              <div className="contact-page__right">
                <h3 className="contact-page__form-title">Get A Free Quote</h3>

                {status === 'success' ? (
                  /* ── Success state ── */
                  <div style={{
                    padding: '40px 24px',
                    textAlign: 'center',
                    background: '#f0fdf4',
                    borderRadius: 12,
                    border: '1px solid #bbf7d0',
                  }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: '#22c55e', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}>
                      <svg width="32" height="32" fill="none" stroke="#fff" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 style={{ color: '#15803d', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                      Message Sent!
                    </h4>
                    <p style={{ color: '#166534', fontSize: 15, marginBottom: 20 }}>
                      {feedback}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="thm-btn"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      Send Another Message <span className="fas fa-arrow-right"></span>
                    </button>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form
                    id="contact-form"
                    className="contact-form-validated contact-page__form"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="contact-page__input-box">
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            disabled={status === 'loading'}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="contact-page__input-box">
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            disabled={status === 'loading'}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="contact-page__input-box">
                          <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Mobile"
                            disabled={status === 'loading'}
                          />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <div className="contact-page__input-box">
                          <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            disabled={status === 'loading'}
                          />
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <div className="contact-page__input-box text-message-box">
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Message"
                            required
                            disabled={status === 'loading'}
                          ></textarea>
                        </div>
                        {status === 'error' && (
                          <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 10 }}>
                            {feedback}
                          </p>
                        )}
                        <div className="contact-page__btn-box">
                          <button
                            type="submit"
                            className="thm-btn contact-page__btn"
                            disabled={status === 'loading'}
                          >
                            {status === 'loading' ? 'Sending…' : 'Send A Message'}
                            {status !== 'loading' && <span className="fas fa-arrow-right"></span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
