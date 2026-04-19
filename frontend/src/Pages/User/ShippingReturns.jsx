import BackButton from "../../Components/common/BackButton";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900 my-2">
            Shipping & Returns
          </h1>
          <p className="text-sm text-gray-500">Last updated: 2025</p>
        </div>
        {[
          {
            title: "Shipping Policy",
            body: "We process orders within 1–2 business days. Standard delivery takes 3–7 business days. You will receive a confirmation email with tracking details once your order has shipped.",
          },
          {
            title: "Return Policy",
            body: "We accept returns within 7 days of delivery. Items must be unused, unwashed, and in original packaging. To initiate a return, contact us at support@shopnest.com.",
          },
          {
            title: "Non-Returnable Items",
            body: "Sale items, gift cards, and personal care products cannot be returned or exchanged.",
          },
          {
            title: "Refunds",
            body: "Once your return is received and inspected, we will notify you of the approval or rejection. Approved refunds are processed within 5–7 business days to your original payment method.",
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

export default ShippingReturns;
