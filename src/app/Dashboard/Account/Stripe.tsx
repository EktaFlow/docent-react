import React, { useMemo } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  CardElement
} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from "react";
import { IonPage, IonContent, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import Header from '../../Framework/Header';

import './Stripe.scss';

const stripePromise = loadStripe('pk_test_51KfpD2DtHBkFAnxzCNauBik69tfhi9w5FGIKfxTKVGeNbxFMQOAHoVyptjz6XCDJ4rl8PLCPNbGj6sc8074yOiqa00dz2WsYlC');

export function useResponsiveFontSize() {
  const getFontSize = () => (window.innerWidth < 450 ? "16px" : "18px");
  const [fontSize, setFontSize] = useState(getFontSize);

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return fontSize;
}

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const Stripe = () => {

  // useEffect(() => {
  //   fetch("http://localhost:3001/payment_intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));

  // }, []);

  return (
    <IonPage>
      <Header />
      <IonContent>
        <Elements stripe={stripePromise}>
          <CCForm />
        </Elements>
      </IonContent>
    </IonPage>
  );
};

const CCForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [clientSecret, setClientSecret] = useState("");

  const [message, setMessage] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { error: backendError, client } = await fetch('http://localhost:3001/payment_intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentMethodType: 'card',
        currency: 'usd'
      }),
    }).then(r => r.json());

    if (backendError) {
      setMessage(backendError.message);
      return;
    }

    // setClientSecret(client);

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
        },
      }
    )

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      // setMessage(stripeError.message!);
      return;
    }

    // const payload = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardNumberElement)!
    // });
    // console.log("[PaymentMethod]", payload);
  };

  // use 4242 4242 4242 4242 with any expiration date or CVC
  return (
    <div className="stripe-wrapper">
      <IonCard color="dark">
        <IonCardHeader>
          <IonCardTitle>Make a Payment</IonCardTitle>
          <form id="payment-form" onSubmit={handleSubmit} >
            <label>
              <CardElement />
            </label>
            {/* <label>
              Card number
              <CardNumberElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>
            <label>
              Expiration date
              <CardExpiryElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label>
            <label>
              CVC
              <CardCvcElement
                options={options}
                onReady={() => {
                  console.log("CardNumberElement [ready]");
                }}
                onChange={event => {
                  console.log("CardNumberElement [change]", event);
                }}
                onBlur={() => {
                  console.log("CardNumberElement [blur]");
                }}
                onFocus={() => {
                  console.log("CardNumberElement [focus]");
                }}
              />
            </label> */}
            <IonButton size="small" color="dsb" type="submit" disabled={!stripe}>Pay</IonButton>
            {message && <div id="payment-message">{message}</div>}
          </form>
        </IonCardHeader>
      </IonCard>
    </div>
  );
};

export default Stripe;
