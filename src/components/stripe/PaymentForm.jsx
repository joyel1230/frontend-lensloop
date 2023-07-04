import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchPayment, postPayment } from "../../services/apiMethods";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = ({ day,postId }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const data = {
          amount: day*100,
          id,
        };
        const response = await postPayment(data);
        
        if (response.data.success) {
          await patchPayment({id:postId})
          console.log("successful");
          setSuccess(true);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (error) {
        console.log(error);
        seterror("Payment Error");
      }
    } else {
      console.log(error.message);
      seterror("Payment Error");
    }
  };
  return (
    <>
      {!success ? (
        <div className="flex justify-center items-center h-[30rem]">
          <form onSubmit={handleSubmit} className="w-[50%]">
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className="payBtn">Pay</button>
          </form>
          <span className="text-red-500">{error}</span>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[30rem] text-3xl">
          <h2>Payment successful</h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
