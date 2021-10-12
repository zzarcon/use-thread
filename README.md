# use-thread
> Runs a function in a separate thread by using a Web Worker not blocking UI

## install

```
$ yarn add use-thread
```

## usage

```
import { useThread } from 'use-thread'

const longRunningFunction = () => {
  let result = 0;
  for (let i = 0; i < 1000; i++)
    for (let j = 0; j < 700; j++)
      for (let k = 0; k < 300; k++) result = result + i + j + k;

  return result;
};

const App = () => {
  const {status, value} = useThread(longRunningFunction);
  const result = status === 'resolved' ? value : status === 'pending' ? 'loading...' : 'error';

  return (
    <div>
      {result}
    </div>
  )
}
```

Since the function is running in a different context, closures are not supported.
The function supplied to `useThread` gets stringified, so everything becomes literal.
All variables and functions must be defined inside.


## Inspiration

Implementation taken from https://www.30secondsofcode.org/js/s/run-async 🖤