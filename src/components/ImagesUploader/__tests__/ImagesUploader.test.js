import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import {
  croppedFile,
  unCroppedFile,
  fileWithWrongExtention,
} from '../../../test-utils/images/images';
import { TEST_IMG_URL } from '../constants';
import { ImagesUploader } from '../ImagesUploader';

const multipleUpload = [unCroppedFile, unCroppedFile, unCroppedFile];

const fakeUrls = 'http://localhost:5000/products/images/photo_1.jpeg';

const handlersFulfilled = [
  rest.get(fakeUrls, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(TEST_IMG_URL, (_, res, ctx) => {
    return res(ctx.body({}));
  }),
];

jest.mock('cropperjs', () => jest.fn());

describe('ImagesUploader component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot without data', async () => {
      const { asFragment } = render(
        <ImagesUploader
          imageUrls={[]}
          updateImages={() => {}}
          disableSubmit={() => {}}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('renders a valid snapshot with data', async () => {
      const server = setupServer(...handlersFulfilled);

      server.listen();
      const { asFragment } = render(
        <ImagesUploader
          imageUrls={[fakeUrls, fakeUrls, fakeUrls]}
          updateImages={() => {}}
          disableSubmit={() => {}}
        />
      );

      expect(await screen.findByText(/selected/i)).toBeInTheDocument();
      expect(await screen.findAllByTestId('imgItem')).toHaveLength(3);
      expect(asFragment()).toMatchSnapshot();
      server.close();
    });
  });
});

describe('add some image', () => {
  const updateImages = jest.fn();
  const disableSubmit = jest.fn();

  beforeEach(() =>
    render(
      <>
        <ImagesUploader
          imageUrls={[]}
          updateImages={updateImages}
          disableSubmit={disableSubmit}
        />
        <ToastContainer />
      </>
    )
  );

  it('should upload correct images', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, multipleUpload);

    expect(uploader.files[0].name).toBe('unCropped.png');
    expect(uploader.files.length).toBe(3);
    expect(await screen.findByText(/selected/i)).toBeInTheDocument();
    expect(await screen.findAllByTestId('imgItem')).toHaveLength(3);
  });

  it('should be able to delete images', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, multipleUpload);

    await screen.findByText(/selected/i);

    userEvent.click(screen.getAllByTestId('delete')[0]);

    expect(await screen.findAllByTestId('imgItem')).toHaveLength(2);
  });

  it('should not upload images with wrong extention', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, fileWithWrongExtention);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});

describe('Crop image functionality', () => {
  const updateImages = jest.fn();
  const disableSubmit = jest.fn();

  beforeEach(() =>
    render(
      <ImagesUploader
        imageUrls={[]}
        updateImages={updateImages}
        disableSubmit={disableSubmit}
      />
    )
  );

  it('should pass images with correct dimensions', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, croppedFile);
    await waitFor(() => {
      expect(updateImages).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByTestId('CheckCircleIcon')).toBeInTheDocument();
  });

  it('should crop image with wrong dimensions', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, unCroppedFile);
    await screen.findByTestId('cropper');
    userEvent.click(screen.getByRole('button', { name: /^crop$/i }));

    await waitFor(() => {
      expect(updateImages).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByTestId('CheckCircleIcon')).toBeInTheDocument();
  });

  it('should be able to cancel crop', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, unCroppedFile);
    await screen.findByTestId('cropper');
    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(screen.queryByTestId('cropper')).toBeNull();
  });

  it('should be able to switch image for crop', async () => {
    const uploader = screen.getByLabelText(/choose images to upload/i);

    userEvent.upload(uploader, [croppedFile, unCroppedFile]);

    const cropper = await screen.findByTestId('cropper');

    expect(cropper.querySelector('img').alt).toBe('unCropped.png');

    userEvent.click(screen.getByRole('button', { name: /^cropped/ }));
    expect(cropper.querySelector('img').alt).toBe('cropped.png');
  });
});
