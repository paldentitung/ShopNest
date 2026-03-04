import React from "react";
import Contact from "../../Components/Contact";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 mt-10">
      {/* Hero Section */}
      <section className="bg-(--color-foreground) text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have questions or need help? We’re here to assist you.
        </p>
      </section>

      <section className="py-8 px-6 max-w-6xl mx-auto">
        <Contact />
      </section>
      {/* Optional Map Section */}
      <section className="py-8 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">Find Us</h2>
        <div className="w-full h-64 md:h-96 rounded overflow-hidden shadow-md">
          <iframe
            title="Company Location"
            className="w-full h-full"
            frameBorder="0"
            src="https://maps.google.com/maps?q=Kathmandu,Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
