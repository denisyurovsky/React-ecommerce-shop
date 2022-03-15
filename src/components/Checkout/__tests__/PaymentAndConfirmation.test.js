import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { ERROR } from '../../../constants/constants';
import PaymentWrapper from '../../../test-utils/checkout/PaymentWrapper';
import render, { screen } from '../../../test-utils/renderWith';

const getBackspace = (num = 1) => '{backspace}'.repeat(num);

const handlersFulfilled = rest.post('/payment', (req, res, ctx) =>
  res(ctx.status(200))
);

const handlersRejected = rest.post('/payment', (req, res, ctx) =>
  res(ctx.status(404))
);

const guestResolved = {
  isResolved: true,
  isUser: false,
  description: 'should provide payment for guest',
  handler: handlersFulfilled,
};

const guestRejected = {
  isResolved: false,
  isUser: false,
  description: 'should not provide payment with server error',
  handler: handlersRejected,
};

const userResolved = {
  isResolved: true,
  isUser: true,
  description: 'should provide payment for user',
  handler: handlersFulfilled,
};

describe.each([guestResolved, guestRejected, userResolved])(
  'Payment component',
  ({ description, handler, isResolved, isUser }) => {
    it(`${description}`, async () => {
      const server = setupServer(handler);

      server.listen();
      isUser && localStorage.setItem('accessToken', 'token');
      render(<PaymentWrapper />);

      const cardNumber = screen.getByLabelText('Card Number');
      const expDate = screen.getByLabelText('Expiration Date');
      const cvv = screen.getByLabelText('CVV');
      const cardHolder = screen.getByLabelText('Card Holder');
      const paymentButton = screen.getByText('Pay 150 $');
      const paymentAccordion = screen.getByTestId('PaymentMethodAccordion');
      const orderConfirmation = screen.getByTestId('OrderConfirmation');
      const textConfirmation = screen.getByTestId('ConfirmationText');

      const isPaymentBtnDisabled = () =>
        expect(paymentButton).toHaveAttribute('disabled');

      const isPaymentBtnNotDisabled = () =>
        expect(paymentButton).not.toHaveAttribute('disabled');

      const fillForm = () => {
        isPaymentBtnDisabled();
        expect(orderConfirmation).toHaveAttribute('aria-disabled');
        userEvent.type(cardNumber, '*Klsl/123456789012345678');
        userEvent.type(expDate, '1040');
        userEvent.type(cvv, '022');
        expect(cardNumber).toHaveValue('1234 5678 9012 3456');
        expect(expDate).toHaveValue('10/40');
        expect(cvv).toHaveValue('022');
      };

      const checkValidationCases = () => {
        isPaymentBtnNotDisabled();
        userEvent.type(cardHolder, 'John Smith');
        expect(cardHolder).toHaveValue('John Smith');
        isPaymentBtnNotDisabled();
        userEvent.type(expDate, `${getBackspace(4)}2`);
        expect(screen.getByText('Incorrect month')).toBeInTheDocument();
        isPaymentBtnDisabled();
        userEvent.type(expDate, `${getBackspace()}1020`);
        expect(screen.getByText('The card is expired')).toBeInTheDocument();
        isPaymentBtnDisabled();
        userEvent.type(expDate, `${getBackspace(2)}40`);
        isPaymentBtnNotDisabled();
        userEvent.type(cardNumber, `${getBackspace()}`);
        isPaymentBtnDisabled();
        userEvent.type(cardNumber, `6`);
      };

      const getGuestConfirmation = () => {
        expect(textConfirmation).not.toHaveTextContent('Navigate to');
      };

      const getUserConfirmation = () => {
        expect(textConfirmation).toHaveTextContent('Navigate to');
        const redirectBtn = screen.getByText('Go to the Orders page');

        expect(redirectBtn).toBeInTheDocument();
      };

      const getPaymentSuccess = async () => {
        await screen.findByLabelText('Card Number');
        expect(paymentAccordion).toHaveAttribute('aria-disabled');
        expect(orderConfirmation).not.toHaveAttribute('aria-disabled');
        isUser ? getUserConfirmation() : getGuestConfirmation();
      };

      const getPaymentError = async () => {
        const toast = await screen.findByRole('alert');

        expect(toast).toHaveTextContent(ERROR.SOMETHING_WENT_WRONG);
        expect(paymentAccordion).not.toHaveAttribute('aria-disabled');
      };

      fillForm();
      !isResolved && checkValidationCases();
      userEvent.click(paymentButton);
      expect(await screen.findByRole('progressbar')).toBeInTheDocument();
      isResolved ? await getPaymentSuccess() : await getPaymentError();

      server.close();
    });
  }
);
