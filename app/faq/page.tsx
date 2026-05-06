'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How long should a business plan be',
      answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.'
    },
    {
      question: 'Do I need a business plan?',
      answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.'
    },
    {
      question: 'How to Soft Launch Your Business?',
      answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.'
    },
    {
      question: 'How Can I Find My Solution?',
      answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.'
    },
    {
      question: 'Do you offer customized IT solutions?',
      answer: 'From personalized solutions to expert execution, we prioritize quality, reliability, and customer satisfaction in everything we do. Let us be your trusted partner in achieving success.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(1); // Default active like template

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <PageHeader 
        title="Our Faq" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Faq' }
        ]} 
      />

      {/* FAQ Page Start */}
      <section className="faq-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="faq-page__single">
                <div className="faq-one__left">
                  <div className="accrodion-grp">
                    {faqs.map((faq, index) => (
                      <div key={index} className={`accrodion ${activeIndex === index ? 'active' : ''}`}>
                        <div className="accrodion-title" onClick={() => toggleAccordion(index)}>
                          <h4>{faq.question}</h4>
                        </div>
                        <div className="accrodion-content" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                          <div className="inner">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="faq-page__single">
                <div className="faq-one__left">
                  <div className="accrodion-grp">
                    {faqs.map((faq, index) => (
                      <div key={index + 5} className={`accrodion ${activeIndex === index + 5 ? 'active' : ''}`}>
                        <div className="accrodion-title" onClick={() => toggleAccordion(index + 5)}>
                          <h4>{faq.question}</h4>
                        </div>
                        <div className="accrodion-content" style={{ display: activeIndex === index + 5 ? 'block' : 'none' }}>
                          <div className="inner">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Page End */}

      <NewsletterTwo />
    </>
  );
}
