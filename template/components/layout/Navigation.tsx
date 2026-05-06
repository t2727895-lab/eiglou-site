'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavigationProps {
  mobile?: boolean
}

export default function Navigation({ mobile = false }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Pages',
      submenu: [
        { label: 'Team', href: '/team' },
        { label: 'Team Details', href: '/team-details' },
        { label: 'Projects', href: '/projects' },
        { label: 'Project Details', href: '/project-details' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'FAQs', href: '/faq' },
        { label: '404 Error', href: '/404' },
      ],
    },
    {
      label: 'Services',
      submenu: [
        { label: 'Services', href: '/services' },
        { label: 'UI/UX Design', href: '/services/ui-ux-design' },
        { label: 'Web Development', href: '/services/web-development' },
        { label: 'Digital Marketing', href: '/services/digital-marketing' },
        { label: 'Business Analysis', href: '/services/business-analysis' },
        { label: 'Software Development', href: '/services/software-development' },
        { label: 'Product Design', href: '/services/product-design' },
      ],
    },
    {
      label: 'Shop',
      submenu: [
        { label: 'Products', href: '/shop/products' },
        { label: 'Product Details', href: '/shop/product-details' },
        { label: 'Cart', href: '/shop/cart' },
        { label: 'Checkout', href: '/shop/checkout' },
        { label: 'Wishlist', href: '/shop/wishlist' },
        { label: 'Sign Up', href: '/shop/sign-up' },
        { label: 'Login', href: '/shop/login' },
      ],
    },
    {
      label: 'Blog',
      submenu: [
        { label: 'Blog', href: '/blog' },
        { label: 'Blog Standard', href: '/blog/standard' },
        { label: 'Blog Left Sidebar', href: '/blog/left-sidebar' },
        { label: 'Blog Right Sidebar', href: '/blog/right-sidebar' },
        { label: 'Blog Details', href: '/blog/details' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ]

  if (mobile) {
    return (
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            {item.submenu ? (
              <div>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                  className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded"
                >
                  {item.label} ▼
                </button>
                {openDropdown === item.label && (
                  <ul className="pl-4 flex flex-col gap-1">
                    {item.submenu.map((subitem) => (
                      <li key={subitem.label}>
                        <Link
                          href={subitem.href}
                          className="block py-1 px-4 hover:text-blue-600"
                        >
                          {subitem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link href={item.href} className="block py-2 px-4 hover:text-blue-600">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className="hidden md:flex gap-8 items-center">
      {menuItems.map((item) => (
        <li key={item.label} className="relative group">
          {item.submenu ? (
            <>
              <button className="hover:text-blue-600 font-medium">
                {item.label}
              </button>
              <ul className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                {item.submenu.map((subitem) => (
                  <li key={subitem.label}>
                    <Link
                      href={subitem.href}
                      className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {subitem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 font-medium">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
