// src/components/CheckoutForm.tsx
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?orderId=...`, // or handle client-side
      },
    });

    if (error) {
      setMessage(error.message ?? 'An unexpected error occurred.');
    } else {
      // Success handled via redirect or status check
      console.log("done");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement 
        options={{
          layout: 'tabs', // or 'accordion'
        }}
      />
      <button type="submit" disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? 'Processing...' : 'Pay now'}
      </button>

      {message && <div>{message}</div>}
    </form>
  );
}