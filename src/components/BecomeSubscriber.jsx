import React, { useState } from "react";
import { Elements } from "react-stripe-elements";
import PaymentForm from "./PaymentForm";
import Subscriptions from "../modules/subscriptions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Message } from "semantic-ui-react";

const BecomeSubscriber = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [failureMessage, setFailureMessage] = useState();

  const submitPayment = async (stripeToken, paymentMethod) => {
    let paymentStatus = await Subscriptions.create(stripeToken, paymentMethod);

    if (paymentStatus.success) {
      dispatch({
        type: "USER_IS_SUBSCRIBER",
        payload: {
          role: "subscriber",
        },
      });
      history.push("/", { message: paymentStatus.message });
    } else {
      setFailureMessage(paymentStatus.message);
    }
  };

  return (
    <>
      <Elements>
        <PaymentForm submitPayment={submitPayment} />
      </Elements>
      {failureMessage && (
        <Message negative data-cy="failure-message">
          <Message.Header>{failureMessage}</Message.Header>
        </Message>
      )}
    </>
  );
};

export default BecomeSubscriber;
