import React from "react";
import { useOrders } from "../../Hooks/useOrders";

const STATUS_STYLES = {
  pending: {
    order: "bg-amber-50 text-amber-800",
    payment: "bg-amber-50 text-amber-800",
  },
  shipped: {
    order: "bg-blue-50 text-blue-800",
    payment: "bg-green-50 text-green-800",
  },
  delivered: {
    order: "bg-teal-50 text-teal-800",
    payment: "bg-green-50 text-green-800",
  },
  paid: {
    order: "bg-green-50 text-green-800",
    payment: "bg-green-50 text-green-800",
  },
};

function Badge({ label, colorClass }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${colorClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}

function shortId(id) {
  return "#" + id.slice(-8).toUpperCase();
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function OrderCard({ order }) {
  const orderStyle =
    STATUS_STYLES[order.orderStatus]?.order || "bg-gray-50 text-gray-700";
  const payStyle =
    STATUS_STYLES[order.paymentStatus]?.payment || "bg-gray-50 text-gray-700";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md mb-3 ">
      <div className="flex items-start justify-between px-5 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-medium text-gray-900 font-mono tracking-tight">
              {shortId(order._id)}
            </span>
            <span className="text-xs text-gray-400">
              {formatDate(order.createdAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge label={order.orderStatus} colorClass={orderStyle} />
            {/* <Badge label={order.paymentStatus} colorClass={payStyle} /> */}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            ${order.totalAmount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      <div className="px-5 py-3 divide-y divide-gray-50">
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-2.5"
          >
            <div>
              <p className="text-sm text-gray-800 capitalize">
                {item.productId?.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Qty {item.quantity}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PurchaseHistory = ({ showAll = true }) => {
  const { purchaseHistory } = useOrders();
  console.log("purchase history", purchaseHistory);

  const purchaseToShow = showAll
    ? purchaseHistory
    : purchaseHistory.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-white w-full">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Purchase history
        </h2>
        <span className="text-sm text-gray-400">
          {purchaseHistory.length} Purchase
          {purchaseHistory.length !== 1 ? "s" : ""}
        </span>
      </div>

      {purchaseToShow.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm w-full">
          No orders yet
        </div>
      ) : (
        purchaseToShow.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
};

export default PurchaseHistory;
