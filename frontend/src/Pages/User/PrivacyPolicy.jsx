import BackButton from "../../Components/common/BackButton";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900 my-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">Last updated: 2025</p>
        </div>
        {[
          {
            title: "Information We Collect",
            body: "We collect information you provide when creating an account, placing an order, or contacting us. This includes your name, email address, shipping address, and payment details.",
          },
          {
            title: "How We Use Your Information",
            body: "Your information is used to process orders, send order confirmations, provide customer support, and improve our services. We do not sell your personal data to third parties.",
          },
          {
            title: "Cookies",
            body: "We use cookies to maintain your session and improve your browsing experience. You can disable cookies in your browser settings, though this may affect site functionality.",
          },
          {
            title: "Data Security",
            body: "We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.",
          },
          {
            title: "Your Rights",
            body: "You have the right to access, update, or delete your personal information. To make a request, contact us at support@shopnest.com.",
          },
          {
            title: "Changes to This Policy",
            body: "We may update this policy from time to time. Changes will be posted on this page with an updated date.",
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

export default PrivacyPolicy;
