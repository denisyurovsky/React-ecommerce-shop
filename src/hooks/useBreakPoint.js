import { useState, useEffect } from 'react';

import { BREAK_POINT } from '../helpers/constants/constants';

import { useWindowSize } from './useWindowSize';

const useBreakPoint = (breakPoint = BREAK_POINT.LAPTOP) => {
  const [isLess, setIsLess] = useState(null);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsLess(width <= breakPoint);
  }, [width, breakPoint]);

  return isLess;
};

export default useBreakPoint;
