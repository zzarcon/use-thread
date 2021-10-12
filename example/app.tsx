import * as React from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper, GlobalStyles} from './styled';
import { useThread } from '../src';

const repoUrl = 'https://github.com/zzarcon/use-thread';

const longRunningFunction = () => {
  return 2 + 2;
}

const App = () => {
  const {status, value} = useThread(longRunningFunction);
  const result = status === 'resolved' ? value : status === 'pending' ? 'loading...' : 'error';

  return (
    <AppWrapper>
      <GlobalStyles />
      <GHCorner openInNewTab href={repoUrl} />
      {result}
    </AppWrapper>
  )
}

export default App