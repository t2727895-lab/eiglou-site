import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="site-footer bg-gray-900 text-white">
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div>
              <div className="mb-4">
                <Image
                  src="/assets/images/resources/logo-2.png"
                  alt="Itzone Logo"
                  width={150}
                  height={50}
                />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Innovating and empowering businesses with tailored IT solutions for success and growth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-400">𝕏</a>
                <a href="#" className="hover:text-blue-400">f</a>
                <a href="#" className="hover:text-blue-400">📌</a>
                <a href="#" className="hover:text-blue-400">📷</a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
                <li><Link href="/team" className="hover:text-blue-400">Meet Our Team</Link></li>
                <li><Link href="/projects" className="hover:text-blue-400">Our Projects</Link></li>
                <li><Link href="/faq" className="hover:text-blue-400">Help & FAQs</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400">Contact Us</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/web-development" className="hover:text-blue-400">Web Development</Link></li>
                <li><Link href="/services/business-analysis" className="hover:text-blue-400">Business Development</Link></li>
                <li><Link href="/services/software-development" className="hover:text-blue-400">Cloud Services</Link></li>
                <li><Link href="/services/product-design" className="hover:text-blue-400">Product Management</Link></li>
                <li><Link href="/services/ui-ux-design" className="hover:text-blue-400">UI/UX Design</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>4140 Parker Rd. Allentown, New Mexico 31134</span>
                </li>
                <li className="flex gap-2">
                  <span>📞</span>
                  <a href="tel:+2195550114" className="hover:text-blue-400">(219) 555-0114</a>
                </li>
                <li className="flex gap-2">
                  <span>✉</span>
                  <a href="mailto:Itzone@gmail.com" className="hover:text-blue-400">Itzone@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Itzone. All Rights Reserved.
            </p>
            <ul className="flex gap-6 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
