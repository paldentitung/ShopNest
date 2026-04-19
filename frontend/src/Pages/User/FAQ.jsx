import BackButton from "../../Components/common/BackButton";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I track my order?",
      a: "Once your order is shipped, you'll receive an email with a tracking link.",
    },
    {
      q: "Can I cancel my order?",
      a: "You can cancel your order within 24 hours of placing it by contacting us.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards and online payment methods.",
    },
    {
      q: "How long does delivery take?",
      a: "Standard delivery takes 3–7 business days depending on your location.",
    },
    {
      q: "Do you ship internationally?",
      a: "Currently we ship within Nepal only. International shipping coming soon.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <h1 className="text-2xl font-semibold text-gray-900 my-2">
          Customer Support FAQ
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Find answers to the most common questions below.
        </p>
        <div className="flex flex-col gap-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 px-6 py-5"
            >
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {item.q}
              </h3>
              <p className="text-sm text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
