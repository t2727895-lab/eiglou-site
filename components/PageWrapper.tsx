import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ChatPopup from './ChatPopup';
import SearchPopup from './SearchPopup';
import MobileNav from './MobileNav';
import ScrollToTop from './ScrollToTop';
import RouteChangeHandler from './RouteChangeHandler';

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
}

interface PageWrapperProps {
  children: React.ReactNode;
  services?: ServiceItem[];
}

export default function PageWrapper({ children, services = [] }: PageWrapperProps) {
  return (
    <>
      <RouteChangeHandler />
      <div className="custom-cursor__cursor"></div>
      <div className="custom-cursor__cursor-two"></div>

      <ChatPopup />
      <Sidebar />

      <div className="page-wrapper">
        <Header services={services} />
        {children}
        <Footer services={services} />
      </div>

      <MobileNav />
      <SearchPopup />
      <ScrollToTop />
    </>
  );
}
