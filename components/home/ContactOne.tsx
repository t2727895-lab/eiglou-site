'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

export default function ContactOne() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
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
        setFeedback(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again.');
    }
  };

  return (
    <section className="contact-one">
      <div className="contact-one__shape-1 float-bob-x">
        <Image src="/assets/images/shapes/contact-one-shape-1.png" alt="" width={100} height={100} />
      </div>
      <div className="contact-one__shape-2"></div>
      <div className="container">
        <div className="row">
          {/* Left */}
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__left">
              <div className="section-title text-left sec-title-animation animation-style2">
                <div className="section-title__tagline-box">
                  <span className="section-title__tagline">Get In Touch</span>
                </div>
                <h2 className="section-title__title title-animation">
                  Let&apos;s Talk About Business <span>Solutions</span> With Us
                </h2>
              </div>
              <div className="contact-one__img-and-content">
                <div className="contact-one__img">
                  <Image src="/assets/images/resources/contact-one-img-1.jpg" alt="Contact our team" width={540} height={400} />
                </div>
                <div className="contact-one__content">
                  <p className="contact-one__text">
                    We&apos;re here to listen! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
                  </p>
                  <div className="contact-one__call-box">
                    <div className="icon"><span className="icon-call"></span></div>
                    <div className="content">
                      <p>Call Us Any Time</p>
                      <h3><Link href="tel:+923216933222">+92-321-69-33-222</Link></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="col-xl-6 col-lg-6">
            <div className="contact-one__right">
              {status === 'success' ? (
                <div style={{ padding: '40px 24px', textAlign: 'center', background: '#f0fdf4', borderRadius: 12, border: '1px solid #bbf7d0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="32" height="32" fill="none" stroke="#fff" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 style={{ color: '#15803d', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h4>
                  <p style={{ color: '#166534', fontSize: 15, marginBottom: 20 }}>{feedback}</p>
                  <button onClick={() => setStatus('idle')} className="thm-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Send Another <span className="fas fa-arrow-right"></span>
                  </button>
                </div>
              ) : (
                <form className="contact-form-validated contact-one__form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h4 className="contact-one__input-title">Full Name</h4>
                      <div className="contact-one__input-box">
                        <div className="contact-one__input-icon"><span className="icon-user"></span></div>
                        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Thomas Alison" required disabled={status === 'loading'} />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h4 className="contact-one__input-title">Email Address</h4>
                      <div className="contact-one__input-box">
                        <div className="contact-one__input-icon"><span className="icon-mail"></span></div>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="thomas@domain.com" required disabled={status === 'loading'} />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h4 className="contact-one__input-title">Phone Number</h4>
                      <div className="contact-one__input-box">
                        <div className="contact-one__input-icon"><span className="icon-phone-call"></span></div>
                        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="12 (00) 123 4567 890" disabled={status === 'loading'} />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h4 className="contact-one__input-title">Subject</h4>
                      <div className="contact-one__input-box">
                        <div className="contact-one__input-icon"><span className="icon-edit"></span></div>
                        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" disabled={status === 'loading'} />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <h4 className="contact-one__input-title">Inquiry about</h4>
                    <div className="contact-one__input-box text-message-box">
                      <div className="contact-one__input-icon"><span className="icon-edit"></span></div>
                      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message" required disabled={status === 'loading'}></textarea>
                    </div>
                    {status === 'error' && (
                      <p style={{ color: '#ef4444', fontSize: 13, margin: '8px 0' }}>{feedback}</p>
                    )}
                    <div className="contact-one__btn-box">
                      <button type="submit" className="thm-btn" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending…' : 'Submit Now'}
                        {status !== 'loading' && <span className="fas fa-arrow-right"></span>}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
