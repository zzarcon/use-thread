import {useEffect, useState} from 'react';

export type Status = 'pending' | 'resolved' | 'errored';

const runAsync = (callback: Function) => {
  const worker = new Worker(
    URL.createObjectURL(
      new Blob(
        [
          `postMessage((${callback})());`,
        ],
        {
          type: "application/javascript; charset=utf-8",
        }
      )
    )
  );
  return new Promise((resolve, reject) => {
    worker.onmessage = ({ data }) => {
      resolve(data), worker.terminate();
    };
    worker.onerror = (error) => {
      reject(error), worker.terminate();
    };
  });
};

export const useThread = (callback: Function) => {
  const [status, setStatus] = useState<Status>('pending')
  const [value, setValue] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const value = await runAsync(callback);

        setValue(value);
        setStatus('resolved');
      } catch (error) {
        setStatus('errored');
      }
    })()

    // TODO: worker.terminate() ?
  }, [callback])

  return {
    status,
    value
  }
};
