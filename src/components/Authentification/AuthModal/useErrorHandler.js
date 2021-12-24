import { useEffect, useState } from 'react';

const useErrorHandler = (isFailed) => {
  const [isFailedLocal, setIsFailedLocal] = useState(false);
  const isError = isFailed && isFailedLocal;
  const resetError = () => setIsFailedLocal(false);

  useEffect(() => {
    setIsFailedLocal(isFailed);
  }, [isFailed]);

  return { isError, resetError };
};

export default useErrorHandler;
