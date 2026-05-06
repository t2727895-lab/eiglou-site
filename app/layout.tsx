import type { Metadata } from "next";
import { Nunito, Barlow } from "next/font/google";
import "./globals.css";
import { checkDbConnection } from "@/lib/prisma";
import Scripts from "@/components/Scripts";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home One || Itzone|| Itzone Next.js Template",
  description: "Itzone Next.js Template",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkDbConnection();
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/assets/images/favicons/site.webmanifest" />

        {/* CSS Files */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.min.css" />
        <link rel="stylesheet" href="/assets/css/custom-animate.css" />
        <link rel="stylesheet" href="/assets/css/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome-all.css" />
        <link rel="stylesheet" href="/assets/css/jarallax.css" />
        <link rel="stylesheet" href="/assets/css/jquery.magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/odometer.min.css" />
        <link rel="stylesheet" href="/assets/css/flaticon.css" />
        <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/jquery-ui.css" />
        <link rel="stylesheet" href="/assets/css/twentytwenty.css" />
        <link rel="stylesheet" href="/assets/css/aos.css" />

        {/* Module CSS */}
        <link rel="stylesheet" href="/assets/css/module-css/slider.css" />
        <link rel="stylesheet" href="/assets/css/module-css/footer.css" />
        <link rel="stylesheet" href="/assets/css/module-css/banner.css" />
        <link rel="stylesheet" href="/assets/css/module-css/about.css" />
        <link rel="stylesheet" href="/assets/css/module-css/services.css" />
        <link rel="stylesheet" href="/assets/css/module-css/why-choose.css" />
        <link rel="stylesheet" href="/assets/css/module-css/process.css" />
        <link rel="stylesheet" href="/assets/css/module-css/sliding-text.css" />
        <link rel="stylesheet" href="/assets/css/module-css/project.css" />
        <link rel="stylesheet" href="/assets/css/module-css/counter.css" />
        <link rel="stylesheet" href="/assets/css/module-css/team.css" />
        <link rel="stylesheet" href="/assets/css/module-css/brand.css" />
        <link rel="stylesheet" href="/assets/css/module-css/testimonial.css" />
        <link rel="stylesheet" href="/assets/css/module-css/contact.css" />
        <link rel="stylesheet" href="/assets/css/module-css/pricing.css" />
        <link rel="stylesheet" href="/assets/css/module-css/faq.css" />
        <link rel="stylesheet" href="/assets/css/module-css/blog.css" />
        <link rel="stylesheet" href="/assets/css/module-css/newsletter.css" />
        <link rel="stylesheet" href="/assets/css/module-css/page-header.css" />

        {/* Template Styles */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body className={`${nunito.variable} ${barlow.variable} custom-cursor`}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
