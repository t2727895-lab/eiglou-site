import PageHeader from '@/components/PageHeader';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactPageForm from '@/components/contact/ContactPageForm';
import NewsletterTwo from '@/components/contact/NewsletterTwo';

export const metadata = {
  title: 'Contact || Itzone || Itzone Next.js Template',
  description: 'Get in touch with Itzone - Contact us for IT solutions and services',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* Contact Info */}
      <ContactInfo />

      {/* Contact Page Form + Map */}
      <ContactPageForm />

      {/* Newsletter Two */}
      <NewsletterTwo />
    </>
  );
}
