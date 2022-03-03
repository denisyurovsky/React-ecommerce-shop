import React, { useEffect, useState } from 'react';
import { ToastContainer as ToastContainerFromLib } from 'react-toastify';

import { BREAK_POINT, HEADER_HEIGHT } from '../../constants/constants';
import useBreakPoint from '../../hooks/useBreakPoint';

const toastConfiguration = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  theme: 'colored',
};

const styleToast = {
  fontSize: '1.6rem',
};

const ToastContainer = () => {
  const isLessThenBreakPoint = useBreakPoint(BREAK_POINT.SM);
  const [marginTop, setMarginTop] = useState(0);

  useEffect(() => {
    isLessThenBreakPoint ? setMarginTop(HEADER_HEIGHT) : setMarginTop(0);
  }, [isLessThenBreakPoint, setMarginTop]);

  return (
    <ToastContainerFromLib
      {...toastConfiguration}
      style={{ ...styleToast, marginTop: marginTop }}
    />
  );
};

export default ToastContainer;
