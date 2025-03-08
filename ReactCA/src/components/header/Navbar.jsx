import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/Cartcontext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Checkout', href: '/checkout' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { cart } = useCart();
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Disclosure as="nav" className="bg-sky-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">

              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="p-2 text-black hover:bg-sky-600 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex flex-1 justify-start items-center">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-black hover:bg-sky-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logo in the center */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link to="/">
                  <img src="/logo_shop.gif" alt="Logo" className="h-16 w-auto" />
                </Link>
              </div>

              {/* Shopping Cart Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Link to="/checkout" className="relative text-black hover:bg-sky-600 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Go to Checkout</span>
                  <ShoppingCartIcon className="w-8 h-8" aria-hidden="true" />
                  {totalItemsInCart > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItemsInCart}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-sky-400">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-black hover:bg-sky-600 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
