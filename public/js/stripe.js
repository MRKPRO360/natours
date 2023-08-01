import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51M5tTOKnej6sIH3rVMIsxguAqm18XGZR02SC20g8iK1BNNbFfESn0w8VEPo1zEZAXcQFMfUfZylKD2jJaMeqauWf00b9CPAVTd'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get Checkout Session From Api
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // 2) Create Checkout Form + Charge Credit Card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.error(err);
    showAlert('error', err);
  }
};
