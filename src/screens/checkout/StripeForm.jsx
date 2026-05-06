import React, { useRef, useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import ButtonIcon from '../../components/buttons/buttonIcon/ButtonIcon';

import './Checkout.css';
import colors from '../../config/colors';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      color: colors.black,
      '::placeholder': {
        color: colors.darkgray,
      },
      padding: '12px',
    },
    invalid: {
      color: colors.danger,
      iconColor: colors.danger,
    },
    complete: {
      color: colors.black,
      fontSize: 18
    },
  },
  classes: {
    base: 'stripe-input',
    focus: 'stripe-input-focused',
    empty: 'stripe-input-empty',
    invalid: 'stripe-input-invalid',
  },
};

function StripeForm({ onSuccess, onError, isStripeLoading }) {
  const toastTR = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  const createPaymentIntent = async () => {
    try {
      isStripeLoading(true);

      if (!stripe || !elements) return;
      setErrorMessage('');

      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message || 'Something went wrong');
        onError?.(error.message || 'Payment failed');
      } else {
        onSuccess?.(paymentMethod);
      }

    } catch (error) {
      responseDialog("error", "Payment intent error alert", "Something went wrong.");
    }
  }

  return (
    <form id="stripe-form" className='stripe-form-wrapper'>
      <div className="c-card-form stripe-ele">
        <span style={{ fontWeight: 600 }}>Place Order:</span>
        <div className="card-number c-cart-input mt-10">
          <CardElement
            options={cardElementOptions}
          />
        </div>
      </div>

      <div id="card-errors" className="stripe-ele" role="alert">
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
      </div>

      <ButtonIcon
        onClick={createPaymentIntent}
        buttonText="Place Order"
        backgroundColor={colors.primary}
        borderColor={colors.primary}
        color={colors.white}
        width={198}
        height={51}
        marginTop={2}
        borderRadius={0}
        fontSize={18}
      />
    </form>
  )
}

export default StripeForm