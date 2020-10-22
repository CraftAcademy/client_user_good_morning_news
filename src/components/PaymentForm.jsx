// import React from "react";
// import {
//   injectStripe,
//   CardElement
// } from "react-stripe-elements";
// import { Button, Container, Form, Header, Segment } from "semantic-ui-react";

// const PaymentForm = (props) => {
//   const payWithStripe = async (e) => {
//     e.preventDefault();
//     const cardElement = await props.elements.getElement('card');

//     let {token} = await props.stripe.createToken();

//     const {paymentMethod} = await props.stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement
//     });

//     props.submitPayment(token.id, paymentMethod.id);
//   };

//   return (
//     <>
//       <Container>
//         <div class="centered">
//           <Segment color="blue">
//             <Header data-cy="subscription-header" textAlign="center">
//               Submit your subscription and enjoy full Good Morning Content!
//             </Header>
//             <Form size="small" onSubmit={payWithStripe}>
//               <CardElement />
//               <Button color="blue" type="submit">
//                 Subscribe Now!
//               </Button>
//             </Form>
//           </Segment>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default injectStripe(PaymentForm);

import React from "react";
import {
  CardExpiryElement,
  CardCVCElement,
  CardNumberElement,
  injectStripe,
} from "react-stripe-elements";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";

const PaymentForm = (props) => {
  const payWithStripe = async (e) => {
    e.preventDefault();
    let stripeResponse = await props.stripe.createToken();
    props.submitPayment(stripeResponse.token.id);
  };

  return (
    <Container>
      <div class="centered">
        <Segment color="blue">
          <Header data-cy="subscription-header" textAlign="center">
            Submit your subscription and enjoy full Good Morning Content!
            </Header>
          <Form size="small" onSubmit={payWithStripe}>
            <Form.Field required data-cy="card-number">
              <label>Card Number</label>
              <CardNumberElement />
            </Form.Field>
            <Form.Field required data-cy="card-expiry">
              <label>Card Expiry</label>
              <CardExpiryElement />
            </Form.Field>
            <Form.Field required data-cy="card-cvc">
              <label>Card CVC</label>
              <CardCVCElement />
            </Form.Field>

            <Button color="blue" type="submit">
              Subscribe Now!
              </Button>
          </Form>
        </Segment>
      </div>
    </Container>
  );
};

export default injectStripe(PaymentForm);
