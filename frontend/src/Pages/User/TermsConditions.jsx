import BackButton from "../../Components/common/BackButton";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900 my-2">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500">Last updated: 2025</p>
        </div>
        {[
          {
            title: "Acceptance of Terms",
            body: "By accessing or using ShopNest, you agree to be bound by these terms. If you do not agree, please do not use our services.",
          },
          {
            title: "Use of the Site",
            body: "You agree to use this site only for lawful purposes. You must not misuse our platform, attempt unauthorized access, or engage in fraudulent activity.",
          },
          {
            title: "Orders & Payments",
            body: "All orders are subject to availability and confirmation. We reserve the right to cancel any order and issue a refund if a product becomes unavailable.",
          },
          {
            title: "Intellectual Property",
            body: "All content on ShopNest including logos, images, and text is the property of ShopNest and may not be used without written permission.",
          },
          {
            title: "Limitation of Liability",
            body: "ShopNest is not liable for any indirect, incidental, or consequential damages arising from your use of the site or products purchased.",
          },
          {
            title: "Changes to Terms",
            body: "We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.",
          },
          {
            title: "Contact",
            body: "For any questions regarding these terms, contact us at support@shopnest.com.",
          },
        ].map((section, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-gray-200 px-6 py-5 flex flex-col gap-2"
          >
            <h2 className="text-sm font-semibold text-gray-800">
              {section.title}
            </h2>
            <p className="text-sm text-gray-500">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsConditions;
