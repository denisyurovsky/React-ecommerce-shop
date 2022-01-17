import { render } from '@testing-library/react';
import React from 'react';

import { orderState } from '../../../../../helpers/constants/orderStatus';
import { OrderDeliveryDate } from '../OrderDeliveryDate';

describe('OrderDeliveryDate component', () => {
  describe('snapshots for different order statuses', () => {
    const now = new Date();

    it('Renders a valid orderCard snapshot with status equal WAITING_FOR_PAYMENT', () => {
      const { asFragment } = render(
        <OrderDeliveryDate
          status={orderState.WAITING_FOR_PAYMENT}
          deliveryDate={now}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('Renders a valid orderCard snapshot with status equal DELIVERED', () => {
      const { asFragment } = render(
        <OrderDeliveryDate status={orderState.DELIVERED} deliveryDate={now} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status equal PAID', () => {
      const { asFragment } = render(
        <OrderDeliveryDate status={orderState.PAID} deliveryDate={now} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status equal CANCELLED', () => {
      const { asFragment } = render(
        <OrderDeliveryDate status={orderState.CANCELLED} deliveryDate={now} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
