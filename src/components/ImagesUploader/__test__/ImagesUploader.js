import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ImagesUploader } from '../ImagesUploader';

const file1 = new File(['(⌐□_□)'], 'image_1.png', { type: 'image/png' });
const file2 = new File(['(⌐□_□)'], 'image_2.jpg', { type: 'image/jpg' });
const file3 = new File(['(⌐□_□)'], 'image_3.bmp', { type: 'image/bmp' });
const fileWithWrongExtension = new File(['foo'], 'foo.txt', {
  type: 'text/plain',
});
const fakeUrl = 'http://localhost:5000/products/images/photo_1.jpeg';
const handlersFulfilled = [
  rest.get(fakeUrl, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
];
const callback = jest.fn();

describe('ImagesUploader component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot without data', () => {
      const { asFragment } = render(
        <ImagesUploader imageUrls={[]} updateImages={() => {}} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with data', async () => {
      const server = setupServer(...handlersFulfilled);

      server.listen();
      const { asFragment } = render(
        <ImagesUploader
          imageUrls={[fakeUrl, fakeUrl, fakeUrl]}
          updateImages={() => {}}
        />
      );

      expect(await screen.findByText(/selected/i)).toBeInTheDocument();
      expect(await screen.findAllByTestId('imgItem')).toHaveLength(3);
      expect(asFragment()).toMatchSnapshot();
      server.close();
    });
    describe('add some image', () => {
      it('upload correct images and delete some image', async () => {
        render(<ImagesUploader imageUrls={[]} updateImages={callback} />);
        const uploader = screen.getByLabelText(/choose images to upload/i);

        userEvent.upload(uploader, [file1, file2, file3]);
        expect(uploader.files[0].name).toBe('image_1.png');
        expect(uploader.files.length).toBe(3);
        expect(await screen.findByText(/selected/i)).toBeInTheDocument();
        expect(await screen.findAllByTestId('imgItem')).toHaveLength(3);
        const buttonDelete = await screen.findAllByTestId('delete');

        userEvent.click(buttonDelete[0]);
        expect(callback).toHaveBeenCalledTimes(2);
        expect(await screen.findAllByTestId('imgItem')).toHaveLength(2);
      });
      it('attempt uploading image with the wrong extension', async () => {
        render(
          <>
            <ImagesUploader imageUrls={[]} updateImages={callback} />
            <ToastContainer />
          </>
        );
        const uploader = screen.getByLabelText(/choose images to upload/i);

        userEvent.upload(uploader, [fileWithWrongExtension]);

        expect(await screen.findByRole('alert')).toBeInTheDocument();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(
          screen.getByLabelText(/choose images to upload/i)
        ).toBeInTheDocument();
      });
    });
  });
});
