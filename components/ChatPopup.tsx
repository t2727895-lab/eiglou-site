'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';

export default function ChatPopup() {
  const [open, setOpen]         = useState(false);
  const [form, setForm]         = useState({ name: '', email: '', message: '' });
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const popupRef                = useRef<HTMLDivElement>(null);
  const btnRef                  = useRef<HTMLButtonElement>(null);

  // Close on outside click — but ignore clicks on the toggle button itself
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (popupRef.current?.contains(target)) return;
      if (btnRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

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
        body:    JSON.stringify({ ...form, subject: 'Chat Widget Enquiry' }),
      });

      let data: { message?: string; error?: string } = {};
      try { data = await res.json(); } catch { /* empty body */ }

      if (res.ok) {
        setStatus('success');
        setFeedback(data.message || "We'll get back to you soon!");
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setFeedback(data.error || `Error ${res.status}. Please try again.`);
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please check your connection and try again.');
    }
  };

  const handleToggle = () => {
    setOpen((v) => {
      // Only reset form state when opening fresh (not when closing)
      if (!v) {
        setStatus('idle');
        setFeedback('');
      }
      return !v;
    });
  };

  return (
    <>
      <div className="chat-icon">
        <button
          ref={btnRef}
          type="button"
          className="chat-toggler"
          onClick={handleToggle}
          aria-label="Open contact chat"
        >
          <i className="fa fa-comment"></i>
        </button>
      </div>

      <div
        id="chat-popup"
        className={`chat-popup${open ? ' popup-visible' : ''}`}
        ref={popupRef}
      >
        <div className="popup-inner">
          <div
            className="close-chat"
            onClick={() => setOpen(false)}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-times"></i>
          </div>

          <div className="chat-form">
            {status === 'success' ? (
              /* ── Success state ── */
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: '#22c55e', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <svg width="28" height="28" fill="none" stroke="#fff" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p style={{ color: '#15803d', fontWeight: 600, marginBottom: 6 }}>Message Sent!</p>
                <p style={{ fontSize: 13, color: '#166534', marginBottom: 16 }}>{feedback}</p>
                <button
                  className="thm-btn"
                  onClick={() => { setStatus('idle'); setFeedback(''); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}
                >
                  Send Another <span className="fas fa-arrow-right"></span>
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <p>Please fill out the form below and we will get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} className="contact-form-validated">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="form-group">
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
                  <div className="form-group">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      required
                      disabled={status === 'loading'}
                    ></textarea>
                  </div>
                  {status === 'error' && (
                    <p style={{
                      color: '#ef4444',
                      fontSize: 12,
                      marginBottom: 8,
                      padding: '6px 10px',
                      background: '#fef2f2',
                      borderRadius: 4,
                      border: '1px solid #fecaca',
                    }}>
                      ⚠ {feedback}
                    </p>
                  )}
                  <div className="form-group message-btn">
                    <button
                      type="submit"
                      className="thm-btn"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Submit Now'}
                      {status !== 'loading' && <span className="fas fa-arrow-right"></span>}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
