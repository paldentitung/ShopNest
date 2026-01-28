import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const navLinks = [
    {
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      id: "product",
      label: "Product",
      path: "/product",
    },
    {
      id: "about",
      label: "About",
      path: "/about",
    },
    {
      id: "contact",
      label: "Contact",
      path: "/contact",
    },
  ];

  const footerLinks = [
    { id: "faq", label: "Customer Support FAQ", path: "/faq" },
    { id: "shipping", label: "Shipping & Returns", path: "/shipping-returns" },
    { id: "privacy", label: "Privacy Policy", path: "/privacy-policy" },
    { id: "terms", label: "Terms & Conditions", path: "/terms-conditions" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const footerContact = [
    {
      id: "email",
      value: "support@shopnest.com",
    },
    {
      id: "location",
      value: "Kathmandu, Nepal",
    },
    {
      id: "hours",
      value: "Mon – Fri, 9 AM – 6 PM",
    },
  ];

  return (
    <section className="bg-(--color-foreground) text-(--color-surface) p-10">
      <div
        className="w-full max-w-7xl mx-auto flex flex-col gap-5
"
      >
        <div className="flex justify-between flex-col md:flex-row gap-6 ">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-2xl font-semibold">ShopNest</h2>
            <p className="text-sm">
              Modern fashion, built for the future of online shopping.
            </p>
          </div>

          <div>
            <ul className="flex flex-col  gap-2.5 ">
              {navLinks.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-transparent transition-all duration-300  hover:border-b-(--color-surface)"
                >
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-transparent transition-all duration-300 hover:border-b-(--color-surface)"
                >
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="flex flex-col gap-2.5">
              {footerContact.map((item) => (
                <li
                  key={item.id}
                  className="border-b border-transparent transition-all duration-300 hover:border-b-(--color-surface)"
                >
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center flex justify-center items-center opacity-70">
          © {new Date().getFullYear()} ShopNest. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;
