import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-sky-300 text-black py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          
          {/* Contact Info */}
          <div className="sm:w-1/2 p-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="mt-2">Email: support@example.com</p>
            <p>Phone: +1 (234) 567-890</p>
            <p>Address: 123 Main Street, New York, NY 10001</p>
          </div>


          {/* Quick Links */}
          <div className="sm:w-1/4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><Link to="/" className="hover:text-sky-600">Home</Link></li>
              <li><Link to="/checkout" className="hover:text-sky-600">Checkout</Link></li>
              <li><Link to="/contact" className="hover:text-sky-600">Contact</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
