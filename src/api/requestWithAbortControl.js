export const requestWithAbortControl = (request, abortControl = {}) => {
  return new Promise((resolve, reject) => {
    if (abortControl.signal) {
      abortControl.signal.addEventListener('abort', (event) => {
        reject(event);
      });
    }

    const result = request();

    resolve(result);
  });
};
