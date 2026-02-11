import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPaystackPayment } from "../services/payment-service";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!reference) {
      setStatus("No payment reference found.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await verifyPaystackPayment({
          orderId: "6ae867a0-65e4-4ed2-b836-11b9139235e2",
          reference,
        });
        if (response.success) {
          setStatus("Payment verified successfully");
        } else {
          setStatus("Payment verification failed");
        }
      } catch (error) {
        setStatus("Error verifying payment. Please contact support.");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div>
      <h2>{status}</h2>
      <a href="/dashboard">Go back to Home</a>
    </div>
  );
};

export default PaymentSuccess;
