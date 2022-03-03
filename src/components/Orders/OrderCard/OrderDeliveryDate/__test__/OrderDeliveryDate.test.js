import { render } from '@testing-library/react';
import React from 'react';

import { orderState } from '../../../../../constants/orderStatus';
import { OrderDeliveryDate } from '../OrderDeliveryDate';

const deliveryDate = '2021-04-19T08:46:13.911Z';

describe('OrderDeliveryDate component', () => {
  describe('snapshots for different order statuses', () => {
    it('Renders a valid orderCard snapshot with status equal WAITING_FOR_PAYMENT', () => {
      const { asFragment } = render(
        <OrderDeliveryDate
          status={orderState.WAITING_FOR_PAYMENT}
          deliveryDate={deliveryDate}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('Renders a valid orderCard snapshot with status equal DELIVERED', () => {
      const { asFragment } = render(
        <OrderDeliveryDate
          status={orderState.DELIVERED}
          deliveryDate={deliveryDate}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status equal PAID', () => {
      const { asFragment } = render(
        <OrderDeliveryDate
          status={orderState.PAID}
          deliveryDate={deliveryDate}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status equal CANCELLED', () => {
      const { asFragment } = render(
        <OrderDeliveryDate
          status={orderState.CANCELLED}
          deliveryDate={deliveryDate}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
