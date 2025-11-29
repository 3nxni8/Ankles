import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-900 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            UNDERWORLD.
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 UNDERWORLD.</p>
        <p className="text-sm text-gray-400">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm font-medium text-white">Shop</p>
        <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
        <Link href="/products" className="hover:text-white transition-colors">New Arrivals</Link>
        <Link href="/products" className="hover:text-white transition-colors">Best Sellers</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm font-medium text-white">Support</p>
        <Link href="/Contact" className="hover:text-white transition-colors">Contact</Link>
        <Link href="/returns" className="hover:text-white transition-colors">Returns Policy</Link>
        <Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm font-medium text-white">Company</p>
        <Link href="/About" className="hover:text-white transition-colors">About</Link>
        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;
