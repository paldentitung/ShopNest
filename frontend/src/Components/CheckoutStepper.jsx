const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

export default function CheckoutStepper({ currentStep }) {
  return (
    <div
      className="w-full flex justify-center py-8"
      style={{ background: "#f8f9fb" }}
    >
      <div className="flex gap-2 flex-wrap justify-center">
        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200
                ${
                  isActive
                    ? "bg-(--color-foreground) text-white  shadow-sm"
                    : isCompleted
                      ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                      : "bg-white text-gray-400 border-gray-200 opacity-60"
                }
              `}
            >
              {isCompleted && "✓ "}
              {step.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
