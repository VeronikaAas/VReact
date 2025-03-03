import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Checkout', href: '/checkout', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-sky-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="p-2 text-black hover:bg-sky-600 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block size-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block size-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Navigation links */}
              <div className="flex flex-1 justify-start sm:items-center">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-sky-900 text-white' : 'text-black hover:bg-sky-600 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logo in the center */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link to="/">
                    <img
                    src="/logo_shop.gif"  
                    alt="Logo"
                    className="h-16 w-auto"/>
                </Link>
              </div>

              {/* Shopping Cart Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Link to="/checkout" className="rounded-full text-black hover:bg-sky-600 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Go to Checkout</span>
                  <ShoppingCartIcon className="size-8" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
