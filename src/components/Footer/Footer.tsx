import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">About GameTech</h4>
            <p className="text-sm">
              Your premier destination for cutting-edge gaming gear and
              accessories. Elevating gaming experiences since 2024.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="menu menu-vertical p-0">
              <li>
                <a href="/" className="hover:bg-base-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:bg-base-200">
                  Shop
                </a>
              </li>
              <li>
                <a href="/products" className="hover:bg-base-200">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:bg-base-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">123 Gaming Street, Tech City</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span className="text-sm">support@findyourgoods.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span className="text-sm">+1 (123) 456-7890</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <div className="form-control">
              <div className="join">
                <input
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered join-item w-full"
                />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="divider my-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              { Icon: Facebook, href: "https://facebook.com" },
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Youtube, href: "https://youtube.com" },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-square"
              >
                <Icon size={20} className="text-base-content" />
              </a>
            ))}
          </div>
          <div className="text-sm text-base-content/70">
            © {new Date().getFullYear()} FindYourGoods Shop. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
