import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './PaymentForm';

const key = "pk_test_51NPOA9SJdve5uScHgkAxEr0AjegMrBVHxiJ9OX6mUqZmy3K06cz8GiXqT6uTWPzI2ieOgRLkU8SktXU6I02kR3gz00wJx7Wa5P"
const stripeTestPromise = loadStripe(key)
const Stripe = ({id,day}) => {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm day={day} postId={id}/>
    </Elements>
  )
}

export default Stripe