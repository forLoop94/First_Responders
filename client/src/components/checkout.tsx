import { useState } from "react";
import { getPaymentUrl } from "../services/payment-service";

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const processPayment = async () => {
    setLoading(true);
    try {
      const { authorizationUrl } = await getPaymentUrl(
        "6ae867a0-65e4-4ed2-b836-11b9139235e2",
      );
      window.location.href = authorizationUrl;
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={processPayment}
      disabled={loading}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
};

export default CheckoutButton;
