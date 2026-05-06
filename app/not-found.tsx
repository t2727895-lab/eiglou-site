import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterTwo from '@/components/NewsletterTwo';

export default function NotFound() {
  return (
    <>
      <PageHeader 
        title="404 Error" 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: '404 Error' }
        ]} 
      />

      {/* Start Error Page */}
      <section className="error-page">
        <div className="container">
          <div className="error-page__inner text-center">
            <div className="error-page__img float-bob-y">
              <img src="/assets/images/resources/error-page-img1.png" alt="" />
            </div>

            <div className="error-page__content">
              <h2>Oops! Page Not Found!</h2>
              <p>The page you are looking for does not exist. It might have been moved or deleted.</p>
              <div className="btn-box">
                <Link href="/" className="thm-btn">
                  Back To Home <span className="fas fa-arrow-right"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Error Page */}

      <NewsletterTwo />
    </>
  );
}
