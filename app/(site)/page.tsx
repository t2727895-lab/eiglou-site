import BannerOne from '@/components/home/BannerOne';
import AboutOne from '@/components/home/AboutOne';
import ServiceOne from '@/components/home/ServiceOne';
import WhyChooseOne from '@/components/home/WhyChooseOne';
import ProcessOne from '@/components/home/ProcessOne';
import SlidingTextOne from '@/components/home/SlidingTextOne';
import ProjectOne from '@/components/home/ProjectOne';
import CounterOne from '@/components/home/CounterOne';
// import TeamOne from '@/components/home/TeamOne';
// import BrandOne from '@/components/home/BrandOne';
import TestimonialOne from '@/components/home/TestimonialOne';
import ContactOne from '@/components/home/ContactOne';
import FaqOne from '@/components/home/FaqOne';
import BlogOne from '@/components/home/BlogOne';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <BannerOne />
      <AboutOne />
      <ServiceOne />
      <WhyChooseOne />
      <ProcessOne />
      <SlidingTextOne />
      <ProjectOne />
      <CounterOne />
      {/* <TeamOne /> */}
      {/* <BrandOne /> */}
      <TestimonialOne />
      <ContactOne />
      <FaqOne />
      <BlogOne />
      <Newsletter />
    </>
  );
}
