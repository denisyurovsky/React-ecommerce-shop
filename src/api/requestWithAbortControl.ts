export const requestWithAbortControl = (
  request: any,
  abortControl: any = {}
) => {
  return new Promise((resolve, reject) => {
    if (abortControl.signal) {
      abortControl.signal.addEventListener('abort', (event: any) => {
        reject(event);
      });
    }

    const result = request();

    resolve(result);
  });
};
